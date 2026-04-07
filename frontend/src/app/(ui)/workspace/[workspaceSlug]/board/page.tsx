import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bolt, ChevronLeft, ChevronRight, Ellipsis, Minus } from "lucide-react";

const board = [
  {
    title: "To Do",
    dot: "bg-zinc-400",
    tasks: [
      {
        priority: "HIGH",
        title: "Setup CI/CD pipeline",
        description: "Configure GitHub Actions for auto-deploy and checks.",
        tags: ["Backend", "DevOps"],
        initials: "AM",
        date: "Mar 18-28",
        points: 5,
      },
      {
        priority: "MEDIUM",
        title: "Responsive nav sidebar",
        description: "Mobile-first collapsible navigation.",
        tags: ["Frontend", "Mobile"],
        initials: "TB",
        date: "Mar 20-30",
        points: 3,
      },
    ],
  },
  {
    title: "In Progress",
    dot: "bg-sky-400",
    tasks: [
      {
        priority: "MEDIUM",
        title: "User settings page",
        description: "Account, notifications, security settings.",
        tags: ["UI/UX", "UX"],
        initials: "SK",
        date: "Mar 22-Apr 1",
        points: 4,
      },
      {
        priority: "HIGH",
        title: "Search with Elastic",
        description: "Full-text search with autocomplete.",
        tags: ["Backend", "Search"],
        initials: "LC",
        date: "Mar 25-Apr 5",
        points: 5,
      },
    ],
  },
  {
    title: "Review",
    dot: "bg-violet-400",
    tasks: [
      {
        priority: "LOW",
        title: "Dark mode tokens",
        description: "Design system token updates for dashboard.",
        tags: ["UI/UX", "Design"],
        initials: "SK",
        date: "Mar 15-22",
        points: 2,
      },
    ],
  },
  {
    title: "Done",
    dot: "bg-emerald-400",
    tasks: [
      {
        priority: "LOW",
        title: "Skeleton loading states",
        description: "Global skeleton screens for async routes.",
        tags: ["Frontend"],
        initials: "TB",
        date: "Mar 13-17",
        points: 2,
      },
      {
        priority: "MEDIUM",
        title: "Database indexing audit",
        description: "Identify and add missing indexes.",
        tags: ["Database"],
        initials: "LC",
        date: "Mar 12-19",
        points: 3,
      },
    ],
  },
];

function priorityClass(priority: string) {
  if (priority === "HIGH") return "border-red-500/40 bg-red-500/10 text-red-300";
  if (priority === "MEDIUM") return "border-amber-500/40 bg-amber-500/10 text-amber-300";
  return "border-sky-500/40 bg-sky-500/10 text-sky-300";
}

function tagClass(tag: string) {
  if (tag === "Backend") return "bg-emerald-500/20 text-emerald-300";
  if (tag === "Frontend") return "bg-sky-500/20 text-sky-300";
  if (tag === "UI/UX") return "bg-violet-500/20 text-violet-300";
  if (tag === "Database") return "bg-amber-500/20 text-amber-300";
  return "bg-zinc-500/20 text-zinc-300";
}

export default function WorkspaceBoardPage() {
  return (
    <div className="flex h-full min-h-0 flex-col rounded-2xl border border-white/10 bg-slate-950/35">
      <div className="border-b border-white/10 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full border border-white/10">
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </Button>
              <div>
                <h1 className="text-2xl font-semibold text-zinc-100">Sprint 10</h1>
                <p className="text-xs text-zinc-500">of 14 total</p>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full border border-white/10">
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-zinc-500">Apr 7 - Apr 21, 2026</p>
            <p className="font-mono text-2xl font-semibold text-violet-400">167:29:43</p>
          </div>
        </div>
      </div>

      <div className="border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-3">
          <Bolt className="h-4 w-4 text-orange-400" aria-hidden="true" />
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Sprint Capacity</p>
          <Progress
            value={96}
            className="h-2.5"
            indicatorClassName="bg-gradient-to-r from-orange-500 via-orange-400 to-red-500"
          />
          <p className="text-sm font-semibold text-orange-300">24</p>
          <p className="text-sm text-zinc-500">/ 20 SP</p>
          <Badge className="border-red-500/40 bg-red-500/10 text-red-300">Overloaded</Badge>
        </div>
      </div>

      <ScrollArea className="min-h-0 flex-1 p-3">
        <div className="grid min-w-[980px] gap-3 xl:grid-cols-4">
          {board.map((column) => (
            <section key={column.title} className="rounded-xl border border-white/10 bg-zinc-900/55">
              <div className="flex items-center justify-between border-b border-white/10 px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${column.dot}`} />
                  <h2 className="text-sm font-semibold text-zinc-100">{column.title}</h2>
                  <span className="text-xs text-zinc-500">{column.tasks.length}</span>
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-500 hover:text-zinc-200">
                  <Ellipsis className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>

              <div className="space-y-3 p-2.5">
                {column.tasks.map((task) => (
                  <Card key={task.title} className="rounded-xl border-white/15 bg-zinc-700/35">
                    <CardContent className="space-y-3 p-3">
                      <Badge className={priorityClass(task.priority)}>{task.priority}</Badge>
                      <div>
                        <p className="text-sm font-semibold leading-tight text-zinc-100">{task.title}</p>
                        <p className="mt-1 text-xs text-zinc-400 line-clamp-2">{task.description}</p>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {task.tags.map((tag) => (
                          <Badge key={tag} className={tagClass(tag)}>
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="items-center justify-between border-t border-white/10 px-3 py-2">
                      <div className="flex items-center gap-1.5">
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="bg-orange-500 text-[9px] text-white">{task.initials}</AvatarFallback>
                        </Avatar>
                        <p className="text-[11px] text-zinc-500">{task.date}</p>
                      </div>
                      <div className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-violet-500/30 text-[11px] text-violet-200">
                        {task.points}
                      </div>
                    </CardFooter>
                  </Card>
                ))}
                {column.tasks.length === 0 ? (
                  <div className="flex h-24 items-center justify-center rounded-xl border border-dashed border-white/15 text-sm text-zinc-500">
                    <Minus className="mr-1 h-4 w-4" aria-hidden="true" /> Empty
                  </div>
                ) : null}
              </div>
            </section>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
