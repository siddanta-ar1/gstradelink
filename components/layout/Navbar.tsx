"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
        { label: "Retail Scales", href: "/products?category=Retail Scale" },
        { label: "Industrial Scales", href: "/products?category=Industrial Scale" },
        { label: "Spare Parts", href: "/products?category=Spare Part" },
        { label: "Services", href: "/products?category=Service" },
      ],
    },
    { label: "Services", href: "/products?category=Service" },
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
      <div className="hidden xl:block bg-primary-700 py-2 border-b border-white/10">
        <div className="container-fluid">
          <div className="flex items-center justify-between text-sm text-primary-100">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone size={14} />
                <span>+977-56-878965</span>
              </div>
              <span className="text-white/30">•</span>
              <span>Mon–Sat: 10:00 AM – 6:00 PM</span>
            </div>
            <a href="https://wa.me/9779765662427" target="_blank" rel="noopener noreferrer" className="text-xs text-primary-200 hover:text-white transition-colors">
              Fast response on WhatsApp
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
            ? "bg-background-primary/95 backdrop-blur-md shadow-sm border-b border-border-primary"
            : "bg-background-primary",
        )}
      >
        <div className="container-fluid">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group" onClick={() => setIsOpen(false)}>
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center group-hover:bg-primary-700 transition-colors shadow-sm">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75C6.583 21.58 5 22.328 5 23.25v.75c0 .414.336.75.75.75h12.5c.414 0 .75-.336.75-.75v-.75c0-.922-1.583-1.67-2.815-2.25C15.882 20.515 14.472 20.25 13 20.25H12zM12 3L8.25 8.25h7.5L12 3z" />
                </svg>
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-xl text-foreground-primary group-hover:text-primary-600 transition-colors">
                  GSTradeLink
                </div>
                <div className="text-xs text-foreground-tertiary uppercase tracking-wide">
                  Bharatpur • Chitwan
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <div key={item.label} className="relative">
                  {item.children ? (
                    <div className="relative">
                      <button
                        onClick={(e) => toggleDropdown(item.label, e)}
                        className={cn(
                          "flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                          isActivePath(item.href)
                            ? "text-primary-600 bg-primary-50"
                            : "text-foreground-secondary hover:text-foreground-primary hover:bg-background-secondary",
                        )}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          size={16}
                          className={cn("transition-transform duration-200", activeDropdown === item.label && "rotate-180")}
                        />
                      </button>

                      <AnimatePresence>
                        {activeDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-0 mt-2 w-56 bg-background-card rounded-xl shadow-lg border border-border-primary py-2 z-50"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={cn(
                                  "block px-4 py-2.5 text-sm transition-colors",
                                  isActivePath(child.href)
                                    ? "text-primary-600 bg-primary-50"
                                    : "text-foreground-secondary hover:text-foreground-primary hover:bg-background-secondary",
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
                        "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                        isActivePath(item.href)
                          ? "text-primary-600 bg-primary-50"
                          : "text-foreground-secondary hover:text-foreground-primary hover:bg-background-secondary",
                      )}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              <div className="ml-4 pl-4 border-l border-border-primary flex items-center">
                <a
                  href="https://wa.me/9779765662427"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold bg-primary-600 text-white hover:bg-primary-700 transition-colors"
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
              <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
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
                className="fixed top-0 right-0 h-full w-full max-w-sm bg-background-card z-50 lg:hidden shadow-2xl"
              >
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between p-6 bg-primary-600">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75C6.583 21.58 5 22.328 5 23.25v.75c0 .414.336.75.75.75h12.5c.414 0 .75-.336.75-.75v-.75c0-.922-1.583-1.67-2.815-2.25C15.882 20.515 14.472 20.25 13 20.25H12zM12 3L8.25 8.25h7.5L12 3z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-bold text-white">GSTradeLink</div>
                        <div className="text-xs text-primary-200 uppercase tracking-wide">Bharatpur</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Contact Info */}
                  <div className="px-6 py-4 bg-background-secondary border-b border-border-primary">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-foreground-tertiary">
                        <Phone size={14} className="text-primary-600" />
                        <span>+977-56-878965</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground-tertiary">
                        <svg className="w-3.5 h-3.5 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
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
                                    : "text-foreground-primary hover:bg-background-secondary",
                                )}
                              >
                                <span className="font-medium">{item.label}</span>
                                <ChevronDown
                                  size={16}
                                  className={cn("transition-transform duration-200", activeDropdown === item.label && "rotate-180")}
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
                                            : "text-foreground-secondary hover:text-foreground-primary hover:bg-background-secondary",
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
                                  : "text-foreground-primary hover:bg-background-secondary",
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
                  <div className="p-6 border-t border-border-primary space-y-2">
                    <a
                      href="https://wa.me/9779765662427"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold bg-[#25D366] text-white hover:brightness-110 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.999 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.998-1.309A9.942 9.942 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" fill-rule="evenodd" clip-rule="evenodd"/></svg>
                      Chat on WhatsApp
                    </a>
                    <a
                      href="tel:+9779765662427"
                      onClick={() => setIsOpen(false)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold border border-border-primary text-foreground-primary hover:bg-background-secondary transition-colors"
                    >
                      Call Us
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
