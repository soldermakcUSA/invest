import { AuthGate } from "@/components/auth-gate";
import { MobileAppShell } from "@/components/mobile-app-shell";

export default function MobilePage() {
  return (
    <AuthGate>
      <MobileAppShell />
    </AuthGate>
  );
}
