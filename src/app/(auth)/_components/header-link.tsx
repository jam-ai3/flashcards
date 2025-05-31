"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type HeaderLinkProps = {
  href: string;
  title: string;
};

export default function HeaderLink({ href, title }: HeaderLinkProps) {
  const pathname = usePathname();

  return (
    <li>
      <Link href={href}>
        <span
          className={`${pathname === href ? "font-semibold text-primary" : ""}`}
        >
          {title}
        </span>
      </Link>
    </li>
  );
}
