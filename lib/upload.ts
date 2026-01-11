export function base64ToBlob(base64: string): Blob {
  const [header, data] = base64.split(",");

  if (!header || !data) {
    throw new Error("Invalid base64 string");
  }

  const mimeMatch = header.match(/:(.*?);/);
  if (!mimeMatch) {
    throw new Error("Invalid base64 mime type");
  }

  const mime = mimeMatch[1];
  const binary = atob(data);
  const length = binary.length;
  const u8arr = new Uint8Array(length);

  for (let i = 0; i < length; i++) {
    u8arr[i] = binary.charCodeAt(i);
  }

  return new Blob([u8arr], { type: mime });
}

export function base64ToFile(base64: string, filename: string): File {
  const blob = base64ToBlob(base64);
  return new File([blob], filename, { type: blob.type });
}
