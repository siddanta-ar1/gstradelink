import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { supabase } from "@/lib/supabase";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";
import type { Product } from "@/types";

export const revalidate = 60;

// ── All product categories used across the site ──────────────────────────────
const CATEGORIES = [
  "All",
  "Precision & Pocket Mini Scales",
  "Kitchen & Compact Tabletop Scales",
  "Portable & Luggage Scales",
  "Heavy-Duty Hanging & Crane Scales",
  "Personal Health & Bathroom Scales",
  "Packaging & Miscellaneous Equipment",
  "Service",
] as const;

type Category = (typeof CATEGORIES)[number];

// Short labels for the filter chip UI
const CATEGORY_LABELS: Record<Category, string> = {
  All: "All",
  "Precision & Pocket Mini Scales": "Precision",
  "Kitchen & Compact Tabletop Scales": "Kitchen",
  "Portable & Luggage Scales": "Luggage",
  "Heavy-Duty Hanging & Crane Scales": "Industrial",
  "Personal Health & Bathroom Scales": "Health & Baby",
  "Packaging & Miscellaneous Equipment": "Packaging",
  Service: "Services",
};

function getFirstParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

/**
 * Normalise the raw URL parameter to a known category.
 * Unlike the old version this does NOT fall back to "All" for valid category
 * strings that aren't in the short-form list — it accepts any known category.
 */
function normalizeCategory(value?: string): Category {
  if (!value) return "All";
  // Exact match against the full category list (including long-form names)
  const match = CATEGORIES.find((c) => c.toLowerCase() === value.toLowerCase());
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

  const createCategoryHref = (category: Category) => {
    const params = new URLSearchParams();
    if (category !== "All") params.set("category", category);
    if (searchQuery) params.set("q", searchQuery);
    const query = params.toString();
    return query ? `/products?${query}` : "/products";
  };

  const hasActiveFilters = selectedCategory !== "All" || Boolean(searchQuery);

  return (
    <div className="min-h-screen bg-background-secondary pb-28 md:pb-12">
      {/* ── Sticky header + search bar ─────────────────────────── */}
      <section
        className="sticky top-0 z-30 backdrop-blur-md shadow-sm border-b"
        style={{
          background: "rgba(232, 235, 227, 0.94)",
          borderColor: "rgba(203, 220, 235, 0.5)",
        }}
      >
        <div className="max-w-[1600px] w-full px-4 sm:px-6 lg:px-8 xl:px-12 pt-5 pb-5 md:pt-8 md:pb-6 mx-auto">
          {/* Page title */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 md:mb-8 motion-safe:animate-fade-up">
            <div>
              <p
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "#557BAA",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "6px",
                }}
              >
                Our Inventory
              </p>
              <h1
                className="font-bold tracking-tight leading-none"
                style={{
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  color: "#1A2433",
                  letterSpacing: "-0.02em",
                }}
              >
                Product Catalogue
              </h1>
              <p
                style={{
                  color: "#5C6B7B",
                  fontSize: "0.875rem",
                  marginTop: "8px",
                  maxWidth: "30rem",
                  lineHeight: 1.6,
                }}
              >
                Precision scales, genuine spare parts, and professional service
                — all in one place.
              </p>
            </div>

            <div
              className="hidden sm:flex items-center gap-1.5 shrink-0"
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                color: "#3E5E85",
                background: "#EEF4FB",
                padding: "6px 14px",
                borderRadius: "4px",
                border: "1px solid rgba(110, 148, 197, 0.25)",
              }}
            >
              <Sparkles size={13} style={{ color: "#DCA963" }} />
              Verified products
            </div>
          </div>

          {/* Search bar */}
          <form
            action="/products"
            method="get"
            className="relative w-full mx-auto motion-safe:animate-fade-up"
          >
            {selectedCategory !== "All" && (
              <input type="hidden" name="category" value={selectedCategory} />
            )}

            <div className="relative flex items-center w-full bg-white border border-border-primary rounded-full shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-primary-600 focus-within:border-primary-600 transition-all">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search size={18} className="text-foreground-tertiary" />
              </div>

              <input
                type="text"
                name="q"
                defaultValue={searchQuery}
                placeholder="Search by model, category, or use case…"
                className="w-full h-12 sm:h-14 pl-11 pr-28 bg-transparent text-sm text-foreground-primary placeholder:text-foreground-muted transition-all focus:outline-none"
              />

              <button
                type="submit"
                className="absolute inset-y-1.5 right-1.5 inline-flex items-center gap-1.5 px-4 sm:px-5 text-xs font-bold rounded-full bg-primary-600 text-white shadow-sm hover:bg-primary-700 hover:-translate-y-0.5 transition-all h-[calc(100%-12px)]"
              >
                <SlidersHorizontal size={14} />
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ── Category filter chips ───────────────────────────────── */}
      <section className="max-w-[1600px] w-full px-4 sm:px-6 lg:px-8 xl:px-12 mt-6 md:mt-8 mx-auto">
        <div className="flex overflow-x-auto hide-scrollbar gap-2.5 pb-1 motion-safe:animate-fade-up">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <Link
                key={category}
                href={createCategoryHref(category)}
                className={`inline-flex items-center justify-center px-4 py-2 text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-primary-600 text-white shadow-sm"
                    : "bg-white text-foreground-secondary border border-border-primary hover:bg-background-tertiary hover:text-primary-600 hover:border-primary-200"
                }`}
                style={{ borderRadius: "9999px" }}
              >
                {CATEGORY_LABELS[category]}
              </Link>
            );
          })}
        </div>

        {/* Result count + clear filters */}
        <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 motion-safe:animate-fade-up">
          <p style={{ fontSize: "0.85rem", color: "#5C6B7B" }}>
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
                    fontSize: "0.78rem",
                  }}
                >
                  {CATEGORY_LABELS[selectedCategory]}
                </span>
              </>
            )}
          </p>

          {hasActiveFilters && (
            <Link
              href="/products"
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "#DCA963",
                textDecoration: "underline",
              }}
              className="hover:text-[#C28D44] transition-colors"
            >
              Clear filters
            </Link>
          )}
        </div>
      </section>

      {/* ── Product grid ───────────────────────────────────────── */}
      <section className="max-w-[1600px] w-full px-4 sm:px-6 lg:px-8 xl:px-12 mt-5 sm:mt-6 mx-auto motion-safe:animate-fade-up">
        {productList.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-5">
            {productList.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div
            className="text-center py-20 px-6 sm:px-12 mx-auto max-w-xl"
            style={{
              background: "#FFFFFF",
              borderRadius: "4px",
              border: "1.5px dashed #CBDCEB",
              boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
            }}
          >
            <div
              className="mx-auto mb-5 flex items-center justify-center"
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "4px",
                background: "#EEF4FB",
              }}
            >
              <Search size={26} style={{ color: "#6D94C5" }} />
            </div>
            <p
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "#1A2433",
                marginBottom: "6px",
              }}
            >
              No matching products found
            </p>
            <p
              style={{
                fontSize: "0.9rem",
                color: "#5C6B7B",
                lineHeight: 1.6,
              }}
            >
              We couldn&apos;t find anything matching your current filters. Try
              adjusting your search or browsing a different category.
            </p>
            <Link
              href="/products"
              className="inline-flex mt-6 transition-all hover:-translate-y-0.5"
              style={{
                padding: "12px 28px",
                borderRadius: "4px",
                background: "#3E5E85",
                color: "#ffffff",
                fontSize: "0.85rem",
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 4px 16px rgba(62, 94, 133, 0.2)",
              }}
            >
              View all products
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
