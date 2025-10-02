import { useMemo } from 'react';

const DjangoLogo = () => {
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.8, 1.8, 0.5, 64]} />
        <meshStandardMaterial color="#092E20" emissive="#092E20" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.3]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[2.5, 0.5, 0.2]} />
        <meshStandardMaterial color="#0C4B33" emissive="#0C4B33" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, 0, 0.3]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[2.5, 0.5, 0.2]} />
        <meshStandardMaterial color="#0C4B33" emissive="#0C4B33" emissiveIntensity={0.5} />
      </mesh>
      <pointLight color="#0C4B33" intensity={0.8} position={[0, 0, 2]} />
    </group>
  );
};

export default DjangoLogo;