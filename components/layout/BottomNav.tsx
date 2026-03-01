"use client";

import { useState } from "react";
import { Home, Package, Phone, ChevronUp, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const BottomNav = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { icon: Home, href: "/", label: "Home", external: false },
    { icon: Package, href: "/products", label: "Catalogue", external: false },
    { icon: Phone, href: "tel:+9779765662427", label: "Call", external: true },
  ];

  return (
    <div
      className={cn(
        "fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-out",
        isCollapsed ? "bottom-3" : "bottom-5",
      )}
    >
      {/* Collapse/Expand Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-5 bg-[#1A2433] rounded-t-lg flex items-center justify-center text-white/60 hover:text-white transition-colors z-10"
        style={{
          boxShadow: "0 -4px 12px rgba(26, 36, 51, 0.3)",
        }}
        aria-label={isCollapsed ? "Expand navigation" : "Collapse navigation"}
      >
        {isCollapsed ? (
          <ChevronUp size={14} strokeWidth={2.5} />
        ) : (
          <ChevronDown size={14} strokeWidth={2.5} />
        )}
      </button>

      {/* Main Navigation Bar */}
      <div
        className={cn(
          "bg-[#1A2433] flex items-center justify-around transition-all duration-300 ease-out overflow-hidden",
          isCollapsed ? "w-[160px] px-3 py-2" : "w-[92vw] max-w-sm px-4 py-2.5",
        )}
        style={{
          borderRadius: "9999px",
          boxShadow:
            "0 20px 40px -12px rgba(26, 36, 51, 0.65), 0 4px 16px rgba(0,0,0,0.2)",
          minHeight: isCollapsed ? "44px" : "60px",
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
            "relative flex items-center justify-center transition-all duration-300",
            isCollapsed
              ? "px-2 py-1.5"
              : "flex-col gap-0.5 px-4 py-2 min-w-[56px]",
            isActive ? "text-white" : "text-white/50 hover:text-white/80",
          );

          const content = (
            <>
              {isActive && !isCollapsed && (
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
              {isActive && isCollapsed && (
                <span
                  className="absolute inset-0 flex items-center justify-center -z-10"
                  aria-hidden="true"
                >
                  <span
                    className="w-8 h-8 bg-[#3E5E85] shadow-lg"
                    style={{ borderRadius: "9999px" }}
                  />
                </span>
              )}
              <Icon
                size={isCollapsed ? 18 : 20}
                strokeWidth={isActive ? 2.5 : 1.8}
              />
              {!isCollapsed && (
                <span className="text-[10px] font-semibold leading-none tracking-wide whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </>
          );

          if (item.external) {
            return (
              <a
                key={index}
                href={item.href}
                className={itemClassName}
                aria-label={item.label}
                title={isCollapsed ? item.label : undefined}
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
              title={isCollapsed ? item.label : undefined}
            >
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
