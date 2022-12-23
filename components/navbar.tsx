import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useRef, useState } from "react";
import { JourneyContext } from "../contexts/journeyContext";
import useClickOutside from "../hooks/useClickOutside";
import { clearLocalStorage } from "../hooks/useLocalStorage";
import styles from "../styles/Navbar.module.css";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const navRef = useRef(null);
  useClickOutside(navRef, () => setDrawerOpen(false));
  const router = useRouter();
  const { pageList } = useContext(JourneyContext);

  function handleRestart() {
    clearLocalStorage();
    router.push(pageList[0]);
  }

  return (
    <nav
      className={`bg-gradient-to-r from-[#3A104E] via-[#3A104E] to-[#490F65] shadow-md`}
      ref={navRef}
    >
      <div className="container mx-auto flex justify-between p-4">
        <div
          className="flex h-[30px] w-[30px] items-center justify-center rounded-lg text-white hover:bg-[#6B1F8E]"
          onClick={() => setDrawerOpen(!drawerOpen)}
        >
          <div className="space-y-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
        </div>
        <Link href="/">
          <div className="flex items-center gap-1 hover:brightness-125">
            <Image
              src="/img/logo-sm.png"
              alt="Logo"
              priority
              width={32}
              height={32}
              className="object-contain "
            />
            <h3 className="text-3xl font-bold text-[#F6DB49]">?</h3>
          </div>
        </Link>
      </div>
      <div
        className={`${styles.drawer} ${
          drawerOpen ? styles.drawerOpen : styles.drawerClose
        } fixed z-40 flex h-screen w-1/2 flex-col justify-between overflow-y-auto bg-gradient-to-r from-[#3A104E] to-[#3A104E] px-4`}
      >
        <ul className="flex flex-col">
          <li className="border-b-2 border-dashed border-[#6B1F8E] py-4 text-lg font-semibold text-white">
            <Link href="/" className="rounded-lg p-2 hover:bg-[#6B1F8E]">
              Home
            </Link>
          </li>
          <li className="border-b-2 border-dashed border-[#6B1F8E] py-4 text-lg font-semibold text-white">
            <button
              onClick={handleRestart}
              className="rounded-lg p-2 hover:bg-[#6B1F8E]"
            >
              Start Over
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
