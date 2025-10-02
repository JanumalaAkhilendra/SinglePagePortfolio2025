"use client";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function SpaceModel(props) {
  const { scene } = useGLTF("/models/spacescene.glb");
  const modelRef = useRef();

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.0010;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      enableZoom={false}
      scale={1.5}
      rotation={[0, 0, 0]}
      position={[0, -0.5, 0]}
      {...props}
    />
  );
}
useGLTF.preload("/models/spacescene.glb");