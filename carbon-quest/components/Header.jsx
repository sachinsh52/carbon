import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="px-[12rem] py-3 border-b sticky top-0 bg-white z-20">
      <div className="flex items-center justify-between">
        <Link href="" className="flex items-center gap-1">
          <Image src='/logo1.svg' height={70} width={70}/>
          <Image src='/logo2.svg' height={120} width={120}/>
        </Link>
        <div className="flex items-center gap-4 font-mono">
          <Link href="/login" className="border px-5 py-2 rounded-3xl hover:bg-black hover:text-white transition">
            Log In
          </Link>
          <Link
            href="/signup"
            className="bg-grad px-5 py-2 rounded-3xl font-medium text-white hover:opacity-80 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
