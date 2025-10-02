import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useMemo } from 'react';

const ReactLogo = () => {
  // For production, use a proper React logo GLTF model
  // This is a simple stand-in geometry with React colors
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[1.5, 0.3, 16, 100]} />
        <meshStandardMaterial color="#61DAFB" emissive="#61DAFB" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 3]}>
        <torusGeometry args={[1.5, 0.3, 16, 100]} />
        <meshStandardMaterial color="#61DAFB" emissive="#61DAFB" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 3]}>
        <torusGeometry args={[1.5, 0.3, 16, 100]} />
        <meshStandardMaterial color="#61DAFB" emissive="#61DAFB" emissiveIntensity={0.5} />
      </mesh>
      <pointLight color="#61DAFB" intensity={1} position={[0, 0, 2]} />
    </group>
  );
};

export default ReactLogo;