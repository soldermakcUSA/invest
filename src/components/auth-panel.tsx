"use client";

import { FormEvent, useEffect, useState, useTransition } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile
} from "firebase/auth";
import { X } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { auth } from "@/lib/firebase/client";
import { upsertUserProfile } from "@/lib/firebase/user-profiles";
import { OrbitalBrand } from "@/components/orbital-brand";

type Mode = "login" | "signup";

type AuthPanelProps = {
  initialMode?: Mode;
  nextRoute?: string;
  onDismiss?: () => void;
  presentation?: "page" | "modal";
};

export function AuthPanel({
  initialMode = "login",
  nextRoute = "/dashboard",
  onDismiss,
  presentation = "page"
}: AuthPanelProps) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [wantsUpdates, setWantsUpdates] = useState(false);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const { isConfigured, isLoading, user } = useAuth();

  useEffect(() => {
    setMode(initialMode);
    setMessage("");
  }, [initialMode]);

  useEffect(() => {
    if (!isLoading && user) {
      window.location.assign(nextRoute);
    }
  }, [isLoading, nextRoute, user]);

  function switchMode(nextMode: Mode) {
    setMode(nextMode);
    setMessage("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isConfigured || !auth) {
      setMessage(
        "Add Firebase client keys in .env.local: NEXT_PUBLIC_FIREBASE_API_KEY, NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, NEXT_PUBLIC_FIREBASE_PROJECT_ID and NEXT_PUBLIC_FIREBASE_APP_ID."
      );
      return;
    }

    const firebaseAuth = auth;

    startTransition(async () => {
      try {
        if (mode === "signup") {
          const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
          const passwordIsStrong =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{12,}$/.test(password);

          if (!firstName.trim() || !lastName.trim()) {
            setMessage("Enter your first and last name to create the secure AlphaForge account.");
            return;
          }

          if (!acceptedTerms) {
            setMessage("Accept the Terms of Service and Privacy Policy to continue.");
            return;
          }

          if (!passwordIsStrong) {
            setMessage("Use at least 12 characters with uppercase, lowercase, number and symbol.");
            return;
          }

          if (password !== confirmPassword) {
            setMessage("Password confirmation does not match.");
            return;
          }

          const credentials = await createUserWithEmailAndPassword(firebaseAuth, email, password);
          if (fullName) {
            await updateProfile(credentials.user, { displayName: fullName });
          }
          await upsertUserProfile({
            firstName,
            lastName,
            marketingOptIn: wantsUpdates,
            provider: "password",
            user: credentials.user
          });

          setMessage("Secure account created. Redirecting to dashboard...");
          window.location.assign(nextRoute);
          return;
        }

        const credentials = await signInWithEmailAndPassword(firebaseAuth, email, password);
        await upsertUserProfile({
          provider: "password",
          user: credentials.user
        });
        setMessage("Signed in successfully. Redirecting to dashboard...");
        window.location.assign(nextRoute);
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Authentication failed.");
      }
    });
  }

  function handleGoogleSignIn() {
    if (!isConfigured || !auth) {
      setMessage(
        "Add Firebase client keys in .env.local: NEXT_PUBLIC_FIREBASE_API_KEY, NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, NEXT_PUBLIC_FIREBASE_PROJECT_ID and NEXT_PUBLIC_FIREBASE_APP_ID."
      );
      return;
    }

    const firebaseAuth = auth;

    startTransition(async () => {
      try {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });
        const credentials = await signInWithPopup(firebaseAuth, provider);
        await upsertUserProfile({
          provider: "google",
          user: credentials.user
        });
        setMessage("Google sign-in successful. Redirecting to dashboard...");
        window.location.assign(nextRoute);
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Google authentication failed.");
      }
    });
  }

  return (
    <div className={`auth-card auth-card--${mode}${presentation === "modal" ? " auth-card--modal" : ""}`}>
      <div className="auth-card__beam" aria-hidden="true" />
      <div className="auth-card__frame" aria-hidden="true" />

      <div className="auth-card__masthead">
        <OrbitalBrand compact />
        {onDismiss ? (
          <button
            aria-label="Close authentication modal"
            className="auth-dismiss"
            onClick={onDismiss}
            type="button"
          >
            <X size={18} />
          </button>
        ) : null}
      </div>

      <div className={`auth-intro ${mode === "login" ? "auth-intro--login" : "auth-intro--signup"}`}>
        <span className="eyebrow">{mode === "login" ? "Secure member login" : "Private account creation"}</span>
        <h2>
          {mode === "login" ? (
            <>
              Return to the AlphaForge
              <br />
              intelligence layer.
            </>
          ) : (
            <>
              Join the next generation
              <br />
              of intelligent investing.
            </>
          )}
        </h2>
        <p>
          {mode === "login"
            ? "Use your corporate email and password, or continue instantly with Google."
            : "Create your secure AlphaForge profile and unlock institutional-grade research."}
        </p>
      </div>

      <div className="auth-tabs" role="tablist" aria-label="Authentication mode">
        <button
          className={`auth-tab ${mode === "login" ? "is-active" : ""}`}
          onClick={() => switchMode("login")}
          type="button"
        >
          Sign In
        </button>
        <button
          className={`auth-tab ${mode === "signup" ? "is-active" : ""}`}
          onClick={() => switchMode("signup")}
          type="button"
        >
          Create Account
        </button>
      </div>

        <form className={`auth-form${mode === "signup" ? " auth-form--signup" : ""}`} onSubmit={handleSubmit}>
          {mode === "signup" ? (
            <div className="auth-name-grid">
              <label className="field">
                <span>First Name</span>
                <input
                  autoComplete="given-name"
                  name="firstName"
                  onChange={(event) => setFirstName(event.target.value)}
                  placeholder="Alex"
                  required
                  type="text"
                  value={firstName}
                />
              </label>

              <label className="field">
                <span>Last Name</span>
                <input
                  autoComplete="family-name"
                  name="lastName"
                  onChange={(event) => setLastName(event.target.value)}
                  placeholder="Morgan"
                  required
                  type="text"
                  value={lastName}
                />
              </label>
            </div>
          ) : null}

          <label className={`field${mode === "signup" ? " field--full" : ""}`}>
            <span>{mode === "signup" ? "Corporate Email Address" : "Email Address"}</span>
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

          <label className={`field${mode === "signup" ? " field--half" : ""}`}>
            <span>Password</span>
            <input
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              minLength={mode === "login" ? 8 : 12}
              name="password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder={mode === "login" ? "Enter your password" : "Create a strong password"}
              required
              type="password"
              value={password}
            />
          </label>

          {mode === "signup" ? (
            <>
              <label className="field field--half">
                <span>Confirm Password</span>
                <input
                  autoComplete="new-password"
                  name="confirmPassword"
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Repeat your secure password"
                  required
                  type="password"
                  value={confirmPassword}
                />
              </label>

              <div className="auth-checklist">
                <label className="auth-check">
                  <input
                    checked={acceptedTerms}
                    name="acceptedTerms"
                    onChange={(event) => setAcceptedTerms(event.target.checked)}
                    required
                    type="checkbox"
                  />
                  <span>I agree to the Terms of Service and Privacy Policy.</span>
                </label>

                <label className="auth-check">
                  <input
                    checked={wantsUpdates}
                    name="wantsUpdates"
                    onChange={(event) => setWantsUpdates(event.target.checked)}
                    type="checkbox"
                  />
                  <span>Opt-in for exclusive research and market updates.</span>
                </label>
              </div>
            </>
          ) : null}

          <button className="button button--primary button--wide auth-submit" disabled={isPending} type="submit">
            {isPending ? "Processing..." : mode === "login" ? "Enter Portal" : "Create Secure Account"}
          </button>

          <div className="auth-divider">
            <span />
            <p>or continue with</p>
            <span />
          </div>

          <button
            className="button button--ghost button--wide auth-google"
            disabled={isPending}
            onClick={handleGoogleSignIn}
            type="button"
          >
            Continue with Google
          </button>
        </form>

        {message ? <p className="auth-message">{message}</p> : null}
    </div>
  );
}
