import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { CategoryFilterBar } from "@/components/products/CategoryFilterBar";
import { supabase } from "@/lib/supabase";
import { Search, SlidersHorizontal, Sparkles, Wrench } from "lucide-react";
import type { Product } from "@/types";
import type { CategoryChip } from "@/components/products/CategoryFilterBar";

export const revalidate = 60;

// ── All filterable product categories ────────────────────────────────────────
const PRODUCT_CATEGORIES = [
  "All",
  "Precision & Pocket Mini Scales",
  "Kitchen & Compact Tabletop Scales",
  "Portable & Luggage Scales",
  "Heavy-Duty Hanging & Crane Scales",
  "Personal Health & Bathroom Scales",
  "Packaging & Miscellaneous Equipment",
] as const;

type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

// Short display labels for each category chip
const CATEGORY_LABELS: Record<ProductCategory, string> = {
  All: "All",
  "Precision & Pocket Mini Scales": "Precision",
  "Kitchen & Compact Tabletop Scales": "Kitchen",
  "Portable & Luggage Scales": "Luggage",
  "Heavy-Duty Hanging & Crane Scales": "Industrial",
  "Personal Health & Bathroom Scales": "Health & Baby",
  "Packaging & Miscellaneous Equipment": "Packaging",
};

function getFirstParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

function normalizeCategory(value?: string): ProductCategory {
  if (!value) return "All";
  const match = PRODUCT_CATEGORIES.find(
    (c) => c.toLowerCase() === value.toLowerCase(),
  );
  return match ?? "All";
}

export default async function ProductsPage(props: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const searchParams = props.searchParams ? await props.searchParams : {};
  const selectedCategory = normalizeCategory(
    getFirstParam(searchParams.category),
  );
  const rawQuery = getFirstParam(searchParams.q)?.trim() ?? "";
  const searchQuery = rawQuery.slice(0, 60);

  // ── Fetch products ──────────────────────────────────────────────────────────
  let request = supabase
    .from("products")
    .select("id, name, short_description, category, image_url, is_active")
    .eq("is_active", true);

  if (selectedCategory !== "All") {
    request = request.eq("category", selectedCategory);
  }

  if (searchQuery) {
    const sanitized = searchQuery.replace(/[,%]/g, " ");
    request = request.or(
      `name.ilike.%${sanitized}%,short_description.ilike.%${sanitized}%`,
    );
  }

  const { data: products, error } = await request.order("created_at", {
    ascending: false,
  });

  if (error) console.error("Error fetching products:", error);

  const productList: Product[] = (products ?? []) as Product[];

  // ── Build category chip data (pre-computed hrefs for the client component) ──
  const buildCategoryHref = (category: ProductCategory) => {
    const params = new URLSearchParams();
    if (category !== "All") params.set("category", category);
    if (searchQuery) params.set("q", searchQuery);
    const query = params.toString();
    return query ? `/products?${query}` : "/products";
  };

  const categoryChips: CategoryChip[] = [
    ...PRODUCT_CATEGORIES.map((cat) => ({
      category: cat,
      label: CATEGORY_LABELS[cat],
      href: buildCategoryHref(cat),
      isService: false,
    })),
    // Services chip — links directly to the services page (not a product filter)
    {
      category: "services-link",
      label: "Services",
      href: "/services",
      isService: true,
    },
  ];

  const hasActiveFilters = selectedCategory !== "All" || Boolean(searchQuery);
  const activeLabel = CATEGORY_LABELS[selectedCategory];

  return (
    <div className="min-h-screen bg-background-secondary pb-28 md:pb-12">
      {/* ═══════════════════════════════════════════════════════════════════════
          Sticky header — title + search + category chips all together
      ════════════════════════════════════════════════════════════════════════ */}
      <section
        className="sticky top-0 z-30 backdrop-blur-md shadow-sm border-b"
        style={{
          background: "rgba(232, 235, 227, 0.96)",
          borderColor: "rgba(203, 220, 235, 0.5)",
        }}
      >
        <div className="max-w-[1600px] w-full px-4 sm:px-6 lg:px-8 xl:px-12 pt-5 pb-4 md:pt-7 md:pb-5 mx-auto">
          {/* ── Page title row ─────────────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5 md:mb-6 motion-safe:animate-fade-up">
            <div>
              <p
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  color: "#557BAA",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  marginBottom: "5px",
                }}
              >
                Our Inventory
              </p>
              <h1
                className="font-bold tracking-tight leading-none"
                style={{
                  fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
                  color: "#1A2433",
                  letterSpacing: "-0.02em",
                }}
              >
                Product Catalogue
              </h1>
              <p
                className="hidden sm:block"
                style={{
                  color: "#5C6B7B",
                  fontSize: "0.85rem",
                  marginTop: "6px",
                  maxWidth: "32rem",
                  lineHeight: 1.55,
                }}
              >
                Precision scales, genuine spare parts, and professional service
                — all in one place.
              </p>
            </div>

            <div
              className="hidden sm:flex items-center gap-1.5 shrink-0"
              style={{
                fontSize: "0.68rem",
                fontWeight: 700,
                color: "#3E5E85",
                background: "#EEF4FB",
                padding: "5px 12px",
                borderRadius: "4px",
                border: "1px solid rgba(110, 148, 197, 0.25)",
              }}
            >
              <Sparkles size={12} style={{ color: "#DCA963" }} />
              Verified products
            </div>
          </div>

          {/* ── Search bar ─────────────────────────────────────────────────── */}
          <form
            action="/products"
            method="get"
            className="relative w-full mx-auto motion-safe:animate-fade-up mb-4"
          >
            {selectedCategory !== "All" && (
              <input type="hidden" name="category" value={selectedCategory} />
            )}

            <div className="relative flex items-center w-full bg-white border border-border-primary rounded-full shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-primary-600 focus-within:border-primary-600 transition-all">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search size={17} className="text-foreground-tertiary" />
              </div>

              <input
                type="text"
                name="q"
                defaultValue={searchQuery}
                placeholder="Search by model, category, or use case…"
                className="w-full h-11 sm:h-12 pl-10 pr-28 bg-transparent text-sm text-foreground-primary placeholder:text-foreground-muted transition-all focus:outline-none"
              />

              <button
                type="submit"
                className="absolute inset-y-1.5 right-1.5 inline-flex items-center gap-1.5 px-4 sm:px-5 text-xs font-bold rounded-full bg-primary-600 text-white shadow-sm hover:bg-primary-700 hover:-translate-y-0.5 transition-all h-[calc(100%-12px)]"
              >
                <SlidersHorizontal size={13} />
                Search
              </button>
            </div>
          </form>

          {/* ── Category filter chips (draggable, client component) ─────── */}
          <div className="motion-safe:animate-fade-up">
            <div className="rounded-2xl border border-[#D4E1EE] bg-white/70 backdrop-blur-md px-2 sm:px-3 py-2 shadow-sm">
              <CategoryFilterBar
                chips={categoryChips}
                selectedCategory={selectedCategory}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          Result count + clear filters
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1600px] w-full px-4 sm:px-6 lg:px-8 xl:px-12 mt-5 mx-auto motion-safe:animate-fade-up">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <p style={{ fontSize: "0.83rem", color: "#5C6B7B" }}>
            Showing{" "}
            <span style={{ fontWeight: 700, color: "#1A2433" }}>
              {productList.length}
            </span>{" "}
            {productList.length === 1 ? "product" : "products"}
            {selectedCategory !== "All" && (
              <>
                {" "}
                in{" "}
                <span
                  style={{
                    fontWeight: 700,
                    color: "#3E5E85",
                    padding: "2px 10px",
                    background: "#EEF4FB",
                    borderRadius: "9999px",
                    fontSize: "0.76rem",
                  }}
                >
                  {activeLabel}
                </span>
              </>
            )}
            {searchQuery && (
              <>
                {" "}
                for{" "}
                <span
                  style={{
                    fontWeight: 700,
                    color: "#1A2433",
                    fontStyle: "italic",
                  }}
                >
                  &ldquo;{searchQuery}&rdquo;
                </span>
              </>
            )}
          </p>

          {hasActiveFilters && (
            <Link
              href="/products"
              style={{
                fontSize: "0.73rem",
                fontWeight: 700,
                color: "#DCA963",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
              className="hover:text-[#C28D44] transition-colors"
            >
              ✕ Clear filters
            </Link>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          Product grid
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1600px] w-full px-4 sm:px-6 lg:px-8 xl:px-12 mt-4 sm:mt-5 mx-auto motion-safe:animate-fade-up">
        {productList.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
            {productList.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* ── Empty state ───────────────────────────────────────────────── */
          <div
            className="text-center py-16 px-6 sm:px-12 mx-auto max-w-lg mt-4"
            style={{
              background: "#FFFFFF",
              borderRadius: "6px",
              border: "1.5px dashed #CBDCEB",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            <div
              className="mx-auto mb-5 flex items-center justify-center"
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "#EEF4FB",
              }}
            >
              <Search size={24} style={{ color: "#6D94C5" }} />
            </div>

            <p
              style={{
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "#1A2433",
                marginBottom: "8px",
              }}
            >
              No matching products found
            </p>
            <p
              style={{
                fontSize: "0.875rem",
                color: "#5C6B7B",
                lineHeight: 1.65,
                marginBottom: "20px",
              }}
            >
              {searchQuery
                ? `We couldn't find any products matching "${searchQuery}". Try a different term or browse by category.`
                : "We couldn't find anything in this category right now. Try a different filter or view all products."}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center transition-all hover:-translate-y-0.5"
                style={{
                  padding: "10px 24px",
                  borderRadius: "4px",
                  background: "#3E5E85",
                  color: "#ffffff",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  textDecoration: "none",
                  boxShadow: "0 4px 14px rgba(62, 94, 133, 0.22)",
                }}
              >
                View all products
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-1.5 transition-all hover:-translate-y-0.5"
                style={{
                  padding: "10px 24px",
                  borderRadius: "4px",
                  background: "#FFFBF0",
                  color: "#C28D44",
                  border: "1.5px solid #F0D99A",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                <Wrench size={13} />
                Browse services
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          Services CTA banner — shown at the bottom of the "All" view
      ════════════════════════════════════════════════════════════════════════ */}
      {selectedCategory === "All" && !searchQuery && productList.length > 0 && (
        <section className="max-w-[1600px] w-full px-4 sm:px-6 lg:px-8 xl:px-12 mt-8 mx-auto">
          <Link
            href="/services"
            className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:-translate-y-0.5"
            style={{
              background:
                "linear-gradient(135deg, #1A2433 0%, #2B4D72 60%, #3E5E85 100%)",
              borderRadius: "6px",
              padding: "22px 28px",
              textDecoration: "none",
              boxShadow: "0 6px 24px rgba(26,36,51,0.18)",
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className="flex items-center justify-center shrink-0"
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "rgba(220,169,99,0.18)",
                  border: "1.5px solid rgba(220,169,99,0.3)",
                }}
              >
                <Wrench size={20} style={{ color: "#DCA963" }} />
              </div>
              <div>
                <p
                  style={{
                    color: "#FFFFFF",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    marginBottom: "3px",
                  }}
                >
                  Need repair, calibration, or setup?
                </p>
                <p
                  style={{
                    color: "rgba(174,202,233,0.85)",
                    fontSize: "0.8rem",
                    lineHeight: 1.5,
                  }}
                >
                  We offer on-site maintenance, annual calibration, and expert
                  support across Bharatpur &amp; Chitwan.
                </p>
              </div>
            </div>

            <div
              className="shrink-0 inline-flex items-center gap-2 font-bold text-sm transition-all group-hover:gap-3"
              style={{
                padding: "9px 20px",
                borderRadius: "4px",
                background: "#DCA963",
                color: "#1A2433",
              }}
            >
              View Services
              <span aria-hidden="true">→</span>
            </div>
          </Link>
        </section>
      )}
    </div>
  );
}
