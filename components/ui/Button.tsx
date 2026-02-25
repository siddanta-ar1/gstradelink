"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  // Base styles - clean and professional
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-600 text-white shadow-sm hover:bg-primary-700 hover:shadow-md hover:-translate-y-0.5",
        secondary:
          "bg-background-primary text-foreground-primary border border-border-primary shadow-sm hover:bg-background-secondary hover:shadow-md hover:-translate-y-0.5",
        outline:
          "border border-primary-600 text-primary-700 hover:bg-primary-50",
        ghost:
          "text-foreground-secondary hover:bg-background-secondary hover:text-foreground-primary",
        danger:
          "bg-danger-600 text-white shadow-sm hover:bg-danger-700 hover:shadow-md hover:-translate-y-0.5",
        success:
          "bg-success-600 text-white shadow-sm hover:bg-success-700 hover:shadow-md hover:-translate-y-0.5",
        warning:
          "bg-warning-600 text-white shadow-sm hover:bg-warning-700 hover:shadow-md hover:-translate-y-0.5",
        link: "text-primary-600 underline-offset-4 hover:underline focus-visible:ring-primary-500",
      },
      size: {
        xs: "h-8 px-3 text-xs rounded-lg",
        sm: "h-9 px-3.5 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-6 text-sm",
        xl: "h-12 px-8 text-base rounded-2xl",
        icon: "h-9 w-9",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild: _asChild = false,
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    void _asChild;
    const isDisabled = disabled || isLoading;

    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {isLoading && (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        )}
        {!isLoading && leftIcon && (
          <span className="shrink-0" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        <span className={cn("truncate", fullWidth && "flex-1 text-center")}>
          {isLoading && loadingText ? loadingText : children}
        </span>
        {!isLoading && rightIcon && (
          <span className="shrink-0" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
