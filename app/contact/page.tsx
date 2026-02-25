import { Clock3, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Contact",
  description:
    "Contact GSTradeLink for product enquiries, weighing machine service, and spare parts support in Chitwan.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pb-20 sm:pb-32" style={{ background: "#F5EFE6" }}>
      {/* Premium Hero Section */}
      <section
        className="relative overflow-hidden text-white"
        style={{
          background: "linear-gradient(135deg, #3E5E85 0%, #1A2433 100%)",
          padding: "80px 20px 100px",
          textAlign: "center",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Ccircle cx='4' cy='4' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "40px 40px",
            opacity: 0.04,
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto motion-safe:animate-fade-up">
          <span
            className="inline-flex items-center gap-2 mb-6"
            style={{
              padding: "6px 16px", borderRadius: "9999px",
              background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
              fontSize: "0.75rem", fontWeight: 700, color: "#ffffff", textTransform: "uppercase", letterSpacing: "0.05em"
            }}
          >
            Contact GSTradeLink
          </span>
          <h1
            className="font-bold tracking-tight text-white mb-4"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", letterSpacing: "-0.02em", lineHeight: 1.1 }}
          >
            Get expert support <span style={{ color: "#DCA963" }}>quickly</span>
          </h1>
          <p
            style={{
              fontSize: "1.05rem", color: "#E6F0FA", maxWidth: "34rem", margin: "0 auto 40px", lineHeight: 1.6
            }}
          >
            Tell us your precision weighing requirement. Our team will suggest the right product, calibration schedule, or repair plan.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", justifyContent: "center", alignItems: "center" }}>
            <a
              href="https://wa.me/9779765662427"
              target="_blank" rel="noopener noreferrer"
              className="hover:-translate-y-0.5 transition-all"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "14px 32px", borderRadius: "9999px",
                background: "#25D366", color: "#ffffff",
                fontWeight: 700, fontSize: "0.9rem", textDecoration: "none",
                boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
              }}
            >
              <MessageCircle size={17} fill="white" /> Chat on WhatsApp
            </a>
            <a
              href="tel:+9779765662427"
              className="hover:-translate-y-0.5 transition-all"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "14px 32px", borderRadius: "9999px",
                background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)",
                color: "#ffffff", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none",
              }}
            >
              <Phone size={16} /> Call now
            </a>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20" style={{ marginTop: "-40px" }}>
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 motion-safe:animate-fade-up">
          {[
            {
              icon: MapPin, title: "Store Location",
              desc: "Bharatpur-10, Chitwan, Nepal",
              bg: "linear-gradient(135deg, #557BAA 0%, #3E5E85 100%)",
            },
            {
              icon: Phone, title: "Phone",
              desc: "+977 9765662427", href: "tel:+9779765662427",
              bg: "linear-gradient(135deg, #DCA963 0%, #C28D44 100%)",
            },
            {
              icon: Mail, title: "Email",
              desc: "info@gstradelink.com.np", href: "mailto:info@gstradelink.com.np",
              bg: "linear-gradient(135deg, #93B2D6 0%, #557BAA 100%)",
            },
            {
              icon: Clock3, title: "Working Hours",
              desc: "Mon–Sat, 10:00 AM – 6:00 PM",
              bg: "linear-gradient(135deg, #3E5E85 0%, #1A2433 100%)",
            },
          ].map(({ icon: Icon, title, desc, href, bg }) => (
            <div
              key={title}
              className="group flex flex-col transition-all duration-300 hover:-translate-y-1"
              style={{
                padding: "24px", background: "#FFFFFF",
                borderRadius: "20px", border: "1.5px solid #E0D5B8",
                boxShadow: "0 4px 16px rgba(0,0,0,0.04)"
              }}
            >
              <div
                className="group-hover:scale-105 transition-transform"
                style={{
                  width: "48px", height: "48px", background: bg,
                  borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                }}
              >
                <Icon size={20} color="white" />
              </div>
              <h2 style={{ fontWeight: 700, color: "#1A2433", fontSize: "1rem", marginBottom: "4px" }}>
                {title}
              </h2>
              {href ? (
                <a href={href} style={{ color: "#5C6B7B", fontSize: "0.875rem", textDecoration: "none" }} className="hover:text-[#557BAA] transition-colors">{desc}</a>
              ) : (
                <p style={{ color: "#5C6B7B", fontSize: "0.875rem" }}>{desc}</p>
              )}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
