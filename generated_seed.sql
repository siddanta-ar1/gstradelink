-- 1. Drop existing constraint
ALTER TABLE public.products DROP CONSTRAINT IF EXISTS products_category_check;

-- 2. Clear out old data that would violate the new constraint
DELETE FROM public.products;

-- 3. Add the new constraint (now that the table is empty)
ALTER TABLE public.products ADD CONSTRAINT products_category_check CHECK (
  category IN (
    'Precision & Pocket Mini Scales',
    'Kitchen & Compact Tabletop Scales',
    'Portable & Luggage Scales',
    'Heavy-Duty Hanging & Crane Scales',
    'Personal Health & Bathroom Scales',
    'Baby Scales',
    'Packaging & Miscellaneous Equipment'
  )
);

-- 4. Insert the new categorized products
INSERT INTO public.products (name, short_description, category, image_url, is_active) VALUES 
('Xin Yuan M-8006 (600g / 0.01g)', 'Digital pocket scale available in 600g capacity with 0.01g precision.', 'Precision & Pocket Mini Scales', 'https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/M-8006%20600%20GRAM%200.01.png', true),
('Xin Yuan M-8006 (3kg / 0.1g)', 'Digital pocket scale available in 3kg capacity with 0.1g precision.', 'Precision & Pocket Mini Scales', 'https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/M-8006%203KG%200.1%20.png', true),
('Xin Yuan M-8007 (600g / 0.01g)', 'Digital pocket scale available in 600g capacity with 0.01g precision.', 'Precision & Pocket Mini Scales', 'https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/M-8007%20600%20GRAM%200.01.png', true),
('Xin Yuan M-8007 (3kg / 0.1g)', 'Digital pocket scale available in 3kg capacity with 0.1g precision.', 'Precision & Pocket Mini Scales', 'https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/M-8007%203KG%200.1%20.png', true),
('Eurecare EC-P03 Mini Scale', 'Compact 300g capacity pocket scale.', 'Precision & Pocket Mini Scales', 'https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/EC-P03%20300GRAM.png', true),
('Digital Pocket Scales (Generic)', 'Digital pocket scales available in 200g and 500g capacities.', 'Precision & Pocket Mini Scales', 'https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/200%20gram%20and%20500%20gram.png', true),
('Digital Mini Scale M696', '600g capacity with tola measurement capability.', 'Precision & Pocket Mini Scales', 'https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/M696%20600GM%200.01%20TOLA.png', true),
('Note Book Folding Scale', 'Book-shaped portable scale, available in 600g/3kg capacities.', 'Precision & Pocket Mini Scales', 'https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/NOTE%20BOOK%20FOLDING%20600%203KG.png', true),
('Fuzion Professional Scales 0.001g', 'High-precision digital scales available in 0.001g capacity.', 'Precision & Pocket Mini Scales', 'https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/FUSZION%20.001%20GRAM%20CAPACITY.png', true),
('Fuzion Professional Scales 200g (0.01g)', 'High-precision digital scales available in 200g (0.01g) capacity.', 'Precision & Pocket Mini Scales', 'https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/FUZION%20200GRAM%20.01%20CAPACITY.png', true),
('Eurecare KC02 (10kg)', 'Standard electronic kitchen scales. Ideal for home kitchens, bakeries.', 'Kitchen & Compact Tabletop Scales', 'https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/kc02%2010kg.png', true),
('Eurecare KC03 (10kg)', 'Standard electronic kitchen scales.', 'Kitchen & Compact Tabletop Scales', 'https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/kc03%2010KG%20REGULAR.png', true),
('Eurecare KC03 with Steel Plate and Adapter', 'Electronic kitchen scale featuring a steel plate and an adapter.', 'Kitchen & Compact Tabletop Scales', 'https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/KO03%2010%20KG%20STELL%20PLATE%20WITH%20ADAOPTOR.png', true),
('TS200 Compact Scale (10kg)', 'Rectangular electronic tabletop scale.', 'Kitchen & Compact Tabletop Scales', 'https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/TS200%2010KG.png', true),
('SH125 Kitchen Scale (5kg)', 'Electronic scale featuring a clear weighing bowl.', 'Kitchen & Compact Tabletop Scales', 'https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/SH125-5KG.png', true),
('B31 Kitchen Scale (7kg)', 'Standard flat electronic kitchen scale.', 'Kitchen & Compact Tabletop Scales', 'https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/B31-7%20KG.png', true),
('5KG Basket Scale', 'Kitchen scale bundled with a large weighing basket.', 'Kitchen & Compact Tabletop Scales', 'https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/5KG%20BASKET%20NEW.png', true),
('Electronic Compact Scales DT510 (30kg)', 'Higher capacity tabletop scales (30kg).', 'Kitchen & Compact Tabletop Scales', 'https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/DT510-30KG.png', true),
('Electronic Compact Scales DT580 (30kg)', 'Higher capacity tabletop scales (30kg).', 'Kitchen & Compact Tabletop Scales', 'https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/DT580%2030KG.png', true),
('SF400C Compact Digital Scale (500g)', 'Round-pan compact digital scales with high precision.', 'Kitchen & Compact Tabletop Scales', 'https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/SF400C%20500%20GRAM.png', true),
('SF400D Compact Digital Scale (500g)', 'Round-pan compact digital scales with high precision.', 'Kitchen & Compact Tabletop Scales', 'https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/SF400%20D%20500%20GRAM.png', true),
('Mechanical Kitchen Scale (5kg)', 'Analog scale with a red weighing tray.', 'Kitchen & Compact Tabletop Scales', 'https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/5KG%20KITCHNE%20SCALE.png', true),
('Eurecare EC04 Luggage Scale (50kg)', 'Digital hanging luggage scales. Features a smiley design.', 'Portable & Luggage Scales', 'https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/eco4.png', true),
('Eurecare EC05 Luggage Scale (50kg)', 'Digital hanging luggage scales.', 'Portable & Luggage Scales', 'https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/eco5.png', true),
('Portable Scale WH-A17', 'Handheld digital luggage scale.', 'Portable & Luggage Scales', 'https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/a17.png', true),
('Smiley Digital Portable Scales (50kg)', 'Various digital hanging scales with a smiley face interface.', 'Portable & Luggage Scales', 'https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/50%20kg%20smiley%20new.png', true),
('Standard Digital Portable Scales (50kg)', 'Rectangular digital hanging scales.', 'Portable & Luggage Scales', 'https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/50kg-%20mrp%20400.png', true),
('JD210 Portable Scale (10kg)', 'Analog/mechanical handheld hanging scale.', 'Portable & Luggage Scales', 'https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/js210-10kg.png', true),
('Digital Crane Scales (200kg - 300kg)', 'Heavy-duty digital suspended scales available in black and blue housings.', 'Heavy-Duty Hanging & Crane Scales', 'https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/crance%20ssclae%20200%20kg.png', true),
('Constant Crane Scale (200kg)', 'Red/orange heavy-duty digital hanging scale.', 'Heavy-Duty Hanging & Crane Scales', 'https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/costant%20crance%20scale%20200kg.png', true),
('Analog Hanging Scales (100kg - 200kg)', 'Heavy-duty dial mechanical scales with bottom hooks.', 'Heavy-Duty Hanging & Crane Scales', null, true),
('Tubular Spring Scale (10kg)', 'Plastic tubular mechanical scale.', 'Heavy-Duty Hanging & Crane Scales', 'https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/10kgplastic.png', true),
('Flat Metal Spring Scales', 'Analog flat-body spring scales available in 12kg, 25kg, 50kg, and 100kg capacities.', 'Heavy-Duty Hanging & Crane Scales', 'https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/12-25-50-100.png', true),
('Analog Health Scales S82', 'Traditional mechanical bathroom scales.', 'Personal Health & Bathroom Scales', 'https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/normalscales82.png', true),
('Analog Health Scales S92', 'Traditional mechanical bathroom scales.', 'Personal Health & Bathroom Scales', 'https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/normalscales92.png', true),
('Eurecare Personal Scales', 'Electronic glass bathroom scales (clear and dark marble designs).', 'Personal Health & Bathroom Scales', 'https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/eurocare2020.png', true),
('Eurecare 2020R', 'Premium white curved electronic personal scale.', 'Personal Health & Bathroom Scales', 'https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/eurocare2020r.png', true),
('Model 3028', 'Blue floral patterned glass digital scale.', 'Personal Health & Bathroom Scales', 'https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/model3028.png', true),
('Relax Scale 181', 'Comfort ecology series digital bathroom scale.', 'Personal Health & Bathroom Scales', 'https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/relaxscale181.png', true),
('Constant Personal Scale', 'Glass digital scale with a grid pattern.', 'Personal Health & Bathroom Scales', 'https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/constantscale.png', true),
('Camry Electronic Baby Scale', 'Digital tabletop infant scale with a curved ergonomic tray.', 'Baby Scales', 'https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/BABY%20SCALE.png', true),
('Analog Hanging Baby Scale (25kg)', 'Dial scale equipped with a soft hanging sling for infants.', 'Baby Scales', 'https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/baby%20scale%2025kg.png', true),
('Impulse Sealers EC Series (200mm)', 'Heat sealers for plastic packaging.', 'Packaging & Miscellaneous Equipment', 'https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/EC%20200MM.png', true),
('Impulse Sealers EC Series (250mm, 400mm)', 'Heat sealers for plastic packaging.', 'Packaging & Miscellaneous Equipment', 'https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/sealer%20250%20mm%20and%20sealer%20%20400mm.png', true),
('Impulse Sealers EC Series (300mm)', 'Heat sealers for plastic packaging.', 'Packaging & Miscellaneous Equipment', 'https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/EC%20300MM.png', true),
('Handheld Blower', 'High-quality portable electric air blower.', 'Packaging & Miscellaneous Equipment', 'https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/BLOWER%20HIGH%20QUALITY.png', true),
('Relax Megaphone (RX-25)', 'Handheld megaphone with a lithium battery and Type-C charging.', 'Packaging & Miscellaneous Equipment', 'https://qqpaoqfxnumeznkolobb.supabase.co/storage/v1/object/public/product-images/RELAX%20MEGHA%20PHONE%20TYPE%20C%20CHARGING%20.png', true);
