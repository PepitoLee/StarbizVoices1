/**
 * Singleton audio engine — manages ONE Howl instance outside React.
 * Subscribes directly to the Zustand player store so no matter how many
 * components call useAudioPlayer(), only one Howl ever exists.
 */
import { Howl } from 'howler';
import { usePlayerStore } from '@/stores/player-store';

let howl: Howl | null = null;
let soundId: number | undefined;
let progressInterval: ReturnType<typeof setInterval> | null = null;
let currentUrl: string | null = null;

function clearProgress() {
  if (progressInterval) {
    clearInterval(progressInterval);
    progressInterval = null;
  }
}

function startProgress(h: Howl) {
  clearProgress();
  progressInterval = setInterval(() => {
    if (!h.playing(soundId)) return;
    const seek = h.seek() as number;
    const dur = h.duration();
    if (dur > 0) {
      usePlayerStore.getState().setProgress((seek / dur) * 100, seek);
    }
  }, 250);
}

function cleanup() {
  clearProgress();
  if (howl) {
    howl.unload();
    howl = null;
  }
  soundId = undefined;
  currentUrl = null;
}

function loadAndPlay(url: string) {
  cleanup();
  currentUrl = url;

  const rate = usePlayerStore.getState().playbackRate;

  const h = new Howl({
    src: [url],
    html5: true,
    preload: true,
    rate,
    onload: () => {
      usePlayerStore.getState().setDuration(h.duration());
    },
    onplay: () => {
      startProgress(h);
    },
    onpause: () => {
      clearProgress();
    },
    onend: () => {
      clearProgress();
      usePlayerStore.getState().setProgress(100, h.duration());
      usePlayerStore.getState().pause();
    },
    onloaderror: () => {
      console.error('Audio load error');
      usePlayerStore.getState().stop();
    },
  });

  howl = h;
  soundId = h.play();
}

// Subscribe to store changes
let prevUrl: string | null = null;
let prevPlaying = false;
let prevSeekTarget: number | null = null;
let prevRate = 1;

usePlayerStore.subscribe((state) => {
  const { currentAudioUrl, isPlaying, _seekTarget, playbackRate } = state;

  // 1. URL changed → load new audio
  if (currentAudioUrl !== prevUrl) {
    prevUrl = currentAudioUrl;
    if (currentAudioUrl) {
      loadAndPlay(currentAudioUrl);
      prevPlaying = true;
      prevRate = playbackRate;
    } else {
      cleanup();
      prevPlaying = false;
    }
    return;
  }

  // 2. Playback rate changed
  if (playbackRate !== prevRate) {
    prevRate = playbackRate;
    if (howl) {
      howl.rate(playbackRate, soundId);
    }
  }

  // 3. Play/pause toggled
  if (isPlaying !== prevPlaying) {
    prevPlaying = isPlaying;
    if (howl) {
      if (isPlaying && !howl.playing(soundId)) {
        howl.play(soundId);
      } else if (!isPlaying && howl.playing(soundId)) {
        howl.pause(soundId);
      }
    }
  }

  // 4. Seek requested
  if (_seekTarget !== null && _seekTarget !== prevSeekTarget) {
    prevSeekTarget = _seekTarget;
    if (howl) {
      howl.seek(_seekTarget, soundId);
    }
    usePlayerStore.setState({ _seekTarget: null });
  }
});

// Export a no-op to guarantee the module is loaded (side-effect import)
export function initAudioEngine() {
  // Module side-effects already set up the subscription
}
