export default function WorkspaceBoardPage() {
  const columns = [
    { title: "Backlog", cards: ["Define scope", "Refine tokens"] },
    { title: "Doing", cards: ["Animate layout", "Polish cards"] },
    { title: "Done", cards: ["Auth shell", "Route transitions"] },
  ];

  return (
    <div className="grid gap-4 xl:grid-cols-3">
      {columns.map((column) => (
        <section key={column.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-4 shadow-xl backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-zinc-100">{column.title}</h2>
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-zinc-400">
              {column.cards.length}
            </span>
          </div>
          <div className="mt-4 space-y-3">
            {column.cards.map((card) => (
              <article key={card} className="rounded-2xl border border-white/10 bg-black/20 p-4 shadow-sm">
                <p className="text-sm font-medium text-zinc-100">{card}</p>
                <p className="mt-2 text-xs leading-5 text-zinc-500">Typography, spacing, and surface depth drive hierarchy.</p>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
