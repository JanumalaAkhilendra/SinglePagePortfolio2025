// src/components/models/SpaceStationModel.jsx (Modified)

import React, { useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three'; 


// Make sure your model path is correct
const MODEL_PATH = './models/space_station_3_low.glb'; // Adjust this path
export default function SpaceStationModel({ scale, activeSection }) {
    // 1. Load the model and its scene graph, as well as any animation clips
    const { scene, animations } = useGLTF(MODEL_PATH);

    // 2. Access the animation actions
    // This hook automatically links the animations to the scene
    const { actions } = useAnimations(animations, scene);
    
    // 3. Effect to play the animation when the component mounts
    useEffect(() => {
        // Check if there are animations and if the first one exists
        if (animations && animations.length > 0) {
            
            // Assuming the loop or movement animation is the first clip (index 0)
            const action = actions[animations[0].name];
            
            if (action) {
                // Set the animation to seamlessly loop
                action.loop = THREE.LoopRepeat; 
                
                // Set the animation's fading transition (optional, but smoother)
                action.reset().fadeIn(0.5).play();
            }
        }
        
        // Cleanup function to stop the animation when the component unmounts
        return () => {
            if (animations && animations.length > 0) {
                const action = actions[animations[0].name];
                if (action) {
                    action.fadeOut(0.5).stop();
                }
            }
        };
    }, [actions, animations]); // Re-run if actions or animations change

    // Use the loaded scene for rendering
    return <primitive object={scene} scale={scale} />;
}