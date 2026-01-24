"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Upload, Plus, LogOut } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Industrial Scale");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // 1. Check if user is logged in
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) router.push("/admin/login");
    };
    checkUser();
  }, [router]);

  // 2. Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please select an image!");

    setUploading(true);

    try {
      // A. Upload Image to Supabase Storage
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`; // Unique name
      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // B. Get Public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("product-images").getPublicUrl(fileName);

      // C. Save Data to Database
      const { error: dbError } = await supabase.from("products").insert([
        {
          name,
          category,
          short_description: desc,
          image_url: publicUrl,
          is_active: true,
        },
      ]);

      if (dbError) throw dbError;

      alert("Product Added Successfully!");
      // Reset Form
      setName("");
      setDesc("");
      setFile(null);
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-brand-primary">
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* Upload Form */}
        <div className="bg-white p-6 rounded-lg shadow-industrial border border-slate-200">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Plus size={20} className="text-brand-accent" /> Add New Product
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">
                Product Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded focus:border-brand-primary outline-none"
                placeholder="e.g., Heavy Duty Platform Scale"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border rounded focus:border-brand-primary outline-none bg-white"
              >
                <option value="Retail Scale">Retail Scale (Shop)</option>
                <option value="Industrial Scale">
                  Industrial Scale (Factory)
                </option>
                <option value="Spare Part">Spare Part</option>
                <option value="Service">Repair Service</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">
                Short Description
              </label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="w-full p-2 border rounded focus:border-brand-primary outline-none h-24"
                placeholder="Key features like 100kg capacity, 10g accuracy..."
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">
                Product Image
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <Upload size={24} className="text-slate-400" />
                  <span className="text-brand-primary font-medium">
                    {file ? file.name : "Click to upload photo"}
                  </span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={uploading}
              className="w-full bg-brand-primary text-white py-3 rounded-lg font-bold hover:bg-brand-secondary transition-colors mt-4 flex items-center justify-center gap-2"
            >
              {uploading ? "Uploading..." : "Publish Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
