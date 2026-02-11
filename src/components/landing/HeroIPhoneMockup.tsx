'use client';

import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { AudioPreviewList } from './AudioPreviewList';
import styles from './HeroIPhoneMockup.module.css';

interface HeroIPhoneMockupProps {
  className?: string;
  onInitClick?: () => void;
}

/* ── SVG Camera Lens — Photorealistic with iris rings ── */
function SvgLens({ size = 22 }: { size?: number }) {
  const r = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={styles.svgLens}>
      <defs>
        {/* Outer titanium ring */}
        <radialGradient id="lensRing" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#8a8a8e" />
          <stop offset="50%" stopColor="#5a5a5e" />
          <stop offset="100%" stopColor="#3a3a3e" />
        </radialGradient>
        {/* Inner glass — deep sapphire */}
        <radialGradient id="lensGlass" cx="38%" cy="32%">
          <stop offset="0%" stopColor="#1a2a4a" />
          <stop offset="40%" stopColor="#0a1525" />
          <stop offset="80%" stopColor="#050a15" />
          <stop offset="100%" stopColor="#020508" />
        </radialGradient>
        {/* Light reflection */}
        <radialGradient id="lensFlare" cx="35%" cy="30%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
          <stop offset="30%" stopColor="rgba(255,255,255,0.08)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      {/* Titanium ring */}
      <circle cx={r} cy={r} r={r} fill="url(#lensRing)" />
      {/* Inner barrel */}
      <circle cx={r} cy={r} r={r * 0.82} fill="#0a0a0f" />
      {/* Glass element */}
      <circle cx={r} cy={r} r={r * 0.7} fill="url(#lensGlass)" />
      {/* Iris rings */}
      <circle cx={r} cy={r} r={r * 0.55} fill="none" stroke="rgba(30,50,80,0.4)" strokeWidth="0.3" />
      <circle cx={r} cy={r} r={r * 0.4} fill="none" stroke="rgba(30,50,80,0.3)" strokeWidth="0.2" />
      {/* Specular highlight */}
      <circle cx={r * 0.72} cy={r * 0.65} r={r * 0.22} fill="url(#lensFlare)" />
      {/* Tiny bright dot */}
      <circle cx={r * 0.7} cy={r * 0.6} r={r * 0.06} fill="rgba(255,255,255,0.7)" />
    </svg>
  );
}

/* ── SVG Camera Module — Pro Max layout ── */
function SvgCameraModule() {
  return (
    <div className={styles.cameraModule}>
      <svg width="72" height="72" viewBox="0 0 72 72" className={styles.cameraModuleSvg}>
        <defs>
          <radialGradient id="camBg" cx="50%" cy="50%">
            <stop offset="0%" stopColor="rgba(20,20,25,0.6)" />
            <stop offset="100%" stopColor="rgba(5,5,10,0.85)" />
          </radialGradient>
          <filter id="camShadow">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="rgba(0,0,0,0.5)" />
          </filter>
        </defs>
        {/* Camera housing background */}
        <rect x="0" y="0" width="72" height="72" rx="18" fill="url(#camBg)" filter="url(#camShadow)" />
        {/* Subtle border */}
        <rect x="0.5" y="0.5" width="71" height="71" rx="17.5" fill="none" stroke="rgba(200,150,62,0.12)" strokeWidth="1" />
      </svg>
      {/* 3 Lenses — Pro triangle layout */}
      <div className={styles.lensGrid}>
        <div className={styles.lensPos} style={{ top: '10px', left: '10px' }}>
          <SvgLens size={24} />
        </div>
        <div className={styles.lensPos} style={{ top: '10px', right: '10px' }}>
          <SvgLens size={24} />
        </div>
        <div className={styles.lensPos} style={{ bottom: '10px', left: '10px' }}>
          <SvgLens size={24} />
        </div>
        {/* Flash LED */}
        <div className={styles.lensPos} style={{ bottom: '12px', right: '12px' }}>
          <svg width="18" height="18" viewBox="0 0 18 18">
            <defs>
              <radialGradient id="flashGlow" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#fff8e1" />
                <stop offset="40%" stopColor="#f5e6c8" />
                <stop offset="70%" stopColor="#d4a84b" />
                <stop offset="100%" stopColor="#8a6a2e" />
              </radialGradient>
            </defs>
            <circle cx="9" cy="9" r="5" fill="url(#flashGlow)" opacity="0.8" />
            <circle cx="9" cy="9" r="3" fill="none" stroke="rgba(200,150,62,0.3)" strokeWidth="0.5" />
          </svg>
        </div>
        {/* LiDAR dot */}
        <div className={styles.lensPos} style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
          <svg width="8" height="8" viewBox="0 0 8 8">
            <circle cx="4" cy="4" r="2.5" fill="#0a0a12" />
            <circle cx="4" cy="4" r="1.5" fill="#15152a" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ── SVG Screen Glass Reflection ── */
function SvgScreenReflection() {
  return (
    <svg className={styles.screenReflection} viewBox="0 0 236 506" preserveAspectRatio="none">
      <defs>
        <linearGradient id="glassRefl" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
          <stop offset="30%" stopColor="rgba(255,255,255,0.03)" />
          <stop offset="50%" stopColor="transparent" />
          <stop offset="70%" stopColor="rgba(255,255,255,0.02)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.06)" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="236" height="506" rx="34" fill="url(#glassRefl)" />
    </svg>
  );
}

export function HeroIPhoneMockup({ className, onInitClick }: HeroIPhoneMockupProps) {
  const controls = useAnimation();

  useEffect(() => {
    async function sequence() {
      // Phase 1: Flip from back (180°) to front (0°)
      await controls.start({
        rotateY: 0,
        transition: { duration: 1.8, ease: [0.22, 1, 0.36, 1] },
      });
      // Phase 2: Pause showing front
      await new Promise((r) => setTimeout(r, 3000));
      // Phase 3: Continuous rotation
      controls.start({
        rotateY: [0, 360],
        transition: { duration: 12, repeat: Infinity, ease: 'linear' },
      });
    }
    sequence();
  }, [controls]);

  return (
    <div className={`${styles.scene} ${className ?? ''}`}>
      <motion.div
        className={styles.phone}
        initial={{ rotateY: 180 }}
        animate={controls}
      >
        {/* 3D Edge panels — give the phone thickness */}
        <div className={styles.edgeLeft} />
        <div className={styles.edgeRight} />
        <div className={styles.edgeTop} />
        <div className={styles.edgeBottom} />

        {/* Front face */}
        <div className={styles.front}>
          <div className={styles.frame}>
            {/* Side buttons */}
            <div className={`${styles.buttonLeft} ${styles.buttonMute}`} />
            <div className={`${styles.buttonLeft} ${styles.buttonVolUp}`} />
            <div className={`${styles.buttonLeft} ${styles.buttonVolDown}`} />
            <div className={styles.buttonRight} />

            <div className={styles.screen}>
              <div className={styles.dynamicIsland} />
              <AudioPreviewList />

              {/* "Inicio" button overlay */}
              <div className={styles.screenOverlay}>
                <button
                  className={styles.initButton}
                  onClick={onInitClick}
                  type="button"
                >
                  <span className={styles.initButtonText}>Inicio</span>
                  <svg
                    className={styles.initButtonArrow}
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M7 2v10m-4-4l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {/* SVG glass reflection overlay */}
              <SvgScreenReflection />
            </div>
          </div>
        </div>

        {/* Back face */}
        <div className={styles.back}>
          <div className={styles.frame}>
            <div className={`${styles.buttonLeft} ${styles.buttonMute}`} />
            <div className={`${styles.buttonLeft} ${styles.buttonVolUp}`} />
            <div className={`${styles.buttonLeft} ${styles.buttonVolDown}`} />
            <div className={styles.buttonRight} />
            <div className={styles.backPanel}>
              {/* SVG Camera module — photorealistic */}
              <SvgCameraModule />

              {/* SVG Apple-style back reflection */}
              <svg className={styles.backReflection} viewBox="0 0 236 506" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="backRefl" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
                    <stop offset="35%" stopColor="transparent" />
                    <stop offset="65%" stopColor="transparent" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.03)" />
                  </linearGradient>
                </defs>
                <rect width="236" height="506" rx="34" fill="url(#backRefl)" />
              </svg>

              {/* Branding */}
              <div className={styles.branding}>
                <span className={styles.brandName}>StarbizVoices</span>
                <div className={styles.brandLine} />
                <span className={styles.brandTagline}>Para Padres</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
