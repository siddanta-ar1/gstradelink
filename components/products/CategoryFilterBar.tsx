"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Wrench } from "lucide-react";

export interface CategoryChip {
  category: string;
  label: string;
  href: string;
  isService?: boolean;
}

interface CategoryFilterBarProps {
  chips: CategoryChip[];
  selectedCategory: string;
}

export function CategoryFilterBar({
  chips,
  selectedCategory,
}: CategoryFilterBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  /* ── scroll-state detector ─────────────────────────────────────── */
  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const threshold = 8;
    setCanScrollLeft(el.scrollLeft > threshold);
    setCanScrollRight(
      el.scrollLeft < el.scrollWidth - el.clientWidth - threshold,
    );
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });

    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      ro.disconnect();
    };
  }, [updateScrollState]);

  /* ── scroll to active chip on first render ─────────────────────── */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const activeEl = el.querySelector<HTMLElement>("[data-active='true']");
    if (!activeEl) return;
    const elRect = activeEl.getBoundingClientRect();
    const containerRect = el.getBoundingClientRect();
    if (
      elRect.left < containerRect.left ||
      elRect.right > containerRect.right
    ) {
      activeEl.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [selectedCategory]);

  /* ── arrow button scroll ───────────────────────────────────────── */
  const scrollBy = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "right" ? 200 : -200,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative flex items-center gap-2">
      {/* ── Left arrow ─────────────────────────────────────────────── */}
      <button
        onClick={() => scrollBy("left")}
        aria-label="Scroll categories left"
        className="hidden sm:flex items-center justify-center shrink-0 transition-all duration-200"
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          opacity: canScrollLeft ? 1 : 0,
          pointerEvents: canScrollLeft ? "auto" : "none",
          background: "#EEF4FB",
          color: "#3E5E85",
          border: "1px solid #CBDCEB",
          cursor: "pointer",
        }}
      >
        <ChevronLeft size={16} strokeWidth={2} />
      </button>

      {/* ── Scroll container ───────────────────────────────────────── */}
      <div className="relative flex-1 overflow-hidden">
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-8 pointer-events-none z-10 transition-opacity duration-200"
          style={{
            background:
              "linear-gradient(to right, rgba(255,255,255,1) 0%, transparent 100%)",
            opacity: canScrollLeft ? 1 : 0,
          }}
        />

        {/* ── The scrollable chip row ───────────────────────────────── */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto hide-scrollbar gap-2 py-1 px-1"
          style={{
            scrollSnapType: "x proximity",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {chips.map(({ category, label, href, isService }) => {
            const isActive = !isService && selectedCategory === category;

            if (isService) {
              return (
                <Link
                  key={category}
                  href={href}
                  data-active="false"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 hover:-translate-y-0.5"
                  style={{
                    borderRadius: "9999px",
                    background:
                      "linear-gradient(135deg, #FFF8E7 0%, #FFF3D6 100%)",
                    color: "#B7782E",
                    border: "1.5px solid #E9C87A",
                    scrollSnapAlign: "start",
                    textDecoration: "none",
                    boxShadow: "0 2px 8px rgba(194,141,68,0.15)",
                  }}
                >
                  <Wrench size={12} strokeWidth={2.5} />
                  {label}
                </Link>
              );
            }

            return (
              <Link
                key={category}
                href={href}
                data-active={isActive ? "true" : "false"}
                className="inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0"
                style={{
                  borderRadius: "9999px",
                  background: isActive ? "#3E5E85" : "#F8FAFC",
                  color: isActive ? "#FFFFFF" : "#5C6B7B",
                  border: isActive
                    ? "1.5px solid #3E5E85"
                    : "1.5px solid #E2E8F0",
                  boxShadow: isActive
                    ? "0 4px 12px rgba(62,94,133,0.25)"
                    : "none",
                  scrollSnapAlign: "start",
                  textDecoration: "none",
                }}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none z-10 transition-opacity duration-200"
          style={{
            background:
              "linear-gradient(to left, rgba(255,255,255,1) 0%, transparent 100%)",
            opacity: canScrollRight ? 1 : 0,
          }}
        />
      </div>

      {/* ── Right arrow ────────────────────────────────────────────── */}
      <button
        onClick={() => scrollBy("right")}
        aria-label="Scroll categories right"
        className="hidden sm:flex items-center justify-center shrink-0 transition-all duration-200"
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          opacity: canScrollRight ? 1 : 0,
          pointerEvents: canScrollRight ? "auto" : "none",
          background: "#EEF4FB",
          color: "#3E5E85",
          border: "1px solid #CBDCEB",
          cursor: "pointer",
        }}
      >
        <ChevronRight size={16} strokeWidth={2} />
      </button>
    </div>
  );
}

export default CategoryFilterBar;
