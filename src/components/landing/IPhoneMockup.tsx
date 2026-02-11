'use client';

import { AudioPreviewList } from './AudioPreviewList';
import styles from './IPhoneMockup.module.css';

interface IPhoneMockupProps {
  autoPlay?: boolean;
}

export function IPhoneMockup({ autoPlay = false }: IPhoneMockupProps) {
  return (
    <div className={styles.frame}>
      {/* Side buttons */}
      <div className={`${styles.buttonLeft} ${styles.buttonMute}`} />
      <div className={`${styles.buttonLeft} ${styles.buttonVolUp}`} />
      <div className={`${styles.buttonLeft} ${styles.buttonVolDown}`} />
      <div className={styles.buttonRight} />

      {/* Screen */}
      <div className={styles.screen}>
        <div className={styles.dynamicIsland} />
        <AudioPreviewList autoPlay={autoPlay} />
      </div>
    </div>
  );
}
