"use client";

import { supabase } from "@/lib/supabase/client";

export type UserProfile = {
  uid: string;
  email: string;
  display_name: string;
  first_name: string;
  last_name: string;
  photo_url: string;
  provider: string;
  marketing_opt_in: boolean;
  balance: number;
  yield: number;
  daily_change: number;
  created_at: string;
  updated_at: string;
  last_sign_in_at: string;
};

/**
 * Загружает профиль пользователя из таблицы users.
 * Если профиля нет — создаёт запись с дефолтными значениями.
 */
export async function fetchOrCreateUserProfile(user: {
  id: string;
  email?: string;
  user_metadata?: Record<string, any>;
  app_metadata?: Record<string, any>;
}): Promise<UserProfile | null> {
  // 1. Пытаемся получить существующую запись
  const { data: existing, error: fetchError } = await supabase
    .from("users")
    .select("*")
    .eq("uid", user.id)
    .maybeSingle();

  if (fetchError) {
    console.error("Error fetching user profile:", fetchError);
    return null;
  }

  if (existing) {
    // Обновим время последнего входа
    await supabase
      .from("users")
      .update({
        last_sign_in_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("uid", user.id);

    return existing as UserProfile;
  }

  // 2. Пользователя нет — создаём запись
  const fullName = user.user_metadata?.full_name || "";
  const nameParts = fullName.split(/\s+/);
  const firstName =
    user.user_metadata?.first_name || nameParts[0] || "";
  const lastName =
    user.user_metadata?.last_name || nameParts.slice(1).join(" ") || "";

  const newProfile = {
    uid: user.id,
    email: user.email || "",
    display_name: fullName || user.email || "",
    first_name: firstName,
    last_name: lastName,
    photo_url: user.user_metadata?.avatar_url || "",
    provider: user.app_metadata?.provider || "password",
    marketing_opt_in: false,
    balance: 145891.87,
    yield: 12.86,
    daily_change: 1764.0,
    last_sign_in_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
  };

  const { data: created, error: insertError } = await supabase
    .from("users")
    .upsert(newProfile, { onConflict: "uid" })
    .select("*")
    .maybeSingle();

  if (insertError) {
    console.error("Error creating user profile:", insertError);
    return null;
  }

  return created as UserProfile;
}

/**
 * Подписка на изменения профиля пользователя в реальном времени.
 * Возвращает функцию отписки.
 */
export function subscribeToUserProfile(
  uid: string,
  onUpdate: (profile: Partial<UserProfile>) => void
) {
  const channel = supabase
    .channel(`user-profile-${uid}`)
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "users",
        filter: `uid=eq.${uid}`,
      },
      (payload) => {
        if (payload.new) {
          onUpdate(payload.new as Partial<UserProfile>);
        }
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
