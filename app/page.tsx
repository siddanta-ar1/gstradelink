import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, CheckCircle, Phone,
  Wrench, Shield, Star, MapPin, Clock,
  ChevronRight, MessageCircle,
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
    .limit(4);
  return data ?? [];
}

const CATEGORY_META: Record<string, { label: string; emoji: string; bg: string }> = {
  "Retail Scale": { label: "Retail Scales", emoji: "🏪", bg: "bg-primary-50" },
  "Industrial Scale": { label: "Industrial", emoji: "🏭", bg: "bg-amber-50" },
  "Spare Part": { label: "Spare Parts", emoji: "🔧", bg: "bg-primary-100" },
  "Service": { label: "Services", emoji: "🛠️", bg: "bg-green-50" },
};

export default async function Home() {
  const [featuredCategories, featuredProducts] = await Promise.all([
    getFeaturedCategories(),
    getFeaturedProducts(),
  ]);

  return (
    <div className="min-h-screen bg-background-secondary flex flex-col">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative bg-linear-to-br from-primary-700 via-primary-800 to-primary-900 text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Ccircle cx='4' cy='4' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute right-0 top-0 w-64 h-64 sm:w-96 sm:h-96 bg-primary-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-56 h-56 sm:w-72 sm:h-72 bg-accent-400/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

        <div className="relative z-10 px-5 sm:px-8 pt-16 pb-16 sm:pt-20 sm:pb-20 max-w-3xl mx-auto text-center motion-safe:animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm font-medium mb-6 sm:mb-8">
            <CheckCircle size={13} className="text-accent-400 shrink-0" />
            Trusted Since 2015 • Bharatpur, Chitwan
          </div>

          <h1 className="text-[2rem] sm:text-4xl lg:text-5xl font-bold leading-[1.15] tracking-tight mb-4 sm:mb-5 text-white">
            Professional{" "}
            <span className="text-accent-400">Weighing</span>{" "}
            Solutions in Chitwan
          </h1>

          <p className="text-sm sm:text-base text-primary-100 mb-8 sm:mb-10 leading-relaxed max-w-lg mx-auto">
            Authorized dealer for digital scales &amp; beam balances.
            Expert repair services and genuine spare parts in Bharatpur.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-xs sm:max-w-none mx-auto">
            <Link
              href="/products"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-primary-600 font-bold text-sm hover:bg-primary-50 hover:-translate-y-0.5 shadow-lg transition-all"
            >
              Shop Products <ArrowRight size={15} />
            </Link>
            <a
              href="https://wa.me/9779765662427"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] text-white font-bold text-sm hover:brightness-110 hover:-translate-y-0.5 shadow-lg transition-all"
            >
              <MessageCircle size={15} fill="white" /> WhatsApp
            </a>
          </div>
        </div>

      </section>

      {/* ── STATS BAR ────────────────────────────────────────────── */}
      <section className="bg-background-secondary motion-safe:animate-fade-up border-b border-border-primary/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 divide-x divide-border-primary">
            {[
              { value: "500+", label: "Customers" },
              { value: "8+", label: "Yrs Experience" },
              { value: "24h", label: "Response" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center py-6 sm:py-8 gap-1 px-2">
                <div className="text-xl sm:text-3xl font-bold text-primary-600">{value}</div>
                <div className="text-[10px] sm:text-xs text-foreground-tertiary text-center whitespace-nowrap">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────────────── */}
      <section className="py-14 sm:py-16 bg-background-primary motion-safe:animate-fade-up">
        <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground-primary mb-2">
              Browse by Category
            </h2>
            <p className="text-foreground-secondary text-xs sm:text-sm max-w-xs sm:max-w-md mx-auto">
              From retail counters to heavy-duty industrial platforms.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {featuredCategories.map(({ category, product }) => {
              const meta = CATEGORY_META[category];
              return (
                <Link
                  key={category}
                  href={`/products?category=${encodeURIComponent(category)}`}
                  className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-background-secondary hover:shadow-lg transition-all hover:-translate-y-1"
                  style={{ aspectRatio: "1/1" }}
                >
                  {product?.image_url ? (
                    <Image
                      src={product.image_url} alt={meta.label} fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                  ) : (
                    <div className={`absolute inset-0 ${meta.bg} flex items-center justify-center text-3xl sm:text-4xl`}>
                      {meta.emoji}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-primary-900/80 via-primary-900/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                    <span className="text-white font-semibold text-xs sm:text-sm block">{meta.label}</span>
                    <span className="flex items-center gap-0.5 text-white/60 text-[10px] sm:text-xs mt-0.5">
                      View all <ChevronRight size={10} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ────────────────────────────────────── */}
      {featuredProducts.length > 0 && (
        <section className="py-14 sm:py-16 bg-background-secondary motion-safe:animate-fade-up">
          <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground-primary">
                  Featured Products
                </h2>
                <p className="text-foreground-tertiary text-xs sm:text-sm mt-0.5">Our most popular equipment</p>
              </div>
              <Link
                href="/products"
                className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors shrink-0"
              >
                View all <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {featuredProducts.map((product) => {
                const waMsg = `Hello GSTradeLink! I'm interested in the ${product.name}. Could you please share availability and pricing?`;
                const waLink = `https://wa.me/9779765662427?text=${encodeURIComponent(waMsg)}`;
                return (
                  <div
                    key={product.id}
                    className="group bg-background-primary rounded-2xl sm:rounded-3xl overflow-hidden hover:shadow-md transition-all hover:-translate-y-1 flex flex-col"
                  >
                    <Link href={`/products/${product.id}`} className="block relative bg-primary-50 overflow-hidden rounded-t-2xl sm:rounded-t-3xl" style={{ aspectRatio: "1/1" }}>
                      {product.image_url ? (
                        <Image
                          src={product.image_url} alt={product.name} fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 640px) 50vw, 25vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-3xl">⚖️</div>
                      )}
                    </Link>
                    <div className="p-3 sm:p-4 flex flex-col flex-1">
                      <Link href={`/products/${product.id}`}>
                        <h3 className="font-semibold text-foreground-primary text-xs sm:text-sm line-clamp-2 mb-2 hover:text-primary-600 transition-colors leading-snug">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="mt-auto">
                        <a
                          href={waLink} target="_blank" rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-1.5 py-2 sm:py-2.5 rounded-xl bg-primary-600 text-white text-[11px] sm:text-xs font-bold hover:bg-primary-700 transition-colors"
                        >
                          <MessageCircle size={12} fill="white" /> Enquire
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── WHY CHOOSE US ────────────────────────────────────────── */}
      <section className="py-14 sm:py-16 bg-background-primary motion-safe:animate-fade-up">
        <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground-primary mb-2">
              Why Choose Us?
            </h2>
            <p className="text-foreground-secondary text-xs sm:text-sm max-w-xs mx-auto">
              8+ years of weighing expertise in Bharatpur.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {[
              { icon: Wrench, title: "Expert Repair", desc: "All brands by certified technicians", color: "bg-primary-600" },
              { icon: Shield, title: "Genuine Parts", desc: "Authorized distributor, original spares", color: "bg-accent-600" },
              { icon: CheckCircle, title: "OIML Calibration", desc: "Govt-recognized certificates", color: "bg-primary-700" },
              { icon: Clock, title: "24h Response", desc: "Fast on-site across Chitwan", color: "bg-primary-500" },
              { icon: Star, title: "500+ Customers", desc: "Serving businesses since 2015", color: "bg-accent-500" },
              { icon: MapPin, title: "Walk-in Store", desc: "Bharatpur-10, Chitwan", color: "bg-primary-600" },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div
                key={title}
                className="flex items-center gap-4 p-4 sm:p-5 bg-background-secondary rounded-2xl border border-border-primary hover:border-primary-200 hover:shadow-sm transition-all"
              >
                <div className={`w-9 h-9 sm:w-11 sm:h-11 ${color} rounded-xl flex items-center justify-center shrink-0`}>
                  <Icon size={16} className="text-white" />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-foreground-primary text-sm mb-0.5 truncate">{title}</div>
                  <div className="text-foreground-secondary text-xs leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHATSAPP CTA ─────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-primary-600 motion-safe:animate-fade-up">
        <div className="px-5 sm:px-8 text-center max-w-xl mx-auto">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3">
            Ready to get a quote?
          </h2>
          <p className="text-primary-200 text-xs sm:text-sm mb-7 sm:mb-8 leading-relaxed">
            Message us on WhatsApp — we respond within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-xs sm:max-w-none mx-auto">
            <a
              href="https://wa.me/9779765662427"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#25D366] text-white font-bold text-sm hover:brightness-110 hover:-translate-y-0.5 shadow-lg transition-all"
            >
              <MessageCircle size={17} fill="white" /> Chat on WhatsApp
            </a>
            <a
              href="tel:+9779765662427"
              className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/15 border border-white/30 text-white font-bold text-sm hover:bg-white/25 hover:-translate-y-0.5 transition-all"
            >
              <Phone size={15} /> Call Now
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
