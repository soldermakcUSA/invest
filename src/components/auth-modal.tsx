"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { AuthPanel } from "@/components/auth-panel";

type AuthMode = "login" | "signup";

type AuthModalContextValue = {
  closeAuth: () => void;
  openAuth: (mode: AuthMode, nextRoute?: string) => void;
};

const AuthModalContext = createContext<AuthModalContextValue | undefined>(undefined);
const AUTH_MODAL_EXIT_MS = 320;

type AuthModalProviderProps = {
  children: ReactNode;
  initialMode?: AuthMode;
  initialNextRoute?: string;
};

export function AuthModalProvider({
  children,
  initialMode,
  initialNextRoute = "/dashboard"
}: AuthModalProviderProps) {
  const [isRendered, setIsRendered] = useState(Boolean(initialMode));
  const [isOpen, setIsOpen] = useState(Boolean(initialMode));
  const [mode, setMode] = useState<AuthMode>(initialMode ?? "login");
  const [nextRoute, setNextRoute] = useState(initialNextRoute);
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        clearAuthQueryFromUrl();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function clearAuthQueryFromUrl() {
    const url = new URL(window.location.href);
    url.searchParams.delete("auth");
    url.searchParams.delete("next");
    window.history.replaceState({}, "", url);
  }

  function closeAuth() {
    setIsOpen(false);
    clearAuthQueryFromUrl();
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = window.setTimeout(() => {
      setIsRendered(false);
      closeTimerRef.current = null;
    }, AUTH_MODAL_EXIT_MS);
  }

  function openAuth(nextMode: AuthMode, destination = "/dashboard") {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setMode(nextMode);
    setNextRoute(destination);
    setIsRendered(true);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setIsOpen(true);
      });
    });
  }

  return (
    <AuthModalContext.Provider value={{ closeAuth, openAuth }}>
      {children}
      {isRendered ? (
        <div
          aria-modal="true"
          className={`auth-modal${isOpen ? " is-open" : ""}`}
          onClick={closeAuth}
          role="dialog"
        >
          <div className="auth-modal__backdrop" />
          <div className={`auth-modal__shell auth-modal__shell--${mode}`} onClick={(event) => event.stopPropagation()}>
            <AuthPanel initialMode={mode} nextRoute={nextRoute} onDismiss={closeAuth} presentation="modal" />
          </div>
        </div>
      ) : null}
    </AuthModalContext.Provider>
  );
}

type AuthModalTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  mode: AuthMode;
  nextRoute?: string;
};

export function AuthModalTrigger({
  children,
  mode,
  nextRoute = "/dashboard",
  onClick,
  type = "button",
  ...props
}: AuthModalTriggerProps) {
  const context = useContext(AuthModalContext);
  const { user } = useAuth();

  if (!context) {
    throw new Error("AuthModalTrigger must be used within an AuthModalProvider.");
  }

  return (
    <button
      {...props}
      onClick={(event) => {
        onClick?.(event);

        if (event.defaultPrevented) {
          return;
        }

        if (user) {
          window.location.assign(nextRoute);
          return;
        }

        context.openAuth(mode, nextRoute);
      }}
      type={type}
    >
      {children}
    </button>
  );
}
