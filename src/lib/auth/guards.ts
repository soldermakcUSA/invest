import type { KycStatus, UserRole } from "@/types/domain";

export function canAccessAdmin(role: UserRole) {
  return role === "admin" || role === "operator" || role === "compliance";
}

export function canInvest(kycStatus: KycStatus) {
  return kycStatus === "verified";
}
