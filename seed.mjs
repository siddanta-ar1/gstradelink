// seed.mjs — Run with: node seed.mjs
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// Load .env.local manually
const __dirname = dirname(fileURLToPath(import.meta.url));
try {
  const envPath = resolve(__dirname, ".env.local");
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) process.env[match[1].trim()] = match[2].trim().replace(/^"|"$/g, "");
  }
} catch { /* .env.local not found — rely on shell env */ }

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in environment.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const products = [
    // ── RETAIL SCALES ────────────────────────────────────────────────────
    {
        name: "Camry EK3651 Digital Kitchen Scale",
        short_description:
            "Compact 5kg retail counter scale with bright LCD display. Perfect for grocery, bakery, and general retail use.",
        category: "Retail Scale",
        image_url:
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop",
        is_active: true,
    },
    {
        name: "A&D FZ-300i Compact Precision Scale",
        short_description:
            "300g × 0.001g high-precision retail scale with RS-232C interface. Ideal for herbs, spices, and jewelry.",
        category: "Retail Scale",
        image_url:
            "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&auto=format&fit=crop",
        is_active: true,
    },
    {
        name: "CAS SW-1S Price Computing Scale",
        short_description:
            "15kg price computing retail scale with dual display. Built-in receipt printer ready, OIML certified.",
        category: "Retail Scale",
        image_url:
            "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=600&auto=format&fit=crop",
        is_active: true,
    },
    {
        name: "Mettler Toledo bPlus Retail Scale",
        short_description:
            "Premium 30kg retail weighing scale with customer-facing display and stainless steel pan.",
        category: "Retail Scale",
        image_url:
            "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=600&auto=format&fit=crop",
        is_active: true,
    },

    // ── INDUSTRIAL SCALES ─────────────────────────────────────────────────
    {
        name: "Ohaus Defender 5000 Floor Scale",
        short_description:
            "Heavy-duty 1000kg platform floor scale with stainless steel indicator. Ideal for warehouses and factories.",
        category: "Industrial Scale",
        image_url:
            "https://images.unsplash.com/photo-1581093458791-9b9d30e05b04?w=600&auto=format&fit=crop",
        is_active: true,
    },
    {
        name: "Kern HFB 3T Pallet Truck Scale",
        short_description:
            "3000kg built-in pallet jack scale with wireless remote display. Weigh loads while moving them.",
        category: "Industrial Scale",
        image_url:
            "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop",
        is_active: true,
    },
    {
        name: "ACZET CG-3000H Hanging Crane Scale",
        short_description:
            "3-tonne industrial crane/hanging scale with overload protection and remote control display.",
        category: "Industrial Scale",
        image_url:
            "https://images.unsplash.com/photo-1565945887714-d5139f4eb0ce?w=600&auto=format&fit=crop",
        is_active: true,
    },
    {
        name: "Sartorius Entris II BCE6201-1S Bench Scale",
        short_description:
            "6200g × 0.1g industrial bench scale with USB output, ergonomic design, and calibration certificate.",
        category: "Industrial Scale",
        image_url:
            "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=600&auto=format&fit=crop",
        is_active: true,
    },
    {
        name: "Rice Lake IQ Plus 850 Truck Scale",
        short_description:
            "50-tonne heavy-duty truck weighbridge scale with remote digital indicator and data logging.",
        category: "Industrial Scale",
        image_url:
            "https://images.unsplash.com/photo-1590247813693-5541d1c609fd?w=600&auto=format&fit=crop",
        is_active: true,
    },

    // ── SPARE PARTS ───────────────────────────────────────────────────────
    {
        name: "Load Cell 50kg Single Point",
        short_description:
            "Aluminium alloy single-point load cell suitable for platform scales up to 50kg. IP65 rated.",
        category: "Spare Part",
        image_url:
            "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop",
        is_active: true,
    },
    {
        name: "Indicator Display Unit XK3190-A9",
        short_description:
            "Universal weighing indicator compatible with most floor scales. RS-232 output, accumulation function.",
        category: "Spare Part",
        image_url:
            "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop",
        is_active: true,
    },
    {
        name: "Scale Platform 400×400mm Stainless",
        short_description:
            "Replacement 400×400mm stainless steel weighing platform for bench and floor scales.",
        category: "Spare Part",
        image_url:
            "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop",
        is_active: true,
    },
    {
        name: "Thermal Paper Roll 57×40mm (10-Pack)",
        short_description:
            "BPA-free thermal paper rolls for CAS, Mettler, and Ohaus scale printers. Pack of 10 rolls.",
        category: "Spare Part",
        image_url:
            "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop",
        is_active: true,
    },

    // ── SERVICES ──────────────────────────────────────────────────────────
    {
        name: "Scale Calibration Service (On-Site)",
        short_description:
            "OIML-standard on-site calibration for retail and industrial scales. Certificate provided. All brands covered.",
        category: "Service",
        image_url:
            "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&auto=format&fit=crop",
        is_active: true,
    },
    {
        name: "Scale Repair & Maintenance",
        short_description:
            "Full repair service for all weighing equipment — load cell replacement, display repair, software update.",
        category: "Service",
        image_url:
            "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&auto=format&fit=crop",
        is_active: true,
    },
    {
        name: "Annual Maintenance Contract (AMC)",
        short_description:
            "Year-round preventive maintenance, priority on-site support, and emergency repair for your fleet of scales.",
        category: "Service",
        image_url:
            "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&auto=format&fit=crop",
        is_active: true,
    },
];

async function seed() {
    console.log("🌱 Seeding", products.length, "products into Supabase...\n");

    const { data, error } = await supabase
        .from("products")
        .insert(products)
        .select("id, name, category");

    if (error) {
        console.error("❌ Insert failed:", error.message);
        console.error("   Details:", error.details || error.hint || "");
        process.exit(1);
    }

    console.log("✅ Inserted", data.length, "products successfully:\n");
    data.forEach((p, i) => {
        console.log(`   ${i + 1}. [${p.category}] ${p.name}`);
    });
    console.log("\n🎉 Database seeded! Refresh your site to see products.");
}

seed();
