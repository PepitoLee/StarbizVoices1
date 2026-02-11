'use client';

import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { useFrame, ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';

/* ── iPhone 15 Pro Max proportions — in world units ── */
const W = 1.44;      // width
const H = 3.0;       // height
const D = 0.16;      // total depth (frame thickness)
const R = 0.26;      // corner radius
const CAM_SIZE = 0.6;// camera housing width/height
const CAM_R = 0.14;  // camera housing corner radius
const CAM_BUMP = 0.06;
const LENS_R = 0.085;
const LENS_RING_R = 0.1;
const BEZEL_INSET = 0.06;

/* ── Colors ── */
const FRAME_COLOR = '#8E8E93';
const BACK_COLOR = '#1E3A5F';

interface PhoneModelProps {
   onInitClick?: () => void;
}

/* ─────────────────────────────────────────
   Normalize ShapeGeometry UVs to 0→1 range
   (ShapeGeometry outputs raw vertex coords as UVs)
   ───────────────────────────────────────── */
function normalizeUVs(geo: THREE.ShapeGeometry) {
   const uv = geo.attributes.uv;
   let minU = Infinity, maxU = -Infinity;
   let minV = Infinity, maxV = -Infinity;
   for (let i = 0; i < uv.count; i++) {
      const u = uv.getX(i), v = uv.getY(i);
      if (u < minU) minU = u;
      if (u > maxU) maxU = u;
      if (v < minV) minV = v;
      if (v > maxV) maxV = v;
   }
   const rangeU = maxU - minU, rangeV = maxV - minV;
   for (let i = 0; i < uv.count; i++) {
      uv.setXY(
         i,
         (uv.getX(i) - minU) / rangeU,
         (uv.getY(i) - minV) / rangeV
      );
   }
   uv.needsUpdate = true;
   return geo;
}

/* ═══════════════════════════════════════════════════════════
   Canvas Texture: Screen UI
   Pixel-perfect app interface rendered onto canvas
   ═══════════════════════════════════════════════════════════ */
function createScreenTexture(): THREE.CanvasTexture {
   const canvas = document.createElement('canvas');
   const dpr = 2;
   const cw = 420, ch = 880;
   canvas.width = cw * dpr;
   canvas.height = ch * dpr;
   const ctx = canvas.getContext('2d')!;
   ctx.scale(dpr, dpr);

   function rr(x: number, y: number, w: number, h: number, r: number) {
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, r);
   }

   // ── Background
   ctx.fillStyle = '#FAFAF8';
   ctx.fillRect(0, 0, cw, ch);

   // ── Status Bar
   ctx.fillStyle = '#1A1A1A';
   ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, sans-serif';
   ctx.textAlign = 'left';
   ctx.fillText('9:41', 24, 48);
   // Battery
   ctx.fillStyle = '#1A1A1A';
   rr(356, 36, 28, 13, 3); ctx.fill();
   ctx.fillStyle = '#FAFAF8';
   rr(358, 38, 24, 9, 2); ctx.fill();
   ctx.fillStyle = '#34C759';
   rr(358, 38, 20, 9, 2); ctx.fill();
   // Signal bars
   for (let i = 0; i < 4; i++) {
      ctx.fillStyle = '#1A1A1A';
      const bh = 5 + i * 3;
      ctx.fillRect(24 + i * 7, 35 + (14 - bh), 4, bh);
   }

   // ── Dynamic Island
   ctx.fillStyle = '#000';
   rr(130, 8, 160, 36, 18); ctx.fill();
   ctx.fillStyle = '#0a0a15';
   ctx.beginPath(); ctx.arc(254, 26, 5, 0, Math.PI * 2); ctx.fill();
   ctx.fillStyle = '#1a1a3a';
   ctx.beginPath(); ctx.arc(254, 26, 3, 0, Math.PI * 2); ctx.fill();

   // ── App Title
   ctx.fillStyle = '#C8963E';
   ctx.font = '600 12px -apple-system, sans-serif';
   ctx.textAlign = 'center';
   ctx.fillText('STARBIZVOICES', 210, 80);

   // ── Audio list items
   const audios = [
      { title: 'Manejo del enojo', category: 'Emociones', duration: '3:24', color: '#C8963E' },
      { title: 'Límites saludables', category: 'Comunicación', duration: '2:58', color: '#B8453A' },
      { title: 'Escucha activa', category: 'Crianza', duration: '3:12', color: '#5C7A4D' },
      { title: 'Autonomía adolescente', category: 'Desarrollo', duration: '3:45', color: '#4A6B8A' },
      { title: 'Conflictos en casa', category: 'Familia', duration: '2:40', color: '#8B6B4A' },
      { title: 'Motivación interna', category: 'Desarrollo', duration: '3:08', color: '#6B4A8B' },
   ];

   audios.forEach((audio, i) => {
      const y = 100 + i * 108;

      // Card bg
      ctx.fillStyle = `${audio.color}0D`;
      rr(16, y, 388, 92, 16); ctx.fill();

      // Left accent bar
      ctx.fillStyle = audio.color;
      rr(16, y, 4, 92, 2); ctx.fill();

      // Title
      ctx.fillStyle = '#1A1A1A';
      ctx.font = '600 17px -apple-system, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(audio.title, 36, y + 34);

      // Category pill
      ctx.font = '600 11px -apple-system, sans-serif';
      const catW = ctx.measureText(audio.category).width + 20;
      ctx.fillStyle = `${audio.color}1A`;
      rr(36, y + 46, catW, 22, 11); ctx.fill();
      ctx.fillStyle = audio.color;
      ctx.fillText(audio.category, 46, y + 61);

      // Duration
      ctx.fillStyle = '#999';
      ctx.font = '400 12px -apple-system, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(audio.duration, 350, y + 61);

      // Play button
      ctx.fillStyle = audio.color;
      ctx.beginPath(); ctx.arc(374, y + 46, 18, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.moveTo(369, y + 37); ctx.lineTo(369, y + 55); ctx.lineTo(383, y + 46);
      ctx.closePath(); ctx.fill();

      ctx.textAlign = 'left';
   });

   // ── Bottom gradient
   const grad = ctx.createLinearGradient(0, 730, 0, 810);
   grad.addColorStop(0, 'rgba(250,250,248,0)');
   grad.addColorStop(0.3, 'rgba(250,250,248,0.6)');
   grad.addColorStop(1, 'rgba(250,250,248,0.98)');
   ctx.fillStyle = grad;
   ctx.fillRect(0, 730, cw, 80);

   // ── "Inicio" Button
   ctx.save();
   ctx.shadowColor = 'rgba(200,150,62,0.35)';
   ctx.shadowBlur = 16;
   ctx.shadowOffsetY = 4;
   const btnGrad = ctx.createLinearGradient(100, 800, 320, 800);
   btnGrad.addColorStop(0, '#C8963E');
   btnGrad.addColorStop(1, '#B8453A');
   ctx.fillStyle = btnGrad;
   rr(90, 800, 240, 50, 25); ctx.fill();
   ctx.restore();
   // text
   ctx.fillStyle = '#fff';
   ctx.font = '600 18px -apple-system, sans-serif';
   ctx.textAlign = 'center';
   ctx.fillText('Inicio', 200, 830);
   // arrow
   ctx.strokeStyle = '#fff';
   ctx.lineWidth = 1.8;
   ctx.lineCap = 'round';
   ctx.lineJoin = 'round';
   ctx.beginPath();
   ctx.moveTo(232, 820); ctx.lineTo(232, 836);
   ctx.moveTo(227, 831); ctx.lineTo(232, 836); ctx.lineTo(237, 831);
   ctx.stroke();

   // Home indicator
   ctx.fillStyle = '#C0C0C0';
   rr(155, 862, 110, 5, 2.5); ctx.fill();

   const tex = new THREE.CanvasTexture(canvas);
   tex.colorSpace = THREE.SRGBColorSpace;
   tex.minFilter = THREE.LinearFilter;
   tex.magFilter = THREE.LinearFilter;
   tex.needsUpdate = true;
   return tex;
}

/* ═══════════════════════════════════════════════════════════
   Canvas Texture: Back branding
   ═══════════════════════════════════════════════════════════ */
function createBrandTexture(): THREE.CanvasTexture {
   const canvas = document.createElement('canvas');
   const dpr = 1.5;
   const cw = 512, ch = 1024;
   canvas.width = cw * dpr;
   canvas.height = ch * dpr;
   const ctx = canvas.getContext('2d')!;
   ctx.scale(dpr, dpr);

   // ── Background — navy gradient matching BACK_COLOR
   const bgGrad = ctx.createLinearGradient(0, 0, cw, ch);
   bgGrad.addColorStop(0, '#1E3A5F');
   bgGrad.addColorStop(0.5, '#162c49');
   bgGrad.addColorStop(1, '#0f2035');
   ctx.fillStyle = bgGrad;
   ctx.fillRect(0, 0, cw, ch);

   // ── Brushed metal texture
   ctx.strokeStyle = 'rgba(200,150,62,0.015)';
   ctx.lineWidth = 0.5;
   for (let j = 0; j < ch; j += 4) {
      ctx.beginPath();
      ctx.moveTo(0, j);
      ctx.lineTo(cw, j);
      ctx.stroke();
   }

   // ── Gold accent line at top
   const topGrad = ctx.createLinearGradient(cw * 0.15, 0, cw * 0.85, 0);
   topGrad.addColorStop(0, 'transparent');
   topGrad.addColorStop(0.3, 'rgba(200,150,62,0.4)');
   topGrad.addColorStop(0.5, 'rgba(239,197,132,0.6)');
   topGrad.addColorStop(0.7, 'rgba(200,150,62,0.4)');
   topGrad.addColorStop(1, 'transparent');
   ctx.strokeStyle = topGrad;
   ctx.lineWidth = 1.5;
   ctx.beginPath();
   ctx.moveTo(cw * 0.15, 2);
   ctx.lineTo(cw * 0.85, 2);
   ctx.stroke();

   // ── "Starbiz" — large serif
   ctx.fillStyle = '#C8963E';
   ctx.font = '400 72px Georgia, "DM Serif Display", serif';
   ctx.textAlign = 'center';
   ctx.textBaseline = 'middle';
   ctx.fillText('Starbiz', cw / 2, ch * 0.42);

   // ── "Voices" — slightly smaller
   ctx.font = '400 50px Georgia, "DM Serif Display", serif';
   ctx.fillText('Voices', cw / 2, ch * 0.49);

   // ── Decorative line
   const lineGrad = ctx.createLinearGradient(cw * 0.25, 0, cw * 0.75, 0);
   lineGrad.addColorStop(0, 'transparent');
   lineGrad.addColorStop(0.3, 'rgba(200,150,62,0.6)');
   lineGrad.addColorStop(0.5, 'rgba(239,197,132,0.8)');
   lineGrad.addColorStop(0.7, 'rgba(200,150,62,0.6)');
   lineGrad.addColorStop(1, 'transparent');
   ctx.strokeStyle = lineGrad;
   ctx.lineWidth = 1.2;
   ctx.beginPath();
   ctx.moveTo(cw * 0.25, ch * 0.535);
   ctx.lineTo(cw * 0.75, ch * 0.535);
   ctx.stroke();

   // ── "PARA PADRES"
   ctx.fillStyle = 'rgba(200,150,62,0.45)';
   ctx.font = '600 16px -apple-system, system-ui, sans-serif';
   ctx.fillText('P A R A   P A D R E S', cw / 2, ch * 0.58);

   const tex = new THREE.CanvasTexture(canvas);
   tex.colorSpace = THREE.SRGBColorSpace;
   tex.minFilter = THREE.LinearFilter;
   tex.magFilter = THREE.LinearFilter;
   tex.needsUpdate = true;
   return tex;
}

/* ═══════════════════════════════════════════════════════════
   PhoneModel — 3D iPhone with CanvasTexture screen + branding
   ═══════════════════════════════════════════════════════════ */
export function PhoneModel({ onInitClick }: PhoneModelProps) {
   const groupRef = useRef<THREE.Group>(null);
   const clockRef = useRef(0); // elapsed time since mount
   const [hovered, setHovered] = useState(false);

   /* Build geometries once */
   const bodyGeo = useMemo(() => {
      const shape = smoothRoundedRect(W, H, R);
      const geo = new THREE.ExtrudeGeometry(shape, {
         depth: D,
         bevelEnabled: true,
         bevelThickness: 0.02,
         bevelSize: 0.02,
         bevelSegments: 3,
         curveSegments: 24,
      });
      geo.center();
      geo.computeVertexNormals();
      return geo;
   }, []);

   /* Screen geometry — rounded shape with normalized UVs */
   const screenGeo = useMemo(() => {
      const screenR = R - 0.04;
      const shape = smoothRoundedRect(W - BEZEL_INSET, H - BEZEL_INSET, screenR);
      const geo = new THREE.ShapeGeometry(shape, 16);
      normalizeUVs(geo);
      return geo;
   }, []);

   /* Back panel geometry — with normalized UVs for branding texture */
   const backGeo = useMemo(() => {
      const backR = R - 0.02;
      const shape = smoothRoundedRect(W - 0.04, H - 0.04, backR);
      const geo = new THREE.ShapeGeometry(shape, 16);
      normalizeUVs(geo);
      return geo;
   }, []);

   /* Camera housing geometry */
   const camGeo = useMemo(() => {
      const shape = smoothRoundedRect(CAM_SIZE, CAM_SIZE, CAM_R);
      const geo = new THREE.ExtrudeGeometry(shape, {
         depth: CAM_BUMP,
         bevelEnabled: true,
         bevelThickness: 0.02,
         bevelSize: 0.02,
         bevelSegments: 2,
         curveSegments: 16,
      });
      geo.center();
      geo.computeVertexNormals();
      return geo;
   }, []);

   /* CanvasTextures */
   const screenTex = useMemo(() => createScreenTexture(), []);
   const brandTex = useMemo(() => createBrandTexture(), []);

   /* ── Animation phases (all in useFrame, no GSAP) ──
      0.0–1.5s : show back  (rotation = PI)
      1.5–3.3s : flip to front (PI → 0, eased)
      3.3–7.3s : hold front (rotation = 0)
      7.3s+    : slow continuous rotation
   */
   useFrame((_, delta) => {
      const g = groupRef.current;
      if (!g) return;
      const t = (clockRef.current += delta);

      const HOLD_BACK = 1.5;
      const FLIP_DUR = 1.8;
      const HOLD_FRONT = 4.0;
      const flipEnd = HOLD_BACK + FLIP_DUR;
      const rotateStart = flipEnd + HOLD_FRONT;

      if (t < HOLD_BACK) {
         // Phase 1: show back
         g.rotation.y = Math.PI;
      } else if (t < flipEnd) {
         // Phase 2: flip back→front (smoothstep easing)
         const p = (t - HOLD_BACK) / FLIP_DUR;
         const eased = p * p * (3 - 2 * p); // smoothstep
         g.rotation.y = Math.PI * (1 - eased);
      } else if (t < rotateStart) {
         // Phase 3: hold front
         g.rotation.y = 0;
      } else {
         // Phase 4: slow continuous rotation
         g.rotation.y = (t - rotateStart) * (Math.PI * 2 / 14);
      }
   });

   /* Cursor style when hovering screen */
   useEffect(() => {
      document.body.style.cursor = hovered ? 'pointer' : 'auto';
      return () => { document.body.style.cursor = 'auto'; };
   }, [hovered]);

   /* Click handler for the screen */
   const handleScreenClick = useCallback((e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      onInitClick?.();
   }, [onInitClick]);

   /* halfD must clear the body bevel (D/2 + bevelThickness = 0.10) */
   const halfD = D / 2 + 0.025;

   /* Lens positions — iPhone Pro triangle layout */
   const lenses: [number, number][] = [
      [-0.14, 0.14],
      [0.14, 0.14],
      [-0.14, -0.14],
   ];

   return (
      <group ref={groupRef}>
         {/* ── CHASSIS — Titanium frame ── */}
         <mesh geometry={bodyGeo}>
            <meshPhysicalMaterial
               color={FRAME_COLOR}
               metalness={0.92}
               roughness={0.18}
               clearcoat={0.8}
               clearcoatRoughness={0.05}
               envMapIntensity={2.2}
               reflectivity={1.0}
            />
         </mesh>

         {/* ── FRONT: OLED screen with CanvasTexture ── */}
         <mesh
            geometry={screenGeo}
            position={[0, 0, halfD + 0.001]}
            onClick={handleScreenClick}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
         >
            <meshBasicMaterial map={screenTex} toneMapped={false} />
         </mesh>

         {/* ── FRONT: Glass reflection overlay ── */}
         <mesh geometry={screenGeo} position={[0, 0, halfD + 0.002]}>
            <meshPhysicalMaterial
               color="#ffffff"
               transparent
               opacity={0.03}
               roughness={0.0}
               metalness={0.0}
               clearcoat={1}
               clearcoatRoughness={0.01}
               envMapIntensity={0.4}
            />
         </mesh>

         {/* ── BACK: panel with branding texture ── */}
         <mesh geometry={backGeo} position={[0, 0, -halfD]} rotation={[0, Math.PI, 0]}>
            <meshBasicMaterial map={brandTex} toneMapped={false} />
         </mesh>

         {/* ── BACK: Camera module ── */}
         <group position={[-0.31, 0.92, -halfD - 0.001]} rotation={[0, Math.PI, 0]}>
            <mesh geometry={camGeo}>
               <meshPhysicalMaterial
                  color="#1C1C1E"
                  metalness={0.6}
                  roughness={0.22}
                  clearcoat={0.8}
                  clearcoatRoughness={0.1}
                  envMapIntensity={1.5}
               />
            </mesh>

            {/* 3 Lenses — sapphire glass effect */}
            {lenses.map(([lx, ly], i) => (
               <group key={i} position={[lx, ly, CAM_BUMP / 2 + 0.01]}>
                  <mesh>
                     <ringGeometry args={[LENS_R, LENS_RING_R, 32]} />
                     <meshPhysicalMaterial
                        color="#7A7A7E"
                        metalness={0.98}
                        roughness={0.05}
                        clearcoat={0.6}
                        envMapIntensity={2.5}
                     />
                  </mesh>
                  <mesh position={[0, 0, 0.003]}>
                     <circleGeometry args={[LENS_R, 32]} />
                     <meshPhysicalMaterial
                        color="#050515"
                        metalness={0.05}
                        roughness={0.02}
                        clearcoat={1}
                        clearcoatRoughness={0.005}
                        envMapIntensity={4.0}
                        ior={1.77}
                        reflectivity={0.95}
                     />
                  </mesh>
               </group>
            ))}

            {/* Flash / LiDAR */}
            <group position={[0.14, -0.14, CAM_BUMP / 2 + 0.008]}>
               <mesh>
                  <ringGeometry args={[0.035, 0.05, 24]} />
                  <meshPhysicalMaterial color="#7A7A7E" metalness={0.95} roughness={0.08} />
               </mesh>
               <mesh position={[0, 0, 0.001]}>
                  <circleGeometry args={[0.035, 24]} />
                  <meshStandardMaterial color="#2A2520" metalness={0.3} roughness={0.6} />
               </mesh>
            </group>

            <mesh position={[0, 0, CAM_BUMP / 2 + 0.008]}>
               <circleGeometry args={[0.015, 24]} />
               <meshStandardMaterial color="#0a0a0a" />
            </mesh>
         </group>

         {/* ── SIDE BUTTONS ── */}
         <mesh position={[-W / 2 - 0.018, 0.85, 0]}>
            <boxGeometry args={[0.03, 0.09, D * 0.4]} />
            <meshPhysicalMaterial color={FRAME_COLOR} metalness={0.95} roughness={0.12} clearcoat={0.5} />
         </mesh>
         <mesh position={[-W / 2 - 0.018, 0.55, 0]}>
            <boxGeometry args={[0.03, 0.2, D * 0.4]} />
            <meshPhysicalMaterial color={FRAME_COLOR} metalness={0.95} roughness={0.12} clearcoat={0.5} />
         </mesh>
         <mesh position={[-W / 2 - 0.018, 0.28, 0]}>
            <boxGeometry args={[0.03, 0.2, D * 0.4]} />
            <meshPhysicalMaterial color={FRAME_COLOR} metalness={0.95} roughness={0.12} clearcoat={0.5} />
         </mesh>
         <mesh position={[W / 2 + 0.018, 0.52, 0]}>
            <boxGeometry args={[0.03, 0.28, D * 0.4]} />
            <meshPhysicalMaterial color={FRAME_COLOR} metalness={0.95} roughness={0.12} clearcoat={0.5} />
         </mesh>

         {/* ── BOTTOM — speaker grilles + USB-C ── */}
         {[-0.18, -0.12, -0.06, 0.06, 0.12, 0.18].map((x, i) => (
            <mesh key={`sp-${i}`} position={[x, -H / 2 - 0.014, 0]} rotation={[Math.PI / 2, 0, 0]}>
               <circleGeometry args={[0.012, 12]} />
               <meshStandardMaterial color="#1a1a1a" />
            </mesh>
         ))}
         <mesh position={[0, -H / 2 - 0.014, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.08, 0.028]} />
            <meshStandardMaterial color="#0a0a0a" metalness={0.5} roughness={0.4} />
         </mesh>
      </group>
   );
}

/*
 * Smooth rounded rectangle using cubic bezier curves.
 */
function smoothRoundedRect(w: number, h: number, r: number) {
   const s = new THREE.Shape();
   const hw = w / 2, hh = h / 2;
   const k = 0.5522847498;

   s.moveTo(-hw + r, -hh);
   s.lineTo(hw - r, -hh);
   s.bezierCurveTo(hw - r * (1 - k), -hh, hw, -hh + r * (1 - k), hw, -hh + r);
   s.lineTo(hw, hh - r);
   s.bezierCurveTo(hw, hh - r * (1 - k), hw - r * (1 - k), hh, hw - r, hh);
   s.lineTo(-hw + r, hh);
   s.bezierCurveTo(-hw + r * (1 - k), hh, -hw, hh - r * (1 - k), -hw, hh - r);
   s.lineTo(-hw, -hh + r);
   s.bezierCurveTo(-hw, -hh + r * (1 - k), -hw + r * (1 - k), -hh, -hw + r, -hh);

   return s;
}
