'use client';

import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      // Whenever the user logs out or the token gets refreshed automatically by Supabase
      if (event === 'SIGNED_OUT') {
        router.refresh(); // forces middleware to catch the unauthenticated state
      } else if (event === 'TOKEN_REFRESHED' || event === 'SIGNED_IN') {
        router.refresh(); // fetches the new updated cookies to the server components
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  return <>{children}</>;
}
