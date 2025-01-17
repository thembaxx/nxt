import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatFileSize(size: number) {
  const BYTES_PER_GB = 1073741824;
  const BYTES_PER_MB = 1048576;
  const BYTES_PER_KB = 1024;

  let GB = 0;
  let isGB = false;

  let MB = 0;
  let isMB = false;

  let KB = 0;
  let isKB = false;

  const bytes = size;

  if (bytes >= BYTES_PER_GB) {
    isGB = true;
    GB = bytes / BYTES_PER_GB;
    GB = Number(GB.toFixed(1));
  } else {
    if (bytes >= BYTES_PER_MB) {
      isMB = true;
      MB = bytes / BYTES_PER_MB;
      MB = Number(MB.toFixed(1));
    } else {
      if (bytes >= BYTES_PER_KB) {
        isKB = true;
        KB = bytes / BYTES_PER_KB;
        KB = Number(KB.toFixed(1));
      } else {
        isKB = false;
      }
    }
  }

  if (isGB) {
    return GB + " GB";
  } else if (isMB) {
    return MB + " MB";
  } else if (isKB) {
    return KB + " KB";
  } else {
    return bytes + " bytes";
  }
}

export function getInitials(name: string): string {
  const nameParts = name.split(" ");
  const initials = nameParts
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
  return initials.slice(0, 2);
}
