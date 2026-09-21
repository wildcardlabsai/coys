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

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card-bg md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="flex h-16 items-stretch">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-1 flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition-colors focus-ring ${
                isActive
                  ? "text-navy"
                  : "text-muted hover:text-navy/70"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon
                className="h-5 w-5"
                fill={isActive ? "currentColor" : "none"}
                strokeWidth={isActive ? 1.5 : 2}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
