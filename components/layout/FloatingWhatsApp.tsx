"use client";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export const FloatingWhatsApp = () => {
  return (
    <motion.a
      href="https://wa.me/9779765662427"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 220, damping: 18 }}
      className="hidden md:flex fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg items-center gap-2 hover:brightness-110 hover:shadow-xl hover:-translate-y-0.5 transition-all group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} fill="white" className="text-white" />
      <span className="hidden md:block font-bold pr-2">
        Chat with GSTradeLink
      </span>
    </motion.a>
  );
};
