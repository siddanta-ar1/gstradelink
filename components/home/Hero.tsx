"use client";

import React from "react";
// 1. Import 'Variants' type here
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle, Phone, MapPin, Shield, Wrench } from "lucide-react";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

export const Hero = () => {
  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-gradient-to-br from-background-primary via-primary-50 to-background-secondary">
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%232A4835' fill-opacity='1'%3E%3Ccircle cx='4' cy='4' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Large decorative circle */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] rounded-full bg-primary-100/50 blur-3xl pointer-events-none" />

      <div className="container-fluid relative z-10 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center max-w-7xl mx-auto">

          {/* ── Content ─────────────────────────────────────── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-xl mx-auto lg:max-w-none text-center lg:text-left px-4 lg:px-0"
          >
            {/* Trust Badge */}
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-600/10 text-primary-700 border border-primary-200 text-sm font-semibold mb-7 shadow-xs">
              <CheckCircle size={15} />
              <span>Trusted Since 2015 • Bharatpur, Chitwan</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-[2.6rem] sm:text-5xl lg:text-[3.5rem] tracking-tight font-bold text-foreground-primary leading-[1.12] mb-6"
            >
              Professional{" "}
              <span className="text-primary-600 relative inline-block">
                Weighing
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-[5px] bg-primary-200 rounded-full -z-10"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.9, duration: 0.7 }}
                />
              </span>
              <br />
              Solutions in Chitwan
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg text-foreground-secondary mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Authorized dealer for digital scales, beam balances, and industrial weighing equipment.
              Expert repair services and genuine spare parts in Bharatpur.
            </motion.p>

            {/* Feature cards */}
            <motion.div variants={fadeInUp} className="grid sm:grid-cols-2 gap-3 mb-10">
              {[
                { icon: Wrench, title: "Expert Repair", sub: "All brands serviced", color: "bg-primary-600" },
                { icon: Shield, title: "Genuine Parts", sub: "Authorized dealer", color: "bg-accent-600" },
              ].map(({ icon: Icon, title, sub, color }) => (
                <div key={title} className="flex items-center gap-4 p-4 rounded-2xl bg-white/70 border border-border-primary shadow-xs hover:shadow-sm transition-shadow">
                  <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center shadow-sm shrink-0`}>
                    <Icon className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground-primary text-sm">{title}</div>
                    <div className="text-xs text-foreground-tertiary">{sub}</div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-primary-600 text-white font-semibold text-sm shadow-green hover:bg-primary-700 hover:-translate-y-0.5 transition-all duration-200"
              >
                Browse Products
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <a
                href="tel:+977-56-878965"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-2 border-primary-600 text-primary-600 font-semibold text-sm hover:bg-primary-50 hover:-translate-y-0.5 transition-all duration-200"
              >
                <Phone size={16} />
                Call Now
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              className="mt-12 pt-8 border-t border-border-primary grid grid-cols-3 gap-6"
            >
              {[
                { value: "500+", label: "Happy Customers" },
                { value: "8+", label: "Years Experience" },
                { value: "24h", label: "Quick Response" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-primary-600">{value}</div>
                  <div className="text-xs text-foreground-tertiary mt-0.5">{label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Visual Section ───────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-md">
              {/* Main floating card */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 1, -1, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="aspect-square bg-gradient-to-br from-primary-100 via-primary-50 to-background-primary rounded-[3rem] flex items-center justify-center shadow-2xl border border-primary-100"
              >
                {/* Scale Icon Box */}
                <div className="w-36 h-36 bg-primary-600 rounded-3xl flex items-center justify-center shadow-green">
                  <svg className="w-20 h-20 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75C6.583 21.58 5 22.328 5 23.25v.75c0 .414.336.75.75.75h12.5c.414 0 .75-.336.75-.75v-.75c0-.922-1.583-1.67-2.815-2.25C15.882 20.515 14.472 20.25 13 20.25H12zM12 3L8.25 8.25h7.5L12 3z" />
                  </svg>
                </div>

                {/* Floating badge — verified */}
                <motion.div
                  className="absolute -top-4 -right-4 w-14 h-14 bg-accent-400 rounded-full flex items-center justify-center shadow-lg"
                  animate={{ y: [-3, 3, -3] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <CheckCircle size={26} className="text-foreground-primary" />
                </motion.div>

                {/* Floating badge — location */}
                <motion.div
                  className="absolute -bottom-4 -left-4 w-12 h-12 bg-accent-600 rounded-full flex items-center justify-center shadow-lg"
                  animate={{ y: [3, -3, 3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <MapPin size={20} className="text-white" />
                </motion.div>
              </motion.div>

              {/* Info card */}
              <motion.div
                className="absolute -bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-4 shadow-card border border-border-primary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary-500 animate-pulse" />
                  <span className="text-sm font-semibold text-foreground-primary">Open Now</span>
                  <span className="text-xs text-foreground-tertiary ml-auto">Mon–Sat</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background-secondary to-transparent pointer-events-none" />
    </section>
  );
};
