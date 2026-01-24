import type { UploadedFile, FileUploadConfig } from "@/types";

// ===== IMAGE CONFIGURATION =====
export const IMAGE_CONFIG: FileUploadConfig = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/svg+xml",
  ],
  multiple: false,
  compress: true,
  quality: 0.8,
};

export const SUPPORTED_IMAGE_FORMATS = [
  "jpg",
  "jpeg",
  "png",
  "webp",
  "gif",
  "svg",
  "bmp",
  "ico",
] as const;

// ===== IMAGE VALIDATION =====
/**
 * Validates if file is a supported image format
 */
export function isValidImageFile(file: File): boolean {
  return IMAGE_CONFIG.allowedTypes.includes(file.type);
}

/**
 * Validates file size
 */
export function isValidFileSize(
  file: File,
  maxSize = IMAGE_CONFIG.maxSize,
): boolean {
  return file.size <= maxSize;
}

/**
 * Gets image dimensions from file
 */
export function getImageDimensions(
  file: File,
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };

    img.src = url;
  });
}

/**
 * Validates image dimensions
 */
export function isValidImageDimensions(
  dimensions: { width: number; height: number },
  constraints: {
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    aspectRatio?: number;
    tolerance?: number;
  } = {},
): boolean {
  const { width, height } = dimensions;
  const {
    minWidth = 0,
    maxWidth = Infinity,
    minHeight = 0,
    maxHeight = Infinity,
    aspectRatio,
    tolerance = 0.1,
  } = constraints;

  // Check dimensions
  if (width < minWidth || width > maxWidth) return false;
  if (height < minHeight || height > maxHeight) return false;

  // Check aspect ratio if specified
  if (aspectRatio) {
    const actualRatio = width / height;
    const difference = Math.abs(actualRatio - aspectRatio);
    if (difference > tolerance) return false;
  }

  return true;
}

// ===== IMAGE COMPRESSION =====
/**
 * Compresses an image file
 */
export function compressImage(
  file: File,
  options: {
    quality?: number;
    maxWidth?: number;
    maxHeight?: number;
    format?: "jpeg" | "png" | "webp";
  } = {},
): Promise<File> {
  return new Promise((resolve, reject) => {
    const {
      quality = IMAGE_CONFIG.quality,
      maxWidth = 1920,
      maxHeight = 1080,
      format = "jpeg",
    } = options;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    if (!ctx) {
      reject(new Error("Cannot create canvas context"));
      return;
    }

    img.onload = () => {
      const { width, height } = img;

      // Calculate new dimensions while maintaining aspect ratio
      let newWidth = width;
      let newHeight = height;

      if (width > maxWidth || height > maxHeight) {
        const aspectRatio = width / height;
        if (width > height) {
          newWidth = Math.min(width, maxWidth);
          newHeight = newWidth / aspectRatio;
        } else {
          newHeight = Math.min(height, maxHeight);
          newWidth = newHeight * aspectRatio;
        }
      }

      // Set canvas dimensions
      canvas.width = newWidth;
      canvas.height = newHeight;

      // Draw and compress image
      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: `image/${format}`,
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            reject(new Error("Failed to compress image"));
          }
        },
        `image/${format}`,
        quality,
      );
    };

    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Resizes image to specific dimensions
 */
export function resizeImage(
  file: File,
  targetWidth: number,
  targetHeight: number,
  options: {
    quality?: number;
    format?: "jpeg" | "png" | "webp";
    fit?: "cover" | "contain" | "fill";
  } = {},
): Promise<File> {
  return new Promise((resolve, reject) => {
    const { quality = 0.8, format = "jpeg", fit = "cover" } = options;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    if (!ctx) {
      reject(new Error("Cannot create canvas context"));
      return;
    }

    img.onload = () => {
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      let drawWidth = targetWidth;
      let drawHeight = targetHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (fit === "contain") {
        const scale = Math.min(
          targetWidth / img.width,
          targetHeight / img.height,
        );
        drawWidth = img.width * scale;
        drawHeight = img.height * scale;
        offsetX = (targetWidth - drawWidth) / 2;
        offsetY = (targetHeight - drawHeight) / 2;
      } else if (fit === "cover") {
        const scale = Math.max(
          targetWidth / img.width,
          targetHeight / img.height,
        );
        drawWidth = img.width * scale;
        drawHeight = img.height * scale;
        offsetX = (targetWidth - drawWidth) / 2;
        offsetY = (targetHeight - drawHeight) / 2;
      }

      // Fill background for transparent images
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, targetWidth, targetHeight);

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const resizedFile = new File([blob], file.name, {
              type: `image/${format}`,
              lastModified: Date.now(),
            });
            resolve(resizedFile);
          } else {
            reject(new Error("Failed to resize image"));
          }
        },
        `image/${format}`,
        quality,
      );
    };

    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = URL.createObjectURL(file);
  });
}

// ===== IMAGE OPTIMIZATION =====
/**
 * Generates multiple image sizes for responsive images
 */
export async function generateResponsiveImages(
  file: File,
  sizes: number[] = [480, 768, 1024, 1280, 1920],
): Promise<{ size: number; file: File }[]> {
  const images: { size: number; file: File }[] = [];

  for (const size of sizes) {
    try {
      const compressedFile = await compressImage(file, {
        maxWidth: size,
        maxHeight: size,
        quality: 0.8,
        format: "webp",
      });
      images.push({ size, file: compressedFile });
    } catch (error) {
      console.warn(`Failed to generate ${size}px image:`, error);
    }
  }

  return images;
}

/**
 * Converts image to WebP format for better compression
 */
export function convertToWebP(
  file: File,
  quality: number = 0.8,
): Promise<File> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    if (!ctx) {
      reject(new Error("Cannot create canvas context"));
      return;
    }

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const webpFile = new File(
              [blob],
              file.name.replace(/\.[^/.]+$/, ".webp"),
              {
                type: "image/webp",
                lastModified: Date.now(),
              },
            );
            resolve(webpFile);
          } else {
            reject(new Error("Failed to convert to WebP"));
          }
        },
        "image/webp",
        quality,
      );
    };

    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = URL.createObjectURL(file);
  });
}

// ===== IMAGE URL UTILITIES =====
/**
 * Generates Supabase storage URL for image
 */
export function generateSupabaseImageUrl(
  bucket: string,
  path: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: "webp" | "jpeg" | "png";
    resize?: "cover" | "contain" | "fill";
  } = {},
): string {
  const baseUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`;

  const params = new URLSearchParams();

  if (options.width) params.append("width", options.width.toString());
  if (options.height) params.append("height", options.height.toString());
  if (options.quality) params.append("quality", options.quality.toString());
  if (options.format) params.append("format", options.format);
  if (options.resize) params.append("resize", options.resize);

  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

/**
 * Generates responsive image srcset
 */
export function generateSrcSet(
  imagePath: string,
  sizes: number[] = [480, 768, 1024, 1280, 1920],
): string {
  return sizes
    .map((size) => {
      const url = generateSupabaseImageUrl("product-images", imagePath, {
        width: size,
        format: "webp",
        quality: 80,
      });
      return `${url} ${size}w`;
    })
    .join(", ");
}

/**
 * Generates sizes attribute for responsive images
 */
export function generateSizesAttribute(
  breakpoints: { breakpoint: string; size: string }[] = [
    { breakpoint: "(max-width: 640px)", size: "100vw" },
    { breakpoint: "(max-width: 1024px)", size: "50vw" },
    { breakpoint: "", size: "33vw" },
  ],
): string {
  return breakpoints
    .map(({ breakpoint, size }) =>
      breakpoint ? `${breakpoint} ${size}` : size,
    )
    .join(", ");
}

// ===== PLACEHOLDER UTILITIES =====
/**
 * Generates a low-quality image placeholder (LQIP)
 */
export function generateImagePlaceholder(
  file: File,
  size: number = 10,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    if (!ctx) {
      reject(new Error("Cannot create canvas context"));
      return;
    }

    img.onload = () => {
      const aspectRatio = img.width / img.height;
      canvas.width = size;
      canvas.height = size / aspectRatio;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const placeholder = canvas.toDataURL("image/jpeg", 0.1);
      resolve(placeholder);
    };

    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Generates a blurred data URL for image placeholder
 */
export function generateBlurDataURL(
  width: number = 8,
  height: number = 8,
): string {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) return "";

  canvas.width = width;
  canvas.height = height;

  // Create a simple gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#f3f4f6");
  gradient.addColorStop(1, "#e5e7eb");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  return canvas.toDataURL();
}

// ===== IMAGE LOADING UTILITIES =====
/**
 * Preloads an image
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to preload image: ${src}`));
    img.src = src;
  });
}

/**
 * Batch preloads multiple images
 */
export async function preloadImages(
  urls: string[],
  options: {
    concurrent?: number;
    timeout?: number;
  } = {},
): Promise<{ loaded: string[]; failed: string[] }> {
  const { concurrent = 5, timeout = 10000 } = options;
  const loaded: string[] = [];
  const failed: string[] = [];

  const chunks = [];
  for (let i = 0; i < urls.length; i += concurrent) {
    chunks.push(urls.slice(i, i + concurrent));
  }

  for (const chunk of chunks) {
    const promises = chunk.map(async (url) => {
      try {
        await Promise.race([
          preloadImage(url),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Timeout")), timeout),
          ),
        ]);
        loaded.push(url);
      } catch {
        failed.push(url);
      }
    });

    await Promise.allSettled(promises);
  }

  return { loaded, failed };
}

// ===== IMAGE ERROR HANDLING =====
/**
 * Handles image loading errors with fallback
 */
export function handleImageError(
  event: string | Event,
  fallbackSrc?: string,
): void {
  const img = (
    typeof event === "string" ? null : event.target
  ) as HTMLImageElement;

  if (!img) return;

  if (fallbackSrc && img.src !== fallbackSrc) {
    img.src = fallbackSrc;
  } else {
    // Replace with a default placeholder
    img.src = generateBlurDataURL();
    img.alt = "Image failed to load";
  }
}

/**
 * Creates image with error handling
 */
export function createImageWithFallback(
  src: string,
  fallbackSrc?: string,
): HTMLImageElement {
  const img = new Image();

  img.onerror = (event: string | Event) => {
    handleImageError(event, fallbackSrc);
  };

  img.src = src;
  return img;
}

// ===== LAZY LOADING =====
/**
 * Creates intersection observer for lazy loading
 */
export function createLazyLoadObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {},
): IntersectionObserver {
  const defaultOptions = {
    rootMargin: "50px 0px",
    threshold: 0.1,
    ...options,
  };

  return new IntersectionObserver(callback, defaultOptions);
}

/**
 * Lazy loads an image
 */
export function lazyLoadImage(
  img: HTMLImageElement,
  src: string,
  options: {
    placeholder?: string;
    fadeIn?: boolean;
    observer?: IntersectionObserver;
  } = {},
): void {
  const { placeholder, fadeIn = true } = options;

  if (placeholder) {
    img.src = placeholder;
  }

  const observer =
    options.observer ||
    createLazyLoadObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const image = entry.target as HTMLImageElement;

          if (fadeIn) {
            image.style.opacity = "0";
            image.style.transition = "opacity 0.3s ease";
          }

          image.onload = () => {
            if (fadeIn) {
              image.style.opacity = "1";
            }
            observer.unobserve(image);
          };

          image.src = src;
        }
      });
    });

  observer.observe(img);
}
