"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { recordLoginLog } from "@/lib/auth/login-log";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 10.2v3.6h5.1c-.2 1.2-.9 2.3-1.9 3l3.1 2.4c1.8-1.7 2.9-4.1 2.9-7 0-.7-.1-1.3-.2-1.9H12z"
      />
      <path
        fill="#34A853"
        d="M5.3 14.3l-.8.6-2.5 1.9C3.5 20 7.4 22.5 12 22.5c2.7 0 5-.9 6.7-2.4l-3.1-2.4c-.9.6-2 .9-3.6.9-2.8 0-5.1-1.9-5.9-4.4z"
      />
      <path
        fill="#4A90E2"
        d="M3.9 7.2C3.3 8.4 3 9.7 3 11s.3 2.6.9 3.8l3.3-2.5c-.2-.6-.3-1.2-.3-1.9s.1-1.3.3-1.9L3.9 7.2z"
      />
      <path
        fill="#FBBC05"
        d="M12 5.5c1.5 0 2.8.5 3.8 1.5l2.8-2.8C16.9 2.4 14.7 1.5 12 1.5 7.4 1.5 3.5 4 1.9 8.1l3.3 2.5C6.9 7.4 9.2 5.5 12 5.5z"
      />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      await recordLoginLog(supabase, {
        user: data.user,
        event: "login",
        method: "email",
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : null,
      });
    }

    router.push("/");
    router.refresh();
  };

  const handleGoogle = async () => {
    setError(null);
    setGoogleLoading(true);
    const origin = window.location.origin;
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback?next=/`,
        queryParams: { access_type: "offline", prompt: "consent" },
      },
    });
    if (oauthError) {
      setError(oauthError.message);
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] bg-white flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-medium text-[#111111] tracking-tight">
            Sign In
          </h1>
          <p className="mt-2 text-sm text-[#707072]">
            Welcome back to Gravitate
          </p>
        </div>

        <div className="border border-[#e5e5e5] p-6 sm:p-8 space-y-5">
          <Button
            type="button"
            variant="secondary"
            className="w-full gap-2"
            onClick={handleGoogle}
            disabled={googleLoading || loading}
          >
            {googleLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <GoogleIcon className="w-5 h-5" />
            )}
            Continue with Google
          </Button>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-[#e5e5e5]" />
            <span className="text-xs uppercase tracking-wider text-[#9e9ea0]">or</span>
            <div className="h-px flex-1 bg-[#e5e5e5]" />
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#111111] mb-1.5">
                Email
              </label>
              <Input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#111111] mb-1.5">
                Password
              </label>
              <Input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-sm text-[#d30005]" role="alert">
                {error}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={loading || googleLoading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign In"}
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-[#707072]">
          New here?{" "}
          <Link href="/signup" className="text-[#111111] font-medium underline underline-offset-2">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
