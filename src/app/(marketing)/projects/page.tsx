import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { ProjectList } from "@/components/dashboard/project-list";

export default function ProjectsPage() {
  return (
    <div>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <p className="text-xs uppercase tracking-[0.28em] text-ink/45">Project universe</p>
        <h1 className="mt-4 text-6xl font-semibold tracking-[-0.05em] text-ink">Curated sleeves for phased deployment</h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-ink/64">
          The current set models how the product can present different risk bands, minimum allocations and thesis-led
          portfolio construction before live integrations are enabled.
        </p>
        <div className="mt-12">
          <ProjectList />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
