"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Tags,
  Package,
  MessageSquare,
  LogOut,
  Flame,
  ShieldCheck,
  ScrollText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Categories", href: "/categories", icon: Tags },
  { label: "Products", href: "/products", icon: Package },
  { label: "Queries", href: "/queries", icon: MessageSquare },
  { label: "Login Logs", href: "/login-logs", icon: ScrollText },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    router.push("/login");
  };

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside className="hidden lg:flex w-64 flex-shrink-0 bg-white border-r border-[#EAEAEA] flex-col h-screen sticky top-0 z-30 select-none">
        {/* Logo & Brand Identity */}
        <div className="px-6 py-6 border-b border-[#EAEAEA]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#111111] rounded-xl flex items-center justify-center shadow-sm">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display text-xl tracking-wider text-[#111111] leading-none uppercase">
                  Gravitate
                </span>
                <span className="px-1.5 py-0.5 bg-[#111111] text-white text-[9px] font-bold rounded-sm uppercase tracking-wider">
                  Admin
                </span>
              </div>
              <p className="text-[11px] text-[#707072] font-medium mt-0.5 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#007D48]" /> Verified Portal
              </p>
            </div>
          </div>
        </div>

        {/* Navigation links */}
        <div className="flex-1 px-3 py-5 space-y-1.5 overflow-y-auto no-scrollbar">
          <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-[#9E9EA0] mb-2">
            Main Navigation
          </p>
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group btn-press-active",
                  active
                    ? "bg-[#111111] text-white shadow-sm font-semibold"
                    : "text-[#4B4B4D] hover:bg-[#F5F5F5] hover:text-[#111111]"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={cn(
                      "w-4 h-4 transition-transform group-hover:scale-110",
                      active ? "text-white" : "text-[#707072]"
                    )}
                  />
                  <span>{label}</span>
                </div>
                {active && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D30005]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Admin Footer & Logout */}
        <div className="p-3 border-t border-[#EAEAEA] bg-[#FAFAFA]">
          <div className="flex items-center justify-between px-3 py-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-2.5 h-2.5 rounded-full bg-[#007D48] ring-4 ring-[#007D48]/20 flex-shrink-0 animate-pulse" />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#111111] truncate">Store Manager</p>
                <p className="text-[10px] text-[#707072] truncate">admin@gravitatee.com</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Log Out"
              className="p-2 rounded-lg text-[#707072] hover:text-[#D30005] hover:bg-red-50 transition-all btn-press-active"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Mobile: Top Header Bar ── */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white/95 backdrop-blur-md border-b border-[#EAEAEA] flex items-center justify-between px-4 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#111111] rounded-lg flex items-center justify-center shadow-sm">
            <Flame className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-display text-lg tracking-wider text-[#111111] uppercase leading-none">
                Gravitate
              </span>
              <span className="px-1 py-0.5 bg-[#111111] text-white text-[8px] font-bold rounded uppercase">
                Admin
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleLogout}
            className="p-2 text-[#707072] hover:text-[#D30005] hover:bg-red-50 rounded-lg transition"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ── Mobile: Fixed Bottom Navigation Dock ── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-[#EAEAEA] safe-area-pb shadow-lg">
        <div className="flex items-center justify-around px-2 py-1.5">
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all btn-press-active",
                  active
                    ? "text-[#111111] font-semibold"
                    : "text-[#707072] hover:text-[#111111]"
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 transition-transform",
                    active ? "scale-110 text-[#111111]" : "text-[#9E9EA0]"
                  )}
                />
                <span className="text-[10px] mt-1 tracking-tight truncate max-w-full">
                  {label}
                </span>
                {active && (
                  <span className="absolute bottom-1 w-1 h-1 bg-[#D30005] rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
