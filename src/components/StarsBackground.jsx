"use client";

import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
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

  useEffect(() => {
    // Generate a few random swirls
    const numSwirls = 20; // How many swirls you want
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
        <ambientLight intensity={0.25} color="#99ccff" />
        <pointLight position={[10, 10, 10]} color="#0066ff" intensity={1.5} />
        <pointLight position={[-10, -10, -10]} color="#ff00aa" intensity={1.5} />

        <group ref={starsRef}>
          <Stars
            radius={150}
            depth={60}
            count={5000}
            factor={6}
            saturation={0}
            fade
            speed={2}
          >
            <meshStandardMaterial
              color="#ffffff"
              emissive="#4488ff"
              emissiveIntensity={0.3}
              transparent
              opacity={0.8}
            />
          </Stars>
        </group>

        {/* Render the GalaxySwirl components */}
        {swirls.map(swirl => (
          <GalaxySwirl
            key={swirl.key}
            position={swirl.position}
            rotation={swirl.rotation}
            scale={swirl.scale}
            textureUrl={swirl.textureUrl}
          />
        ))}

        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.25}
          enablePan={true}
          enableRotate={false}
        />
      </Canvas>
    </div>
  );
}