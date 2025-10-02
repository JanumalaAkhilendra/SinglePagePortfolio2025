"use client";

import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { Text } from "@react-three/drei";

const icons = [
  {
    name: "GitHub",
    link: "https://github.com/JanumalaAkhilendra",
    image: "/asteriod.png",
    icon: "/icons/github_white.png",
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/akhilendra/",
    image: "/asteriod.png",
    icon: "/icons/instagram_white.png",
  },
  {
    name: "X",
    link: "https://twitter.com/Akhilendra_01",
    image: "/asteriod.png",
    icon: "/icons/twitter_white.png",
  },
];

export default function OrbitingIcons() {
  const groupRef = useRef();

  const asteroidTextures = useLoader(THREE.TextureLoader, icons.map((i) => i.image));
  const iconTextures = useLoader(THREE.TextureLoader, icons.map((i) => i.icon));

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
    }
  });

  const radius = 2.2;

  return (
    <group ref={groupRef}>
      {icons.map((item, i) => {
        const angle = (i / icons.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const yOffset = 0.35;

        return (
          <group key={item.name} position={[x, 0, z]}>
            {/* Asteroid */}
            <sprite
              scale={[0.3, 0.3, 1]}
              onClick={() => window.open(item.link, "_blank")}
              cursor="pointer"
            >
              <spriteMaterial map={asteroidTextures[i]} />
            </sprite>

            {/* Icon Above */}
            <sprite
              position={[0, yOffset, 0]}
              scale={[0.18, 0.18, 1]}
              onClick={() => window.open(item.link, "_blank")}
              cursor="pointer"
            >
              <spriteMaterial map={iconTextures[i]} />
            </sprite>

            {/* Optional tail/arrow between icon and asteroid */}
            <mesh position={[0, yOffset / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.005, 0.005, yOffset, 8]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
