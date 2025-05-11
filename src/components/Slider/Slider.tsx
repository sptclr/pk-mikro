"use client"
import { useEffect, useState } from "react";

interface SliderProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position?: "left" | "right";
  width?: string;
  overlayClosable?: boolean;
}

export default function Slider({
  isOpen,
  onClose,
  children,
  position = "right",
  width = "w-80",
  overlayClosable = true,
}: SliderProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      // Step 1: show overlay first
      const overlayTimeout = setTimeout(() => setShowOverlay(true), 10); // slight delay to allow mount

      // Step 2: then show slider
      const sliderTimeout = setTimeout(() => setShowSlider(true), 300);

      return () => {
        clearTimeout(overlayTimeout);
        clearTimeout(sliderTimeout);
      };
    } else {
      // Step 1: hide slider first
      setShowSlider(false);

      // Step 2: hide overlay after delay
      const timeout = setTimeout(() => {
        setShowOverlay(false);
        setIsMounted(false);
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!isMounted) return null;

  const sidePosition = position === "left" ? "left-0" : "right-0";
  const enterTranslate =
    position === "left" ? "-translate-x-full" : "translate-x-full";

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ${
          showOverlay ? "opacity-100" : "opacity-0"
        }`}
        onClick={overlayClosable ? onClose : undefined}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 ${sidePosition} h-full ${width} bg-white shadow-lg transform transition-transform duration-300 ${
          showSlider ? "translate-x-0" : enterTranslate
        }`}
      >
        <div className="p-4 flex flex-col h-full">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-black"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}
