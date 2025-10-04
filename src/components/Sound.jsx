"use client";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// Modal Component (unchanged)
const Modal = ({ onClose, toggle }) => {
  return createPortal(
    <div className="fixed inset-0 bg-background/20 backdrop-blur-sm flex items-center justify-center z-[1000]">
      <div
        className="bg-background/60 border border-accent/30 border-solid backdrop-blur-[6px]
                   py-8 px-6 xs:px-10 sm:px-16 rounded shadow-glass-inset text-center space-y-8"
      >
        <p className="font-light">Do you like to play the background music?</p>
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={toggle}
            className="px-4 py-2 border border-accent/30 border-solid hover:shadow-glass-sm rounded mr-2"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 border border-accent/30 border-solid hover:shadow-glass-sm rounded"
          >
            No
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("my-modal")
  );
};

const Sound = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);

  const handleFirstUserInteraction = useCallback(() => {
    if (localStorage.getItem("musicConsent") === "true" && !isPlaying) {
      if (!audioLoaded) {
        loadAudio();
      }
      if (audioRef.current) {
        audioRef.current.play().catch((error) => {
          console.error("Audio playback failed:", error);
        });
        setIsPlaying(true);
      }
    }
    ["click", "keydown", "touchstart"].forEach((event) =>
      document.removeEventListener(event, handleFirstUserInteraction)
    );
  }, [isPlaying, audioLoaded]);

  const toggle = useCallback(() => {
    const newState = !isPlaying;
    setIsPlaying(newState);
    if (!audioLoaded && newState) {
      loadAudio().then(() => {
        audioRef.current && audioRef.current.play().catch(() => {});
      });
    } else if (audioRef.current) {
      newState ? audioRef.current.play() : audioRef.current.pause();
    }
    localStorage.setItem("musicConsent", String(newState));
    localStorage.setItem("consentTime", new Date().toISOString());
    setShowModal(false);
  }, [isPlaying]);

  useEffect(() => {
    const consent = localStorage.getItem("musicConsent");
    const consentTime = localStorage.getItem("consentTime");
    const currentTime = new Date().getTime();
    const threeDaysInMillis = 3 * 24 * 60 * 60 * 1000;

    if (
      consent !== null &&
      consentTime &&
      new Date(consentTime).getTime() + threeDaysInMillis > currentTime
    ) {
      setIsPlaying(consent === "true");
      if (consent === "true") {
        ["click", "keydown", "touchstart"].forEach((event) =>
          document.addEventListener(event, handleFirstUserInteraction)
        );
      }
    } else {
      setShowModal(true);
    }

    return () => {
      ["click", "keydown", "touchstart"].forEach((event) =>
        document.removeEventListener(event, handleFirstUserInteraction)
      );
    };
  }, [handleFirstUserInteraction]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.warn("Autoplay prevented:", error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const loadAudio = async () => {
    if (audioLoaded) return;
    if (!audioRef.current) {
      const audio = document.createElement("audio");
      audio.loop = true;
      audio.preload = "none";
      const src = document.createElement("source");
      src.src = "/audio/space-intro-124261.mp3";
      src.type = "audio/mpeg";
      audio.appendChild(src);
      audioRef.current = audio;
      audio.style.display = "none";
      document.body.appendChild(audio);
      try {
        await audio.load();
      } catch (e) {}
    }
    setAudioLoaded(true);
  };

  return (
    <div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} toggle={toggle} />
      )}

      {/* 🎧 Sound Button - Positioned dynamically */}
      <motion.button
        onClick={toggle}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
        className={`
          fixed z-[1000] group cursor-pointer rounded-full flex items-center justify-center 
          p-3 xs:p-4 
          w-10 h-10 xs:w-14 xs:h-14 
          text-white backdrop-blur-md 
          bg-white/10 border border-cyan-500/20 shadow-[0_0_20px_rgba(0,255,255,0.3)] 
          hover:shadow-[0_0_25px_rgba(0,255,255,0.5)] transition-all

          /* Responsive Positioning */
          bottom-4 left-4 md:top-4 md:right-4 md:bottom-auto md:left-auto
        `}
        aria-label="Sound control button"
      >
        {isPlaying ? (
          <Volume2 className="w-full h-full text-cyan-300" strokeWidth={1.5} />
        ) : (
          <VolumeX className="w-full h-full text-cyan-300" strokeWidth={1.5} />
        )}
      </motion.button>
    </div>
  );
};

export default Sound;
