"use client";

import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import type { User } from "firebase/auth";
import { db } from "@/lib/firebase/client";

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

  const userRef = doc(db, "users", user.uid);
  const existingProfile = await getDoc(userRef);
  const existingData = (existingProfile.data() ?? {}) as Record<string, unknown>;
  const fallbackName = splitDisplayName(getDisplayNameFromUser(user));
  const existingFirstName = readStringField(existingData, "firstName") || readStringField(existingData, "First name");
  const existingLastName = readStringField(existingData, "lastName") || readStringField(existingData, "Last name");
  const resolvedFirstName = firstName?.trim() || existingFirstName || fallbackName.firstName;
  const resolvedLastName = lastName?.trim() || existingLastName || fallbackName.lastName;
  const existingMarketingOptIn = typeof existingData.marketingOptIn === "boolean" ? existingData.marketingOptIn : false;
  const resolvedDisplayName =
    `${resolvedFirstName} ${resolvedLastName}`.trim() || getDisplayNameFromUser(user);

  await setDoc(
    userRef,
    {
      uid: user.uid,
      email: user.email ?? "",
      displayName: resolvedDisplayName,
      firstName: resolvedFirstName,
      lastName: resolvedLastName,
      photoURL: user.photoURL ?? "",
      provider,
      marketingOptIn: marketingOptIn ?? existingMarketingOptIn,
      lastSignInAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      createdAt: existingProfile.exists() ? existingData.createdAt : serverTimestamp()
    },
    { merge: true }
  );
}
