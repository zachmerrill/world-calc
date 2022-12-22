import { useRouter } from "next/router";
import React, { createContext, useEffect, useState } from "react";

const JOURNEY = [
  "/journey",
  "/journey/family",
  "/journey/countries",
  "/journey/cities",
  "/journey/languages",
];

export const JourneyContext = createContext<{
  index: number;
  nextPage: any;
}>({
  index: 0,
  nextPage: () => {},
});

export default function JourneyProvider({ children }: { children: any }) {
  const router = useRouter();
  const [index, setIndex] = useState<number>(JOURNEY.indexOf(router.route));

  useEffect(() => {
    // prefetch next journey item
    if (index < JOURNEY.length) router.prefetch(JOURNEY[index + 1]);
  }, [index, router]);

  function nextPage() {
    const newIndex = index + 1;
    if (newIndex < JOURNEY.length) {
      setIndex(newIndex);
      router.push(`${JOURNEY[newIndex]}`);
    }
  }
  return (
    <JourneyContext.Provider value={{ index, nextPage }}>
      {children}
    </JourneyContext.Provider>
  );
}
