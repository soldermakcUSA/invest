import { projects } from "@/lib/utils/mock-data";
import { formatCurrency } from "@/lib/utils/format";

export function ProjectList() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {projects.map((project) => (
        <article key={project.id} className="rounded-[1.75rem] border border-line bg-[#faf6ef] p-5">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-ink/48">
            <span>{project.category}</span>
            <span>{project.riskLevel}</span>
          </div>
          <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-ink">{project.title}</h3>
          <p className="mt-3 text-sm leading-6 text-ink/68">{project.description}</p>
          <div className="mt-6 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-ink/45">Target return</p>
              <p className="mt-2 text-lg text-ink">{project.targetReturn.toFixed(1)}%</p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-[0.2em] text-ink/45">Minimum</p>
              <p className="mt-2 text-lg text-ink">{formatCurrency(project.minInvestment)}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
