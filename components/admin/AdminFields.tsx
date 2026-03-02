"use client";

import { ChevronRight } from "lucide-react";
import React from "react";

export function FieldLabel({
    icon: Icon,
    children,
}: {
    icon: React.ElementType;
    children: React.ReactNode;
}) {
    return (
        <label className="flex items-center gap-2 mb-2">
            <Icon size={13} className="text-accent-500" />
            <span
                className="text-[11px] font-semibold uppercase tracking-widest text-primary-200/60"
            >
                {children}
            </span>
        </label>
    );
}

export function FieldInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className={`w-full px-4 py-3 rounded-xl bg-primary-900 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] border border-white/5 text-white text-sm transition-all duration-300 focus:outline-none focus:border-accent-500/50 focus:ring-2 focus:ring-accent-500/20 focus:bg-primary-800 placeholder-primary-200/30 ${props.className ?? ""}`}
            style={props.style as React.CSSProperties}
        />
    );
}

export function FieldTextarea(
    props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
    return (
        <textarea
            {...props}
            className={`w-full px-4 py-3 rounded-xl bg-primary-900 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] border border-white/5 text-white text-sm resize-none transition-all duration-300 focus:outline-none focus:border-accent-500/50 focus:ring-2 focus:ring-accent-500/20 focus:bg-primary-800 placeholder-primary-200/30 ${props.className ?? ""}`}
            style={props.style as React.CSSProperties}
        />
    );
}

export function FieldSelect({
    children,
    ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
    children: React.ReactNode;
}) {
    return (
        <div className="relative">
            <select
                {...props}
                className="w-full px-4 py-3 rounded-xl bg-primary-900 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] border border-white/5 text-white text-sm appearance-none cursor-pointer transition-all duration-300 focus:outline-none focus:border-accent-500/50 focus:ring-2 focus:ring-accent-500/20 focus:bg-primary-800"
            >
                {children}
            </select>
            <ChevronRight
                size={14}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none text-primary-200/30"
            />
        </div>
    );
}
