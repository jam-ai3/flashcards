import Link from "next/link";
import { ReactNode } from "react";

type AccentLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export default function AccentLink({
  href,
  children,
  className = "",
}: AccentLinkProps) {
  return (
    <Link
      href={href}
      className={`${className} text-[var(--custom-accent)] hover:text-[var(--custom-accent-dark)] focus:text-[var(--custom-accent-dark)]`}
    >
      {children}
    </Link>
  );
}
