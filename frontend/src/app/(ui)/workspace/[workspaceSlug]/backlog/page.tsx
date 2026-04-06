export default function WorkspaceBacklogPage() {
  const items = [
    { title: "Refine sidebar collapse", status: "In Review" },
    { title: "Tighten auth spacing", status: "Ready" },
    { title: "Add workspace naming", status: "Planned" },
  ];

  return (
    <div className="space-y-4 rounded-[1.75rem] border border-white/10 bg-white/5 p-4 shadow-xl backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-100">Backlog</h2>
        <span className="text-xs text-zinc-500">3 items</span>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <article key={item.title} className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-start justify-between gap-4">
              <p className="text-sm font-medium text-zinc-100">{item.title}</p>
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-zinc-400">
                {item.status}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
