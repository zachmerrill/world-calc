import React, { useEffect } from "react";

export default function useClickOutside(
  ref: React.RefObject<HTMLElement>,
  callback: any
) {
  function handleClick(e: MouseEvent) {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  }
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
}
