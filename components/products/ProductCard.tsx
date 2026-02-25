"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight, Package, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  className?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product, className, onEdit, onDelete, showActions = false,
}) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        "group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col transition-all duration-300",
        "border border-[#E0D5B8] shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
        "hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(62,94,133,0.12)]",
        !product.is_active && "opacity-60",
        className,
      )}
    >
      {/* Image */}
      <Link
        href={`/products/${product.id}`}
        className="relative w-full overflow-hidden rounded-t-2xl sm:rounded-t-3xl bg-[#F5EFE6]"
        style={{ aspectRatio: "1/1" }}
      >
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            priority={false}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-primary-200">
            <Package size={40} className="opacity-30" />
          </div>
        )}

        {/* Category chip */}
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3">
          <span
            className="text-white text-[9px] sm:text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest shadow-sm"
            style={{ background: "rgba(62,94,133,0.85)", backdropFilter: "blur(4px)" }}
          >
            {product.category.replace(" Scale", "").replace(" Part", " Pt")}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 sm:p-5 bg-white relative">
        <Link href={`/products/${product.id}`} className="flex-1 text-decoration-none group/text z-10 w-full">
          <div className="flex items-start justify-between gap-3 mb-1 w-full">
            <h3
              className="font-bold text-sm sm:text-base line-clamp-2 transition-colors leading-snug group-hover/text:text-[#6D94C5]"
              style={{ color: "#1A2433", letterSpacing: "-0.01em" }}
            >
              {product.name}
            </h3>
            <div
              className="w-8 h-8 rounded-full flex flex-shrink-0 items-center justify-center transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:bg-[#6D94C5] group-hover:text-white"
              style={{ background: "#F5EFE6", color: "#3E5E85" }}
            >
              <ArrowUpRight size={16} />
            </div>
          </div>
          <p style={{ fontSize: "0.8rem", color: "#8798AD", lineHeight: 1.5, marginTop: "4px" }} className="line-clamp-1 group-hover/text:text-[#557BAA] transition-colors">
            View specifications & pricing
          </p>
        </Link>
        <Link href={`/products/${product.id}`} className="absolute inset-0 z-0"></Link>

        {/* Admin actions */}
        {showActions && (onEdit || onDelete) && (
          <div className="flex gap-2 mt-4 relative z-20">
            {onEdit && (
              <Button variant="outline" size="sm" onClick={onEdit} className="flex-1 h-8 text-xs border-[#E0D5B8]">
                <Pencil size={14} className="mr-1.5" /> Edit
              </Button>
            )}
            {onDelete && (
              <Button variant="danger" size="sm" onClick={onDelete} className="flex-1 h-8 text-xs bg-red-50 text-red-600 hover:bg-red-100 border-none">
                <Trash2 size={14} className="mr-1.5" /> Delete
              </Button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
