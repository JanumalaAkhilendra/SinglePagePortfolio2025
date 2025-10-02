"use client";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react"; // Added useCallback
import { createPortal } from "react-dom";

// Modal component (no changes needed here, but moved outside for clarity)
const Modal = ({ onClose, toggle }) => {
  return createPortal(
    <div className="fixed inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center z-[1000]">
      <div
        className="bg-background/20 border border-accent/30 border-solid backdrop-blur-[6px]
                   py-8 px-6 xs:px-10 sm:px-16 rounded shadow-glass-inset text-center space-y-8
                  "
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
    document.getElementById("my-modal") // Ensure this ID exists in your public/index.html or root layout
  );
};

const Sound = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // useCallback for stable reference
  const handleFirstUserInteraction = useCallback(() => {
    // Only attempt to play if audioRef.current exists and is not already playing
    if (audioRef.current && localStorage.getItem("musicConsent") === "true" && !isPlaying) {
      audioRef.current.play().catch(error => {
        console.error("Audio playback failed:", error);
        // Handle cases where play() is rejected (e.g., due to user interaction policy)
      });
      setIsPlaying(true);
    }

    // Remove listeners after the first interaction attempts to play
    // This is important to ensure it only runs once and doesn't interfere
    ["click", "keydown", "touchstart"].forEach((event) =>
      document.removeEventListener(event, handleFirstUserInteraction)
    );
  }, [isPlaying]); // isPlaying is a dependency as we check !isPlaying

  // useCallback for stable reference
  const toggle = useCallback(() => {
    const newState = !isPlaying;
    setIsPlaying(newState); // Update state first
    if (audioRef.current) {
      newState ? audioRef.current.play() : audioRef.current.pause();
    }
    localStorage.setItem("musicConsent", String(newState));
    localStorage.setItem("consentTime", new Date().toISOString());
    setShowModal(false); // Close modal on interaction
  }, [isPlaying]); // isPlaying is a dependency for this callback

  // Effect for initial consent check and setting up listeners
  useEffect(() => {
    const consent = localStorage.getItem("musicConsent");
    const consentTime = localStorage.getItem("consentTime");
    const currentTime = new Date().getTime();
    const threeDaysInMillis = 3 * 24 * 60 * 60 * 1000;

    if (
      consent !== null && // Ensure consent exists
      consentTime &&
      new Date(consentTime).getTime() + threeDaysInMillis > currentTime
    ) {
      // Consent is valid and not expired
      setIsPlaying(consent === "true");
      // If consent was true, add listeners for user interaction to play audio
      if (consent === "true") {
        ["click", "keydown", "touchstart"].forEach((event) =>
          document.addEventListener(event, handleFirstUserInteraction)
        );
      }
    } else {
      // No valid consent, or it's expired, show modal
      setShowModal(true);
    }

    // Cleanup listeners when component unmounts
    return () => {
      ["click", "keydown", "touchstart"].forEach((event) =>
        document.removeEventListener(event, handleFirstUserInteraction)
      );
    };
  }, [handleFirstUserInteraction]); // Only handleFirstUserInteraction as a dependency

  // Effect to manage audio play/pause when `isPlaying` state changes
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        // Attempt to play, but catch potential errors from browser policies
        audioRef.current.play().catch(error => {
          console.warn("Autoplay was prevented. User interaction needed to play audio.", error);
          // A user interaction to play the audio may still be required.
          // In this case, the `handleFirstUserInteraction` should eventually pick it up.
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]); // Dependency: isPlaying

  return (
    <div className="fixed top-4 right-2.5 xs:right-4 z-[1000] group">
      {showModal && (
        <Modal onClose={() => setShowModal(false)} toggle={toggle} />
      )}

      <audio ref={audioRef} loop>
        <source src={"/audio/space-intro-124261.mp3"} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <motion.button
        onClick={toggle}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
        className="w-10 h-10 xs:w-14 xs:h-14 text-foreground rounded-full flex items-center justify-center cursor-pointer z-[1000] p-2.5 xs:p-4 custom-bg"
        aria-label={"Sound control button"}
        name={"Sound control button"}
      >
        {isPlaying ? (
          <Volume2
            className="w-full h-full text-foreground group-hover:text-accent"
            strokeWidth={1.5}
          />
        ) : (
          <VolumeX
            className="w-full h-full text-foreground group-hover:text-accent"
            strokeWidth={1.5}
          />
        )}
      </motion.button>
    </div>
  );
};

export default Sound;