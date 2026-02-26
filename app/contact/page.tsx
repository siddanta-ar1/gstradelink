import { Clock3, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Contact",
  description:
    "Contact GSTradeLink for product enquiries, weighing machine service, and spare parts support in Chitwan.",
};

export default function ContactPage() {
  return (
    <div
      className="min-h-screen pb-20 sm:pb-32"
      style={{ background: "#E8EBE3" }}
    >
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden text-white"
        style={{
          background: "#3E5E85",
          padding: "80px 20px 100px",
          textAlign: "center",
        }}
      >
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Ccircle cx='4' cy='4' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "40px 40px",
            opacity: 0.05,
          }}
        />
        {/* Decorative glows */}
        <div
          className="absolute pointer-events-none"
          style={{
            right: 0,
            top: 0,
            width: "360px",
            height: "360px",
            background:
              "radial-gradient(circle, rgba(174,202,233,0.18) 0%, transparent 70%)",
            transform: "translate(30%, -40%)",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            left: 0,
            bottom: 0,
            width: "280px",
            height: "280px",
            background:
              "radial-gradient(circle, rgba(220,169,99,0.1) 0%, transparent 70%)",
            transform: "translate(-30%, 40%)",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto motion-safe:animate-fade-up">
          <span
            className="inline-flex items-center gap-2 mb-6"
            style={{
              padding: "6px 16px",
              borderRadius: "4px",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.18)",
              fontSize: "0.72rem",
              fontWeight: 700,
              color: "#ffffff",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Contact GSTradeLink
          </span>

          <h1
            className="font-bold tracking-tight text-white mb-4"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
            }}
          >
            Get expert support <span style={{ color: "#DCA963" }}>quickly</span>
          </h1>

          <p
            style={{
              fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
              color: "#D5E4F4",
              maxWidth: "32rem",
              margin: "0 auto 40px",
              lineHeight: 1.7,
            }}
          >
            Tell us your precision weighing requirement. Our team will suggest
            the right product, calibration schedule, or repair plan.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <a
              href="https://wa.me/9779765662427"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:-translate-y-0.5 transition-all"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "13px 28px",
                borderRadius: "4px",
                background: "#25D366",
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "0.9rem",
                textDecoration: "none",
                boxShadow: "0 6px 20px rgba(37,211,102,0.3)",
              }}
            >
              <MessageCircle size={17} fill="white" /> Chat on WhatsApp
            </a>
            <a
              href="tel:+9779765662427"
              className="hover:-translate-y-0.5 transition-all"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "13px 28px",
                borderRadius: "4px",
                background: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.22)",
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "0.9rem",
                textDecoration: "none",
              }}
            >
              <Phone size={16} /> Call now
            </a>
          </div>
        </div>
      </section>

      {/* ── Info cards (pulled up to overlap hero) ────────────── */}
      <div
        className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-20"
        style={{ marginTop: "-44px" }}
      >
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 motion-safe:animate-fade-up">
          {[
            {
              icon: MapPin,
              title: "Store Location",
              desc: "Bharatpur-10, Chitwan, Nepal",
              href: undefined,
              iconBg: "#3E5E85",
            },
            {
              icon: Phone,
              title: "Phone",
              desc: "+977 9765662427",
              href: "tel:+9779765662427",
              iconBg: "#DCA963",
            },
            {
              icon: Mail,
              title: "Email",
              desc: "info@gstradelink.com.np",
              href: "mailto:info@gstradelink.com.np",
              iconBg: "#557BAA",
            },
            {
              icon: Clock3,
              title: "Working Hours",
              desc: "All days except Mon · 10 AM – 6 PM",
              href: undefined,
              iconBg: "#1A2433",
            },
          ].map(({ icon: Icon, title, desc, href, iconBg }) => (
            <div
              key={title}
              className="group flex flex-col transition-all duration-300 hover:-translate-y-1"
              style={{
                padding: "24px",
                background: "#FFFFFF",
                borderRadius: "4px",
                border: "1px solid #CBDCEB",
                boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
              }}
            >
              <div
                className="group-hover:scale-105 transition-transform"
                style={{
                  width: "46px",
                  height: "46px",
                  background: iconBg,
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "14px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.10)",
                }}
              >
                <Icon size={20} color="white" />
              </div>
              <h2
                style={{
                  fontWeight: 700,
                  color: "#111111",
                  fontSize: "0.95rem",
                  marginBottom: "4px",
                }}
              >
                {title}
              </h2>
              {href ? (
                <a
                  href={href}
                  className="hover:text-[#3E5E85] transition-colors"
                  style={{
                    color: "#5C6B7B",
                    fontSize: "0.875rem",
                    textDecoration: "none",
                    wordBreak: "break-word",
                  }}
                >
                  {desc}
                </a>
              ) : (
                <p
                  style={{
                    color: "#5C6B7B",
                    fontSize: "0.875rem",
                    lineHeight: 1.5,
                  }}
                >
                  {desc}
                </p>
              )}
            </div>
          ))}
        </section>

        {/* ── Additional info / WhatsApp nudge ───────────────── */}
        <section
          className="mt-8 sm:mt-10 motion-safe:animate-fade-up"
          style={{
            background: "#1A2433",
            borderRadius: "4px",
            padding: "clamp(28px, 4vw, 48px)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle decorative circle */}
          <div
            className="absolute pointer-events-none"
            style={{
              right: 0,
              top: 0,
              width: "280px",
              height: "280px",
              background: "rgba(255,255,255,0.03)",
              borderRadius: "50%",
              transform: "translate(30%, -40%)",
            }}
          />
          <div
            className="absolute pointer-events-none"
            style={{
              left: 0,
              bottom: 0,
              width: "200px",
              height: "200px",
              background: "rgba(220,169,99,0.06)",
              borderRadius: "50%",
              transform: "translate(-30%, 40%)",
            }}
          />

          <div className="relative z-10 max-w-xl mx-auto">
            <p
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                color: "#8798AD",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "10px",
              }}
            >
              Fastest Response
            </p>
            <h2
              className="font-bold text-white mb-3"
              style={{
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Message us on WhatsApp
            </h2>
            <p
              style={{
                color: "#8798AD",
                fontSize: "0.9rem",
                lineHeight: 1.7,
                marginBottom: "28px",
              }}
            >
              We reply within a few hours. Share your requirement and we&apos;ll
              recommend the right scale, repair plan, or spare part.
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                justifyContent: "center",
              }}
            >
              <a
                href="https://wa.me/9779765662427"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:-translate-y-0.5 transition-all"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "13px 28px",
                  borderRadius: "4px",
                  background: "#25D366",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  boxShadow: "0 4px 16px rgba(37,211,102,0.3)",
                }}
              >
                <MessageCircle size={17} fill="white" /> Chat on WhatsApp
              </a>
              <Link
                href="/products"
                className="hover:-translate-y-0.5 transition-all"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "13px 28px",
                  borderRadius: "4px",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                }}
              >
                Browse Products
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
