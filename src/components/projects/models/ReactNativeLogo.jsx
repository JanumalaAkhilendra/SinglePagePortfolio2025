import { useMemo } from 'react';

const ReactNativeLogo = () => {
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 3.5, 0.5]} />
        <meshStandardMaterial color="#61DAFB" emissive="#61DAFB" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 0.5, 0.3]}>
        <boxGeometry args={[1.8, 0.8, 0.2]} />
        <meshStandardMaterial color="#282C34" />
      </mesh>
      <mesh position={[0, -0.5, 0.3]}>
        <boxGeometry args={[1.8, 0.8, 0.2]} />
        <meshStandardMaterial color="#282C34" />
      </mesh>
      <pointLight color="#61DAFB" intensity={1} position={[0, 0, 2]} />
    </group>
  );
};

export default ReactNativeLogo;