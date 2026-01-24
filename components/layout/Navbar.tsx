"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

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

  // Navigation items
  const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    {
      label: "Products",
      href: "/products",
      children: [
        { label: "All Products", href: "/products" },
        { label: "Retail Scales", href: "/products?category=Retail Scale" },
        {
          label: "Industrial Scales",
          href: "/products?category=Industrial Scale",
        },
        { label: "Spare Parts", href: "/products?category=Spare Part" },
        { label: "Services", href: "/products?category=Service" },
      ],
    },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };

    if (activeDropdown) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [activeDropdown]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleDropdown = (label: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  // Check if current path matches nav item
  const isActivePath = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Top contact bar - hidden on mobile */}
      <div className="hidden lg:block bg-background-secondary py-2 border-b border-border-primary">
        <div className="container-fluid">
          <div className="flex items-center justify-between text-sm text-foreground-tertiary">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone size={14} />
                <span>+977-56-XXXXXX</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />
                </svg>
                <span>info@gstradelink.com.np</span>
              </div>
            </div>
            <div className="text-xs">
              Mon-Fri: 10:00-18:00 | Sat: 10:00-17:00
            </div>
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
            <Link
              href="/"
              className="flex items-center space-x-3 group"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center group-hover:bg-primary-700 transition-colors">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75C6.583 21.58 5 22.328 5 23.25v.75c0 .414.336.75.75.75h12.5c.414 0 .75-.336.75-.75v-.75c0-.922-1.583-1.67-2.815-2.25C15.882 20.515 14.472 20.25 13 20.25H12zM12 3L8.25 8.25h7.5L12 3z"
                  />
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

              {/* CTA Button */}
              <div className="ml-6 pl-6 border-l border-border-primary">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin">Admin Access</Link>
                </Button>
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
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
                onClick={() => setIsOpen(false)}
              />

              {/* Mobile Menu */}
              <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed top-0 right-0 h-full w-full max-w-sm bg-background-card z-50 lg:hidden shadow-2xl"
              >
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between p-6 border-b border-border-primary">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75C6.583 21.58 5 22.328 5 23.25v.75c0 .414.336.75.75.75h12.5c.414 0 .75-.336.75-.75v-.75c0-.922-1.583-1.67-2.815-2.25C15.882 20.515 14.472 20.25 13 20.25H12zM12 3L8.25 8.25h7.5L12 3z"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="font-bold text-foreground-primary">
                          GSTradeLink
                        </div>
                        <div className="text-xs text-foreground-tertiary uppercase tracking-wide">
                          Bharatpur
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 rounded-lg text-foreground-secondary hover:text-foreground-primary hover:bg-background-secondary transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Contact Info */}
                  <div className="px-6 py-4 bg-background-secondary border-b border-border-primary">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-foreground-tertiary">
                        <Phone size={14} />
                        <span>+977-56-XXXXXX</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground-tertiary">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
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
                          transition={{ delay: index * 0.1 }}
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
                  <div className="p-6 border-t border-border-primary">
                    <Button variant="outline" fullWidth asChild>
                      <Link href="/admin" onClick={() => setIsOpen(false)}>
                        Admin Access
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};
