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
  ImageIcon,
  FileText,
  Tag,
  ChevronRight,
  Home,
  Menu,
  Trash2,
  RefreshCw,
  Eye,
  EyeOff,
  FolderPlus,
  Search,
  Pencil,
  Save,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

type Toast = { type: "success" | "error"; message: string };
type ActiveTab = "add-product" | "manage-products";

interface Product {
  id: string;
  name: string;
  category: string;
  short_description: string | null;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
}

const DEFAULT_CATEGORIES = [
  { value: "Precision & Pocket Mini Scales", label: "Precision Scales" },
  { value: "Kitchen & Compact Tabletop Scales", label: "Kitchen Scales" },
  { value: "Portable & Luggage Scales", label: "Luggage Scales" },
  { value: "Heavy-Duty Hanging & Crane Scales", label: "Industrial Scales" },
  { value: "Personal Health & Bathroom Scales", label: "Health Scales" },
  { value: "Packaging & Miscellaneous Equipment", label: "Packaging Equipment" },
  { value: "Service", label: "Repair & Service" },
];

// ─── Shared field components ────────────────────────────────────────────────
function FieldLabel({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
  return (
    <label className="flex items-center gap-2 mb-2">
      <Icon size={13} style={{ color: "#DCA963" }} />
      <span className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: "rgba(174,202,233,0.55)" }}>
        {children}
      </span>
    </label>
  );
}

function FieldInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full px-4 py-3 rounded-xl text-white text-sm bg-white/4 border border-white/9 placeholder:text-white/20 transition-all focus:outline-none focus:border-[#3E5E85]/70 focus:bg-white/6 focus:ring-0 ${props.className ?? ""}`}
    />
  );
}

function FieldTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full px-4 py-3 rounded-xl text-white text-sm bg-white/4 border border-white/9 placeholder:text-white/20 resize-none transition-all focus:outline-none focus:border-[#3E5E85]/70 focus:bg-white/6 focus:ring-0 ${props.className ?? ""}`}
    />
  );
}

function FieldSelect({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { children: React.ReactNode }) {
  return (
    <div className="relative">
      <select
        {...props}
        className="w-full px-4 py-3 rounded-xl text-white text-sm appearance-none cursor-pointer bg-white/4 border border-white/9 transition-all focus:outline-none focus:border-[#3E5E85]/70 focus:bg-white/6 focus:ring-0"
      >
        {children}
      </select>
      <ChevronRight size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" style={{ color: "rgba(174,202,233,0.3)" }} />
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>("add-product");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Add-product form
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Precision & Pocket Mini Scales");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Categories
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryLabel, setNewCategoryLabel] = useState("");
  const [newCategoryValue, setNewCategoryValue] = useState("");

  // Product list
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  // Edit drawer
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editName, setEditName] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editFile, setEditFile] = useState<File | null>(null);
  const [editPreview, setEditPreview] = useState<string | null>(null);
  const [editDragActive, setEditDragActive] = useState(false);
  const [saving, setSaving] = useState(false);

  // Delete confirm
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Auth
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.push("/admin/login");
    });
  }, [router]);

  // Toast
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(t);
  }, [toast]);

  // Fetch when tab opens
  useEffect(() => {
    if (activeTab === "manage-products") fetchProducts();
  }, [activeTab]);

  // Close edit drawer on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setEditingProduct(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // ─── Data helpers ────────────────────────────────────────────────────────

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      setProducts(data || []);
    } catch {
      setToast({ type: "error", message: "Failed to load products." });
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    setDeletingId(id);
    setConfirmDeleteId(null);
    try {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setToast({ type: "success", message: "Product deleted." });
    } catch {
      setToast({ type: "error", message: "Failed to delete product." });
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleActive = async (id: string, current: boolean) => {
    setTogglingId(id);
    try {
      const { error } = await supabase.from("products").update({ is_active: !current }).eq("id", id);
      if (error) throw error;
      setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, is_active: !current } : p)));
    } catch {
      setToast({ type: "error", message: "Failed to update status." });
    } finally {
      setTogglingId(null);
    }
  };

  // ─── Edit drawer ─────────────────────────────────────────────────────────

  const openEditDrawer = (product: Product) => {
    setEditingProduct(product);
    setEditName(product.name);
    setEditCategory(product.category);
    setEditDesc(product.short_description ?? "");
    setEditFile(null);
    setEditPreview(product.image_url);
  };

  const handleEditFileChange = (f: File | null) => {
    setEditFile(f);
    if (f) {
      const reader = new FileReader();
      reader.onloadend = () => setEditPreview(reader.result as string);
      reader.readAsDataURL(f);
    } else {
      setEditPreview(editingProduct?.image_url ?? null);
    }
  };

  const handleEditDrag = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setEditDragActive(true);
    else setEditDragActive(false);
  };

  const handleEditDrop = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    setEditDragActive(false);
    if (e.dataTransfer.files?.[0]) handleEditFileChange(e.dataTransfer.files[0]);
  };

  const handleSaveEdit = async () => {
    if (!editingProduct) return;
    setSaving(true);
    try {
      let imageUrl = editingProduct.image_url;

      if (editFile) {
        const ext = editFile.name.split(".").pop();
        const fileName = `${Date.now()}.${ext}`;
        const { error: uploadError } = await supabase.storage.from("product-images").upload(fileName, editFile);
        if (uploadError) throw uploadError;
        const { data: { publicUrl } } = supabase.storage.from("product-images").getPublicUrl(fileName);
        imageUrl = publicUrl;
      }

      const { error } = await supabase.from("products").update({
        name: editName,
        category: editCategory,
        short_description: editDesc,
        image_url: imageUrl,
      }).eq("id", editingProduct.id);
      if (error) throw error;

      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? { ...p, name: editName, category: editCategory, short_description: editDesc, image_url: imageUrl }
            : p
        )
      );
      setToast({ type: "success", message: `"${editName}" updated successfully.` });
      setEditingProduct(null);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to save changes.";
      setToast({ type: "error", message: msg });
    } finally {
      setSaving(false);
    }
  };

  // ─── Add product ─────────────────────────────────────────────────────────

  const handleAddCategory = () => {
    const v = newCategoryValue.trim(), l = newCategoryLabel.trim();
    if (!v || !l) { setToast({ type: "error", message: "Both fields are required." }); return; }
    if (categories.some((c) => c.value.toLowerCase() === v.toLowerCase())) {
      setToast({ type: "error", message: "Category already exists." }); return;
    }
    setCategories((prev) => [...prev, { value: v, label: l }]);
    setCategory(v);
    setNewCategoryValue(""); setNewCategoryLabel("");
    setShowAddCategory(false);
    setToast({ type: "success", message: `Category "${l}" added.` });
  };

  const handleFileChange = (f: File | null) => {
    setFile(f);
    if (f) { const r = new FileReader(); r.onloadend = () => setPreview(r.result as string); r.readAsDataURL(f); }
    else setPreview(null);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFileChange(e.dataTransfer.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) { setToast({ type: "error", message: "Please select an image." }); return; }
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from("product-images").upload(fileName, file);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from("product-images").getPublicUrl(fileName);
      const { error: dbError } = await supabase.from("products").insert([{ name, category, short_description: desc, image_url: publicUrl, is_active: true }]);
      if (dbError) throw dbError;

      setToast({ type: "success", message: `"${name}" published successfully!` });
      setName(""); setDesc(""); setFile(null); setPreview(null);
      setCategory("Precision & Pocket Mini Scales");
    } catch (err) {
      setToast({ type: "error", message: err instanceof Error ? err.message : "Unexpected error." });
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = async () => { await supabase.auth.signOut(); router.push("/"); };

  // ─── Derived ─────────────────────────────────────────────────────────────

  const filteredProducts = products.filter(
    (p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalActive = products.filter((p) => p.is_active).length;
  const totalInactive = products.filter((p) => !p.is_active).length;

  const navItems: { id: ActiveTab; label: string; icon: React.ElementType }[] = [
    { id: "add-product", label: "Add Product", icon: Plus },
    { id: "manage-products", label: "Manage Products", icon: Package },
  ];

  // ─── Shared image dropzone ────────────────────────────────────────────────
  const ImageDropzone = ({
    preview: src, dragActive: drag, onDrag, onDrop, onChange, onClear,
  }: {
    preview: string | null; dragActive: boolean;
    onDrag: (e: React.DragEvent) => void; onDrop: (e: React.DragEvent) => void;
    onChange: (f: File | null) => void; onClear: () => void;
  }) => (
    <div
      className={`relative rounded-2xl overflow-hidden transition-all duration-200 ${drag ? "ring-2 ring-[#DCA963]/60" : ""}`}
      style={{
        background: src ? "transparent" : "rgba(255,255,255,0.025)",
        border: `1.5px dashed ${drag ? "#DCA963" : src ? "transparent" : "rgba(255,255,255,0.08)"}`,
        minHeight: "260px",
      }}
      onDragEnter={onDrag} onDragLeave={onDrag} onDragOver={onDrag} onDrop={onDrop}
    >
      <input
        type="file" accept="image/*"
        onChange={(e) => onChange(e.target.files?.[0] || null)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
      />
      {src ? (
        <div className="relative w-full min-h-65">
          <Image src={src} alt="Preview" fill className="object-contain" />
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); onClear(); }}
            className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{ background: "rgba(239,68,68,0.85)", backdropFilter: "blur(8px)", color: "#fff" }}
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "rgba(220,169,99,0.1)" }}>
            <Upload size={20} style={{ color: "#DCA963" }} />
          </div>
          <div className="text-center px-4">
            <p className="text-sm font-medium text-white/80">Drop image or click to browse</p>
            <p className="text-xs mt-1" style={{ color: "rgba(174,202,233,0.35)" }}>PNG · JPG · WebP — max 5 MB</p>
          </div>
        </div>
      )}
    </div>
  );

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex" style={{ background: "#0A1120" }}>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ═══════════ SIDEBAR ═══════════ */}
      <aside
        className={`fixed md:sticky top-0 h-screen flex flex-col w-60 shrink-0 z-50 transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        style={{ background: "#0E1A2B", borderRight: "1px solid rgba(255,255,255,0.05)" }}
      >
        {/* Brand */}
        <div className="px-5 py-5 flex items-center justify-between border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
          <Link href="/" className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center" style={{ background: "linear-gradient(135deg, #2B4D72 0%, #1e3a57 100%)" }}>
              <Image src="/logo.png" alt="GS" width={20} height={20} className="object-contain" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-white truncate leading-tight">GSTradeLink</p>
              <p className="text-[10px] font-medium" style={{ color: "#DCA963" }}>Admin</p>
            </div>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/8 transition-colors shrink-0" style={{ color: "rgba(174,202,233,0.5)" }}>
            <X size={15} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-[0.12em]" style={{ color: "rgba(174,202,233,0.25)" }}>Menu</p>
          {navItems.map(({ id, label, icon: Icon }) => {
            const active = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => { setActiveTab(id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150 ${active ? "" : "hover:bg-white/4"}`}
                style={{ background: active ? "rgba(62,94,133,0.18)" : "transparent", color: active ? "#fff" : "rgba(174,202,233,0.5)" }}
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: active ? "rgba(220,169,99,0.12)" : "transparent" }}>
                  <Icon size={15} style={{ color: active ? "#DCA963" : "rgba(174,202,233,0.4)" }} />
                </div>
                <span className="text-[13px] font-medium">{label}</span>
                {active && <div className="ml-auto w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#DCA963" }} />}
              </button>
            );
          })}
        </nav>

        {/* Footer nav */}
        <div className="px-3 pb-4 pt-3 border-t space-y-0.5" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all hover:bg-white/4" style={{ color: "rgba(174,202,233,0.45)" }}>
            <Home size={15} />
            <span className="text-[13px] font-medium">Back to Site</span>
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all hover:bg-red-500/8" style={{ color: "rgba(239,68,68,0.7)" }}>
            <LogOut size={15} />
            <span className="text-[13px] font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ═══════════ MAIN ═══════════ */}
      <main className="flex-1 min-w-0 flex flex-col min-h-screen">

        {/* Top bar */}
        <header
          className="sticky top-0 z-30 px-4 sm:px-8 h-16 flex items-center justify-between gap-4 shrink-0"
          style={{ background: "rgba(10,17,32,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center hover:bg-white/8 transition-colors shrink-0" style={{ color: "rgba(174,202,233,0.7)" }}>
              <Menu size={19} />
            </button>
            <div className="min-w-0">
              <h1 className="text-sm sm:text-base font-bold text-white truncate" style={{ letterSpacing: "-0.015em" }}>
                {activeTab === "add-product" ? "Add New Product" : "Manage Products"}
              </h1>
              <p className="hidden sm:block text-[11px] mt-0.5" style={{ color: "rgba(174,202,233,0.38)" }}>
                {activeTab === "add-product" ? "Fill in the details to publish a product" : `${products.length} products · ${totalActive} active`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {activeTab === "manage-products" && (
              <button onClick={fetchProducts} disabled={loadingProducts} className="flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-medium transition-all hover:bg-white/8 disabled:opacity-40" style={{ color: "rgba(174,202,233,0.55)" }}>
                <RefreshCw size={13} className={loadingProducts ? "animate-spin" : ""} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            )}
            <button onClick={handleLogout} className="flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-medium transition-all" style={{ background: "rgba(239,68,68,0.08)", color: "rgba(239,68,68,0.8)" }}>
              <LogOut size={13} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </header>

        {/* Body */}
        <div className="flex-1 px-4 sm:px-8 py-8 max-w-4xl mx-auto w-full space-y-6">

          {/* Toast */}
          {toast && (
            <div
              className="flex items-center gap-3 px-4 py-3.5 rounded-2xl"
              style={{
                background: toast.type === "success" ? "rgba(34,197,94,0.07)" : "rgba(239,68,68,0.07)",
                border: `1px solid ${toast.type === "success" ? "rgba(34,197,94,0.18)" : "rgba(239,68,68,0.18)"}`,
              }}
            >
              {toast.type === "success"
                ? <CheckCircle2 size={16} className="shrink-0" style={{ color: "#4ADE80" }} />
                : <XCircle size={16} className="shrink-0" style={{ color: "#F87171" }} />}
              <p className="flex-1 text-sm" style={{ color: toast.type === "success" ? "#86EFAC" : "#FCA5A5" }}>
                {toast.message}
              </p>
              <button onClick={() => setToast(null)} className="shrink-0 opacity-40 hover:opacity-80 transition-opacity" style={{ color: toast.type === "success" ? "#86EFAC" : "#FCA5A5" }}>
                <X size={14} />
              </button>
            </div>
          )}

          {/* ══════ ADD PRODUCT ══════ */}
          {activeTab === "add-product" && (
            <div className="space-y-6">
              <div
                className="rounded-3xl overflow-hidden"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <form onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2">

                    {/* Image column */}
                    <div className="p-6 sm:p-8 border-b border-white/6 md:border-b-0 md:border-r md:border-white/6">
                      <div className="flex items-center gap-2 mb-5">
                        <ImageIcon size={14} style={{ color: "#DCA963" }} />
                        <span className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: "rgba(174,202,233,0.55)" }}>
                          Product Image
                        </span>
                      </div>
                      <ImageDropzone
                        preview={preview} dragActive={dragActive}
                        onDrag={handleDrag} onDrop={handleDrop}
                        onChange={handleFileChange} onClear={() => handleFileChange(null)}
                      />
                    </div>

                    {/* Fields column */}
                    <div className="p-6 sm:p-8 space-y-5">
                      {/* Name */}
                      <div>
                        <FieldLabel icon={FileText}>Product Name</FieldLabel>
                        <FieldInput
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g., Heavy Duty Platform Scale"
                          required
                        />
                      </div>

                      {/* Category */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="flex items-center gap-2">
                            <Tag size={13} style={{ color: "#DCA963" }} />
                            <span className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: "rgba(174,202,233,0.55)" }}>Category</span>
                          </label>
                          <button
                            type="button"
                            onClick={() => setShowAddCategory((v) => !v)}
                            className="flex items-center gap-1 h-6 px-2 rounded-lg text-[11px] font-semibold transition-all hover:bg-white/8"
                            style={{ color: "#DCA963", border: "1px solid rgba(220,169,99,0.2)" }}
                          >
                            <FolderPlus size={11} />
                            New
                          </button>
                        </div>

                        {showAddCategory && (
                          <div className="mb-3 p-4 rounded-2xl space-y-3" style={{ background: "rgba(220,169,99,0.04)", border: "1px solid rgba(220,169,99,0.12)" }}>
                            <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#DCA963" }}>New Category</p>
                            <FieldInput
                              value={newCategoryLabel}
                              onChange={(e) => setNewCategoryLabel(e.target.value)}
                              placeholder="Display name (e.g., Lab Scales)"
                            />
                            <FieldInput
                              value={newCategoryValue}
                              onChange={(e) => setNewCategoryValue(e.target.value)}
                              placeholder="Database value (e.g., Lab & Scientific Scales)"
                            />
                            <div className="grid grid-cols-2 gap-2 pt-1">
                              <button type="button" onClick={handleAddCategory}
                                className="py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-90"
                                style={{ background: "rgba(220,169,99,0.15)", color: "#DCA963" }}>
                                Add
                              </button>
                              <button type="button"
                                onClick={() => { setShowAddCategory(false); setNewCategoryLabel(""); setNewCategoryValue(""); }}
                                className="py-2 rounded-xl text-xs font-semibold transition-all hover:bg-white/8"
                                style={{ color: "rgba(174,202,233,0.45)", border: "1px solid rgba(255,255,255,0.07)" }}>
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}

                        <FieldSelect value={category} onChange={(e) => setCategory(e.target.value)}>
                          {categories.map(({ value, label }) => (
                            <option key={value} value={value} style={{ background: "#0E1A2B" }}>{label}</option>
                          ))}
                        </FieldSelect>
                      </div>

                      {/* Description */}
                      <div>
                        <FieldLabel icon={FileText}>Short Description</FieldLabel>
                        <FieldTextarea
                          value={desc}
                          onChange={(e) => setDesc(e.target.value)}
                          placeholder="Key specs — capacity, accuracy, material…"
                          style={{ minHeight: "100px" }}
                        />
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={uploading}
                        className="w-full h-12 rounded-2xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none mt-2"
                        style={{ background: "linear-gradient(135deg, #DCA963 0%, #b87a2e 100%)", boxShadow: "0 4px 20px rgba(220,169,99,0.22)" }}
                      >
                        {uploading ? (
                          <><div className="w-4 h-4 border-2 border-white/25 border-t-white rounded-full animate-spin" />Uploading…</>
                        ) : (
                          <><Plus size={16} />Publish Product</>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Tips */}
              <div className="flex gap-3 p-5 rounded-2xl" style={{ background: "rgba(62,94,133,0.06)", border: "1px solid rgba(62,94,133,0.12)" }}>
                <CheckCircle2 size={15} className="shrink-0 mt-0.5" style={{ color: "rgba(62,94,133,0.6)" }} />
                <div>
                  <p className="text-xs font-semibold mb-2" style={{ color: "rgba(174,202,233,0.55)" }}>Tips for better listings</p>
                  <ul className="space-y-1">
                    {["Use high-quality images with a clean background", "Include specs — capacity, accuracy, and material", "Choose the most specific category available"].map((t) => (
                      <li key={t} className="flex items-start gap-2 text-xs" style={{ color: "rgba(174,202,233,0.38)" }}>
                        <span className="shrink-0 mt-0.5" style={{ color: "rgba(220,169,99,0.5)" }}>·</span>{t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* ══════ MANAGE PRODUCTS ══════ */}
          {activeTab === "manage-products" && (
            <div className="space-y-5">

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {[
                  { label: "Total", value: products.length, color: "#7BA7CC", bg: "rgba(62,94,133,0.12)" },
                  { label: "Active", value: totalActive, color: "#4ADE80", bg: "rgba(34,197,94,0.08)" },
                  { label: "Inactive", value: totalInactive, color: "#FBBF24", bg: "rgba(251,191,36,0.08)" },
                ].map(({ label, value, color, bg }) => (
                  <div key={label} className="p-4 sm:p-5 rounded-2xl" style={{ background: bg, border: `1px solid ${color}18` }}>
                    <p className="text-2xl sm:text-3xl font-bold tabular-nums" style={{ color }}>{value}</p>
                    <p className="text-[11px] mt-1 font-medium" style={{ color: "rgba(174,202,233,0.4)" }}>{label}</p>
                  </div>
                ))}
              </div>

              {/* Search */}
              <div className="relative">
                <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "rgba(174,202,233,0.25)" }} />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products…"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl text-white text-sm bg-white/4 border border-white/7 placeholder:text-white/15 focus:outline-none focus:border-[#3E5E85]/50 transition-all"
                />
              </div>

              {/* List */}
              {loadingProducts ? (
                <div className="flex items-center justify-center py-24">
                  <div className="w-7 h-7 border-2 border-white/10 border-t-[#DCA963]/60 rounded-full animate-spin" />
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 gap-3">
                  <Package size={32} style={{ color: "rgba(174,202,233,0.12)" }} />
                  <p className="text-sm" style={{ color: "rgba(174,202,233,0.3)" }}>
                    {searchQuery ? "No products match your search." : "No products yet."}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-150 group"
                      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      {/* Thumb */}
                      <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.04)" }}>
                        {product.image_url
                          ? <Image src={product.image_url} alt={product.name} width={48} height={48} className="w-full h-full object-cover" />
                          : <ImageIcon size={16} style={{ color: "rgba(174,202,233,0.18)" }} />}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white/90 truncate leading-tight">{product.name}</p>
                        <p className="text-xs mt-0.5 truncate" style={{ color: "rgba(174,202,233,0.38)" }}>{product.category}</p>
                      </div>

                      {/* Badge */}
                      <span
                        className="hidden sm:inline-flex shrink-0 items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold"
                        style={{
                          background: product.is_active ? "rgba(74,222,128,0.08)" : "rgba(239,68,68,0.08)",
                          color: product.is_active ? "#4ADE80" : "#F87171",
                        }}
                      >
                        <span className="w-1 h-1 rounded-full shrink-0" style={{ background: "currentColor" }} />
                        {product.is_active ? "Active" : "Inactive"}
                      </span>

                      {/* Actions */}
                      <div className="flex items-center gap-1 shrink-0">
                        {/* Edit */}
                        <button
                          onClick={() => openEditDrawer(product)}
                          title="Edit"
                          className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:bg-white/8"
                          style={{ color: "rgba(174,202,233,0.4)" }}
                        >
                          <Pencil size={14} />
                        </button>

                        {/* Toggle */}
                        <button
                          onClick={() => handleToggleActive(product.id, product.is_active)}
                          disabled={togglingId === product.id}
                          title={product.is_active ? "Deactivate" : "Activate"}
                          className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:bg-white/8 disabled:opacity-40"
                          style={{ color: product.is_active ? "#4ADE80" : "rgba(174,202,233,0.3)" }}
                        >
                          {togglingId === product.id
                            ? <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                            : product.is_active ? <Eye size={14} /> : <EyeOff size={14} />}
                        </button>

                        {/* Delete / Confirm */}
                        {confirmDeleteId === product.id ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              disabled={deletingId === product.id}
                              className="h-7 px-2.5 rounded-lg text-[11px] font-semibold transition-all"
                              style={{ background: "rgba(239,68,68,0.15)", color: "#F87171" }}
                            >
                              {deletingId === product.id ? <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" /> : "Delete"}
                            </button>
                            <button onClick={() => setConfirmDeleteId(null)} className="h-7 px-2.5 rounded-lg text-[11px] font-semibold transition-all hover:bg-white/8" style={{ color: "rgba(174,202,233,0.4)" }}>
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmDeleteId(product.id)}
                            title="Delete"
                            className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:bg-red-500/10"
                            style={{ color: "rgba(239,68,68,0.45)" }}
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* ═══════════ EDIT DRAWER ═══════════ */}
      {editingProduct && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={() => setEditingProduct(null)}
          />

          {/* Drawer */}
          <div
            className="fixed top-0 right-0 h-full z-50 flex flex-col w-full max-w-lg"
            style={{ background: "#0E1A2B", borderLeft: "1px solid rgba(255,255,255,0.07)", boxShadow: "-24px 0 80px rgba(0,0,0,0.5)" }}
          >
            {/* Drawer header */}
            <div className="px-6 h-16 flex items-center justify-between shrink-0 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(220,169,99,0.1)" }}>
                  <Pencil size={13} style={{ color: "#DCA963" }} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white leading-tight">Edit Product</p>
                  <p className="text-[11px]" style={{ color: "rgba(174,202,233,0.35)" }}>ID: {editingProduct.id.slice(0, 8)}…</p>
                </div>
              </div>
              <button
                onClick={() => setEditingProduct(null)}
                className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-white/8 transition-colors"
                style={{ color: "rgba(174,202,233,0.45)" }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Drawer body */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">

              {/* Image */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <ImageIcon size={13} style={{ color: "#DCA963" }} />
                  <span className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: "rgba(174,202,233,0.55)" }}>Image</span>
                  {editFile && (
                    <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background: "rgba(220,169,99,0.1)", color: "#DCA963" }}>New image selected</span>
                  )}
                </div>
                <ImageDropzone
                  preview={editPreview} dragActive={editDragActive}
                  onDrag={handleEditDrag} onDrop={handleEditDrop}
                  onChange={handleEditFileChange} onClear={() => handleEditFileChange(null)}
                />
              </div>

              {/* Name */}
              <div>
                <FieldLabel icon={FileText}>Product Name</FieldLabel>
                <FieldInput value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Product name" required />
              </div>

              {/* Category */}
              <div>
                <FieldLabel icon={Tag}>Category</FieldLabel>
                <FieldSelect value={editCategory} onChange={(e) => setEditCategory(e.target.value)}>
                  {categories.map(({ value, label }) => (
                    <option key={value} value={value} style={{ background: "#0E1A2B" }}>{label}</option>
                  ))}
                </FieldSelect>
              </div>

              {/* Description */}
              <div>
                <FieldLabel icon={FileText}>Short Description</FieldLabel>
                <FieldTextarea
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  placeholder="Key specs and features…"
                  style={{ minHeight: "100px" }}
                />
              </div>
            </div>

            {/* Drawer footer */}
            <div className="px-6 py-4 border-t flex gap-3 shrink-0" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.15)" }}>
              <button
                onClick={() => setEditingProduct(null)}
                className="flex-1 h-11 rounded-2xl text-sm font-semibold transition-all hover:bg-white/8"
                style={{ color: "rgba(174,202,233,0.5)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={saving}
                className="flex-1 h-11 rounded-2xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
                style={{ background: "linear-gradient(135deg, #DCA963 0%, #b87a2e 100%)", boxShadow: "0 4px 16px rgba(220,169,99,0.2)" }}
              >
                {saving
                  ? <><div className="w-4 h-4 border-2 border-white/25 border-t-white rounded-full animate-spin" />Saving…</>
                  : <><Save size={15} />Save Changes</>}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
