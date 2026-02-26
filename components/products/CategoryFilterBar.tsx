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
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const startX = useRef(0);
  const scrollStartLeft = useRef(0);

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
        inline: "nearest",
        block: "nearest",
      });
    }
  }, [selectedCategory]);

  /* ── arrow button scroll ───────────────────────────────────────── */
  const scrollBy = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "right" ? 220 : -220,
      behavior: "smooth",
    });
  };

  /* ── mouse drag-to-scroll ──────────────────────────────────────── */
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a")) return; // don't intercept link clicks
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollStartLeft.current = scrollRef.current?.scrollLeft ?? 0;
    if (scrollRef.current) scrollRef.current.style.cursor = "grabbing";
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const delta = (x - startX.current) * 1.25;
    if (Math.abs(delta) > 4) hasDragged.current = true;
    scrollRef.current.scrollLeft = scrollStartLeft.current - delta;
  };

  const onMouseUp = () => {
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = "";
  };

  /* ── prevent link navigation when the user was dragging ───────── */
  const onChipClick = (e: React.MouseEvent) => {
    if (hasDragged.current) {
      e.preventDefault();
      hasDragged.current = false;
    }
  };

  return (
    <div className="relative flex items-center gap-1.5 rounded-full border border-[#CBDCEB] bg-white/80 backdrop-blur-md px-2 py-1.5 shadow-sm">
      {/* ── Left arrow ─────────────────────────────────────────────── */}
      <button
        onClick={() => scrollBy("left")}
        aria-label="Scroll categories left"
        className="hidden sm:flex items-center justify-center shrink-0 transition-all duration-200"
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "9999px",
          opacity: canScrollLeft ? 1 : 0,
          pointerEvents: canScrollLeft ? "auto" : "none",
          background: "#FFFFFF",
          color: "#3E5E85",
          border: "1.5px solid #CBDCEB",
          boxShadow: canScrollLeft ? "0 2px 8px rgba(62,94,133,0.12)" : "none",
          cursor: "pointer",
          transform: canScrollLeft ? "scale(1)" : "scale(0.8)",
          flexShrink: 0,
        }}
      >
        <ChevronLeft size={14} strokeWidth={2.5} />
      </button>

      {/* ── Scroll container wrapper (clips the fade overlays) ────── */}
      <div className="relative flex-1 overflow-hidden py-0.5">
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-1 w-10 pointer-events-none z-10 transition-opacity duration-200"
          style={{
            background:
              "linear-gradient(to right, rgba(255,255,255,0.95) 0%, transparent 100%)",
            opacity: canScrollLeft ? 1 : 0,
          }}
        />

        {/* ── The actual scrollable chip row ───────────────────────── */}
        <div
          ref={scrollRef}
          className="flex flex-wrap sm:flex-nowrap overflow-x-auto hide-scrollbar gap-2.5 py-0.5 pr-1"
          style={{
            scrollSnapType: "x proximity",
            WebkitOverflowScrolling: "touch",
            cursor: "grab",
            userSelect: "none",
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {chips.map(({ category, label, href, isService }) => {
            const isActive = !isService && selectedCategory === category;

            if (isService) {
              return (
                <Link
                  key={category}
                  href={href}
                  onClick={onChipClick}
                  data-active="false"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-[0.72rem] font-semibold whitespace-nowrap transition-all duration-200 shrink-0 hover:-translate-y-0.5 hover:shadow-md"
                  style={{
                    borderRadius: "9999px",
                    background: "#FFF6E6",
                    color: "#B7782E",
                    border: "1.5px solid #E9C87A",
                    scrollSnapAlign: "start",
                    textDecoration: "none",
                    boxShadow: "0 2px 10px rgba(194,141,68,0.18)",
                  }}
                >
                  <Wrench size={11} strokeWidth={2.5} />
                  {label}
                </Link>
              );
            }

            return (
              <Link
                key={category}
                href={href}
                onClick={onChipClick}
                data-active={isActive ? "true" : "false"}
                className="inline-flex items-center justify-center px-4 py-2 text-[0.72rem] font-semibold whitespace-nowrap transition-all duration-200 shrink-0 hover:shadow-md"
                style={{
                  borderRadius: "9999px",
                  background: isActive ? "#3E5E85" : "#F8FAFC",
                  color: isActive ? "#FFFFFF" : "#4B5D73",
                  border: isActive
                    ? "1.5px solid #3E5E85"
                    : "1.5px solid #D4E1EE",
                  boxShadow: isActive
                    ? "0 6px 18px rgba(62,94,133,0.28)"
                    : "0 2px 8px rgba(26,36,51,0.06)",
                  transform: isActive ? "scale(1.04)" : "scale(1)",
                  scrollSnapAlign: "start",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLAnchorElement).style.background =
                      "#EEF4FB";
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "#3E5E85";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                      "#93B2D6";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                      "0 6px 16px rgba(62,94,133,0.18)";
                    (e.currentTarget as HTMLAnchorElement).style.transform =
                      "translateY(-1px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLAnchorElement).style.background =
                      "#F8FAFC";
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "#4B5D73";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                      "#D4E1EE";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                      "0 2px 8px rgba(26,36,51,0.06)";
                    (e.currentTarget as HTMLAnchorElement).style.transform =
                      "scale(1)";
                  }
                }}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-1 w-10 pointer-events-none z-10 transition-opacity duration-200"
          style={{
            background:
              "linear-gradient(to left, rgba(255,255,255,0.95) 0%, transparent 100%)",
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
          width: "30px",
          height: "30px",
          borderRadius: "9999px",
          opacity: canScrollRight ? 1 : 0,
          pointerEvents: canScrollRight ? "auto" : "none",
          background: "#FFFFFF",
          color: "#3E5E85",
          border: "1.5px solid #CBDCEB",
          boxShadow: canScrollRight ? "0 2px 8px rgba(62,94,133,0.12)" : "none",
          cursor: "pointer",
          transform: canScrollRight ? "scale(1)" : "scale(0.8)",
          flexShrink: 0,
        }}
      >
        <ChevronRight size={14} strokeWidth={2.5} />
      </button>
    </div>
  );
}

export default CategoryFilterBar;
