"use client";

import { formatFileSize } from "@/lib/utils";
import clsx from "clsx";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { UploadProgressEvent } from "@vercel/blob";

type Props = {
  uploadProgress: UploadProgressEvent | null;
  loading: boolean;
  value: File | undefined;
  onRemove: () => void;
  onChange: (value: File) => void;
};

function ImageDragDrop({
  uploadProgress,
  loading,
  value,
  onRemove,
  onChange,
}: Props) {
  const [image, setImage] = useState<string | null>();

  const handleImageChange = useCallback(
    async (files: File[] | null) => {
      if (!files) return;

      onChange(files[0]);
    },
    [onChange]
  );

  useEffect(() => {
    if (value) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(value);
    } else {
      setImage(null);
    }
  }, [value]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (e) => handleImageChange(e),
    disabled: loading,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={clsx(
          "flex items-center justify-center  py-8 max-h-36 border border-dotted rounded-md relative overflow-hidden cursor-pointer",
          isDragActive ? "border-blue-500" : "border-border",
          image && "border-none"
        )}
      >
        <input type="file" accept="image/*" {...getInputProps()} />
        {!image && (
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              className={clsx(
                isDragActive ? "fill-blue-400" : "fill-slate-200"
              )}
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
        )}
        {image && (
          <div className="space-x-4 grid grid-cols-2 min-h-32 h-full w-full">
            <div className="w-full h-full overflow-hidden relative rounded-lg">
              <Image
                src={image}
                alt="Profile preview"
                layout="fill"
                className="h-full w-full"
                objectFit="cover"
              />
            </div>
            {value && (
              <div className="text-xs font-mono text-neutral-400 space-y-1">
                <p className="line-clamp-2 text-[12.8px] font-semibold text-neutral-200">
                  {value.name}
                </p>
                <p>{new Date(value.lastModified).toLocaleDateString()}</p>
                <p>{formatFileSize(value.size)}</p>
                <div className="pt-4 space-y-4">
                  <Button
                    type="button"
                    title="Delete"
                    variant="secondary"
                    className="w-full font-sans text-neutral-200 leading-none justify-start rounded-lg text-[12.6px] pl-2"
                    size="sm"
                    disabled={loading}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onRemove();
                    }}
                  >
                    <Image
                      src="/icons/delete-02-stroke-rounded.svg"
                      alt="Delete icon"
                      width={16}
                      height={16}
                    />
                    <span>Remove image</span>
                  </Button>
                  {loading && uploadProgress && uploadProgress.percentage && (
                    <Progress
                      className="h-1"
                      value={uploadProgress.percentage}
                    />
                  )}
                </div>
              </div>
            )}
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

ImageDragDrop.displayName = "ImageDragDrop";

export default ImageDragDrop;
