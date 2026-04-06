type WorkspacePageProps = {
  params: Promise<{ workspaceSlug: string }>;
};

export default async function WorkspacePage({ params }: WorkspacePageProps) {
  const { workspaceSlug } = await params;

  const workflowColumns = [
    {
      title: "Backlog",
      cards: ["Map API dependencies", "Audit UI tokens", "Review sprint scope"],
    },
    {
      title: "In Progress",
      cards: ["Refine dashboard shell", "Animate sidebar collapse"],
    },
    {
      title: "Review",
      cards: ["Finalize auth layout", "Validate glassmorphism spacing"],
    },
  ];

  return (
    <div className="flex-1 space-y-6">
      <section className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur-xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">Current Workspace</p>
              <h2 className="mt-2 text-2xl font-semibold text-zinc-100">{workspaceSlug}</h2>
              <p className="mt-1 max-w-2xl text-sm text-zinc-400">
                Minimal control surface for sprint planning, backlog triage, and delivery tracking.
              </p>
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300">
              Sprint 08
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Sprint Capacity</span>
              <span className="text-zinc-200">78% used</span>
            </div>
            <div className="mt-3 h-3 rounded-full bg-white/10">
              <div className="h-3 rounded-full bg-zinc-100" style={{ width: "78%" }} />
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-500">
              <span>Planned 39 pts</span>
              <span>Capacity 50 pts</span>
            </div>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">Status</p>
          <div className="mt-4 space-y-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-sm font-medium text-zinc-100">Healthy</p>
              <p className="mt-1 text-xs text-zinc-500">No overloaded signals detected.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-sm font-medium text-zinc-100">Focus Window</p>
              <p className="mt-1 text-xs text-zinc-500">Board and backlog sidebars remain collapsible.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        {workflowColumns.map((column) => (
          <div key={column.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-4 shadow-xl backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-zinc-100">{column.title}</h3>
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-zinc-400">
                {column.cards.length}
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {column.cards.map((card) => (
                <article key={card} className="rounded-2xl border border-white/10 bg-black/20 p-4 shadow-sm">
                  <p className="text-sm font-medium text-zinc-100">{card}</p>
                  <p className="mt-2 text-xs leading-5 text-zinc-500">
                    Typography and spacing carry hierarchy here, not accent color.
                  </p>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
