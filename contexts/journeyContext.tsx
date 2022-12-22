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
  nextPage: () => void;
}>({
  nextPage: () => {},
});

export default function JourneyProvider({ children }: { children: any }) {
  const router = useRouter();
  const [nextRoute, setNextRoute] = useState<string>(
    () => JOURNEY[JOURNEY.indexOf(router.route) + 1]
  );

  useEffect(() => {
    const newIndex = JOURNEY.indexOf(router.route) + 1;
    setNextRoute(JOURNEY[newIndex]);
    router.prefetch(JOURNEY[newIndex]);
  }, [router, router.route]);

  function nextPage() {
    router.push(nextRoute);
  }
  return (
    <JourneyContext.Provider value={{ nextPage }}>
      {children}
    </JourneyContext.Provider>
  );
}
