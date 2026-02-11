import type { Pack, Audio } from '@/types';

/**
 * Datos locales de packs y audios.
 * Total: 21 audios distribuidos en packs tematicos.
 * Los archivos viven en public/audio/ y public/covers/.
 */

const pack_neurociencia: Pack = {
  id: 'pack-neurociencia',
  title: 'Neurociencia para Padres',
  description: 'Lo que la ciencia dice sobre el cerebro de tu hijo',
  cover_url: '/covers/dopamina.gif',
  category: 'educacion',
  audio_count: 5,
  is_featured: true,
  sort_order: 0,
  created_at: new Date().toISOString(),
};

export const localPacks: Pack[] = [
  pack_neurociencia,
];

export const localAudios: Audio[] = [
  {
    id: 'audio-01-dopamina',
    pack_id: 'pack-neurociencia',
    title: 'Tu hijo no es un robot roto (Es su Dopamina)',
    description: 'Dra. Elena, Neurocientifica — Entiende como funciona la dopamina en el cerebro adolescente',
    audio_url: '/audio/dopamina-dra-elena.mp3',
    cover_url: '/covers/dra-elena.gif',
    duration_seconds: 192,
    tags: ['neurociencia', 'dopamina', 'adolescentes'],
    sort_order: 1,
    is_preview: false,
    created_at: new Date().toISOString(),
    pack: pack_neurociencia,
  },
  {
    id: 'audio-02-jardinero',
    pack_id: 'pack-neurociencia',
    title: 'Jardinero o Carpintero (El secreto para que no te odien)',
    description: 'Dr. Marco, Psicologo Familiar — Dos estilos de crianza y cual funciona mejor',
    audio_url: '/audio/jardinero-carpintero-dr-marco.mp3',
    cover_url: null,
    duration_seconds: 41,
    tags: ['crianza', 'psicologia', 'familia'],
    sort_order: 2,
    is_preview: false,
    created_at: new Date().toISOString(),
    pack: pack_neurociencia,
  },
  {
    id: 'audio-03-jungla',
    pack_id: 'pack-neurociencia',
    title: 'La Jungla de Cristal (Lo que pasa en el recreo digital)',
    description: 'Lic. Sofia, Consultora Educativa y Experta en Bullying — El mundo oculto de las interacciones digitales',
    audio_url: '/audio/jungla-cristal-lic-sofia.mp3',
    cover_url: '/covers/lic-sofia.gif',
    duration_seconds: 43,
    tags: ['bullying', 'digital', 'educacion'],
    sort_order: 3,
    is_preview: false,
    created_at: new Date().toISOString(),
    pack: pack_neurociencia,
  },
  {
    id: 'audio-04-nomofobia',
    pack_id: 'pack-neurociencia',
    title: 'Nomofobia (Tu hijo tiene miedo a desconectarse)',
    description: 'Coach Alex, Especialista en Habitos Digitales — Cuando el celular se convierte en una extension del cuerpo',
    audio_url: '/audio/nomofobia-coach-alex.mp3',
    cover_url: '/covers/coach-alex.gif',
    duration_seconds: 38,
    tags: ['nomofobia', 'habitos', 'digital'],
    sort_order: 4,
    is_preview: false,
    created_at: new Date().toISOString(),
    pack: pack_neurociencia,
  },
  {
    id: 'audio-05-sueno',
    pack_id: 'pack-neurociencia',
    title: 'El Superpoder del Sueno (La medicina gratis)',
    description: 'Dra. Valentina, Medicina del Bienestar y Sueno — Por que dormir bien lo cambia todo',
    audio_url: '/audio/superpoder-sueno-dra-valentina.mp3',
    cover_url: '/covers/dra-valentina.gif',
    duration_seconds: 37,
    tags: ['sueno', 'bienestar', 'salud'],
    sort_order: 5,
    is_preview: false,
    created_at: new Date().toISOString(),
    pack: pack_neurociencia,
  },
];

/** Buscar pack por ID */
export function getPackById(id: string): Pack | undefined {
  return localPacks.find((p) => p.id === id);
}

/** Buscar audios de un pack */
export function getAudiosByPackId(packId: string): Audio[] {
  return localAudios
    .filter((a) => a.pack_id === packId)
    .sort((a, b) => a.sort_order - b.sort_order);
}

/** Buscar audio por ID */
export function getAudioById(id: string): Audio | undefined {
  return localAudios.find((a) => a.id === id);
}
