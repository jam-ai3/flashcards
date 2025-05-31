import Image from "next/image";
import Link from "next/link";
// import HeaderLink from "./header-link";

const LOGO_SIZE = 64;

export default function AuthHeader() {
  return (
    <header className="top-0 left-0 absolute px-6 py-4 w-full">
      <nav className="flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo-no-bg.png"
            alt="logo"
            width={LOGO_SIZE}
            height={LOGO_SIZE}
          />
          <span className="font-semibold text-xl">jamAI</span>
        </Link>
        <ul className="flex gap-6 text-muted-foreground text-sm">
          {/* <HeaderLink href="/about" title="About" /> */}
          {/* <HeaderLink href="/contact" title="Contact" /> */}
        </ul>
      </nav>
    </header>
  );
}
