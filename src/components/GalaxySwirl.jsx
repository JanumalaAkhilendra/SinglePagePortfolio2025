import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader, AdditiveBlending } from 'three';

// This is a simple component to render a plane with a swirling galaxy texture
function GalaxySwirl({ position, rotation, scale, textureUrl }) {
  const meshRef = useRef();
  const texture = useLoader(TextureLoader, textureUrl);

  // Animate the swirl (optional, but adds dynamism)
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.0005; // Subtle rotation
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[100, 100]} /> {/* Adjust size as needed */}
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={0.7} // Adjust opacity
        blending={AdditiveBlending} // Make it glow
      />
    </mesh>
  );
}

export default GalaxySwirl;