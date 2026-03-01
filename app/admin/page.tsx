"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Upload,
  Plus,
  LogOut,
  CheckCircle2,
  XCircle,
  X,
  Package,
  LayoutDashboard,
  Settings,
  ImageIcon,
  FileText,
  Tag,
  ChevronRight,
  Home,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

type Toast = { type: "success" | "error"; message: string };

const CATEGORIES = [
  { value: "Precision & Pocket Mini Scales", label: "Precision Scales" },
  { value: "Kitchen & Compact Tabletop Scales", label: "Kitchen Scales" },
  { value: "Portable & Luggage Scales", label: "Luggage Scales" },
  { value: "Heavy-Duty Hanging & Crane Scales", label: "Industrial Scales" },
  { value: "Personal Health & Bathroom Scales", label: "Health Scales" },
  {
    value: "Packaging & Miscellaneous Equipment",
    label: "Packaging Equipment",
  },
  { value: "Service", label: "Repair & Service" },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [dragActive, setDragActive] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Precision & Pocket Mini Scales");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Check if user is logged in
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
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

  // Handle file selection
  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  // Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setToast({
        type: "error",
        message: "Please select an image before publishing.",
      });
      return;
    }

    setUploading(true);

    try {
      // Upload Image to Supabase Storage
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get Public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("product-images").getPublicUrl(fileName);

      // Save Data to Database
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

      setToast({
        type: "success",
        message: `"${name}" published successfully!`,
      });
      setName("");
      setDesc("");
      setFile(null);
      setPreview(null);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred.";
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
    <div className="min-h-screen flex" style={{ background: "#0F1825" }}>
      {/* Sidebar */}
      <aside
        className="hidden md:flex flex-col w-64 shrink-0"
        style={{
          background: "linear-gradient(180deg, #1A2433 0%, #0F1825 100%)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Logo */}
        <div
          className="p-6 border-b"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <Link href="/" className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #3E5E85 0%, #2B4D72 100%)",
              }}
            >
              <Image
                src="/logo.png"
                alt="GSTradeLink"
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
            <div>
              <p
                className="font-bold text-white text-sm"
                style={{ letterSpacing: "-0.01em" }}
              >
                GSTradeLink
              </p>
              <p style={{ fontSize: "0.65rem", color: "#DCA963" }}>
                Admin Panel
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          <div
            className="px-3 py-2 text-xs font-semibold uppercase tracking-wider"
            style={{ color: "rgba(174,202,233,0.4)" }}
          >
            Menu
          </div>

          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all"
            style={{
              background: "rgba(62,94,133,0.2)",
              color: "#FFFFFF",
            }}
          >
            <LayoutDashboard size={18} style={{ color: "#DCA963" }} />
            <span className="text-sm font-medium">Dashboard</span>
          </button>

          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all hover:bg-white/5"
            style={{ color: "rgba(174,202,233,0.7)" }}
          >
            <Package size={18} />
            <span className="text-sm font-medium">Products</span>
          </button>

          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all hover:bg-white/5"
            style={{ color: "rgba(174,202,233,0.7)" }}
          >
            <Settings size={18} />
            <span className="text-sm font-medium">Settings</span>
          </button>
        </nav>

        {/* Footer */}
        <div
          className="p-4 border-t"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-white/5"
            style={{ color: "rgba(174,202,233,0.7)" }}
          >
            <Home size={18} />
            <span className="text-sm font-medium">Back to Site</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all hover:bg-red-500/10 mt-1"
            style={{ color: "#EF4444" }}
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen overflow-y-auto">
        {/* Top Bar */}
        <header
          className="sticky top-0 z-30 px-6 py-4 flex items-center justify-between"
          style={{
            background: "rgba(15,24,37,0.8)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div>
            <h1
              className="text-xl font-bold text-white"
              style={{ letterSpacing: "-0.02em" }}
            >
              Add New Product
            </h1>
            <p style={{ fontSize: "0.85rem", color: "rgba(174,202,233,0.6)" }}>
              Fill in the details below to publish a new product
            </p>
          </div>

          {/* Mobile logout */}
          <button
            onClick={handleLogout}
            className="md:hidden flex items-center gap-2 px-4 py-2 rounded-lg transition-all"
            style={{
              background: "rgba(239,68,68,0.1)",
              color: "#EF4444",
              fontSize: "0.85rem",
            }}
          >
            <LogOut size={16} />
            Logout
          </button>
        </header>

        <div className="p-6 max-w-4xl mx-auto">
          {/* Toast Notification */}
          {toast && (
            <div
              className="flex items-start gap-3 p-4 rounded-xl mb-6"
              style={{
                background:
                  toast.type === "success"
                    ? "rgba(34,197,94,0.1)"
                    : "rgba(239,68,68,0.1)",
                border: `1px solid ${
                  toast.type === "success"
                    ? "rgba(34,197,94,0.2)"
                    : "rgba(239,68,68,0.2)"
                }`,
              }}
            >
              {toast.type === "success" ? (
                <CheckCircle2
                  size={20}
                  className="shrink-0 mt-0.5"
                  style={{ color: "#22C55E" }}
                />
              ) : (
                <XCircle
                  size={20}
                  className="shrink-0 mt-0.5"
                  style={{ color: "#EF4444" }}
                />
              )}
              <p
                className="flex-1 text-sm font-medium"
                style={{
                  color: toast.type === "success" ? "#86EFAC" : "#FCA5A5",
                }}
              >
                {toast.message}
              </p>
              <button
                onClick={() => setToast(null)}
                className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
                style={{
                  color: toast.type === "success" ? "#86EFAC" : "#FCA5A5",
                }}
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* Form Card */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <form onSubmit={handleSubmit}>
              {/* Form Grid */}
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Left Column - Image Upload */}
                <div
                  className="p-8 flex flex-col"
                  style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="flex items-center gap-2 mb-6">
                    <ImageIcon size={18} style={{ color: "#DCA963" }} />
                    <h2
                      className="text-white font-semibold"
                      style={{ fontSize: "0.95rem" }}
                    >
                      Product Image
                    </h2>
                  </div>

                  <div
                    className={`flex-1 relative rounded-xl transition-all ${
                      dragActive ? "ring-2 ring-[#DCA963]" : ""
                    }`}
                    style={{
                      background: preview
                        ? "transparent"
                        : "rgba(255,255,255,0.03)",
                      border: `2px dashed ${
                        dragActive
                          ? "#DCA963"
                          : preview
                            ? "transparent"
                            : "rgba(255,255,255,0.1)"
                      }`,
                      minHeight: "280px",
                    }}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleFileChange(e.target.files?.[0] || null)
                      }
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      id="file-upload"
                    />

                    {preview ? (
                      <div className="relative w-full h-full min-h-[280px]">
                        <Image
                          src={preview}
                          alt="Preview"
                          fill
                          className="object-contain rounded-xl"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            handleFileChange(null);
                          }}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 z-20"
                          style={{
                            background: "rgba(239,68,68,0.9)",
                            color: "#FFFFFF",
                          }}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                        <div
                          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                          style={{ background: "rgba(220,169,99,0.1)" }}
                        >
                          <Upload size={28} style={{ color: "#DCA963" }} />
                        </div>
                        <p
                          className="text-center mb-2"
                          style={{ color: "#FFFFFF", fontWeight: 500 }}
                        >
                          Drop image here or click to upload
                        </p>
                        <p
                          className="text-center text-sm"
                          style={{ color: "rgba(174,202,233,0.5)" }}
                        >
                          PNG, JPG up to 5MB
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column - Form Fields */}
                <div className="p-8 space-y-6">
                  {/* Product Name */}
                  <div>
                    <label className="flex items-center gap-2 mb-3">
                      <FileText size={16} style={{ color: "#DCA963" }} />
                      <span
                        className="text-sm font-medium"
                        style={{ color: "rgba(174,202,233,0.9)" }}
                      >
                        Product Name
                      </span>
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl text-white transition-all focus:outline-none focus:ring-2 focus:ring-[#3E5E85]"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        fontSize: "0.95rem",
                      }}
                      placeholder="e.g., Heavy Duty Platform Scale"
                      required
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="flex items-center gap-2 mb-3">
                      <Tag size={16} style={{ color: "#DCA963" }} />
                      <span
                        className="text-sm font-medium"
                        style={{ color: "rgba(174,202,233,0.9)" }}
                      >
                        Category
                      </span>
                    </label>
                    <div className="relative">
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl text-white appearance-none cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-[#3E5E85]"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          fontSize: "0.95rem",
                        }}
                      >
                        {CATEGORIES.map(({ value, label }) => (
                          <option
                            key={value}
                            value={value}
                            style={{ background: "#1A2433", color: "#FFFFFF" }}
                          >
                            {label}
                          </option>
                        ))}
                      </select>
                      <ChevronRight
                        size={18}
                        className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none"
                        style={{ color: "rgba(174,202,233,0.5)" }}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="flex items-center gap-2 mb-3">
                      <FileText size={16} style={{ color: "#DCA963" }} />
                      <span
                        className="text-sm font-medium"
                        style={{ color: "rgba(174,202,233,0.9)" }}
                      >
                        Short Description
                      </span>
                    </label>
                    <textarea
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl text-white resize-none transition-all focus:outline-none focus:ring-2 focus:ring-[#3E5E85]"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        fontSize: "0.95rem",
                        minHeight: "120px",
                      }}
                      placeholder="Key features like 100kg capacity, 10g accuracy..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={uploading}
                    className="w-full py-4 rounded-xl font-bold text-white transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center gap-2 mt-4"
                    style={{
                      background:
                        "linear-gradient(135deg, #DCA963 0%, #C28D44 100%)",
                      boxShadow: "0 8px 24px rgba(220,169,99,0.3)",
                      fontSize: "0.95rem",
                    }}
                  >
                    {uploading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Plus size={20} />
                        Publish Product
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Tips Card */}
          <div
            className="mt-6 p-6 rounded-xl"
            style={{
              background: "rgba(62,94,133,0.1)",
              border: "1px solid rgba(62,94,133,0.2)",
            }}
          >
            <h3
              className="font-semibold mb-3 flex items-center gap-2"
              style={{ color: "#AECAE9", fontSize: "0.9rem" }}
            >
              <CheckCircle2 size={16} style={{ color: "#3E5E85" }} />
              Tips for better product listings
            </h3>
            <ul
              className="space-y-2 text-sm"
              style={{ color: "rgba(174,202,233,0.7)" }}
            >
              <li className="flex items-start gap-2">
                <span style={{ color: "#DCA963" }}>•</span>
                Use high-quality images with white or neutral backgrounds
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: "#DCA963" }}>•</span>
                Include key specifications in the description (capacity,
                accuracy)
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: "#DCA963" }}>•</span>
                Choose the most specific category for better discoverability
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
