"use client";
import Link from "next/link";
import { MapPin, Phone, Mail, Facebook } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-brand-primary text-slate-300 border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Column */}
        <div>
          <h3 className="text-white text-lg font-bold mb-4">GSTradeLink</h3>
          <p className="text-sm leading-relaxed max-w-xs">
            Your trusted partner for precision weighing solutions in Chitwan.
            Authorized sales, calibration, and repair services for all
            industrial needs.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/"
                className="hover:text-brand-accent transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="hover:text-brand-accent transition-colors"
              >
                Browse Catalogue
              </Link>
            </li>
            <li>
              <Link
                href="/admin"
                className="hover:text-brand-accent transition-colors"
              >
                Admin Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-brand-accent shrink-0" />
              <span>
                Bharatpur-10, Chitwan, Nepal
                <br />
                (Infront of Baidik Aayurved Sewa)
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-brand-accent shrink-0" />
              <a
                href="tel:+9779800000000"
                className="hover:text-white transition-colors"
              >
                +977 9800000000
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-brand-accent shrink-0" />
              <span>contact@gstradelink.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-6 text-xs text-center text-slate-500">
          &copy; {new Date().getFullYear()} GSTradeLink. All rights reserved.
          Built with precision.
        </div>
      </div>
    </footer>
  );
};
