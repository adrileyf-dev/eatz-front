export function resizeImage(
  file: File,
  maxWidth = 600,
  maxHeight = 600,
): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) return reject("Canvas not supported");

      let { width, height } = img;

      // Mantém proporção
      if (width > maxWidth) {
        height = (maxWidth * height) / width;
        width = maxWidth;
      }

      if (height > maxHeight) {
        width = (maxHeight * width) / height;
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) return reject("Blob error");
          const newFile = new File([blob], file.name, { type: file.type });
          resolve(newFile);
        },
        file.type,
        0.9, // qualidade JPEG
      );
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
