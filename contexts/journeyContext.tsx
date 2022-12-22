import { useRouter } from "next/router";
import React, { createContext, useEffect, useState } from "react";

const JOURNEY = [
  "/journey",
  "/journey/family",
  "/journey/countries",
  "/journey/cities",
  "/journey/languages",
  "/results",
];

export const JourneyContext = createContext<{
  nextPage: () => void;
  prevPage: () => void;
  pageList: string[];
}>({
  nextPage: () => {},
  prevPage: () => {},
  pageList: JOURNEY,
});

export default function JourneyProvider({ children }: { children: any }) {
  const router = useRouter();
  const [nextRoute, setNextRoute] = useState<string>(
    () => JOURNEY[JOURNEY.indexOf(router.route) + 1]
  );

  useEffect(() => {
    let newIndex = JOURNEY.indexOf(router.route) + 1;
    if (newIndex >= JOURNEY.length) newIndex = JOURNEY.length - 1;
    setNextRoute(JOURNEY[newIndex]);
    router.prefetch(JOURNEY[newIndex]);
  }, [router, router.route]);

  /**
   * Move to the prefetched next page in the journey
   */
  function nextPage() {
    router.push(nextRoute);
  }

  /**
   * Move to the previous page in the journey. This page has not been prefetched.
   */
  function prevPage() {
    let newIndex = JOURNEY.indexOf(router.route) - 1;
    if (newIndex < 0) newIndex = 0;
    router.push(JOURNEY[newIndex]);
  }

  return (
    <JourneyContext.Provider value={{ nextPage, prevPage, pageList: JOURNEY }}>
      {children}
    </JourneyContext.Provider>
  );
}
