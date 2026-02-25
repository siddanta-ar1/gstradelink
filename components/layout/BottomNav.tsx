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
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-80 bg-[#1a2f22] rounded-4xl px-6 py-3 flex items-center justify-between z-50 shadow-[0_20px_40px_-15px_rgba(26,47,34,0.6)]">
            {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = item.external
                    ? false
                    : item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href) && item.href !== "/";

                const itemClassName = cn(
                    "relative flex flex-col items-center justify-center gap-1 px-2 py-1 transition-all duration-300",
                    isActive ? "text-white" : "text-white/40 hover:text-white/70"
                );

                const content = (
                    <>
                        {isActive && (
                            <span className="absolute inset-0 bg-white rounded-2xl w-12 h-12 flex items-center justify-center -translate-y-0.5 -z-10 shadow-lg" aria-hidden="true" />
                        )}
                        <Icon
                            size={22}
                            strokeWidth={isActive ? 2.5 : 1.8}
                            className={cn(isActive && "text-[#1a2f22]")}
                        />
                        <span className={cn("text-[9px] font-medium leading-none", isActive && "text-[#1a2f22]")}>
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
