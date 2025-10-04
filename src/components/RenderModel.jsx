"use client";
import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import clsx from "clsx";
import React, { Suspense, useState } from "react";
import useScreenSize from "./hooks/useScreenSize";

const RenderModel = ({ children, className }) => {
  const screen = useScreenSize();
  const isMobile = screen && screen < 768;
  const [load3D, setLoad3D] = useState(false);

  // On mobile we render a lightweight static fallback and offer an on-demand load button.
  if (isMobile && !load3D) {
    return (
      <div
        className={clsx(
          "w-screen h-screen -z-10 relative bg-cover bg-center flex items-center justify-center",
          className
        )}
        style={{ backgroundImage: "url('/background/space2.jpeg')" }}
      >
        <button
          onClick={() => setLoad3D(true)}
          className="px-4 py-2 rounded bg-accent/90 text-foreground backdrop-blur"
        >
          Load 3D (low)
        </button>
      </div>
    );
  }

  return (
    <Canvas
      className={clsx("w-screen h-screen -z-10 relative", className)}
      shadows={false}
      // Lower DPR on mobile/low-power devices and use on-demand frameloop to reduce GPU usage
      dpr={isMobile ? 1 : [1, 2]}
      frameloop={isMobile ? "demand" : undefined}
      gl={{ powerPreference: "low-power", antialias: false }}
      onCreated={({ gl }) => {
        // Ensure we don't use a high pixel ratio which kills mobile performance
        try {
          gl.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2));
        } catch (e) {
          // ignore in SSR/edge cases
        }
      }}
    >
      <Suspense fallback={null}>{children}</Suspense>
      <Environment preset="dawn" />
    </Canvas>
  );
};

export default RenderModel;
