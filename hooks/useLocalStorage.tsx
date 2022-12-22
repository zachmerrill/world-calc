import { useState, useEffect } from "react";

export default function useLocalStorage(
  key: string,
  defaultValue: string = ""
): [string, React.Dispatch<React.SetStateAction<string>>] {
  const isClient = typeof window !== "undefined";

  const [value, setValue] = useState<string>(() => {
    // getting stored value
    if (isClient) {
      const saved = localStorage.getItem(key) || "";
      const initial = JSON.parse(saved || "");
      return initial || defaultValue;
    }
    return defaultValue;
  });

  useEffect(() => {
    // store value in key
    isClient && localStorage.setItem(key, JSON.stringify(value));
  }, [key, value, isClient]);

  return [value, setValue];
}
