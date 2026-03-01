"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { XCircle, Lock, Mail, Shield, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{
        background:
          "linear-gradient(145deg, #0F1825 0%, #1A2433 40%, #2B4D72 100%)",
      }}
    >
      {/* Background decoration */}
      <div
        className="fixed top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(220,169,99,0.08) 0%, transparent 60%)",
          transform: "translate(30%, -30%)",
        }}
      />
      <div
        className="fixed bottom-0 left-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(62,94,133,0.15) 0%, transparent 60%)",
          transform: "translate(-30%, 30%)",
        }}
      />

      {/* Grid pattern */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        {/* Back to site link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-8 text-sm transition-colors"
          style={{ color: "rgba(174,202,233,0.7)" }}
        >
          <ArrowRight size={14} className="rotate-180" />
          Back to website
        </Link>

        {/* Card */}
        <div
          className="relative overflow-hidden rounded-3xl"
          style={{
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 32px 64px rgba(0,0,0,0.3)",
          }}
        >
          {/* Top accent bar */}
          <div
            className="h-1"
            style={{
              background: "linear-gradient(90deg, #DCA963 0%, #3E5E85 100%)",
            }}
          />

          <div className="p-8 sm:p-10">
            {/* Logo & Header */}
            <div className="text-center mb-10">
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(62,94,133,0.3) 0%, rgba(43,77,114,0.3) 100%)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <Image
                  src="/logo.png"
                  alt="GSTradeLink"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>

              <h1
                className="font-bold text-white mb-2"
                style={{
                  fontSize: "1.75rem",
                  letterSpacing: "-0.02em",
                }}
              >
                Admin Portal
              </h1>
              <p style={{ color: "rgba(174,202,233,0.7)", fontSize: "0.9rem" }}>
                Sign in to manage your products
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <div
                className="flex items-start gap-3 p-4 rounded-xl mb-6"
                style={{
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.2)",
                }}
              >
                <XCircle
                  size={18}
                  className="shrink-0 mt-0.5"
                  style={{ color: "#EF4444" }}
                />
                <p style={{ color: "#FCA5A5", fontSize: "0.875rem" }}>
                  {error}
                </p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "rgba(174,202,233,0.9)" }}
                >
                  Email Address
                </label>
                <div className="relative">
                  <div
                    className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                    style={{ color: "rgba(174,202,233,0.5)" }}
                  >
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl text-white placeholder:text-white/30 transition-all focus:outline-none focus:ring-2"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      fontSize: "0.95rem",
                    }}
                    placeholder="admin@gstradelink.com.np"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "rgba(174,202,233,0.9)" }}
                >
                  Password
                </label>
                <div className="relative">
                  <div
                    className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                    style={{ color: "rgba(174,202,233,0.5)" }}
                  >
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl text-white placeholder:text-white/30 transition-all focus:outline-none focus:ring-2"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      fontSize: "0.95rem",
                    }}
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl font-bold text-white transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                style={{
                  background:
                    "linear-gradient(135deg, #3E5E85 0%, #2B4D72 100%)",
                  boxShadow: "0 8px 24px rgba(62,94,133,0.4)",
                  fontSize: "0.95rem",
                }}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <Shield size={18} />
                    Sign in to Dashboard
                  </>
                )}
              </button>
            </form>

            {/* Security note */}
            <p
              className="text-center mt-8 text-xs"
              style={{ color: "rgba(174,202,233,0.4)" }}
            >
              <Lock size={12} className="inline mr-1" />
              Secured with Supabase Authentication
            </p>
          </div>
        </div>

        {/* Footer */}
        <p
          className="text-center mt-8 text-sm"
          style={{ color: "rgba(174,202,233,0.5)" }}
        >
          © {new Date().getFullYear()} GSTradeLink. All rights reserved.
        </p>
      </div>
    </div>
  );
}
