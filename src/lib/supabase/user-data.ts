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
  console.log("[UserProfile] Fetching profile for uid:", user.id);

  // 1. Пытаемся получить существующую запись
  const { data: existing, error: fetchError } = await supabase
    .from("users")
    .select("*")
    .eq("uid", user.id)
    .maybeSingle();

  if (fetchError) {
    console.error("[UserProfile] Error fetching profile:", fetchError.message, fetchError.details, fetchError.hint);
    return null;
  }

  if (existing) {
    const profile = existing as UserProfile;
    const updateFields: Record<string, any> = {
      last_sign_in_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Если first_name/last_name пусты в БД, но есть в метаданных — обновить
    const metaFirstName = user.user_metadata?.first_name || "";
    const metaLastName = user.user_metadata?.last_name || "";
    const metaFullName = user.user_metadata?.full_name || "";

    if (!profile.first_name && (metaFirstName || metaFullName)) {
      const nameParts = metaFullName.split(/\s+/);
      updateFields.first_name = metaFirstName || nameParts[0] || "";
      updateFields.last_name = metaLastName || nameParts.slice(1).join(" ") || "";
    }

    // Если display_name — это email, а first/last name есть — исправить
    const currentFirst = updateFields.first_name || profile.first_name || "";
    const currentLast = updateFields.last_name || profile.last_name || "";
    const nameFromParts = `${currentFirst} ${currentLast}`.trim();

    if (nameFromParts && (!profile.display_name || profile.display_name.includes("@"))) {
      updateFields.display_name = nameFromParts;
    }

    const { error: updateError } = await supabase
      .from("users")
      .update(updateFields)
      .eq("uid", user.id);

    if (updateError) {
      console.error("[UserProfile] Error updating profile:", updateError.message, updateError.details, updateError.hint);
    } else {
      console.log("[UserProfile] Profile updated successfully for uid:", user.id);
    }

    return { ...profile, ...updateFields } as UserProfile;
  }

  // 2. Пользователя нет — создаём запись
  const fullName = user.user_metadata?.full_name || "";
  const nameParts = fullName.split(/\s+/);
  const firstName =
    user.user_metadata?.first_name || nameParts[0] || "";
  const lastName =
    user.user_metadata?.last_name || nameParts.slice(1).join(" ") || "";
  const resolvedDisplayName =
    `${firstName} ${lastName}`.trim() || fullName || user.email || "";

  const newProfile = {
    uid: user.id,
    email: user.email || "",
    display_name: resolvedDisplayName,
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

  console.log("[UserProfile] Creating new profile for uid:", user.id, "name:", newProfile.display_name);

  const { data: created, error: insertError } = await supabase
    .from("users")
    .upsert(newProfile, { onConflict: "uid" })
    .select("*")
    .maybeSingle();

  if (insertError) {
    console.error("[UserProfile] ERROR creating profile:", insertError.message, insertError.details, insertError.hint, insertError.code);
    return null;
  }

  console.log("[UserProfile] Profile created successfully:", created);
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
