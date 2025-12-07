"use client";

import { useState } from "react";
import { Upload } from "lucide-react";

interface ImageUploadProps {
  label: string;
  value: File | null;
  onChange: (file: File | null) => void;
  required?: boolean;
}

export function ImageUpload({
  label,
  value,
  onChange,
  required = false,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      onChange(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      onChange(file);
    }
  };

  // Generate preview URL
  const previewUrl = value ? URL.createObjectURL(value) : null;

  return (
    <div className="space-y-3">
      {/* Label */}
      <label className="block text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive">*</span>}
      </label>

      {/* Upload area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition cursor-pointer ${
          isDragging
            ? "border-primary bg-primary/10"
            : "border-border hover:border-primary/50 bg-muted/10"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          id={`file-input-${label}`}
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
          required={required}
        />

        <label
          htmlFor={`file-input-${label}`}
          className="cursor-pointer flex flex-col items-center gap-2"
        >
          <Upload className="w-8 h-8 text-muted-foreground" />
          <p className="text-sm font-medium">Klik atau drag gambar ke sini</p>
          <p className="text-xs text-muted-foreground">
            PNG, JPG, JPEG sampai 10MB
          </p>
        </label>
      </div>

      {/* Preview */}
      {previewUrl && (
        <div className="mt-2">
          <p className="text-xs text-muted-foreground mb-1">Preview:</p>
          <div className="w-32 h-32 rounded-lg overflow-hidden border bg-muted">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Clear button */}
          <button
            type="button"
            onClick={() => onChange(null)}
            className="mt-2 text-xs text-red-600 hover:underline"
          >
            Hapus gambar
          </button>
        </div>
      )}
    </div>
  );
}
