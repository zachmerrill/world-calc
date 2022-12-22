import { useState, useEffect } from "react";
const isClient = typeof window !== "undefined";

export function clearLocalStorage() {
  if (!isClient) return;
  localStorage.clear();
}

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (!isClient) return initialValue;

    // try to retrieve value
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (e) {
      return initialValue;
    }
  });

  useEffect(() => {
    if (!isClient) return;
    // try to set value
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (e) {}
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
