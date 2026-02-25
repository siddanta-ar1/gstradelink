"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { MessageCircle, Package, Pencil, Trash2 } from "lucide-react";
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
  const waMsg = `Hello GSTradeLink! I'm interested in the ${product.name}. Could you please share availability and pricing?`;
  const waLink = `https://wa.me/9779765662427?text=${encodeURIComponent(waMsg)}`;

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        "group relative bg-background-primary rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col hover:shadow-md transition-all duration-300",
        !product.is_active && "opacity-60",
        className,
      )}
    >
      {/* Image */}
      <Link
        href={`/products/${product.id}`}
        className="relative w-full overflow-hidden rounded-t-2xl sm:rounded-t-3xl bg-primary-50"
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
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
          <span className="bg-primary-600/90 text-white text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide">
            {product.category.replace(" Scale", "").replace(" Part", " Pt")}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-2.5 sm:p-3.5">
        <Link href={`/products/${product.id}`} className="flex-1">
          <h3 className="font-semibold text-foreground-primary text-xs sm:text-sm line-clamp-2 mb-2 hover:text-primary-600 transition-colors leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* Admin actions */}
        {showActions && (onEdit || onDelete) && (
          <div className="flex gap-1.5 mb-2">
            {onEdit && (
              <Button variant="outline" size="sm" onClick={onEdit} className="flex-1 h-7 px-0 text-xs">
                <Pencil size={12} />
              </Button>
            )}
            {onDelete && (
              <Button variant="danger" size="sm" onClick={onDelete} className="flex-1 h-7 px-0 text-xs">
                <Trash2 size={12} />
              </Button>
            )}
          </div>
        )}

        <a
          href={waLink}
          target="_blank" rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-1.5 py-2 sm:py-2.5 rounded-xl bg-primary-600 text-white text-[11px] sm:text-xs font-bold hover:bg-primary-700 active:scale-95 transition-all"
        >
          <MessageCircle size={12} fill="white" />
          <span>Enquire</span>
        </a>
      </div>
    </motion.div>
  );
};

export default ProductCard;
