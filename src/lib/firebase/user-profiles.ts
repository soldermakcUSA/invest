"use client";

import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import type { User } from "firebase/auth";
import { db } from "@/lib/firebase/client";
import { supabase } from "@/lib/supabase/client";

type UserProfileInput = {
  firstName?: string;
  lastName?: string;
  marketingOptIn?: boolean;
  provider: "google" | "password";
  user: User;
};

function readStringField(data: Record<string, unknown>, key: string) {
  const value = data[key];
  return typeof value === "string" ? value.trim() : "";
}

function getDisplayNameFromUser(user: User) {
  return user.displayName || user.providerData.find((profile) => Boolean(profile?.displayName))?.displayName || "";
}

function splitDisplayName(displayName: string | null) {
  if (!displayName) {
    return { firstName: "", lastName: "" };
  }

  const parts = displayName.trim().split(/\s+/);
  const [firstName = "", ...rest] = parts;
  return {
    firstName,
    lastName: rest.join(" ")
  };
}

export async function upsertUserProfile({
  firstName,
  lastName,
  marketingOptIn,
  provider,
  user
}: UserProfileInput) {
  if (!db) {
    throw new Error("Cloud Firestore is not configured.");
  }

  // 🔥 1. Keep saving basic profile to Firebase Auth / Firestore if needed, or remove. 
  // For your request, we transition the actual user record and balance to Supabase
  const fallbackName = splitDisplayName(getDisplayNameFromUser(user));
  const resolvedFirstName = firstName?.trim() || fallbackName.firstName;
  const resolvedLastName = lastName?.trim() || fallbackName.lastName;
  const resolvedDisplayName =
    `${resolvedFirstName} ${resolvedLastName}`.trim() || getDisplayNameFromUser(user);

  // 🔴 Fetch existing user from Supabase
  const { data: existingUser, error: fetchError } = await supabase
    .from('users')
    .select('*')
    .eq('uid', user.uid)
    .single();

  const existingBalance = existingUser?.balance ?? 145891.87;
  const existingYield = existingUser?.yield ?? 12.86;
  const existingDailyChange = existingUser?.dailyChange ?? 1764.00;

  // 🟢 UPSERT into Supabase
  const { error } = await supabase
    .from('users')
    .upsert({
      uid: user.uid,
      email: user.email ?? "",
      display_name: resolvedDisplayName,
      first_name: resolvedFirstName,
      last_name: resolvedLastName,
      photo_url: user.photoURL ?? "",
      provider,
      marketing_opt_in: marketingOptIn ?? existingUser?.marketing_opt_in ?? false,
      last_sign_in_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      balance: existingBalance,
      yield: existingYield,
      daily_change: existingDailyChange,
      created_at: existingUser ? existingUser.created_at : new Date().toISOString()
    }, { onConflict: 'uid' });

  if (error) {
    console.error("Error saving user to Supabase:", error);
  }
}
