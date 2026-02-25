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
      <section className="sticky top-0 z-30 bg-background-secondary/95 backdrop-blur-sm border-b border-border-primary/60">
        <div className="px-4 sm:px-6 lg:px-8 pt-4 pb-4 md:pt-8 md:pb-5 max-w-6xl mx-auto">
          <div className="flex items-start justify-between gap-3 mb-4 md:mb-5 motion-safe:animate-fade-up">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground-primary tracking-tight leading-none">
                Product Catalogue
              </h1>
              <p className="text-foreground-tertiary text-xs sm:text-sm mt-1">
                Compare scales, spare parts, and service solutions in one place.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-semibold text-primary-700 bg-primary-50 border border-primary-100 px-3 py-1.5 rounded-full shrink-0">
              <Sparkles size={13} />
              Verified products
            </div>
          </div>

          <form action="/products" method="get" className="relative max-w-6xl mx-auto motion-safe:animate-fade-up">
            {selectedCategory !== "All" && (
              <input type="hidden" name="category" value={selectedCategory} />
            )}

            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search size={17} className="text-foreground-muted" />
            </div>

            <input
              type="text"
              name="q"
              defaultValue={searchQuery}
              placeholder="Search by model, category, or use case"
              className="w-full h-11 sm:h-12 pl-11 pr-28 bg-white rounded-full border border-border-primary shadow-xs text-foreground-primary placeholder-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary-600/25 focus:border-primary-400 text-sm transition"
            />

            <button
              type="submit"
              className="absolute inset-y-1.5 right-1.5 inline-flex items-center gap-1.5 px-3 sm:px-4 rounded-full bg-primary-600 text-white text-xs font-semibold hover:bg-primary-700 transition-colors"
            >
              <SlidersHorizontal size={14} />
              Filter
            </button>
          </form>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 mt-4 md:mt-6 max-w-6xl mx-auto">
        <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-1 motion-safe:animate-fade-up">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <Link
                key={category}
                href={createCategoryHref(category)}
                className={
                  isActive
                    ? "shrink-0 px-4 py-2 bg-foreground-primary text-white font-semibold rounded-full text-xs shadow-sm"
                    : "shrink-0 px-4 py-2 bg-white text-foreground-secondary font-medium rounded-full text-xs hover:bg-primary-50 hover:text-primary-600 border border-border-primary transition shadow-xs"
                }
              >
                {category}
              </Link>
            );
          })}
        </div>

        <div className="mt-3 flex items-center justify-between gap-2 text-xs sm:text-sm text-foreground-secondary motion-safe:animate-fade-up">
          <p>
            Showing <span className="font-semibold text-foreground-primary">{productList.length}</span>{" "}
            {productList.length === 1 ? "product" : "products"}
            {selectedCategory !== "All" && (
              <>
                {" "}in <span className="font-semibold text-primary-700">{selectedCategory}</span>
              </>
            )}
          </p>

          {hasActiveFilters && (
            <Link href="/products" className="text-primary-700 font-semibold hover:text-primary-800">
              Clear filters
            </Link>
          )}
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 mt-5 sm:mt-7 max-w-6xl mx-auto motion-safe:animate-fade-up">
        {productList.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
            {productList.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 sm:py-24 bg-white rounded-3xl border border-dashed border-border-secondary mx-auto max-w-lg">
            <div className="w-14 h-14 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-primary-400" />
            </div>
            <p className="text-foreground-primary font-semibold">No matching products found</p>
            <p className="text-foreground-tertiary text-sm mt-1 px-4">
              Try another category or use shorter search keywords.
            </p>
            <Link
              href="/products"
              className="inline-flex mt-5 px-4 py-2 rounded-full bg-primary-600 text-white text-xs font-semibold hover:bg-primary-700 transition-colors"
            >
              View all products
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
