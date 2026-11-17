import Link from "next/link";
import type { ReactNode } from "react";

interface AuthLinkProps {
  href: "/login" | "/register";
  children: ReactNode;
}

export function AuthLink({ href, children }: AuthLinkProps) {
  return (
    <Link
      href={href}
      className="rounded font-medium text-primary-strong underline-offset-4 focus-ring hover:underline"
    >
      {children}
    </Link>
  );
}
