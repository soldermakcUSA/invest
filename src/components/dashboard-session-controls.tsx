"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";

export function DashboardSessionControls() {
  const { signOut, user } = useAuth();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleSignOut() {
    startTransition(async () => {
      await signOut();
      router.replace("/?auth=login");
    });
  }

  return (
    <>
      <div className="status-chip">
        <span />
        {user?.displayName || user?.email || "Authenticated"}
      </div>
      <button className="button button--ghost button--wide" disabled={isPending} onClick={handleSignOut} type="button">
        {isPending ? "Signing out..." : "Sign out"}
      </button>
    </>
  );
}
