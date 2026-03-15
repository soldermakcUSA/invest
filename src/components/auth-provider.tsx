"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { supabase } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import {
  fetchOrCreateUserProfile,
  subscribeToUserProfile,
  type UserProfile,
} from "@/lib/supabase/user-data";

type AuthContextValue = {
  isConfigured: boolean;
  isLoading: boolean;
  user: User | null;
  profile: UserProfile | null;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let unsubscribeProfile: (() => void) | null = null;

    // Загрузить профиль и подписаться на изменения
    async function loadProfile(authUser: User) {
      const userProfile = await fetchOrCreateUserProfile({
        id: authUser.id,
        email: authUser.email,
        user_metadata: authUser.user_metadata,
        app_metadata: authUser.app_metadata,
      });

      setProfile(userProfile);

      // Подписка на реалтайм-обновления
      unsubscribeProfile = subscribeToUserProfile(authUser.id, (updated) => {
        setProfile((prev) => (prev ? { ...prev, ...updated } : prev));
      });
    }

    // Инициализация
    supabase.auth.getSession().then(({ data: { session } }) => {
      const authUser = session?.user ?? null;
      setUser(authUser);

      if (authUser) {
        loadProfile(authUser).finally(() => setIsLoading(false));
      } else {
        setProfile(null);
        setIsLoading(false);
      }
    });

    // Слушаем изменения авторизации
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const authUser = session?.user ?? null;
      setUser(authUser);

      // Очистить предыдущую подписку
      if (unsubscribeProfile) {
        unsubscribeProfile();
        unsubscribeProfile = null;
      }

      if (authUser) {
        loadProfile(authUser);
      } else {
        setProfile(null);
      }
    });

    return () => {
      subscription.unsubscribe();
      if (unsubscribeProfile) {
        unsubscribeProfile();
      }
    };
  }, []);

  const value: AuthContextValue = {
    isConfigured: true,
    isLoading,
    user,
    profile,
    async signOut() {
      await supabase.auth.signOut();
      setProfile(null);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}
