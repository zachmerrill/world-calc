import Head from "next/head";
import Link from "next/link";

export default function Acknowledgements() {
  return (
    <>
      <Head>
        <title>Acknowledgements</title>
      </Head>
      <main>
        <ul>
          <li>Built from an idea by my brother.</li>
          <li>
            <Link href="https://dribbble.com/shots/18049468-Happy-Mother-Earth-Day">
              Happy Mother Earth Day by Nadiia Matulla.
            </Link>
          </li>
        </ul>
      </main>
    </>
  );
}
