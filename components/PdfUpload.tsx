"use client";

import { useState } from "react";
import { FileUp, X } from "lucide-react";

interface PdfUploadProps {
  label: string;
  value: File | null;
  onChange: (file: File | null) => void;
  required?: boolean;
}

export function PdfUpload({
  label,
  onChange,
  required = false,
}: PdfUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

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
    if (file && file.type === "application/pdf") {
      onChange(file);
      setFileName(file.name);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      onChange(file);
      setFileName(file.name);
    }
  };

  const handleClear = () => {
    onChange(null);
    setFileName(null);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive">*</span>}
      </label>

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
          id={`pdf-input-${label}`}
          type="file"
          accept="application/pdf"
          onChange={handleFileInput}
          className="hidden"
          required={required}
        />

        <label
          htmlFor={`pdf-input-${label}`}
          className="cursor-pointer flex flex-col items-center gap-2"
        >
          <FileUp className="w-8 h-8 text-muted-foreground" />
          <p className="text-sm font-medium">Klik atau drag file PDF ke sini</p>
          <p className="text-xs text-muted-foreground">
            PDF only • Maksimal 10MB
          </p>
        </label>
      </div>

      {fileName && (
        <div className="mt-3 flex items-center justify-between bg-muted/50 p-3 rounded border">
          <div className="flex items-center gap-3">
            <FileUp className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm font-medium truncate max-w-[300px]">
                {fileName}
              </p>
              <p className="text-xs text-muted-foreground">PDF Document</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClear}
            className="text-muted-foreground hover:text-destructive transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}