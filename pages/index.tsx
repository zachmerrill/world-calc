import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
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
          <h1 className="mt-0 mb-2 text-6xl font-extrabold uppercase leading-normal text-cyan-50">
            How
            <span className="block bg-gradient-to-r from-cyan-600 via-emerald-400 to-cyan-50 bg-clip-text text-9xl text-transparent">
              big
            </span>{" "}
            is your world?
          </h1>
        </div>
        <div className="flex justify-center">
          <Link
            href="/start"
            className="flex w-32 justify-center rounded-full bg-gradient-to-r from-emerald-600 via-emerald-600 to-emerald-400 p-2 font-bold text-cyan-50"
          >
            Start
          </Link>
        </div>
        <div className="pointer-events-none absolute bottom-[-55%] h-full w-full">
          <Image src="/img/earth/earth-up.svg" alt="Earth" fill />
        </div>
      </main>
      <footer className="fixed bottom-0 flex w-full justify-end pr-8 text-xs font-semibold text-purple-800">
        <Link href="https://github.com/zachmerrill">Made with 💜 by Zach</Link>
      </footer>
    </>
  );
}
