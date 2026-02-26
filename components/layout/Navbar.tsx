"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    {
      label: "Products",
      href: "/products",
      children: [
        { label: "All Products", href: "/products" },
        {
          label: "Precision Scales",
          href: "/products?category=Precision%20%26%20Pocket%20Mini%20Scales",
        },
        {
          label: "Kitchen Scales",
          href: "/products?category=Kitchen%20%26%20Compact%20Tabletop%20Scales",
        },
        {
          label: "Luggage Scales",
          href: "/products?category=Portable%20%26%20Luggage%20Scales",
        },
        {
          label: "Industrial & Crane Scales",
          href: "/products?category=Heavy-Duty%20Hanging%20%26%20Crane%20Scales",
        },
        {
          label: "Health & Baby",
          href: "/products?category=Personal%20Health%20%26%20Bathroom%20Scales",
        },
      ],
    },
    { label: "Services", href: "/contact" },
    { label: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // BUG FIX: Only pathname in dep array to avoid infinite loop.
  // Previously isOpen & activeDropdown were listed, causing setIsOpen → re-render → effect → setIsOpen loop.
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = () => setActiveDropdown(null);
    if (activeDropdown) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [activeDropdown]);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((v) => !v);

  const toggleDropdown = (label: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveDropdown((prev) => (prev === label ? null : label));
  };

  const isActivePath = (href: string) => {
    if (href === "/") return pathname === "/";
    // Strip query string — pathname never contains query params
    const hrefPath = href.split("?")[0];
    return pathname.startsWith(hrefPath);
  };

  return (
    <div>
      {/* Top contact bar */}
      <div
        className="hidden xl:block py-2 border-b border-white/10"
        style={{ background: "#1A2433" }}
      >
        <div className="container-fluid">
          <div
            className="flex items-center justify-between text-sm"
            style={{ color: "#AECAE9" }}
          >
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone size={13} />
                <span>+977-56-878965</span>
              </div>
              <span className="text-white/20">•</span>
              <span>Open all days except Monday · 10:00 AM – 6:00 PM</span>
            </div>
            <a
              href="https://wa.me/9779765662427"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm transition-colors hover:text-white"
              style={{ color: "#DCA963" }}
            >
              <span>Fast response on WhatsApp ↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled
            ? "backdrop-blur-md shadow-sm border-b border-border-primary"
            : "",
        )}
        style={{
          background: isScrolled ? "rgba(255,255,255,0.97)" : "#FFFFFF",
        }}
      >
        <div className="container-fluid">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group"
              onClick={() => setIsOpen(false)}
            >
              <Image
                src="/logo.png"
                alt="GSTradeLink Logo"
                width={200}
                height={56}
                className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                priority
              />
              <div className="hidden sm:block">
                <div
                  className="font-bold text-xl transition-colors"
                  style={{ color: "#1A2433" }}
                >
                  GSTradeLink
                </div>
                <div
                  className="text-[10px] uppercase tracking-widest font-semibold"
                  style={{ color: "#8798AD" }}
                >
                  Bharatpur · Chitwan
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <div key={item.label} className="relative">
                  {item.children ? (
                    <div className="relative">
                      <button
                        onClick={(e) => toggleDropdown(item.label, e)}
                        className={cn(
                          "flex items-center gap-1.5 px-2 py-2 text-sm font-semibold transition-colors",
                          isActivePath(item.href)
                            ? "text-primary-600"
                            : "text-foreground-secondary hover:text-primary-600",
                        )}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          size={16}
                          className={cn(
                            "transition-transform duration-200",
                            activeDropdown === item.label && "rotate-180",
                          )}
                        />
                      </button>

                      <AnimatePresence>
                        {activeDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-border-primary p-2 z-50 overflow-hidden"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={cn(
                                  "block px-4 py-2 rounded-md text-sm font-medium transition-colors",
                                  isActivePath(child.href)
                                    ? "text-primary-600 bg-primary-50"
                                    : "text-foreground-secondary hover:text-primary-600 hover:bg-primary-50",
                                )}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "px-2 py-2 text-sm font-semibold transition-colors",
                        isActivePath(item.href)
                          ? "text-primary-600"
                          : "text-foreground-secondary hover:text-primary-600",
                      )}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              <div className="ml-4 pl-8 border-l border-border-primary flex items-center">
                <a
                  href="https://wa.me/9779765662427"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-bold transition-all whitespace-nowrap hover:-translate-y-0.5"
                  style={{
                    background: "#3E5E85",
                    color: "#ffffff",
                    borderRadius: "9999px",
                    boxShadow: "0 4px 14px rgba(62,94,133,0.35)",
                    textDecoration: "none",
                  }}
                >
                  Get Quote
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-lg text-foreground-secondary hover:text-foreground-primary hover:bg-background-secondary transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <motion.div
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-primary-900/50 backdrop-blur-sm z-40 lg:hidden"
                onClick={() => setIsOpen(false)}
              />

              <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed top-0 right-0 h-full w-full max-w-sm z-50 lg:hidden shadow-2xl"
                style={{ background: "#FFFFFF" }}
              >
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div
                    className="flex items-center justify-between p-6"
                    style={{ background: "#1A2433" }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1.5 shrink-0">
                        <Image
                          src="/logo.png"
                          alt="GSTradeLink Logo"
                          width={60}
                          height={60}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-white text-lg leading-tight">
                          GSTradeLink
                        </div>
                        <div
                          className="text-[10px] uppercase tracking-wider font-semibold"
                          style={{ color: "#8798AD" }}
                        >
                          Bharatpur · Chitwan
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Contact Info */}
                  <div
                    className="px-6 py-4 border-b border-border-primary"
                    style={{ background: "#EEF4FB" }}
                  >
                    <div className="space-y-2 text-sm">
                      <div
                        className="flex items-center gap-2"
                        style={{ color: "#5C6B7B" }}
                      >
                        <Phone size={14} style={{ color: "#3E5E85" }} />
                        <span>+977-56-878965</span>
                      </div>
                      <div
                        className="flex items-center gap-2"
                        style={{ color: "#5C6B7B" }}
                      >
                        <svg
                          className="w-3.5 h-3.5 shrink-0"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          style={{ color: "#3E5E85" }}
                        >
                          <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />
                        </svg>
                        <span>info@gstradelink.com.np</span>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Navigation Items */}
                  <div className="flex-1 overflow-y-auto py-6">
                    <nav className="px-6 space-y-2">
                      {navItems.map((item, index) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.08 }}
                        >
                          {item.children ? (
                            <div className="space-y-2">
                              <button
                                onClick={(e) => toggleDropdown(item.label, e)}
                                className={cn(
                                  "flex items-center justify-between w-full px-4 py-3 rounded-lg text-left transition-colors",
                                  isActivePath(item.href)
                                    ? "text-primary-600 bg-primary-50"
                                    : "text-foreground-primary hover:bg-background-tertiary",
                                )}
                              >
                                <span className="font-medium">
                                  {item.label}
                                </span>
                                <ChevronDown
                                  size={16}
                                  className={cn(
                                    "transition-transform duration-200",
                                    activeDropdown === item.label &&
                                      "rotate-180",
                                  )}
                                />
                              </button>

                              <AnimatePresence>
                                {activeDropdown === item.label && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="ml-4 space-y-1 overflow-hidden"
                                  >
                                    {item.children.map((child) => (
                                      <Link
                                        key={child.href}
                                        href={child.href}
                                        className={cn(
                                          "block px-4 py-2 rounded-lg text-sm transition-colors",
                                          isActivePath(child.href)
                                            ? "text-primary-600 bg-primary-50"
                                            : "text-foreground-secondary hover:text-foreground-primary hover:bg-background-tertiary",
                                        )}
                                        onClick={() => setIsOpen(false)}
                                      >
                                        {child.label}
                                      </Link>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ) : (
                            <Link
                              href={item.href}
                              className={cn(
                                "flex items-center px-4 py-3 rounded-lg font-medium transition-colors",
                                isActivePath(item.href)
                                  ? "text-primary-600 bg-primary-50"
                                  : "text-foreground-primary hover:bg-background-tertiary",
                              )}
                              onClick={() => setIsOpen(false)}
                            >
                              {item.label}
                            </Link>
                          )}
                        </motion.div>
                      ))}
                    </nav>
                  </div>

                  {/* Mobile CTA */}
                  <div className="p-6 border-t border-border-primary space-y-2.5">
                    <a
                      href="https://wa.me/9779765662427"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold transition-colors hover:brightness-105"
                      style={{
                        background: "#25D366",
                        color: "#ffffff",
                        borderRadius: "6px",
                        textDecoration: "none",
                      }}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                        <path
                          d="M11.999 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.998-1.309A9.942 9.942 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        />
                      </svg>
                      Chat on WhatsApp
                    </a>
                    <a
                      href="tel:+9779765662427"
                      onClick={() => setIsOpen(false)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold transition-colors"
                      style={{
                        border: "1.5px solid #CBDCEB",
                        background: "#FFFFFF",
                        color: "#1A2433",
                        borderRadius: "6px",
                        textDecoration: "none",
                      }}
                    >
                      <Phone size={16} style={{ color: "#3E5E85" }} /> Call Us
                    </a>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};
