import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { supabase } from "@/lib/supabase";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";
import type { Product } from "@/types";

export const revalidate = 60;

const categories = [
  "All",
  "Retail Scale",
  "Industrial Scale",
  "Spare Part",
  "Service",
] as const;

type Category = (typeof categories)[number];

function getFirstParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

function normalizeCategory(value?: string): Category {
  if (!value) return "All";
  return (categories as readonly string[]).includes(value)
    ? (value as Category)
    : "All";
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
      <section
        className="sticky top-0 z-30 backdrop-blur-md shadow-sm border-b"
        style={{ background: "rgba(245,239,230,0.92)", borderColor: "rgba(203,220,235,0.6)" }}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 pt-5 pb-5 md:pt-8 md:pb-6 mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5 md:mb-6 motion-safe:animate-fade-up">
            <div>
              <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#557BAA", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>
                Our Inventory
              </p>
              <h1
                className="font-bold tracking-tight leading-none"
                style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#1A2433", letterSpacing: "-0.02em" }}
              >
                Product Catalogue
              </h1>
              <p style={{ color: "#5C6B7B", fontSize: "0.9rem", marginTop: "8px", maxWidth: "28rem", lineHeight: 1.6 }}>
                Explore precision scales, genuine spare parts, and professional service solutions across Nepal.
              </p>
            </div>
            <div
              className="hidden sm:flex items-center gap-1.5 shrink-0"
              style={{
                fontSize: "0.72rem", fontWeight: 700, color: "#3E5E85",
                background: "#E6F0FA", padding: "6px 14px", borderRadius: "9999px",
                border: "1px solid rgba(147,178,214,0.3)"
              }}
            >
              <Sparkles size={13} style={{ color: "#DCA963" }} />
              Verified products
            </div>
          </div>

          <form action="/products" method="get" className="relative w-full mx-auto motion-safe:animate-fade-up">
            {selectedCategory !== "All" && (
              <input type="hidden" name="category" value={selectedCategory} />
            )}

            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search size={18} style={{ color: "#93B2D6" }} />
            </div>

            <input
              type="text"
              name="q"
              defaultValue={searchQuery}
              placeholder="Search by model, category, or use case..."
              className="w-full h-12 sm:h-14 pl-12 pr-28 bg-white rounded-full border text-sm transition-all focus:outline-none"
              style={{
                borderColor: "#E0D5B8",
                boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                color: "#1A2433",
              }}
            />

            <button
              type="submit"
              className="absolute inset-y-1.5 right-1.5 inline-flex items-center gap-1.5 px-4 sm:px-5 rounded-full text-xs font-bold transition-transform hover:-translate-y-0.5"
              style={{
                background: "#6D94C5",
                color: "#ffffff",
                boxShadow: "0 2px 8px rgba(109,148,197,0.35)",
              }}
            >
              <SlidersHorizontal size={14} />
              Filter
            </button>
          </form>
        </div>
      </section>

      <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 mt-4 md:mt-6 mx-auto">
        <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-1 motion-safe:animate-fade-up">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <Link
                key={category}
                href={createCategoryHref(category)}
                style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  padding: "8px 20px", borderRadius: "9999px",
                  fontSize: "0.75rem", fontWeight: isActive ? 700 : 600,
                  background: isActive ? "#3E5E85" : "#FFFFFF",
                  color: isActive ? "#ffffff" : "#5C6B7B",
                  border: isActive ? "1px solid #3E5E85" : "1px solid #E0D5B8",
                  boxShadow: isActive ? "0 4px 12px rgba(62,94,133,0.3)" : "0 2px 6px rgba(0,0,0,0.03)",
                  transition: "all 0.2s",
                  textDecoration: "none",
                }}
                className={!isActive ? "hover:-translate-y-0.5 hover:border-[#93B2D6] hover:text-[#3E5E85]" : ""}
              >
                {category}
              </Link>
            );
          })}
        </div>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 motion-safe:animate-fade-up">
          <p style={{ fontSize: "0.85rem", color: "#5C6B7B" }}>
            Showing <span style={{ fontWeight: 700, color: "#1A2433" }}>{productList.length}</span>{" "}
            {productList.length === 1 ? "product" : "products"}
            {selectedCategory !== "All" && (
              <>
                {" "}in <span style={{ fontWeight: 700, color: "#557BAA", padding: "2px 8px", background: "#E6F0FA", borderRadius: "6px" }}>{selectedCategory}</span>
              </>
            )}
          </p>

          {hasActiveFilters && (
            <Link
              href="/products"
              style={{ fontSize: "0.75rem", fontWeight: 700, color: "#DCA963", textDecoration: "underline" }}
              className="hover:text-[#C28D44]"
            >
              Clear filters
            </Link>
          )}
        </div>
      </section>

      <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 mt-5 sm:mt-7 mx-auto motion-safe:animate-fade-up">
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
              borderRadius: "24px",
              border: "1.5px dashed #D4C6A0",
              boxShadow: "0 8px 30px rgba(0,0,0,0.03)",
            }}
          >
            <div
              className="mx-auto mb-5"
              style={{
                width: "60px", height: "60px", borderRadius: "50%",
                background: "#E6F0FA", display: "flex", alignItems: "center", justifyContent: "center"
              }}
            >
              <Search size={26} style={{ color: "#6D94C5" }} />
            </div>
            <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1A2433", marginBottom: "6px" }}>
              No matching products found
            </p>
            <p style={{ fontSize: "0.9rem", color: "#5C6B7B", lineHeight: 1.6 }}>
              We couldn't find anything matching your current filters. Try adjusting your search or category.
            </p>
            <Link
              href="/products"
              className="inline-flex mt-6 transition-transform hover:-translate-y-0.5"
              style={{
                padding: "12px 28px", borderRadius: "9999px",
                background: "#3E5E85", color: "#ffffff",
                fontSize: "0.85rem", fontWeight: 700, textDecoration: "none",
                boxShadow: "0 4px 16px rgba(62,94,133,0.3)"
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
