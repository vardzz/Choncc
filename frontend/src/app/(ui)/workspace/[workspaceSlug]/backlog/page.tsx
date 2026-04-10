export default function WorkspaceBacklogPage() {
  const items = [
    { title: "Refine sidebar collapse", status: "In Review" },
    { title: "Tighten auth spacing", status: "Ready" },
    { title: "Add workspace naming", status: "Planned" },
  ];

  return (
    <div className="space-y-4 rounded-[1.75rem] border border-[#C2D8C4]/20 bg-[#2A2A2A]/78 p-4 shadow-xl backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-[#F5F5F5]">Backlog</h2>
        <span className="text-xs text-[#A2ACA2]">3 items</span>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <article key={item.title} className="rounded-2xl border border-[#C2D8C4]/18 bg-[#222222]/70 p-4">
            <div className="flex items-start justify-between gap-4">
              <p className="text-sm font-medium text-[#F5F5F5]">{item.title}</p>
              <span className="rounded-full border border-[#C2D8C4]/20 bg-[#C2D8C4]/12 px-2 py-0.5 text-[11px] text-[#C6D3C7]">
                {item.status}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
