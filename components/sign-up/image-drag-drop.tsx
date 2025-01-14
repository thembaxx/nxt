"use client";

import clsx from "clsx";
import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type Props = {
  value: string | undefined;
  onChange: (value: string) => void;
};

function ImageDragDrop({ value, onChange }: Props) {
  const handleImageChange = useCallback(
    async (files: File[] | null) => {
      if (!files) return;

      const file = files[0];
      if (file) {
        //   setImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          onChange(result);
        };
        reader.readAsDataURL(file);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (e) => handleImageChange(e),
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={clsx(
          "flex items-center justify-center py-8 border border-dotted rounded-md relative overflow-hidden",
          isDragActive ? "border-blue-500" : "border-border"
        )}
      >
        <input type="file" accept="image/*" {...getInputProps()} />
        <div className="flex flex-col items-center justify-center text-center space-y-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            className={clsx(isDragActive ? "fill-blue-400" : "fill-slate-200")}
            viewBox="0 0 256 256"
          >
            <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM156,88a12,12,0,1,1-12,12A12,12,0,0,1,156,88Zm60,112H40V160.69l46.34-46.35a8,8,0,0,1,11.32,0h0L165,181.66a8,8,0,0,0,11.32-11.32l-17.66-17.65L173,138.34a8,8,0,0,1,11.31,0L216,170.07V200Z"></path>
          </svg>
          <p
            className={clsx(
              "font-semibold text-sm",
              isDragActive ? "text-blue-500" : "text-[#fafafa]"
            )}
          >
            {isDragActive ? "Drop file here" : "Drag and Drop image here"}
          </p>
          <p className="text-neutral-400 text-xs">{`Max size 2MB (jpg, gif, png)`}</p>
        </div>
        {value && (
          <div className="h-full w-full absolute top-0 left-0 overflow-hidden z-10">
            <Image
              src={value}
              alt="Profile preview"
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}
      </div>
    </div>
  );
}

// async function convertImageToBase64(file: File): Promise<string> {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onloadend = () => resolve(reader.result as string);
//     reader.onerror = reject;
//     reader.readAsDataURL(file);
//   });
// }

export default ImageDragDrop;
