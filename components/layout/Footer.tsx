import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, MessageCircle, Clock, ArrowRight } from "lucide-react";

export const Footer = ({ className }: { className?: string }) => {
  return (
    <footer
      className={className}
      style={{ background: "linear-gradient(160deg, #14231A 0%, #1E3527 50%, #0C1810 100%)", color: "#c8d9c2", marginTop: "auto" }}
    >
      {/* ── CTA Banner removed per user request ──────────────── */}

      {/* ── Main Footer Grid ─────────────────────────── */}
      <div
        style={{ maxWidth: "72rem", margin: "0 auto", padding: "56px 20px 48px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
      >
        {/* Brand column */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-1.5 shrink-0 shadow-sm">
              <Image src="/logo.png" alt="GSTradeLink Logo" width={60} height={60} className="w-full h-full object-contain" />
            </div>
            <div>
              <div style={{ fontWeight: 800, color: "#ffffff", fontSize: "1.1rem", lineHeight: 1 }}>GSTradeLink</div>
              <div style={{ color: "#8798AD", fontSize: "0.72rem", marginTop: "2px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Bharatpur · Chitwan</div>
            </div>
          </div>
          <p style={{ color: "#8798AD", fontSize: "0.875rem", lineHeight: 1.7, maxWidth: "22rem" }}>
            Your trusted partner for precision weighing solutions in Chitwan.
            Authorized sales, calibration, and expert repair services since 2015.
          </p>
          {/* Business hours badge */}
          <div
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              marginTop: "20px", padding: "6px 14px", borderRadius: "9999px",
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)",
              fontSize: "0.75rem", color: "#8798AD",
            }}
          >
            <Clock size={12} style={{ color: "#DCA963" }} />
            Open all days except Monday: 10:00 AM – 6:00 PM
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4
            style={{
              color: "#ffffff", fontWeight: 700, fontSize: "0.7rem",
              textTransform: "uppercase", letterSpacing: "0.12em",
              marginBottom: "20px", paddingBottom: "10px",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            Quick Links
          </h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { label: "Browse Catalogue", href: "/products" },
              { label: "Retail Scales", href: "/products?category=Retail%20Scale" },
              { label: "Industrial Scales", href: "/products?category=Industrial%20Scale" },
              { label: "Spare Parts", href: "/products?category=Spare%20Part" },
              { label: "Contact Us", href: "/contact" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    color: "#8798AD", fontSize: "0.875rem", textDecoration: "none",
                    transition: "color 0.15s",
                  }}
                >
                  <ArrowRight size={12} style={{ color: "rgba(220,169,99,0.5)", flexShrink: 0 }} />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4
            style={{
              color: "#ffffff", fontWeight: 700, fontSize: "0.7rem",
              textTransform: "uppercase", letterSpacing: "0.12em",
              marginBottom: "20px", paddingBottom: "10px",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            Categories
          </h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { label: "Retail Scales", href: "/products?category=Retail%20Scale" },
              { label: "Industrial Scales", href: "/products?category=Industrial%20Scale" },
              { label: "Spare Parts", href: "/products?category=Spare%20Part" },
              { label: "Calibration & Repair", href: "/products?category=Service" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    color: "#8798AD", fontSize: "0.875rem", textDecoration: "none",
                  }}
                >
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgba(220,169,99,0.5)", flexShrink: 0 }} />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4
            style={{
              color: "#ffffff", fontWeight: 700, fontSize: "0.7rem",
              textTransform: "uppercase", letterSpacing: "0.12em",
              marginBottom: "20px", paddingBottom: "10px",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            Get in Touch
          </h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { icon: MapPin, text: "Bharatpur-10, Chitwan, Nepal", href: undefined },
              { icon: Phone, text: "+977 9765662427", href: "tel:+9779765662427" },
              { icon: Mail, text: "info@gstradelink.com.np", href: undefined },
            ].map(({ icon: Icon, text, href }) => (
              <li key={text} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div
                  style={{
                    width: "30px", height: "30px", borderRadius: "8px",
                    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, marginTop: "1px",
                  }}
                >
                  <Icon size={13} style={{ color: "#DCA963" }} />
                </div>
                {href ? (
                  <a href={href} style={{ color: "#8798AD", fontSize: "0.875rem", lineHeight: 1.6, textDecoration: "none" }}>
                    {text}
                  </a>
                ) : (
                  <span style={{ color: "#8798AD", fontSize: "0.875rem", lineHeight: 1.6, wordBreak: "break-word" }}>{text}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Copyright bar ────────────────────────────── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "20px" }}>
        <div
          style={{ maxWidth: "72rem", margin: "0 auto" }}
          className="flex flex-col sm:flex-row items-center justify-between gap-2"
        >
          <p style={{ fontSize: "0.75rem", color: "#5C6B7B" }}>
            © {new Date().getFullYear()} GSTradeLink. All rights reserved.
          </p>
          <p style={{ fontSize: "0.75rem", color: "#475569" }}>Bharatpur, Chitwan, Nepal</p>
        </div>
      </div>
    </footer>
  );
};
