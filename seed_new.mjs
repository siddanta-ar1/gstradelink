import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// Load .env.local manually (dotenv not required)
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

const makeUrl = (filename) => {
    return `https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/${encodeURIComponent(filename)}`;
};

const products = [
    // 1. Precision & Pocket Mini Scales
    {
        name: "Xin Yuan M-8006 (600g / 0.01g)",
        short_description: "Digital pocket scale available in 600g capacity with 0.01g precision.",
        category: "Precision & Pocket Mini Scales",
        image_url: makeUrl("M-8006 600 GRAM 0.01.png"),
        is_active: true
    },
    {
        name: "Xin Yuan M-8006 (3kg / 0.1g)",
        short_description: "Digital pocket scale available in 3kg capacity with 0.1g precision.",
        category: "Precision & Pocket Mini Scales",
        image_url: makeUrl("M-8006 3KG 0.1 .png"),
        is_active: true
    },
    {
        name: "Xin Yuan M-8007 (600g / 0.01g)",
        short_description: "Digital pocket scale available in 600g capacity with 0.01g precision.",
        category: "Precision & Pocket Mini Scales",
        image_url: makeUrl("M-8007 600 GRAM 0.01.png"),
        is_active: true
    },
    {
        name: "Xin Yuan M-8007 (3kg / 0.1g)",
        short_description: "Digital pocket scale available in 3kg capacity with 0.1g precision.",
        category: "Precision & Pocket Mini Scales",
        image_url: makeUrl("M-8007 3KG 0.1 .png"),
        is_active: true
    },
    {
        name: "Eurecare EC-P03 Mini Scale",
        short_description: "Compact 300g capacity pocket scale.",
        category: "Precision & Pocket Mini Scales",
        image_url: makeUrl("EC-P03 300GRAM.png"),
        is_active: true
    },
    {
        name: "Digital Pocket Scales (Generic)",
        short_description: "Digital pocket scales available in 200g and 500g capacities.",
        category: "Precision & Pocket Mini Scales",
        image_url: makeUrl("200 gram and 500 gram.png"),
        is_active: true
    },
    {
        name: "Digital Mini Scale M696",
        short_description: "600g capacity with tola measurement capability.",
        category: "Precision & Pocket Mini Scales",
        image_url: makeUrl("M696 600GM 0.01 TOLA.png"),
        is_active: true
    },
    {
        name: "Note Book Folding Scale",
        short_description: "Book-shaped portable scale, available in 600g/3kg capacities.",
        category: "Precision & Pocket Mini Scales",
        image_url: makeUrl("NOTE BOOK FOLDING 600 3KG.png"),
        is_active: true
    },
    {
        name: "Fuzion Professional Scales 0.001g",
        short_description: "High-precision digital scales available in 0.001g capacity.",
        category: "Precision & Pocket Mini Scales",
        image_url: makeUrl("FUSZION .001 GRAM CAPACITY.png"),
        is_active: true
    },
    {
        name: "Fuzion Professional Scales 200g (0.01g)",
        short_description: "High-precision digital scales available in 200g (0.01g) capacity.",
        category: "Precision & Pocket Mini Scales",
        image_url: makeUrl("FUZION 200GRAM .01 CAPACITY.png"),
        is_active: true
    },

    // 2. Kitchen & Compact Tabletop Scales
    {
        name: "Eurecare KC02 (10kg)",
        short_description: "Standard electronic kitchen scales. Ideal for home kitchens, bakeries.",
        category: "Kitchen & Compact Tabletop Scales",
        image_url: makeUrl("kc02 10kg.png"),
        is_active: true
    },
    {
        name: "Eurecare KC03 (10kg)",
        short_description: "Standard electronic kitchen scales.",
        category: "Kitchen & Compact Tabletop Scales",
        image_url: makeUrl("kc03 10KG REGULAR.png"),
        is_active: true
    },
    {
        name: "Eurecare KC03 with Steel Plate and Adapter",
        short_description: "Electronic kitchen scale featuring a steel plate and an adapter.",
        category: "Kitchen & Compact Tabletop Scales",
        image_url: makeUrl("KO03 10 KG STELL PLATE WITH ADAOPTOR.png"),
        is_active: true
    },
    {
        name: "TS200 Compact Scale (10kg)",
        short_description: "Rectangular electronic tabletop scale.",
        category: "Kitchen & Compact Tabletop Scales",
        image_url: makeUrl("TS200 10KG.png"),
        is_active: true
    },
    {
        name: "SH125 Kitchen Scale (5kg)",
        short_description: "Electronic scale featuring a clear weighing bowl.",
        category: "Kitchen & Compact Tabletop Scales",
        image_url: makeUrl("SH125-5KG.png"),
        is_active: true
    },
    {
        name: "B31 Kitchen Scale (7kg)",
        short_description: "Standard flat electronic kitchen scale.",
        category: "Kitchen & Compact Tabletop Scales",
        image_url: makeUrl("B31-7 KG.png"),
        is_active: true
    },
    {
        name: "5KG Basket Scale",
        short_description: "Kitchen scale bundled with a large weighing basket.",
        category: "Kitchen & Compact Tabletop Scales",
        image_url: makeUrl("5KG BASKET NEW.png"),
        is_active: true
    },
    {
        name: "Electronic Compact Scales DT510 (30kg)",
        short_description: "Higher capacity tabletop scales (30kg).",
        category: "Kitchen & Compact Tabletop Scales",
        image_url: makeUrl("DT510-30KG.png"),
        is_active: true
    },
    {
        name: "Electronic Compact Scales DT580 (30kg)",
        short_description: "Higher capacity tabletop scales (30kg).",
        category: "Kitchen & Compact Tabletop Scales",
        image_url: makeUrl("DT580 30KG.png"),
        is_active: true
    },
    {
        name: "SF400C Compact Digital Scale (500g)",
        short_description: "Round-pan compact digital scales with high precision.",
        category: "Kitchen & Compact Tabletop Scales",
        image_url: makeUrl("SF400C 500 GRAM.png"),
        is_active: true
    },
    {
        name: "SF400D Compact Digital Scale (500g)",
        short_description: "Round-pan compact digital scales with high precision.",
        category: "Kitchen & Compact Tabletop Scales",
        image_url: makeUrl("SF400 D 500 GRAM.png"),
        is_active: true
    },
    {
        name: "Mechanical Kitchen Scale (5kg)",
        short_description: "Analog scale with a red weighing tray.",
        category: "Kitchen & Compact Tabletop Scales",
        image_url: makeUrl("5KG KITCHNE SCALE.png"),
        is_active: true
    },

    // 3. Portable & Luggage Scales
    {
        name: "Eurecare EC04 Luggage Scale (50kg)",
        short_description: "Digital hanging luggage scales. Features a smiley design.",
        category: "Portable & Luggage Scales",
        image_url: makeUrl("eco4.png"),
        is_active: true
    },
    {
        name: "Eurecare EC05 Luggage Scale (50kg)",
        short_description: "Digital hanging luggage scales.",
        category: "Portable & Luggage Scales",
        image_url: makeUrl("eco5.png"),
        is_active: true
    },
    {
        name: "Portable Scale WH-A17",
        short_description: "Handheld digital luggage scale.",
        category: "Portable & Luggage Scales",
        image_url: makeUrl("a17.png"),
        is_active: true
    },
    {
        name: "Smiley Digital Portable Scales (50kg)",
        short_description: "Various digital hanging scales with a smiley face interface.",
        category: "Portable & Luggage Scales",
        image_url: makeUrl("50 kg smiley new.png"),
        is_active: true
    },
    {
        name: "Standard Digital Portable Scales (50kg)",
        short_description: "Rectangular digital hanging scales.",
        category: "Portable & Luggage Scales",
        image_url: makeUrl("50kg- mrp 400.png"),
        is_active: true
    },
    {
        name: "JD210 Portable Scale (10kg)",
        short_description: "Analog/mechanical handheld hanging scale.",
        category: "Portable & Luggage Scales",
        image_url: makeUrl("js210-10kg.png"),
        is_active: true
    },

    // 4. Heavy-Duty Hanging & Crane Scales
    {
        name: "Digital Crane Scales (200kg - 300kg)",
        short_description: "Heavy-duty digital suspended scales available in black and blue housings.",
        category: "Heavy-Duty Hanging & Crane Scales",
        image_url: makeUrl("crance ssclae 200 kg.png"), // Can also be crance scale 300kg.png etc.
        is_active: true
    },
    {
        name: "Constant Crane Scale (200kg)",
        short_description: "Red/orange heavy-duty digital hanging scale.",
        category: "Heavy-Duty Hanging & Crane Scales",
        image_url: makeUrl("costant crance scale 200kg.png"),
        is_active: true
    },
    {
        name: "Analog Hanging Scales (100kg - 200kg)",
        short_description: "Heavy-duty dial mechanical scales with bottom hooks.",
        category: "Heavy-Duty Hanging & Crane Scales",
        image_url: null, // No exact image mapped explicitly
        is_active: true
    },
    {
        name: "Tubular Spring Scale (10kg)",
        short_description: "Plastic tubular mechanical scale.",
        category: "Heavy-Duty Hanging & Crane Scales",
        image_url: makeUrl("10kgplastic.png"),
        is_active: true
    },
    {
        name: "Flat Metal Spring Scales",
        short_description: "Analog flat-body spring scales available in 12kg, 25kg, 50kg, and 100kg capacities.",
        category: "Heavy-Duty Hanging & Crane Scales",
        image_url: makeUrl("12-25-50-100.png"),
        is_active: true
    },

    // 5. Personal Health & Bathroom Scales
    {
        name: "Analog Health Scales S82",
        short_description: "Traditional mechanical bathroom scales.",
        category: "Personal Health & Bathroom Scales",
        image_url: makeUrl("normalscales82.png"),
        is_active: true
    },
    {
        name: "Analog Health Scales S92",
        short_description: "Traditional mechanical bathroom scales.",
        category: "Personal Health & Bathroom Scales",
        image_url: makeUrl("normalscales92.png"),
        is_active: true
    },
    {
        name: "Eurecare Personal Scales",
        short_description: "Electronic glass bathroom scales (clear and dark marble designs).",
        category: "Personal Health & Bathroom Scales",
        image_url: makeUrl("eurocare2020.png"),
        is_active: true
    },
    {
        name: "Eurecare 2020R",
        short_description: "Premium white curved electronic personal scale.",
        category: "Personal Health & Bathroom Scales",
        image_url: makeUrl("eurocare2020r.png"),
        is_active: true
    },
    {
        name: "Model 3028",
        short_description: "Blue floral patterned glass digital scale.",
        category: "Personal Health & Bathroom Scales",
        image_url: makeUrl("model3028.png"),
        is_active: true
    },
    {
        name: "Relax Scale 181",
        short_description: "Comfort ecology series digital bathroom scale.",
        category: "Personal Health & Bathroom Scales",
        image_url: makeUrl("relaxscale181.png"),
        is_active: true
    },
    {
        name: "Constant Personal Scale",
        short_description: "Glass digital scale with a grid pattern.",
        category: "Personal Health & Bathroom Scales",
        image_url: makeUrl("constantscale.png"),
        is_active: true
    },

    // 6. Baby Scales
    {
        name: "Camry Electronic Baby Scale",
        short_description: "Digital tabletop infant scale with a curved ergonomic tray.",
        category: "Baby Scales",
        image_url: makeUrl("BABY SCALE.png"),
        is_active: true
    },
    {
        name: "Analog Hanging Baby Scale (25kg)",
        short_description: "Dial scale equipped with a soft hanging sling for infants.",
        category: "Baby Scales",
        image_url: makeUrl("baby scale 25kg.png"),
        is_active: true
    },

    // 7. Packaging & Miscellaneous Equipment
    {
        name: "Impulse Sealers EC Series (200mm)",
        short_description: "Heat sealers for plastic packaging.",
        category: "Packaging & Miscellaneous Equipment",
        image_url: makeUrl("EC 200MM.png"),
        is_active: true
    },
    {
        name: "Impulse Sealers EC Series (250mm, 400mm)",
        short_description: "Heat sealers for plastic packaging.",
        category: "Packaging & Miscellaneous Equipment",
        image_url: makeUrl("sealer 250 mm and sealer  400mm.png"),
        is_active: true
    },
    {
        name: "Impulse Sealers EC Series (300mm)",
        short_description: "Heat sealers for plastic packaging.",
        category: "Packaging & Miscellaneous Equipment",
        image_url: makeUrl("EC 300MM.png"),
        is_active: true
    },
    {
        name: "Handheld Blower",
        short_description: "High-quality portable electric air blower.",
        category: "Packaging & Miscellaneous Equipment",
        image_url: makeUrl("BLOWER HIGH QUALITY.png"),
        is_active: true
    },
    {
        name: "Relax Megaphone (RX-25)",
        short_description: "Handheld megaphone with a lithium battery and Type-C charging.",
        category: "Packaging & Miscellaneous Equipment",
        image_url: makeUrl("RELAX MEGHA PHONE TYPE C CHARGING .png"),
        is_active: true
    }
];

async function runSeeder() {
    console.log("Clearing existing products...");
    const { error: deleteError } = await supabase
        .from("products")
        .delete()
        .neq("id", "00000000-0000-0000-0000-000000000000"); // Deletes all rows

    if (deleteError) {
        console.error("❌ Delete failed:", deleteError.message);
        process.exit(1);
    }

    console.log("Existing products cleared!");
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

runSeeder();
