import { AppShell } from "@/components/ui/shell";
import { projects } from "@/lib/utils/mock-data";

export default function AdminProjectsPage() {
  return (
    <AppShell eyebrow="Admin projects" title="Project controls">
      <div className="grid gap-4">
        {projects.map((project) => (
          <article key={project.id} className="rounded-[1.75rem] border border-line bg-[#faf6ef] p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-ink/45">{project.status}</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-ink">{project.title}</h2>
              </div>
              <p className="text-sm text-ink/62">{project.category}</p>
            </div>
            <p className="mt-4 text-sm leading-7 text-ink/66">{project.thesis}</p>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
