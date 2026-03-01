"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { XCircle, Lock, Mail, Shield, ArrowRight, Eye, EyeOff, AlertTriangle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// ── Rate-limit helpers ────────────────────────────────────────────────────────
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes
const STORAGE_KEY = "_gs_login_guard";

interface LockoutState { attempts: number; lockedUntil: number | null }

function getLockout(): LockoutState {
  if (typeof window === "undefined") return { attempts: 0, lockedUntil: null };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { attempts: 0, lockedUntil: null };
  } catch { return { attempts: 0, lockedUntil: null }; }
}

function saveLockout(state: LockoutState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function clearLockout() {
  localStorage.removeItem(STORAGE_KEY);
}

// Normalize Supabase error messages so we never leak user-enumeration details
function normalizeError(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes("invalid login") || lower.includes("invalid credentials") || lower.includes("email not confirmed")) {
    return "Incorrect email or password. Please try again.";
  }
  if (lower.includes("too many")) {
    return "Too many requests. Please wait a moment and try again.";
  }
  return "Sign in failed. Please check your credentials and try again.";
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attemptsLeft, setAttemptsLeft] = useState<number>(() => {
    if (typeof window === "undefined") return MAX_ATTEMPTS;
    const s = getLockout();
    if (!s.lockedUntil || s.lockedUntil <= Date.now()) return MAX_ATTEMPTS - s.attempts;
    return 0;
  });
  const [lockedUntil, setLockedUntil] = useState<number | null>(() => {
    if (typeof window === "undefined") return null;
    const s = getLockout();
    if (s.lockedUntil && s.lockedUntil > Date.now()) return s.lockedUntil;
    if (s.lockedUntil) clearLockout(); // expired lockout — clean up
    return null;
  });
  const [countdown, setCountdown] = useState(0);

  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/admin";

  // Countdown timer while locked out
  useEffect(() => {
    if (!lockedUntil) return;
    const tick = () => {
      const remaining = Math.max(0, lockedUntil - Date.now());
      setCountdown(Math.ceil(remaining / 1000));
      if (remaining <= 0) {
        setLockedUntil(null);
        setAttemptsLeft(MAX_ATTEMPTS);
        clearLockout();
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [lockedUntil]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Check lockout
    const state = getLockout();
    if (state.lockedUntil && state.lockedUntil > Date.now()) {
      setLockedUntil(state.lockedUntil);
      return;
    }

    setLoading(true);
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      // Increment attempt counter
      const newAttempts = state.attempts + 1;
      const isNowLocked = newAttempts >= MAX_ATTEMPTS;
      const newLockedUntil = isNowLocked ? Date.now() + LOCKOUT_MS : null;

      saveLockout({ attempts: newAttempts, lockedUntil: newLockedUntil });

      if (isNowLocked) {
        setLockedUntil(newLockedUntil!);
        setError(null);
      } else {
        setAttemptsLeft(MAX_ATTEMPTS - newAttempts);
        setError(normalizeError(authError.message));
      }
      setLoading(false);
    } else {
      clearLockout();
      router.push(nextPath);
    }
  };

  const isLocked = countdown > 0;
  const formatCountdown = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: "linear-gradient(145deg, #0F1825 0%, #1A2433 40%, #2B4D72 100%)" }}
    >
      {/* Background decorations */}
      <div className="fixed top-0 right-0 w-150 h-150 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(220,169,99,0.08) 0%, transparent 60%)", transform: "translate(30%, -30%)" }} />
      <div className="fixed bottom-0 left-0 w-125 h-125 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(62,94,133,0.15) 0%, transparent 60%)", transform: "translate(-30%, 30%)" }} />
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E")` }} />

      <div className="relative z-10 w-full max-w-md">
        {/* Back to site */}
        <Link href="/" className="inline-flex items-center gap-2 mb-8 text-sm transition-colors" style={{ color: "rgba(174,202,233,0.7)" }}>
          <ArrowRight size={14} className="rotate-180" />
          Back to website
        </Link>

        {/* Card */}
        <div className="relative overflow-hidden rounded-3xl"
          style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(20px)", boxShadow: "0 32px 64px rgba(0,0,0,0.3)" }}>
          {/* Top accent bar */}
          <div className="h-1" style={{ background: "linear-gradient(90deg, #DCA963 0%, #3E5E85 100%)" }} />

          <div className="p-8 sm:p-10">
            {/* Logo & Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5"
                style={{ background: "linear-gradient(135deg, rgba(62,94,133,0.3) 0%, rgba(43,77,114,0.3) 100%)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <Image src="/logo.png" alt="GSTradeLink" width={40} height={40} className="object-contain" />
              </div>
              <h1 className="font-bold text-white mb-2" style={{ fontSize: "1.75rem", letterSpacing: "-0.02em" }}>
                Admin Portal
              </h1>
              <p style={{ color: "rgba(174,202,233,0.7)", fontSize: "0.9rem" }}>
                Sign in to manage your products
              </p>
            </div>

            {/* Lockout Banner */}
            {isLocked && (
              <div className="flex items-start gap-3 p-4 rounded-xl mb-6"
                style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)" }}>
                <AlertTriangle size={18} className="shrink-0 mt-0.5" style={{ color: "#F59E0B" }} />
                <div>
                  <p style={{ color: "#FCD34D", fontSize: "0.875rem", fontWeight: 600 }}>Account temporarily locked</p>
                  <p style={{ color: "rgba(253,211,77,0.8)", fontSize: "0.8rem", marginTop: "2px" }}>
                    Too many failed attempts. Try again in{" "}
                    <span className="font-bold tabular-nums">{formatCountdown(countdown)}</span>
                  </p>
                </div>
              </div>
            )}

            {/* Error Alert */}
            {!isLocked && error && (
              <div className="flex items-start gap-3 p-4 rounded-xl mb-6"
                style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
                <XCircle size={18} className="shrink-0 mt-0.5" style={{ color: "#EF4444" }} />
                <div>
                  <p style={{ color: "#FCA5A5", fontSize: "0.875rem" }}>{error}</p>
                  {attemptsLeft < MAX_ATTEMPTS && attemptsLeft > 0 && (
                    <p style={{ color: "rgba(252,165,165,0.7)", fontSize: "0.78rem", marginTop: "4px" }}>
                      {attemptsLeft} attempt{attemptsLeft !== 1 ? "s" : ""} remaining before lockout
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5" autoComplete="on">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "rgba(174,202,233,0.9)" }}>
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none" style={{ color: "rgba(174,202,233,0.5)" }}>
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl text-white placeholder:text-white/30 transition-all focus:outline-none focus:ring-2"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", fontSize: "0.95rem" }}
                    placeholder="Enter your email"
                    disabled={isLocked}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "rgba(174,202,233,0.9)" }}>
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none" style={{ color: "rgba(174,202,233,0.5)" }}>
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl text-white placeholder:text-white/30 transition-all focus:outline-none focus:ring-2"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", fontSize: "0.95rem" }}
                    placeholder="••••••••"
                    disabled={isLocked}
                    required
                  />
                  {/* Toggle visibility */}
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center transition-opacity hover:opacity-100"
                    style={{ color: "rgba(174,202,233,0.5)", opacity: 0.7 }}
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || isLocked}
                className="w-full py-4 rounded-xl font-bold text-white transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                style={{ background: "linear-gradient(135deg, #3E5E85 0%, #2B4D72 100%)", boxShadow: "0 8px 24px rgba(62,94,133,0.4)", fontSize: "0.95rem" }}
              >
                {loading ? (
                  <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in...</>
                ) : (
                  <><Shield size={18} /> Sign in to Dashboard</>
                )}
              </button>
            </form>

            {/* Security note */}
            <p className="text-center mt-8 text-xs" style={{ color: "rgba(174,202,233,0.4)" }}>
              <Lock size={12} className="inline mr-1" />
              Secured with Supabase Authentication
            </p>
          </div>
        </div>

        <p className="text-center mt-8 text-sm" style={{ color: "rgba(174,202,233,0.5)" }}>
          © {new Date().getFullYear()} GSTradeLink. All rights reserved.
        </p>
      </div>
    </div>
  );
}

