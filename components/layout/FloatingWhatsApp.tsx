"use client";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export const FloatingWhatsApp = () => {
  return (
    <motion.a
      href="https://wa.me/9779800000000" // REPLACE WITH YOUR REAL NUMBER
      target="_blank"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1 }}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg flex items-center gap-2 hover:brightness-110 hover:shadow-xl transition-all group"
    >
      <MessageCircle size={28} fill="white" className="text-white" />
      <span className="hidden md:block font-bold pr-2">
        Chat with GSTradeLink
      </span>
    </motion.a>
  );
};
