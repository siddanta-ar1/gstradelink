"use client";

import React from "react";
import Image from "next/image";
// 1. Import 'Variants' type here
import { motion, Variants } from "framer-motion";
import { MessageCircle, CheckCircle, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface Product {
  id: string;
  name: string;
  short_description: string | null;
  category: string;
  image_url: string | null;
  is_active?: boolean;
  created_at?: string;
}

interface ProductCardProps {
  product: Product;
  className?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
}

// Category colors for visual distinction
const getCategoryStyle = (category: string) => {
  switch (category) {
    case "Retail Scale":
      return {
        badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
        icon: "text-emerald-600",
      };
    case "Industrial Scale":
      return {
        badge: "bg-blue-100 text-blue-700 border-blue-200",
        icon: "text-blue-600",
      };
    case "Spare Part":
      return {
        badge: "bg-purple-100 text-purple-700 border-purple-200",
        icon: "text-purple-600",
      };
    case "Service":
      return {
        badge: "bg-amber-100 text-amber-700 border-amber-200",
        icon: "text-amber-600",
      };
    default:
      return {
        badge: "bg-slate-100 text-slate-700 border-slate-200",
        icon: "text-slate-600",
      };
  }
};

// 2. Add ': Variants' type annotation here
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// 3. Add ': Variants' type annotation here
const hoverVariants: Variants = {
  rest: { y: 0 },
  hover: {
    y: -4,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className,
  onEdit,
  onDelete,
  showActions = false,
}) => {
  const categoryStyle = getCategoryStyle(product.category);

  // WhatsApp message construction
  const waMessage = `Hello GSTradeLink! I'm interested in the ${product.name}. Please provide pricing and availability details.`;
  const waLink = `https://wa.me/9779800000000?text=${encodeURIComponent(
    waMessage,
  )}`;

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={cn(
        "group relative bg-background-card rounded-2xl border border-border-primary overflow-hidden transition-all duration-300 hover:shadow-md",
        !product.is_active && "opacity-75",
        className,
      )}
    >
      <motion.div variants={hoverVariants} className="h-full flex flex-col">
        {/* Image Section */}
        <div className="relative aspect-[4/3] bg-background-secondary overflow-hidden">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority={false}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-foreground-tertiary">
              <Package size={48} className="mb-3 opacity-40" />
              <span className="text-sm font-medium">No Image Available</span>
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <div
              className={cn(
                "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border",
                categoryStyle.badge,
              )}
            >
              {product.category}
            </div>
          </div>

          {/* Status Indicator */}
          {product.is_active !== undefined && (
            <div className="absolute top-3 right-3">
              <div
                className={cn(
                  "w-2 h-2 rounded-full",
                  product.is_active
                    ? "bg-success-500 shadow-lg shadow-success-500/25"
                    : "bg-danger-500 shadow-lg shadow-danger-500/25",
                )}
                title={product.is_active ? "Available" : "Unavailable"}
              />
            </div>
          )}

          {/* Image overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6 flex flex-col">
          {/* Product Name */}
          <h3 className="font-semibold text-lg text-foreground-primary mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>

          {/* Product Description */}
          <p className="text-foreground-secondary text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
            {product.short_description ||
              "High-quality precision equipment designed for professional use with reliable performance and accuracy."}
          </p>

          {/* Product Meta */}
          <div className="flex items-center justify-between mb-6 text-xs text-foreground-tertiary">
            <div className="flex items-center gap-1">
              <CheckCircle size={12} className={categoryStyle.icon} />
              <span>Professional Grade</span>
            </div>
            {product.created_at && (
              <span>
                Added {new Date(product.created_at).toLocaleDateString()}
              </span>
            )}
          </div>

          {/* Actions Section */}
          <div className="space-y-3">
            {/* Admin Actions */}
            {showActions && (onEdit || onDelete) && (
              <div className="flex gap-2">
                {onEdit && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onEdit}
                    className="flex-1"
                  >
                    Edit
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={onDelete}
                    className="flex-1"
                  >
                    Delete
                  </Button>
                )}
              </div>
            )}

            {/* Main CTA */}
            {product.is_active !== false ? (
              <Button
                variant="primary"
                size="md"
                fullWidth
                className="group/button"
                asChild
              >
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <MessageCircle
                    size={16}
                    className="group-hover/button:scale-110 transition-transform"
                  />
                  <span className="font-medium">Get Quote</span>
                </a>
              </Button>
            ) : (
              <div className="w-full py-3 text-center text-sm text-foreground-muted bg-background-secondary rounded-lg border border-border-primary">
                Currently Unavailable
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductCard;
