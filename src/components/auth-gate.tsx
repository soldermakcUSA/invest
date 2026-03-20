"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";

export function AuthGate({ children }: { children: ReactNode }) {
  const { isConfigured, isLoading, user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isConfigured && !user) {
      router.replace(`/?auth=login&next=${encodeURIComponent(pathname || "/dashboard")}`);
    }
  }, [isConfigured, isLoading, pathname, router, user]);

  if (!isConfigured) {
    return (
      <main className="login-page">
        <section className="auth-shell">
          <div className="auth-card">
            <p className="auth-message">
              Add your Supabase client keys to <code>.env.local</code> before opening the private dashboard.
            </p>
          </div>
        </section>
      </main>
    );
  }

  if (isLoading || !user) {
    return (
      <main className="login-page">
        <section className="auth-shell">
          <div className="auth-card">
            <p className="auth-message">Loading secure workspace...</p>
          </div>
        </section>
      </main>
    );
  }

  return <>{children}</>;
}
