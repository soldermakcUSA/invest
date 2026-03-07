"use client";

import { FormEvent, useState, useTransition } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Mode = "login" | "signup";

export function AuthPanel() {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("Use Supabase credentials to access the private intelligence workspace.");
  const [isPending, startTransition] = useTransition();

  const hasSupabaseEnv =
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!hasSupabaseEnv) {
      setMessage("Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local to enable auth.");
      return;
    }

    startTransition(async () => {
      const supabase = createClient();
      const action =
        mode === "login"
          ? supabase.auth.signInWithPassword({ email, password })
          : supabase.auth.signUp({ email, password });

      const { error } = await action;

      if (error) {
        setMessage(error.message);
        return;
      }

      setMessage(
        mode === "login"
          ? "Signed in successfully. Open the dashboard to continue."
          : "Access request submitted. Confirm the email in Supabase if confirmation is enabled."
      );
    });
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-tabs" role="tablist" aria-label="Authentication mode">
          <button
            className={`auth-tab ${mode === "login" ? "is-active" : ""}`}
            onClick={() => setMode("login")}
            type="button"
          >
            Sign In
          </button>
          <button
            className={`auth-tab ${mode === "signup" ? "is-active" : ""}`}
            onClick={() => setMode("signup")}
            type="button"
          >
            Request Access
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Email</span>
            <input
              autoComplete="email"
              name="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="analyst@alphaforge.ai"
              required
              type="email"
              value={email}
            />
          </label>

          <label className="field">
            <span>Password</span>
            <input
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              minLength={8}
              name="password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Minimum 8 characters"
              required
              type="password"
              value={password}
            />
          </label>

          <button className="button button--primary button--wide" disabled={isPending} type="submit">
            {isPending ? "Processing..." : mode === "login" ? "Enter Portal" : "Create Workspace Access"}
          </button>
        </form>

        <p className="auth-message">{message}</p>

        <div className="auth-links">
          <Link href="/">Back to portal</Link>
          <Link href="/dashboard">Preview dashboard</Link>
        </div>
      </div>
    </div>
  );
}
