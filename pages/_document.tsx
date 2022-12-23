import { Html, Head, Main, NextScript } from "next/document";
import COLORS from "../constants/colors";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="theme-color" content={COLORS.purple} />
        <link rel="shortcut icon" href="/img/logo-xs.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
