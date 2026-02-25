-- ============================================================
--  GSTradeLink — Seed Data
--  Paste this into: Supabase → SQL Editor → Run
-- ============================================================

insert into products (name, short_description, category, image_url, is_active) values

-- ── Retail Scales ──────────────────────────────────────────
(
  'Camry EK3651 Digital Counter Scale',
  'Compact 5 kg retail counter scale with bright LCD display. Perfect for grocery, bakery, and general retail use.',
  'Retail Scale',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop',
  true
),
(
  'A&D FZ-300i Compact Precision Scale',
  '300 g × 0.001 g high-precision retail scale with RS-232C interface. Ideal for herbs, spices, and jewelry.',
  'Retail Scale',
  'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&auto=format&fit=crop',
  true
),
(
  'CAS SW-1S Price Computing Scale',
  '15 kg price computing retail scale with dual display. OIML certified, receipt-printer ready.',
  'Retail Scale',
  'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=600&auto=format&fit=crop',
  true
),
(
  'Mettler Toledo bPlus Retail Scale',
  'Premium 30 kg retail weighing scale with customer-facing display and stainless-steel pan.',
  'Retail Scale',
  'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=600&auto=format&fit=crop',
  true
),

-- ── Industrial Scales ──────────────────────────────────────
(
  'Ohaus Defender 5000 Floor Scale',
  'Heavy-duty 1000 kg platform floor scale with stainless-steel indicator. Ideal for warehouses and factories.',
  'Industrial Scale',
  'https://images.unsplash.com/photo-1581093458791-9b9d30e05b04?w=600&auto=format&fit=crop',
  true
),
(
  'Kern HFB 3T Pallet Truck Scale',
  '3000 kg built-in pallet jack scale with wireless remote display. Weigh loads while moving them.',
  'Industrial Scale',
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop',
  true
),
(
  'ACZET CG-3000H Hanging Crane Scale',
  '3-tonne industrial crane / hanging scale with overload protection and remote-control display.',
  'Industrial Scale',
  'https://images.unsplash.com/photo-1565945887714-d5139f4eb0ce?w=600&auto=format&fit=crop',
  true
),
(
  'Sartorius Entris II BCE6201 Bench Scale',
  '6200 g × 0.1 g industrial bench scale with USB output, ergonomic design, and calibration certificate.',
  'Industrial Scale',
  'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=600&auto=format&fit=crop',
  true
),
(
  'Rice Lake IQ Plus 850 Truck Scale',
  '50-tonne heavy-duty truck weighbridge scale with remote digital indicator and data logging.',
  'Industrial Scale',
  'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?w=600&auto=format&fit=crop',
  true
),

-- ── Spare Parts ────────────────────────────────────────────
(
  'Load Cell 50 kg Single Point',
  'Aluminium alloy single-point load cell for platform scales up to 50 kg. IP65 rated.',
  'Spare Part',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop',
  true
),
(
  'Weighing Indicator XK3190-A9',
  'Universal digital indicator compatible with most floor scales. RS-232 output, accumulation & print functions.',
  'Spare Part',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop',
  true
),
(
  'Stainless Platform 400×400 mm',
  'Replacement 400×400 mm stainless steel weighing platform for bench and floor scales.',
  'Spare Part',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop',
  true
),
(
  'Thermal Paper Rolls 57×40 mm (10-Pack)',
  'BPA-free thermal paper rolls for CAS, Mettler Toledo, and Ohaus scale printers. Pack of 10.',
  'Spare Part',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop',
  true
),

-- ── Services ───────────────────────────────────────────────
(
  'Scale Calibration Service (On-Site)',
  'OIML-standard on-site calibration for retail and industrial scales. Certificate provided. All brands covered.',
  'Service',
  'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&auto=format&fit=crop',
  true
),
(
  'Scale Repair & Maintenance',
  'Full repair service for all weighing equipment — load cell replacement, display repair, software update.',
  'Service',
  'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&auto=format&fit=crop',
  true
),
(
  'Annual Maintenance Contract (AMC)',
  'Year-round preventive maintenance, priority on-site support, and emergency repair for your scale fleet.',
  'Service',
  'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&auto=format&fit=crop',
  true
);
