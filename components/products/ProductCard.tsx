"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Package, Pencil, Trash2 } from "lucide-react";
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
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

// Short category labels for cleaner display
const getCategoryLabel = (category: string) => {
  const labels: Record<string, string> = {
    "Precision & Pocket Mini Scales": "Precision",
    "Kitchen & Compact Tabletop Scales": "Kitchen",
    "Portable & Luggage Scales": "Luggage",
    "Heavy-Duty Hanging & Crane Scales": "Industrial",
    "Personal Health & Bathroom Scales": "Health",
    "Packaging & Miscellaneous Equipment": "Packaging",
  };
  return labels[category] || category.split(" ")[0];
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
        "hover:-translate-y-1.5 hover:shadow-xl",
        !product.is_active && "opacity-60",
        className,
      )}
      style={{
        borderRadius: "12px",
        border: "1px solid #E8EDF3",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      {/* Image Container */}
      <Link
        href={`/products/${product.id}`}
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: "4/3",
          background: "linear-gradient(135deg, #F8FAFC 0%, #EEF4FB 100%)",
          display: "block",
        }}
      >
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={false}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package size={36} style={{ color: "#CBDCEB" }} />
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span
            className="font-semibold uppercase tracking-wide"
            style={{
              fontSize: "10px",
              padding: "4px 10px",
              borderRadius: "6px",
              background: "rgba(255,255,255,0.95)",
              color: "#3E5E85",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(62,94,133,0.1)",
              letterSpacing: "0.05em",
            }}
          >
            {getCategoryLabel(product.category)}
          </span>
        </div>

        {/* Hover overlay with arrow */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: "rgba(26,36,51,0.4)",
            backdropFilter: "blur(2px)",
          }}
        >
          <div
            className="flex items-center justify-center"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.95)",
              color: "#3E5E85",
              boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            }}
          >
            <ArrowRight size={20} />
          </div>
        </div>
      </Link>

      {/* Content */}
      <div
        className="flex flex-col flex-1 relative"
        style={{ padding: "16px" }}
      >
        <Link
          href={`/products/${product.id}`}
          className="flex-1 z-10"
          style={{ textDecoration: "none" }}
        >
          <h3
            className="font-semibold line-clamp-2 transition-colors group-hover:text-[#3E5E85]"
            style={{
              fontSize: "0.9rem",
              color: "#1A2433",
              lineHeight: 1.4,
              letterSpacing: "-0.01em",
              marginBottom: "6px",
            }}
          >
            {product.name}
          </h3>

          <p
            className="flex items-center gap-1 text-xs"
            style={{
              color: "#8798AD",
            }}
          >
            View details
            <ArrowRight
              size={12}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
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
          <div className="flex gap-2 mt-4 relative z-20">
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
