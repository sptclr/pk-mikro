/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, ChangeEvent } from "react";
import Image from "next/image";

interface InputFileProps {
  label?: string;
  onChange?: (file: File | null) => void;
  error?: string;
  disabled?: boolean;
}

const InputFile: React.FC<InputFileProps> = ({
  label = "Foto",
  onChange,
  error,
  disabled = false,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    onChange?.(selectedFile);

    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview(null);
    onChange?.(null);
  };

  return (
    <div className="mb-4 flex gap-4 items-start">
      <label className="min-w-[174px] font-bold text-base">{label}</label>
      <div className="flex items-center gap-2">
        {preview ? (
          <div className="flex items-center gap-3">
            <img
              src={preview}
              alt="Preview"
              className="w-16 h-16 rounded-md object-cover"
            />
            <span className="text-gray-700">{file?.name}</span>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="text-red-500 hover:text-red-700"
              disabled={disabled}
            >
              x
            </button>
          </div>
        ) : (
          <label className="flex items-center gap-2 px-4 py-2 bg-anarya-bg-icon border rounded-md cursor-pointer hover:bg-gray-300">
            <Image
              src="/icons/icon-upload.png"
              alt="icon-upload"
              width={20}
              height={20}
            />
            <span>Unggah foto</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={disabled}
              className="hidden"
            />
          </label>
        )}
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default InputFile;
