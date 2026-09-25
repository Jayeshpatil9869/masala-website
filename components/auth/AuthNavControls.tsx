"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { recordLoginLog } from "@/lib/auth/login-log";
import type { User } from "@supabase/supabase-js";
import { LogOut, User as UserIcon } from "lucide-react";

export default function AuthNavControls() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getUser().then(({ data }) => {
      if (mounted) {
        setUser(data.user);
        setReady(true);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setReady(true);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleSignOut = async () => {
    if (user) {
      await recordLoginLog(supabase, {
        user,
        event: "logout",
        method: user.app_metadata?.provider === "google" ? "google" : "email",
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : null,
      });
    }
    await supabase.auth.signOut();
    router.refresh();
  };

  if (!ready) {
    return <div className="hidden sm:block w-24 h-10" aria-hidden />;
  }

  if (user) {
    const name =
      (user.user_metadata?.full_name as string | undefined) ||
      (user.user_metadata?.name as string | undefined) ||
      user.email?.split("@")[0] ||
      "Account";

    return (
      <div className="hidden sm:flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#111111] max-w-[120px] truncate">
          <UserIcon className="w-3.5 h-3.5 shrink-0" />
          {name}
        </span>
        <button
          type="button"
          onClick={handleSignOut}
          className="inline-flex items-center justify-center gap-1.5 h-10 px-4 rounded-full bg-[#f5f5f5] text-[#111111] text-xs font-medium hover:bg-[#e5e5e5] active:scale-95 transition-all"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="hidden sm:flex items-center gap-2">
      <Link
        href="/login"
        className="inline-flex items-center justify-center h-10 px-4 rounded-full text-xs font-medium text-[#111111] hover:bg-[#f5f5f5] transition-colors"
      >
        Sign In
      </Link>
      <Link
        href="/signup"
        className="inline-flex items-center justify-center h-10 px-5 rounded-full bg-[#111111] text-white text-xs font-medium hover:bg-black active:scale-95 transition-all"
      >
        Sign Up
      </Link>
    </div>
  );
}
