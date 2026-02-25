import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export const Footer = ({ className }: { className?: string }) => {
  return (
    <footer
      className={cn(
        "bg-linear-to-br from-primary-700 via-primary-800 to-primary-900 text-primary-100 border-t border-white/10 mt-auto",
        className,
      )}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-8 sm:pt-10">
        <div className="mb-8 sm:mb-10 rounded-2xl bg-white/10 border border-white/15 p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-white text-lg sm:text-xl font-bold">Need the right weighing setup?</h3>
            <p className="text-primary-200 text-xs sm:text-sm mt-1">Get product recommendation, pricing, and support in minutes.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <a
              href="https://wa.me/9779765662427"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-10 px-4 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:brightness-110 transition"
            >
              WhatsApp Us
            </a>
            <a
              href="tel:+9779765662427"
              className="inline-flex items-center justify-center h-10 px-4 rounded-full border border-white/30 text-white text-sm font-semibold hover:bg-white/10 transition"
            >
              Call Now
            </a>
          </div>
        </div>
      </div>

      <div className="px-5 sm:px-8 pb-10 sm:pb-12 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
            <div className="w-7 h-7 bg-white/15 rounded-lg flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75C6.583 21.58 5 22.328 5 23.25v.75c0 .414.336.75.75.75h12.5c.414 0 .75-.336.75-.75v-.75c0-.922-1.583-1.67-2.815-2.25C15.882 20.515 14.472 20.25 13 20.25H12zM12 3L8.25 8.25h7.5L12 3z" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-base">GSTradeLink</h3>
          </div>
          <p className="text-primary-200 text-xs sm:text-sm leading-relaxed max-w-xs">
            Your trusted partner for precision weighing solutions in Chitwan.
            Authorized sales, calibration, and repair services.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3 sm:mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {[
              { label: "Browse Catalogue", href: "/products" },
              { label: "Retail Scales", href: "/products?category=Retail%20Scale" },
              { label: "Industrial Scales", href: "/products?category=Industrial%20Scale" },
              { label: "Contact Us", href: "/contact" },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-primary-200 hover:text-white transition-colors text-xs sm:text-sm flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-accent-400 group-hover:scale-150 transition-transform shrink-0" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3 sm:mb-4">Categories</h4>
          <ul className="space-y-2 text-primary-200 text-xs sm:text-sm">
            <li>Retail Scales</li>
            <li>Industrial Scales</li>
            <li>Spare Parts</li>
            <li>Calibration & Repair Service</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3 sm:mb-4">Contact Us</h4>
          <ul className="space-y-2.5">
            <li className="flex items-start gap-2.5">
              <MapPin size={14} className="text-accent-400 shrink-0 mt-0.5" />
              <span className="text-primary-200 text-xs sm:text-sm leading-relaxed">
                Bharatpur-10, Chitwan, Nepal
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={14} className="text-accent-400 shrink-0" />
              <a href="tel:+9779765662427" className="text-primary-200 hover:text-white transition-colors text-xs sm:text-sm">
                +977 9765662427
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={14} className="text-accent-400 shrink-0" />
              <span className="text-primary-200 text-xs sm:text-sm">info@gstradelink.com.np</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 py-4 sm:py-5 px-5">
        <p className="text-center text-xs text-primary-300">
          &copy; {new Date().getFullYear()} GSTradeLink. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
