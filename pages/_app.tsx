import "../styles/globals.css";
import type { AppProps } from "next/app";
import JourneyProvider from "../contexts/journeyContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <JourneyProvider>
      <Component {...pageProps} />
    </JourneyProvider>
  );
}
