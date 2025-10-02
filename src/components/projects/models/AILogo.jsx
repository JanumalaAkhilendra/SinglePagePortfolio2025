import { useMemo } from 'react';

const AILogo = () => {
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial 
          color="#7E4DD2" 
          emissive="#7E4DD2" 
          emissiveIntensity={0.5} 
          wireframe={true}
        />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial 
          color="#FF6B6B" 
          emissive="#FF6B6B" 
          emissiveIntensity={0.3} 
          transparent 
          opacity={0.7}
        />
      </mesh>
      <pointLight color="#7E4DD2" intensity={1.5} position={[2, 2, 2]} />
      <pointLight color="#FF6B6B" intensity={0.8} position={[-2, -2, 2]} />
    </group>
  );
};

export default AILogo;