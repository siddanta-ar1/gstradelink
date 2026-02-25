"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Upload, Plus, LogOut, CheckCircle2, XCircle, X } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Toast = { type: "success" | "error"; message: string };

export default function AdminDashboard() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Industrial Scale");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // 1. Check if user is logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) router.push("/admin/login");
    };
    checkUser();
  }, [router]);

  // Auto-dismiss toast after 5s
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(t);
  }, [toast]);

  // 2. Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setToast({ type: "error", message: "Please select an image before publishing." });
      return;
    }

    setUploading(true);

    try {
      // A. Upload Image to Supabase Storage
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // B. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from("product-images")
        .getPublicUrl(fileName);

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

      setToast({ type: "success", message: `"${name}" published successfully!` });
      setName("");
      setDesc("");
      setFile(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      setToast({ type: "error", message });
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-background-secondary p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary-600">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-danger-600 hover:text-danger-700 text-sm font-medium"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* Toast notification */}
        {toast && (
          <div
            className={`flex items-start gap-3 p-4 rounded-xl mb-6 border ${
              toast.type === "success"
                ? "bg-success-50 border-success-200 text-success-800"
                : "bg-danger-50 border-danger-200 text-danger-800"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 size={18} className="text-success-600 shrink-0 mt-0.5" />
            ) : (
              <XCircle size={18} className="text-danger-600 shrink-0 mt-0.5" />
            )}
            <p className="text-sm font-medium flex-1">{toast.message}</p>
            <button
              onClick={() => setToast(null)}
              className="opacity-60 hover:opacity-100 shrink-0"
              aria-label="Dismiss"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Upload Form */}
        <div className="bg-white p-6 rounded-2xl shadow-card border border-border-primary">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Plus size={20} className="text-accent-500" /> Add New Product
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-bold text-foreground-primary mb-1">
                Product Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-border-primary rounded-lg focus:border-primary-600 outline-none"
                placeholder="e.g., Heavy Duty Platform Scale"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-bold text-foreground-primary mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border border-border-primary rounded-lg focus:border-primary-600 outline-none bg-white"
              >
                <option value="Retail Scale">Retail Scale (Shop)</option>
                <option value="Industrial Scale">Industrial Scale (Factory)</option>
                <option value="Spare Part">Spare Part</option>
                <option value="Service">Repair Service</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-foreground-primary mb-1">
                Short Description
              </label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="w-full p-2 border border-border-primary rounded-lg focus:border-primary-600 outline-none h-24"
                placeholder="Key features like 100kg capacity, 10g accuracy..."
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-bold text-foreground-primary mb-1">
                Product Image
              </label>
              <div className="border-2 border-dashed border-border-secondary rounded-xl p-6 text-center hover:bg-background-secondary transition-colors">
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
                  <Upload size={24} className="text-foreground-muted" />
                  <span className="text-primary-600 font-medium">
                    {file ? file.name : "Click to upload photo"}
                  </span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={uploading}
              className="w-full bg-primary-600 text-white py-3 rounded-xl font-bold hover:bg-primary-700 transition-colors mt-4 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {uploading ? "Uploading..." : "Publish Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
