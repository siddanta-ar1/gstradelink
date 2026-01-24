import { ProductCard } from "@/components/products/ProductCard";
import { supabase } from "@/lib/supabase";

// This makes the page update dynamically if you add products
export const revalidate = 0;

export default async function ProductsPage() {
  // Fetch products from Supabase
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true) // Only show active items
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <main className="min-h-screen bg-bg-main py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4">
            Our Catalogue
          </h1>
          <p className="text-brand-muted max-w-2xl">
            Browse our selection of digital balances and spare parts. Prices are
            available upon request to ensure the best daily rates.
          </p>
        </div>

        {/* Product Grid */}
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-20 bg-white rounded-lg border border-dashed border-slate-300">
            <p className="text-slate-500">
              No products found in the catalogue yet.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
