'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import { PhoneModel } from './PhoneModel';

interface HeroPhone3DProps {
  onInitClick?: () => void;
}

export function HeroPhone3D({ onInitClick }: HeroPhone3DProps) {
  return (
    <div
      className="w-[280px] h-[560px] max-sm:w-[230px] max-sm:h-[470px]"
      role="img"
      aria-label="iPhone 3D mostrando la app StarbizVoice"
    >
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: 3, // ACESFilmic
          toneMappingExposure: 1.3,
        }}
      >
        {/* ── Cinematic 3-point lighting (optimized) ── */}
        {/* Key light — warm, upper-right */}
        <directionalLight position={[5, 6, 5]} intensity={1.5} color="#fff5e6" />
        {/* Fill light — cool, left side */}
        <directionalLight position={[-5, 3, 4]} intensity={0.6} color="#e0e8ff" />
        {/* Rim light — behind, catches titanium edges */}
        <directionalLight position={[0, 4, -6]} intensity={1.0} color="#ffffff" />
        {/* Ambient — subtle, prevents total darkness */}
        <ambientLight intensity={0.4} />

        <Suspense fallback={null}>
          <Environment preset="apartment" />

          <Float
            speed={2}
            rotationIntensity={0}
            floatIntensity={0.3}
            floatingRange={[-0.06, 0.06]}
          >
            <PhoneModel onInitClick={onInitClick} />
          </Float>

          {/* Soft shadow ellipse beneath the phone */}
          <mesh position={[0, -1.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[2.2, 1.2]} />
            <meshBasicMaterial color="#000" transparent opacity={0.12} />
          </mesh>
        </Suspense>
      </Canvas>
    </div>
  );
}
