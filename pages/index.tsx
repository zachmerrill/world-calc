import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { JourneyContext } from "../contexts/journeyContext";
import { clearLocalStorage } from "../hooks/useLocalStorage";
import styles from "../styles/Home.module.css";

export default function Home() {
  const router = useRouter();
  const { pageList } = useContext(JourneyContext);

  function handleStart() {
    clearLocalStorage();
    router.push(pageList[0]);
  }

  return (
    <>
      <Head>
        <title>How Big is Your World?</title>
        <meta name="description" content="How Big Is Your World?" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} relative h-full overflow-hidden`}>
        <div className="p-4 text-center">
          <h1 className="mt-0 mb-2 text-6xl font-extrabold uppercase leading-tight text-cyan-50">
            How
            <span className="block bg-gradient-to-r from-cyan-600 via-emerald-400 to-cyan-50 bg-clip-text text-9xl text-transparent">
              big
            </span>{" "}
            is your world?
          </h1>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleStart}
            className="flex w-32 justify-center rounded-full bg-gradient-to-r from-emerald-600 via-emerald-600 to-emerald-400 p-2 font-bold text-cyan-50 hover:from-emerald-600 hover:to-emerald-400"
          >
            Begin
          </button>
        </div>
        <div className="pointer-events-none absolute bottom-[-55%] h-full w-full">
          <Image src="/img/earth/earth-up.svg" alt="Earth" fill priority />
        </div>
      </main>
      <footer className="fixed bottom-0 flex w-full justify-between px-8 align-bottom text-xs font-semibold text-purple-800">
        <Link href="https://github.com/zachmerrill">Made with 💜 by Zach</Link>
        <Link href="/acknowledgements">Acknowledgements</Link>
      </footer>
    </>
  );
}
