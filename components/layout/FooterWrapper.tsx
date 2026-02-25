"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Footer } from "./Footer";

/**
 * Thin client wrapper: reads the current pathname to conditionally
 * hide the footer on product pages on mobile (the bottom sticky bar handles that).
 * Keeps Footer itself as a Server Component.
 */
export const FooterWrapper = () => {
  const pathname = usePathname();
  return (
    <Footer
      className={cn(pathname.startsWith("/products") && "hidden md:block")}
    />
  );
};
