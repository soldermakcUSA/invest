import Image from "next/image";
import { AuthPanel } from "@/components/auth-panel";
import { OrbitalBrand } from "@/components/orbital-brand";

export default function LoginPage() {
  return (
    <main className="login-page">
      <section className="login-showcase">
        <div className="login-showcase__copy">
          <OrbitalBrand />
          <span className="eyebrow">Controlled portal access</span>
          <h1>Enter the AlphaForge workspace through Supabase-backed authentication.</h1>
          <p>
            Billing and payment rails will arrive later. The current portal already supports brand, entry flow and
            private dashboard presentation.
          </p>
        </div>

        <div className="login-showcase__media">
          <Image alt="AlphaForge reference" height={768} src="/brand/web-reference.jpeg" width={1376} />
        </div>
      </section>

      <AuthPanel />
    </main>
  );
}
