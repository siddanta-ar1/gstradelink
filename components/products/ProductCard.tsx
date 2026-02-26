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
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className,
  onEdit,
  onDelete,
  showActions = false,
}) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        "group relative bg-white overflow-hidden flex flex-col transition-all duration-300",
        "hover:-translate-y-1",
        !product.is_active && "opacity-60",
        className,
      )}
      style={{
        borderRadius: "4px",
        border: "1px solid #CBDCEB",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 8px 24px rgba(62,94,133,0.12)";
        (e.currentTarget as HTMLDivElement).style.borderColor = "#93B2D6";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 2px 8px rgba(0,0,0,0.05)";
        (e.currentTarget as HTMLDivElement).style.borderColor = "#CBDCEB";
      }}
    >
      {/* Image */}
      <Link
        href={`/products/${product.id}`}
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "1/1", background: "#EEF4FB", display: "block" }}
      >
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-108"
            priority={false}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package size={40} style={{ color: "#AECAE9", opacity: 0.5 }} />
          </div>
        )}

        {/* Category chip */}
        <div className="absolute top-2.5 left-2.5">
          <span
            className="text-white font-bold uppercase tracking-widest"
            style={{
              fontSize: "9px",
              padding: "3px 8px",
              borderRadius: "9999px",
              background: "rgba(62,94,133,0.85)",
              backdropFilter: "blur(4px)",
              letterSpacing: "0.06em",
            }}
          >
            {product.category
              .replace(" & Pocket Mini Scales", "")
              .replace(" & Compact Tabletop Scales", "")
              .replace(" & Luggage Scales", "")
              .replace(" Hanging & Crane Scales", "")
              .replace(" Health & Bathroom Scales", "")
              .replace(" & Miscellaneous Equipment", "")}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div
        className="flex flex-col flex-1 relative"
        style={{ padding: "14px 14px 14px", background: "#FFFFFF" }}
      >
        <Link
          href={`/products/${product.id}`}
          className="flex-1 z-10 w-full"
          style={{ textDecoration: "none" }}
        >
          <div className="flex items-start justify-between gap-2 mb-1 w-full">
            <h3
              className="font-bold text-sm line-clamp-2 transition-colors leading-snug"
              style={{
                color: "#111111",
                letterSpacing: "-0.01em",
              }}
            >
              {product.name}
            </h3>
            <div
              className="w-7 h-7 flex-shrink-0 flex items-center justify-center transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              style={{
                background: "#EEF4FB",
                color: "#3E5E85",
                borderRadius: "9999px",
                minWidth: "28px",
              }}
            >
              <ArrowUpRight size={14} />
            </div>
          </div>
          <p
            className="line-clamp-1 transition-colors"
            style={{
              fontSize: "0.75rem",
              color: "#8798AD",
              lineHeight: 1.5,
              marginTop: "3px",
            }}
          >
            View specifications &amp; pricing
          </p>
        </Link>

        {/* Invisible full-card click target */}
        <Link
          href={`/products/${product.id}`}
          className="absolute inset-0 z-0"
          aria-hidden="true"
          tabIndex={-1}
        />

        {/* Admin actions */}
        {showActions && (onEdit || onDelete) && (
          <div className="flex gap-2 mt-3 relative z-20">
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={onEdit}
                className="flex-1 h-8 text-xs"
                style={{ borderColor: "#CBDCEB" }}
              >
                <Pencil size={13} className="mr-1" /> Edit
              </Button>
            )}
            {onDelete && (
              <Button
                variant="danger"
                size="sm"
                onClick={onDelete}
                className="flex-1 h-8 text-xs bg-red-50 text-red-600 hover:bg-red-100 border-none"
              >
                <Trash2 size={13} className="mr-1" /> Delete
              </Button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
