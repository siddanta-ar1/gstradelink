"use client";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { MessageCircle } from "lucide-react";

export const FloatingWhatsApp = () => {
  return (
    <div className="hidden md:flex fixed bottom-6 right-6 z-50 flex-col items-end gap-3">
      {/* WhatsApp button */}
      <motion.a
        href="https://wa.me/9779765662427"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 220, damping: 18 }}
        className="flex items-center gap-2.5 bg-[#25D366] text-white pl-4 pr-5 py-3 rounded-full shadow-xl hover:brightness-110 hover:-translate-y-0.5 transition-all group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={22} fill="white" className="shrink-0" />
        <span className="font-bold text-sm whitespace-nowrap">WhatsApp</span>
      </motion.a>

      {/* Call button */}
      <motion.a
        href="tel:+9779765662427"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.75, type: "spring", stiffness: 220, damping: 18 }}
        className="flex items-center gap-2.5 bg-primary-700 text-white pl-4 pr-5 py-3 rounded-full shadow-xl hover:bg-primary-800 hover:-translate-y-0.5 transition-all"
        aria-label="Call Us"
      >
        <Phone size={18} className="shrink-0" />
        <span className="font-bold text-sm whitespace-nowrap">Call Us</span>
      </motion.a>
    </div>
  );
};
