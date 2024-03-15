import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const openHtmlContentInNewTab = (content: string) => {
  const newWindow = window.open("", "_blank");
  if (newWindow) {
    newWindow.document.write(content);
  } else {
    console.error("Failed to open new tab");
  }
};
