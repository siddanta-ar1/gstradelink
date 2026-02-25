import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, CheckCircle, Phone,
  Wrench, Shield, Star, MapPin, Clock,
  ChevronRight, MessageCircle, Users, Award, Zap,
} from "lucide-react";

export const revalidate = 60;

async function getFeaturedCategories() {
  const categories = ["Retail Scale", "Industrial Scale", "Spare Part", "Service"] as const;
  const results = await Promise.all(
    categories.map(async (cat) => {
      const { data } = await supabase
        .from("products").select("id, name, category, image_url")
        .eq("category", cat).eq("is_active", true)
        .order("created_at", { ascending: false }).limit(1).single();
      return { category: cat, product: data };
    })
  );
  return results;
}

async function getFeaturedProducts() {
  const { data } = await supabase
    .from("products")
    .select("id, name, short_description, category, image_url")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(6);
  return data ?? [];
}

const CATEGORY_META: Record<string, { label: string; emoji: string; bg: string; desc: string }> = {
  "Retail Scale": { label: "Retail Scales", emoji: "🏪", bg: "bg-primary-50", desc: "For shops & counters" },
  "Industrial Scale": { label: "Industrial", emoji: "🏭", bg: "bg-amber-50", desc: "Heavy-duty platforms" },
  "Spare Part": { label: "Spare Parts", emoji: "🔧", bg: "bg-primary-100", desc: "Genuine components" },
  "Service": { label: "Services", emoji: "🛠️", bg: "bg-green-50", desc: "Repair & calibration" },
};

export default async function Home() {
  const [featuredCategories, featuredProducts] = await Promise.all([
    getFeaturedCategories(),
    getFeaturedProducts(),
  ]);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#E8EBE3" }}>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section
        className="relative text-white overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #3E5E85 0%, #557BAA 50%, #6D94C5 100%)",
          minHeight: "520px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Dot-grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Ccircle cx='4' cy='4' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "40px 40px",
            opacity: 0.06,
          }}
        />
        {/* Decorative glows */}
        <div
          className="absolute pointer-events-none"
          style={{
            right: 0, top: 0, width: "400px", height: "400px",
            background: "radial-gradient(circle, rgba(230,240,250,0.15) 0%, transparent 70%)",
            transform: "translate(30%, -40%)",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            left: 0, bottom: 0, width: "320px", height: "320px",
            background: "radial-gradient(circle, rgba(203,220,235,0.1) 0%, transparent 70%)",
            transform: "translate(-30%, 40%)",
          }}
        />

        <div className="relative z-10 w-full px-5 sm:px-8 py-16 sm:py-20" style={{ maxWidth: "48rem", margin: "0 auto", textAlign: "center" }}>
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium mb-6 sm:mb-8"
            style={{
              padding: "6px 16px",
              borderRadius: "9999px",
              background: "rgba(255,255,255,0.10)",
              border: "1px solid rgba(255,255,255,0.20)",
            }}
          >
            <CheckCircle size={13} style={{ color: "#DCA963", flexShrink: 0 }} />
            <span>Trusted Since 2015 • Bharatpur, Chitwan</span>
          </div>

          <h1
            className="font-bold text-white mb-5"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            Professional{" "}
            <span style={{ color: "#DCA963" }}>Weighing</span>{" "}
            Solutions in Chitwan
          </h1>

          <p
            className="mb-10"
            style={{
              fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
              color: "#E6F0FA",
              lineHeight: 1.7,
              maxWidth: "36rem",
              margin: "0 auto 2.5rem",
            }}
          >
            Authorized dealer for digital scales &amp; beam balances.
            Expert repair services and genuine spare parts in Bharatpur.
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
            <Link
              href="/products"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 32px",
                borderRadius: "9999px",
                background: "#F5EFE6",
                color: "#3E5E85",
                fontWeight: 700,
                fontSize: "0.9rem",
                boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                transition: "all 0.2s",
                textDecoration: "none",
              }}
            >
              Shop Products <ArrowRight size={15} />
            </Link>
            <a
              href="https://wa.me/9779765662427"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 32px",
                borderRadius: "9999px",
                background: "#25D366",
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "0.9rem",
                boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                transition: "all 0.2s",
                textDecoration: "none",
              }}
            >
              <MessageCircle size={15} fill="white" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────── */}
      <section style={{ background: "#1A2433", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
            {[
              { value: "500+", label: "Happy Customers", sub: "Businesses served", Icon: Users },
              { value: "8+", label: "Years Experience", sub: "In Bharatpur since 2015", Icon: Award },
              { value: "24h", label: "Response Time", sub: "Fast on-site service", Icon: Zap },
            ].map(({ value, label, sub, Icon }, i) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "36px 16px",
                  textAlign: "center",
                  borderRight: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
                  gap: "6px",
                }}
              >
                <div
                  style={{
                    width: "44px", height: "44px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: "4px",
                  }}
                >
                  <Icon size={18} style={{ color: "#CBDCEB" }} />
                </div>
                <div style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", fontWeight: 800, color: "#ffffff", lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: "clamp(0.7rem, 1.5vw, 0.85rem)", fontWeight: 600, color: "#93B2D6" }}>{label}</div>
                <div style={{ fontSize: "0.7rem", color: "#5C6B7B", display: "none" } as React.CSSProperties} className="sm:!block">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────────────── */}
      <section className="py-16 lg:py-24" style={{ background: "#F0F2EE" }}>
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <p
              style={{ fontSize: "0.75rem", fontWeight: 700, color: "#557BAA", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}
            >
              What We Offer
            </p>
            <h2
              className="font-bold mb-3"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", color: "#111111", letterSpacing: "-0.025em" }}
            >
              Browse by Category
            </h2>
            <p style={{ color: "#888888", fontSize: "0.9rem", maxWidth: "28rem", margin: "0 auto" }}>
              From retail counters to heavy-duty industrial platforms — we have it all.
            </p>
          </div>

          <div className="relative overflow-hidden w-full group py-4">
            <style>{`
              @keyframes slideMarquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(calc(-50% - 10px)); }
              }
              .animate-marquee {
                animation: slideMarquee 35s linear infinite;
                width: max-content;
              }
              .group:hover .animate-marquee {
                animation-play-state: paused;
              }
              .hide-scrollbar::-webkit-scrollbar { display: none; }
              .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
            <div className="animate-marquee flex gap-4 sm:gap-5 overflow-x-auto hide-scrollbar" style={{ WebkitOverflowScrolling: "touch" }}>
              {/* Duplicate array four times for seamless infinite loop on wide screens */}
              {[...featuredCategories, ...featuredCategories, ...featuredCategories, ...featuredCategories].map(({ category, product }, idx) => {
                const meta = CATEGORY_META[category];
                return (
                  <Link
                    key={`${category}-${idx}`}
                    href={`/products?category=${encodeURIComponent(category)}`}
                    className="relative shrink-0 overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
                    style={{
                      width: "calc(100vw / 2.2)", // Mobile: show ~2 cards
                      maxWidth: "280px", // Desktop: fixed sensible width
                      borderRadius: "20px",
                      aspectRatio: "3/4",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                      display: "block",
                    }}
                  >
                    {product?.image_url ? (
                      <Image
                        src={product.image_url} alt={meta.label} fill
                        className="object-cover transition-transform duration-500 hover:scale-110"
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                    ) : (
                      <div className={`absolute inset-0 ${meta.bg} flex items-center justify-center text-5xl`}>
                        {meta.emoji}
                      </div>
                    )}
                    {/* gradient overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: "linear-gradient(to top, rgba(14,35,23,0.92) 0%, rgba(14,35,23,0.25) 50%, transparent 100%)" }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 pointer-events-none">
                      <span className="text-white font-bold block" style={{ fontSize: "clamp(0.8rem, 2vw, 1rem)", lineHeight: 1.3 }}>{meta.label}</span>
                      <span style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.72rem", display: "block", marginTop: "3px" }}>{meta.desc}</span>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "3px", marginTop: "8px", color: "#DCA963", fontSize: "0.72rem", fontWeight: 700 }}>
                        View all <ChevronRight size={11} />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ────────────────────────────────────── */}
      {featuredProducts.length > 0 && (
        <section className="py-16 lg:py-24" style={{ background: "#E8EBE3" }}>
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 mx-auto">
            {/* Section header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-10 sm:mb-12">
              <div>
                <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#557BAA", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>
                  Top Picks
                </p>
                <h2 className="font-bold" style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", color: "#111111", letterSpacing: "-0.025em" }}>
                  Featured Products
                </h2>
                <p style={{ color: "#888888", fontSize: "0.875rem", marginTop: "6px" }}>Our most popular weighing equipment</p>
              </div>
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 group shrink-0"
                style={{ fontSize: "0.875rem", fontWeight: 700, color: "#557BAA", textDecoration: "none" }}
              >
                Browse all products <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
              {featuredProducts.map((product) => {
                const waMsg = `Hello GSTradeLink! I'm interested in the ${product.name}. Could you please share availability and pricing?`;
                const waLink = `https://wa.me/9779765662427?text=${encodeURIComponent(waMsg)}`;
                return (
                  <div
                    key={product.id}
                    className="group flex flex-col transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background: "#FFFFFF",
                      borderRadius: "20px",
                      overflow: "hidden",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                      border: "1px solid #E0D5B8",
                    }}
                  >
                    {/* Product image */}
                    <Link
                      href={`/products/${product.id}`}
                      className="block relative"
                      style={{ aspectRatio: "4/3", background: "#F5EFE6", overflow: "hidden" }}
                    >
                      {product.image_url ? (
                        <Image
                          src={product.image_url} alt={product.name} fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center" style={{ fontSize: "3rem" }}>⚖️</div>
                      )}
                      {/* Category badge */}
                      <div
                        className="absolute top-2.5 left-2.5"
                        style={{
                          fontSize: "0.65rem", fontWeight: 600,
                          padding: "3px 8px", borderRadius: "9999px",
                          background: "rgba(62,94,133,0.85)", color: "#ffffff",
                          backdropFilter: "blur(4px)",
                        }}
                      >
                        {product.category}
                      </div>
                    </Link>

                    {/* Product info */}
                    <div className="flex flex-col flex-1" style={{ padding: "14px 14px 14px" }}>
                      <Link href={`/products/${product.id}`} style={{ textDecoration: "none" }}>
                        <h3
                          className="font-semibold line-clamp-2 hover:text-primary-600 transition-colors"
                          style={{ fontSize: "clamp(0.78rem, 1.5vw, 0.9rem)", color: "#111111", lineHeight: 1.4, marginBottom: "4px" }}
                        >
                          {product.name}
                        </h3>
                      </Link>
                      {product.short_description && (
                        <p className="line-clamp-1" style={{ color: "#AAAAAA", fontSize: "0.72rem", marginBottom: "10px" }}>
                          {product.short_description}
                        </p>
                      )}
                      <div className="mt-auto flex gap-2">
                        <Link
                          href={`/products/${product.id}`}
                          style={{
                            flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                            padding: "8px 0", borderRadius: "10px",
                            border: "1.5px solid #93B2D6", color: "#3E5E85",
                            fontSize: "0.72rem", fontWeight: 600, textDecoration: "none",
                            background: "transparent",
                          }}
                        >
                          Details
                        </Link>
                        <a
                          href={waLink} target="_blank" rel="noopener noreferrer"
                          style={{
                            flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "5px",
                            padding: "8px 0", borderRadius: "10px",
                            background: "#6D94C5", color: "#ffffff",
                            fontSize: "0.72rem", fontWeight: 700, textDecoration: "none",
                          }}
                        >
                          <MessageCircle size={12} fill="white" /> Enquire
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* View all CTA */}
            <div className="mt-10 text-center">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 transition-all hover:-translate-y-0.5"
                style={{
                  padding: "14px 36px", borderRadius: "9999px",
                  background: "#6D94C5", color: "#ffffff",
                  fontWeight: 700, fontSize: "0.9rem",
                  textDecoration: "none",
                  boxShadow: "0 4px 16px rgba(109,148,197,0.30)",
                }}
              >
                View All Products <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── WHY CHOOSE US ────────────────────────────────────────── */}
      <section className="py-16 lg:py-24" style={{ background: "#F0F2EE" }}>
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#557BAA", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>
              Our Strengths
            </p>
            <h2 className="font-bold mb-3" style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", color: "#111111", letterSpacing: "-0.025em" }}>
              Why Choose GSTradeLink?
            </h2>
            <p style={{ color: "#888888", fontSize: "0.9rem", maxWidth: "28rem", margin: "0 auto" }}>
              8+ years of weighing expertise in Bharatpur — built on trust, quality, and service.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[
              {
                icon: Wrench, title: "Expert Repair",
                desc: "All major brands serviced by certified technicians with years of hands-on experience.",
                iconBg: "linear-gradient(135deg, #557BAA 0%, #3E5E85 100%)",
                cardBorder: "#CBDCEB",
              },
              {
                icon: Shield, title: "Genuine Parts",
                desc: "Authorized distributor stocking only original, manufacturer-approved spare parts.",
                iconBg: "linear-gradient(135deg, #DCA963 0%, #C28D44 100%)",
                cardBorder: "#E8DFCA",
              },
              {
                icon: CheckCircle, title: "OIML Calibration",
                desc: "Govt-recognized calibration certificates accepted by legal & commercial authorities.",
                iconBg: "linear-gradient(135deg, #3E5E85 0%, #1A2433 100%)",
                cardBorder: "#CBDCEB",
              },
              {
                icon: Clock, title: "24h Response",
                desc: "Fast on-site service across all of Chitwan — we come to you when you need us most.",
                iconBg: "linear-gradient(135deg, #93B2D6 0%, #557BAA 100%)",
                cardBorder: "#CBDCEB",
              },
              {
                icon: Star, title: "500+ Customers",
                desc: "Serving retail shops, factories, and institutions across Chitwan since 2015.",
                iconBg: "linear-gradient(135deg, #E6C887 0%, #DCA963 100%)",
                cardBorder: "#E8DFCA",
              },
              {
                icon: MapPin, title: "Walk-in Store",
                desc: "Visit us at Bharatpur-10, Chitwan — showroom open Mon to Sat, 10 AM – 6 PM.",
                iconBg: "linear-gradient(135deg, #1A2433 0%, #3E5E85 100%)",
                cardBorder: "#CBDCEB",
              },
            ].map(({ icon: Icon, title, desc, iconBg, cardBorder }) => (
              <div
                key={title}
                className="group flex flex-col transition-all duration-300 hover:-translate-y-1"
                style={{
                  padding: "28px",
                  background: "#FFFFFF",
                  borderRadius: "20px",
                  border: `1.5px solid ${cardBorder}`,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                {/* Icon */}
                <div
                  className="group-hover:scale-105 transition-transform"
                  style={{
                    width: "52px", height: "52px",
                    background: iconBg,
                    borderRadius: "16px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: "16px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  }}
                >
                  <Icon size={22} color="white" />
                </div>
                <h3 style={{ fontWeight: 700, color: "#111111", fontSize: "1.05rem", marginBottom: "8px" }}>{title}</h3>
                <p style={{ color: "#666666", fontSize: "0.875rem", lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHATSAPP CTA ─────────────────────────────────────────── */}
      <section
        className="py-16 lg:py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #3E5E85 0%, #1A2433 60%, #0F172A 100%)" }}
      >
        {/* Decorative blobs */}
        <div
          className="absolute pointer-events-none"
          style={{
            right: 0, top: 0, width: "300px", height: "300px",
            background: "rgba(255,255,255,0.04)",
            borderRadius: "50%",
            transform: "translate(40%, -50%)",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            left: 0, bottom: 0, width: "250px", height: "250px",
            background: "rgba(242,192,71,0.08)",
            borderRadius: "50%",
            transform: "translate(-30%, 50%)",
          }}
        />

        <div className="relative z-10 text-center" style={{ maxWidth: "36rem", margin: "0 auto", padding: "0 20px" }}>
          <div
            className="inline-flex items-center gap-2 mb-5"
            style={{
              padding: "6px 16px", borderRadius: "9999px",
              background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
              fontSize: "0.75rem", color: "#ffffff",
            }}
          >
            <MessageCircle size={12} fill="white" /> Quick Response Guaranteed
          </div>
          <h2
            className="font-bold text-white mb-3"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", letterSpacing: "-0.025em" }}
          >
            Ready to get a quote?
          </h2>
          <p style={{ color: "#E6F0FA", fontSize: "0.9rem", marginBottom: "40px", lineHeight: 1.7 }}>
            Message us on WhatsApp — we respond within 24 hours and deliver across all of Chitwan.
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
                fontWeight: 700, fontSize: "0.9rem",
                textDecoration: "none",
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
                color: "#ffffff", fontWeight: 700, fontSize: "0.9rem",
                textDecoration: "none",
              }}
            >
              <Phone size={15} /> Call Now
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
