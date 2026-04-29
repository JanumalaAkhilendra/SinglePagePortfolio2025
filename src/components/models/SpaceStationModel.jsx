// src/components/models/SpaceStationModel.jsx

import React, { useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

// Make sure your model path is correct
const MODEL_PATH = './models/space_station_3_low.glb';

export default function SpaceStationModel({ scale = 1, activeSection }) {
  const { scene, animations } = useGLTF(MODEL_PATH);
  const { actions } = useAnimations(animations, scene);

  // 🔥 1. Auto-center + normalize model (MOST IMPORTANT FIX)
  useEffect(() => {
    if (!scene) return;

    // Compute bounding box
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    // Center the model
    scene.position.sub(center);

    // Normalize scale (optional but recommended)
    // const maxDim = Math.max(size.x, size.y, size.z);
    // const desiredSize = 3; // tweak if needed
    // const scaleFactor = desiredSize / maxDim;

    scene.scale.setScalar(scale);

  }, [scene, scale]);

  // 🔥 2. Animation handling (your original logic, cleaned)
  useEffect(() => {
    if (animations && animations.length > 0) {
      const action = actions[animations[0].name];

      if (action) {
        action.loop = THREE.LoopRepeat;
        action.reset().fadeIn(0.5).play();
      }
    }

    return () => {
      if (animations && animations.length > 0) {
        const action = actions[animations[0].name];
        if (action) {
          action.fadeOut(0.5).stop();
        }
      }
    };
  }, [actions, animations]);

  return <primitive object={scene} />;
}