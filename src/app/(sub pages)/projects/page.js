'use client";'
import Image from "next/image";
import ProjectList from "@/components/projects";
import StarsBackground from "@/components/StarsBackground";
import { projectsData } from "../../data";

export const metadata = {
  title: "Projects",
};

export default function Home() {
  return (
    <>
       {/* 3D Stars Background (Replaces static image) */}
      <StarsBackground />
      <ProjectList projects={projectsData} />
    </>
  );
}
