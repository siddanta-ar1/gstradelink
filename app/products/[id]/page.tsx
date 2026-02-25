import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, MessageCircle, ShieldCheck, Truck, Wrench } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await props.params;
  const { data: product } = await supabase
    .from("products")
    .select("name, short_description, category")
    .eq("id", id)
    .single();

  if (!product) return { title: "Product Not Found" };

  return {
    title: product.name,
    description:
      product.short_description ??
      `${product.category} available at GSTradeLink Bharatpur. Contact us for pricing and availability.`,
  };
}

export default async function ProductDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !product) notFound();

  const waMsg = `Hello GSTradeLink! I'm interested in the ${product.name}. Could you please share availability and pricing?`;
  const waLink = `https://wa.me/9779765662427?text=${encodeURIComponent(waMsg)}`;
  return (
    <div className="min-h-screen bg-background-secondary pb-28 md:pb-12">
      <section className="bg-linear-to-br from-primary-700 via-primary-800 to-primary-900 text-white">
        <div className="w-full xl:px-12 mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          <div className="flex items-center justify-between gap-3 motion-safe:animate-fade-up">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm text-xs sm:text-sm font-semibold hover:bg-white/25 transition-colors"
            >
              <ArrowLeft size={16} /> Back to catalogue
            </Link>

            <span className="text-white/80 text-xs sm:text-sm font-medium rounded-full border border-white/20 px-3 py-1">
              {product.category}
            </span>
          </div>
        </div>
      </section>

      <section className="w-full xl:px-12 mx-auto px-4 sm:px-6 lg:px-8 -mt-5 sm:-mt-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
          <article className="bg-white border border-border-primary rounded-3xl p-4 sm:p-5 lg:p-6 shadow-sm motion-safe:animate-fade-up">
            <div className="relative bg-primary-50 rounded-2xl overflow-hidden" style={{ aspectRatio: "1 / 1" }}>
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-contain p-4 sm:p-6"
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  priority
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-6xl text-primary-200">⚖️</div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-3 sm:mt-4 text-[11px] sm:text-xs">
              <div className="bg-primary-50 border border-primary-100 rounded-xl p-2.5 sm:p-3 text-center text-primary-700 font-semibold">
                Calibratable
              </div>
              <div className="bg-primary-50 border border-primary-100 rounded-xl p-2.5 sm:p-3 text-center text-primary-700 font-semibold">
                Warranty support
              </div>
              <div className="bg-primary-50 border border-primary-100 rounded-xl p-2.5 sm:p-3 text-center text-primary-700 font-semibold">
                On-site service
              </div>
            </div>
          </article>

          <article className="bg-white border border-border-primary rounded-3xl p-5 sm:p-6 lg:p-7 shadow-sm motion-safe:animate-fade-up">
            <span className="inline-flex text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-primary-50 text-primary-700 border border-primary-100 mb-3">
              {product.category}
            </span>

            <h1 className="text-2xl sm:text-3xl font-bold text-foreground-primary leading-tight">
              {product.name}
            </h1>

            <p className="mt-3 text-sm sm:text-base text-foreground-secondary leading-relaxed">
              {product.short_description ||
                "High-precision weighing instrument designed for retail, industrial, and professional workflows."}
            </p>

            <div className="mt-5 p-4 sm:p-5 bg-primary-50 border border-primary-100 rounded-2xl space-y-3">
              <div className="flex items-start gap-2.5 text-sm text-primary-800">
                <ShieldCheck size={18} className="text-primary-600 shrink-0 mt-0.5" />
                <span>Genuine products with trusted after-sales support.</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-primary-800">
                <Wrench size={18} className="text-primary-600 shrink-0 mt-0.5" />
                <span>Setup, maintenance, and repair services available.</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-primary-800">
                <Truck size={18} className="text-primary-600 shrink-0 mt-0.5" />
                <span>Fast delivery and support in Bharatpur and nearby areas.</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 h-12 rounded-full bg-[#25D366] text-white text-sm font-bold hover:brightness-110 transition"
              >
                <MessageCircle size={18} fill="white" /> Chat on WhatsApp
              </a>
              <a
                href="tel:+9779765662427"
                className="inline-flex flex-1 items-center justify-center gap-2 h-12 rounded-full border border-primary-600 text-primary-700 text-sm font-bold hover:bg-primary-50 transition"
              >
                Call for pricing
              </a>
            </div>
          </article>
        </div>
      </section>

      <div className="fixed bottom-0 left-0 w-full px-4 sm:px-6 pb-6 pt-4 bg-linear-to-t from-background-secondary via-background-secondary/95 to-transparent md:hidden z-40">
        <div className="max-w-lg mx-auto">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 h-12 bg-primary-600 text-white rounded-full text-sm font-bold shadow-green hover:bg-primary-700 active:scale-[0.98] transition-all"
          >
            <MessageCircle size={18} fill="white" />
            Enquire on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
