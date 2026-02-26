"use client";

import { useEffect, useRef, CSSProperties, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** delay in ms before the animation starts once the element is in view */
  delay?: number;
  /** entrance direction */
  direction?: "up" | "down" | "left" | "right" | "none";
  /** how far (px) the element travels before settling */
  distance?: number;
  /** duration of the transition in ms */
  duration?: number;
  /** easing curve */
  easing?: string;
  /** only trigger once (default true) */
  once?: boolean;
  /** IntersectionObserver threshold */
  threshold?: number;
}

export function ScrollReveal({
  children,
  className,
  style,
  delay = 0,
  direction = "up",
  distance = 28,
  duration = 600,
  easing = "cubic-bezier(0.16, 1, 0.3, 1)",
  once = true,
  threshold = 0.1,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect user's reduced-motion preference
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) return; // Let CSS handle it naturally

    const translateMap: Record<NonNullable<ScrollRevealProps["direction"]>, string> = {
      up: `translateY(${distance}px)`,
      down: `translateY(-${distance}px)`,
      left: `translateX(${distance}px)`,
      right: `translateX(-${distance}px)`,
      none: "none",
    };

    // Set initial hidden state
    el.style.opacity = "0";
    if (direction !== "none") {
      el.style.transform = translateMap[direction];
    }
    el.style.transition = `opacity ${duration}ms ${easing} ${delay}ms, transform ${duration}ms ${easing} ${delay}ms`;
    el.style.willChange = "opacity, transform";

    const show = () => {
      el.style.opacity = "1";
      el.style.transform = "none";
      el.style.willChange = "auto";
    };

    const hide = () => {
      el.style.opacity = "0";
      if (direction !== "none") {
        el.style.transform = translateMap[direction];
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show();
            if (once) observer.unobserve(el);
          } else if (!once) {
            hide();
          }
        });
      },
      {
        threshold,
        rootMargin: "0px 0px -32px 0px",
      },
    );

    // Small defer so the hidden state is painted before we start observing
    const t = setTimeout(() => observer.observe(el), 60);

    return () => {
      clearTimeout(t);
      observer.disconnect();
    };
  }, [delay, direction, distance, duration, easing, once, threshold]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

/** Staggered wrapper — renders children each wrapped in ScrollReveal with
 *  increasing delays.
 */
interface StaggerProps {
  children: ReactNode[];
  className?: string;
  baseDelay?: number;
  step?: number;
  direction?: ScrollRevealProps["direction"];
  distance?: number;
  duration?: number;
}

export function StaggerReveal({
  children,
  className,
  baseDelay = 0,
  step = 80,
  direction = "up",
  distance = 24,
  duration = 550,
}: StaggerProps) {
  return (
    <div className={className}>
      {(Array.isArray(children) ? children : [children]).map((child, i) => (
        <ScrollReveal
          key={i}
          delay={baseDelay + i * step}
          direction={direction}
          distance={distance}
          duration={duration}
        >
          {child}
        </ScrollReveal>
      ))}
    </div>
  );
}

export default ScrollReveal;
