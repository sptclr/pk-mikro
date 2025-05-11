/* eslint-disable @next/next/no-img-element */

import { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  duration?: number;
  onClose: () => void;
}

const typeClasses = {
  success: "bg-anarya-toast-default",
  error: "bg-anarya-toast-default",
};

export default function Toast({
  message,
  type = "success",
  duration = 10000,
  onClose,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed bottom-5 left-5 flex items-center justify-between w-[calc(100%_-_2.5rem)]  px-4 py-3 text-white rounded-md shadow-lg ${typeClasses[type]}`}
    >
      <div className="flex items-center justify-center w-full gap-4">
        <img src={`/icons/icon-toast-${type}.svg`} alt={`icon-${type}`} />
        <span>{message}</span>
      </div>
      <button className="ml-4 text-white focus:outline-none" onClick={onClose}>
        ✕
      </button>
    </div>
  );
}
