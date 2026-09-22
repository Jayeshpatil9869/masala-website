"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Lock, Mail, Flame, ArrowRight, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast.error(error.message);
      setLoading(false);
    } else {
      toast.success("Welcome back!");
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4 sm:p-6 selection:bg-[#111111] selection:text-white relative overflow-hidden">
      {/* Subtle background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-[#111111] rounded-2xl shadow-md mb-4 ring-4 ring-black/5">
            <Flame className="w-7 h-7 text-white" />
          </div>
          <h1 className="font-display text-3xl sm:text-4xl uppercase tracking-wider text-[#111111] leading-none">
            Gravitate
          </h1>
          <div className="flex items-center justify-center gap-1.5 mt-1">
            <span className="text-xs font-semibold text-[#707072] uppercase tracking-widest">
              Store Control Center
            </span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#EAEAEA] p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-[#111111]">Sign In</h2>
            <p className="text-xs text-[#707072] mt-0.5">
              Enter your authorized manager credentials to continue
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-wider text-[#4B4B4D] mb-1.5"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9EA0]" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@gravitatee.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl text-sm text-[#111111] placeholder:text-[#9E9EA0] focus:outline-none focus:ring-2 focus:ring-[#111111] focus:bg-white transition"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-bold uppercase tracking-wider text-[#4B4B4D]"
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9EA0]" />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl text-sm text-[#111111] placeholder:text-[#9E9EA0] focus:outline-none focus:ring-2 focus:ring-[#111111] focus:bg-white transition font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 flex items-center justify-center gap-2 px-5 py-3 bg-[#111111] hover:bg-[#222222] text-white font-semibold rounded-xl text-sm transition-all shadow-sm hover:shadow active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin text-white" />
              ) : (
                <>
                  <span>Access Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#EAEAEA] flex items-center justify-center gap-2 text-center">
            <ShieldCheck className="w-4 h-4 text-[#007D48]" />
            <span className="text-[11px] text-[#707072] font-medium">
              Secured with Supabase RBAC Authentication
            </span>
          </div>
        </div>

        <p className="text-center text-[11px] text-[#9E9EA0] mt-6">
          © {new Date().getFullYear()} Gravitate Spices. All rights reserved.
        </p>
      </div>
    </div>
  );
}
