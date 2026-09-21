"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, MapPin, Compass, User } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/matchday", label: "Matchday", icon: Calendar },
  { href: "/away-days", label: "Away Days", icon: MapPin },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/profile", label: "My COYS", icon: User },
] as const;

export function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-border bg-card-bg md:flex">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-border">
        <Link href="/" className="focus-ring">
          <span className="heading-display text-2xl text-navy tracking-wider">
            COYS
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus-ring ${
                    isActive
                      ? "bg-navy text-white"
                      : "text-muted hover:bg-navy/5 hover:text-navy"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-border px-4 py-3">
        <p className="text-xs text-muted-light">
          COYS Matchday Companion
        </p>
      </div>
    </aside>
  );
}
