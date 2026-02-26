"use client";

import { Home, Package, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const BottomNav = () => {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, href: "/", label: "Home", external: false },
    { icon: Package, href: "/products", label: "Catalogue", external: false },
    { icon: Phone, href: "tel:+9779765662427", label: "Call", external: true },
  ];

  return (
    <div
      className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[88%] max-w-xs bg-[#1A2433] px-6 py-3 flex items-center justify-between z-50"
      style={{
        borderRadius: "9999px",
        boxShadow:
          "0 20px 40px -12px rgba(26, 36, 51, 0.65), 0 4px 16px rgba(0,0,0,0.2)",
      }}
    >
      {navItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = item.external
          ? false
          : item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href) && item.href !== "/";

        const itemClassName = cn(
          "relative flex flex-col items-center justify-center gap-1 px-3 py-1 transition-all duration-300",
          isActive ? "text-white" : "text-white/40 hover:text-white/70",
        );

        const content = (
          <>
            {isActive && (
              <span
                className="absolute inset-0 flex items-center justify-center -z-10"
                aria-hidden="true"
              >
                <span
                  className="w-11 h-11 bg-[#3E5E85] shadow-lg"
                  style={{ borderRadius: "9999px" }}
                />
              </span>
            )}
            <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
            <span className="text-[9px] font-semibold leading-none tracking-wide">
              {item.label}
            </span>
          </>
        );

        if (item.external) {
          return (
            <a
              key={index}
              href={item.href}
              className={itemClassName}
              aria-label={item.label}
            >
              {content}
            </a>
          );
        }

        return (
          <Link
            key={index}
            href={item.href}
            className={itemClassName}
            aria-label={item.label}
          >
            {content}
          </Link>
        );
      })}
    </div>
  );
};
