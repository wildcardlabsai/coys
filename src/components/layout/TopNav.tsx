"use client";

import Link from "next/link";
import { Search, User } from "lucide-react";

export function TopNav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border bg-card-bg md:left-64">
      <div className="flex h-full items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 focus-ring">
          <span className="heading-display text-xl text-navy tracking-wider">
            COYS
          </span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-navy/5 hover:text-navy focus-ring"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
          <Link
            href="/profile"
            className="flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-navy/5 hover:text-navy focus-ring"
            aria-label="Profile"
          >
            <User className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
