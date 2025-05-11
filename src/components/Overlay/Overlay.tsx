"use client"
import { ReactNode, useEffect } from "react";

interface OverlayProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  closeOnOutsideClick?: boolean;
  backdropClassName?: string;
  containerClassName?: string;
}

export default function Overlay({
  isOpen,
  onClose,
  children,
  closeOnOutsideClick = true,
  backdropClassName = "bg-black/50 backdrop-blur-sm",
  containerClassName = "p-6 bg-white rounded-lg shadow-xl",
}: OverlayProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${backdropClassName}`}
      onClick={closeOnOutsideClick ? onClose : undefined}
    >
      <div
        className={`relative ${containerClassName}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
