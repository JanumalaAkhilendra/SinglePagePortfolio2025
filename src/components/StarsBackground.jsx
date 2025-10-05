"use client";

import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import useScreenSize from "./hooks/useScreenSize";
import GalaxySwirl from "./GalaxySwirl"; // Import the new component

// Placeholder galaxy swirl textures (replace with your own if desired)
// These are simple cloud-like textures, but you can find more realistic galaxy textures.
const GALAXY_SWIRL_TEXTURES = [
  "../../spiral-galaxy-background.png",
  "../../galaxy_swirl2.png",
  "../../galaxy_swirl3.png",
];

// Function to generate a random number within a range
const getRandom = (min, max) => Math.random() * (max - min) + min;

export default function StarsBackground() {
  const starsRef = useRef();
  const [swirls, setSwirls] = useState([]);
  const screen = useScreenSize();
  const isMobile = screen && screen < 768;

  useEffect(() => {
    // Generate a few random swirls
  const numSwirls = isMobile ? 10 : 25; // fewer swirls on mobile
  const generatedSwirls = Array.from({ length: numSwirls }).map((_, i) => ({
      key: i,
      position: [getRandom(-200, 200), getRandom(-200, 200), getRandom(-100, 100)],
      rotation: [getRandom(0, Math.PI * 2), getRandom(0, Math.PI * 2), getRandom(0, Math.PI * 2)],
      scale: getRandom(0.2, 0.5), // Randomize size
      textureUrl: GALAXY_SWIRL_TEXTURES[Math.floor(Math.random() * GALAXY_SWIRL_TEXTURES.length)],
    }));
    setSwirls(generatedSwirls);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-50 bg-cover bg-center">
      {/* Optional: semi-transparent overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-purple-900/10 to-blue-900/10" />

      <Canvas>
        <ambientLight intensity={0.2} color="#99ccff" />
        {!isMobile && <pointLight position={[10, 10, 10]} color="#0066ff" intensity={1.2} />}
        {!isMobile && <pointLight position={[-10, -10, -10]} color="#ff00aa" intensity={1.2} />}

        <group ref={starsRef}>
          <Stars
            radius={isMobile ? 80 : 150}
            depth={isMobile ? 20 : 60}
            count={isMobile ? 800 : 5000}
            factor={isMobile ? 2 : 6}
            saturation={0}
            fade={!isMobile}
            speed={isMobile ? 0.2 : 2}
          >
            <meshStandardMaterial
              color="#ffffff"
              emissive="#4488ff"
              emissiveIntensity={isMobile ? 0.1 : 0.3}
              transparent
              opacity={isMobile ? 0.6 : 0.8}
            />
          </Stars>
        </group>

        {/* Render the GalaxySwirl components (fewer on mobile) */}
        {swirls.map((swirl) => (
          <GalaxySwirl
            key={swirl.key}
            position={swirl.position}
            rotation={swirl.rotation}
            scale={swirl.scale}
            textureUrl={swirl.textureUrl}
            lowQuality={isMobile}
          />
        ))}

        <OrbitControls
          enableZoom={false}
          autoRotate={!isMobile}
          autoRotateSpeed={isMobile ? 0 : 0.25}
          enablePan={!isMobile}
          enableRotate={!isMobile}
        />
      </Canvas>
    </div>
  );
}