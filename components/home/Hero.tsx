"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-primary-50 via-background-primary to-background-secondary min-h-[80vh] flex items-center overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container-fluid relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Content Section */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-2xl lg:max-w-none"
          >
            {/* Trust Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success-50 text-success-700 border border-success-200 text-sm font-medium mb-6"
            >
              <CheckCircle size={16} />
              <span>Trusted Since 2015</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground-primary leading-tight mb-6"
            >
              Professional{" "}
              <span className="text-primary-600 relative">
                Weighing
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-primary-200 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </span>
              <br />
              Solutions in Chitwan
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeInUp}
              className="text-lg text-foreground-secondary mb-8 leading-relaxed max-w-xl"
            >
              Authorized dealer for digital scales, beam balances, and
              industrial weighing equipment. Expert repair services and genuine
              spare parts in Bharatpur.
            </motion.p>

            {/* Key Features */}
            <motion.div
              variants={fadeInUp}
              className="grid sm:grid-cols-2 gap-4 mb-8"
            >
              <div className="flex items-center gap-3 p-4 rounded-lg bg-background-card border border-border-primary">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <CheckCircle className="text-primary-600" size={20} />
                </div>
                <div>
                  <div className="font-medium text-foreground-primary">
                    Expert Repair
                  </div>
                  <div className="text-sm text-foreground-tertiary">
                    Professional service
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg bg-background-card border border-border-primary">
                <div className="w-10 h-10 rounded-full bg-success-100 flex items-center justify-center">
                  <CheckCircle className="text-success-600" size={20} />
                </div>
                <div>
                  <div className="font-medium text-foreground-primary">
                    Genuine Parts
                  </div>
                  <div className="text-sm text-foreground-tertiary">
                    Authorized dealer
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button variant="primary" size="lg" className="group" asChild>
                <Link href="/products">
                  Browse Products
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </Link>
              </Button>

              <Button variant="outline" size="lg" className="group" asChild>
                <Link href="tel:+977-56-XXXXXX">
                  <Phone size={16} />
                  Call Now
                </Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              className="mt-12 pt-8 border-t border-border-primary grid grid-cols-3 gap-6"
            >
              <div className="text-center sm:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-primary-600">
                  500+
                </div>
                <div className="text-sm text-foreground-tertiary">
                  Happy Customers
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-primary-600">
                  8+
                </div>
                <div className="text-sm text-foreground-tertiary">
                  Years Experience
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-primary-600">
                  24h
                </div>
                <div className="text-sm text-foreground-tertiary">
                  Quick Response
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex items-center justify-center"
          >
            {/* Main Visual */}
            <div className="relative w-full max-w-lg">
              <motion.div
                className="aspect-square bg-gradient-to-br from-primary-100 via-primary-50 to-background-primary rounded-3xl flex items-center justify-center shadow-lg"
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 1, -1, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Scale Icon */}
                <div className="w-32 h-32 bg-primary-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <svg
                    className="w-16 h-16 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75C6.583 21.58 5 22.328 5 23.25v.75c0 .414.336.75.75.75h12.5c.414 0 .75-.336.75-.75v-.75c0-.922-1.583-1.67-2.815-2.25C15.882 20.515 14.472 20.25 13 20.25H12zM12 3L8.25 8.25h7.5L12 3z"
                    />
                  </svg>
                </div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-12 h-12 bg-success-500 rounded-full flex items-center justify-center shadow-lg"
                  animate={{ y: [-2, 2, -2] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <CheckCircle size={24} className="text-white" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-4 w-10 h-10 bg-accent-500 rounded-full flex items-center justify-center shadow-lg"
                  animate={{ y: [2, -2, 2] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <MapPin size={20} className="text-white" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background-secondary to-transparent pointer-events-none" />
    </section>
  );
};
