import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className={`bg-gradient-to-r from-[#3A104E] via-[#3A104E] to-[#490F65] shadow-md`}
    >
      <div className="container mx-auto flex  justify-between p-4">
        <div className="flex items-center lg:hidden">
          <div className="space-y-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#fff"
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
        <div className="hidden space-x-8 lg:flex">
          <a href="#">Menu 1</a>
          <a href="#">Menu 2</a>
          <a href="#">Menu 3</a>
          <a href="#">Menu 4</a>
        </div>
      </div>
    </nav>
  );
}
