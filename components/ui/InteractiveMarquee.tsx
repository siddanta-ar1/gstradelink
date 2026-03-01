"use client";

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

interface InteractiveMarqueeProps {
  children: ReactNode;
  /** Speed of auto-scroll in pixels per second */
  speed?: number;
  /** Gap between items in pixels */
  gap?: number;
  /** Pause duration after user interaction before resuming auto-scroll (ms) */
  pauseOnInteractionDuration?: number;
  /** Additional class names */
  className?: string;
  /** Direction of auto-scroll */
  direction?: "left" | "right";
}

export function InteractiveMarquee({
  children,
  speed = 40,
  gap = 20,
  pauseOnInteractionDuration = 3000,
  className,
  direction = "left",
}: InteractiveMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Drag state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const velocity = useRef(0);
  const lastDragX = useRef(0);
  const lastDragTime = useRef(0);

  // Get content width for seamless looping
  const getContentWidth = useCallback(() => {
    if (!contentRef.current) return 0;
    const children = contentRef.current.children;
    if (children.length === 0) return 0;
    // Content is duplicated, so actual width is half
    return contentRef.current.scrollWidth / 2;
  }, []);

  // Handle seamless loop
  const handleSeamlessLoop = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const contentWidth = getContentWidth();
    if (contentWidth <= 0) return;

    if (container.scrollLeft >= contentWidth) {
      container.scrollLeft -= contentWidth;
    } else if (container.scrollLeft < 0) {
      container.scrollLeft += contentWidth;
    }
  }, [getContentWidth]);

  // Auto-scroll animation
  const animate = useCallback(
    (currentTime: number) => {
      if (isUserInteracting || isPaused) {
        lastTimeRef.current = currentTime;
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const container = containerRef.current;
      if (!container) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const deltaTime = (currentTime - lastTimeRef.current) / 1000;
      lastTimeRef.current = currentTime;

      const pixelsToMove = speed * deltaTime;
      container.scrollLeft +=
        direction === "left" ? pixelsToMove : -pixelsToMove;

      handleSeamlessLoop();
      animationRef.current = requestAnimationFrame(animate);
    },
    [isUserInteracting, isPaused, speed, direction, handleSeamlessLoop],
  );

  // Start animation
  useEffect(() => {
    lastTimeRef.current = performance.now();
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  // Clear pause timeout on unmount
  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, []);

  // Resume auto-scroll after user stops interacting
  const scheduleResume = useCallback(() => {
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    pauseTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, pauseOnInteractionDuration);
  }, [pauseOnInteractionDuration]);

  // Apply momentum scrolling
  const applyMomentum = useCallback(() => {
    const container = containerRef.current;
    if (!container || Math.abs(velocity.current) < 0.5) {
      scheduleResume();
      return;
    }

    container.scrollLeft += velocity.current;
    velocity.current *= 0.95; // Friction
    handleSeamlessLoop();

    requestAnimationFrame(applyMomentum);
  }, [handleSeamlessLoop, scheduleResume]);

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    setIsUserInteracting(true);
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }

    const container = containerRef.current;
    if (!container) return;

    startX.current = e.pageX;
    scrollStart.current = container.scrollLeft;
    lastDragX.current = e.pageX;
    lastDragTime.current = performance.now();
    velocity.current = 0;

    container.style.cursor = "grabbing";
    container.style.userSelect = "none";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;

    const container = containerRef.current;
    if (!container) return;

    e.preventDefault();
    const x = e.pageX;
    const delta = startX.current - x;
    container.scrollLeft = scrollStart.current + delta;

    // Calculate velocity
    const now = performance.now();
    const timeDelta = now - lastDragTime.current;
    if (timeDelta > 0) {
      velocity.current = ((lastDragX.current - x) / timeDelta) * 16;
    }
    lastDragX.current = x;
    lastDragTime.current = now;

    handleSeamlessLoop();
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const container = containerRef.current;
    if (container) {
      container.style.cursor = "grab";
      container.style.userSelect = "";
    }

    // Apply momentum
    if (Math.abs(velocity.current) > 0.5) {
      requestAnimationFrame(applyMomentum);
    } else {
      scheduleResume();
    }
  };

  const handleMouseLeave = () => {
    if (isDragging.current) {
      handleMouseUp();
    }
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    setIsUserInteracting(true);
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }

    const container = containerRef.current;
    if (!container) return;

    const touch = e.touches[0];
    startX.current = touch.pageX;
    scrollStart.current = container.scrollLeft;
    lastDragX.current = touch.pageX;
    lastDragTime.current = performance.now();
    velocity.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;

    const container = containerRef.current;
    if (!container) return;

    const touch = e.touches[0];
    const x = touch.pageX;
    const delta = startX.current - x;
    container.scrollLeft = scrollStart.current + delta;

    // Calculate velocity
    const now = performance.now();
    const timeDelta = now - lastDragTime.current;
    if (timeDelta > 0) {
      velocity.current = ((lastDragX.current - x) / timeDelta) * 16;
    }
    lastDragX.current = x;
    lastDragTime.current = now;

    handleSeamlessLoop();
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    // Apply momentum
    if (Math.abs(velocity.current) > 0.5) {
      requestAnimationFrame(applyMomentum);
    } else {
      scheduleResume();
    }
  };

  // Pause on hover (optional - only when not dragging)
  const handleMouseEnter = () => {
    if (!isDragging.current) {
      setIsPaused(true);
    }
  };

  const handleContainerMouseLeave = () => {
    setIsPaused(false);
    handleMouseLeave();
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-x-auto hide-scrollbar",
        className,
      )}
      style={{
        cursor: "grab",
        WebkitOverflowScrolling: "touch",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleContainerMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        ref={contentRef}
        className="flex"
        style={{
          gap: `${gap}px`,
          width: "max-content",
        }}
      >
        {/* Original content */}
        {children}
        {/* Duplicated content for seamless loop */}
        {children}
      </div>
    </div>
  );
}

export default InteractiveMarquee;
