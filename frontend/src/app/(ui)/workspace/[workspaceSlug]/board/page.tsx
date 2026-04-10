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
    dot: "bg-[#7E967F]",
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
    dot: "bg-[#9CB49E]",
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
    dot: "bg-[#AFC5B1]",
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
    dot: "bg-[#C2D8C4]",
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
  if (priority === "HIGH") return "border-[#C2D8C4]/35 bg-[#C2D8C4]/18 text-[#E7EFE8]";
  if (priority === "MEDIUM") return "border-[#C2D8C4]/35 bg-[#C2D8C4]/18 text-[#E7EFE8]";
  return "border-[#C2D8C4]/35 bg-[#C2D8C4]/18 text-[#E7EFE8]";
}

function tagClass(tag: string) {
  if (tag === "Backend") return "bg-[#C2D8C4]/20 text-[#DDE8DE]";
  if (tag === "Frontend") return "bg-[#C2D8C4]/20 text-[#DDE8DE]";
  if (tag === "UI/UX") return "bg-[#C2D8C4]/20 text-[#DDE8DE]";
  if (tag === "Database") return "bg-[#C2D8C4]/20 text-[#DDE8DE]";
  return "bg-[#C2D8C4]/16 text-[#CAD6CB]";
}

export default function WorkspaceBoardPage() {
  return (
    <div className="flex h-full min-h-0 flex-col rounded-2xl border border-[#C2D8C4]/18 bg-[#222222]/72">
      <div className="border-b border-[#C2D8C4]/18 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full border border-[#C2D8C4]/20">
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </Button>
              <div>
                <h1 className="text-2xl font-semibold text-[#F5F5F5]">Sprint 10</h1>
                <p className="text-xs text-[#9BA59B]">of 14 total</p>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full border border-[#C2D8C4]/20">
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#9BA59B]">Apr 7 - Apr 21, 2026</p>
            <p className="font-mono text-2xl font-semibold text-[#C2D8C4]">167:29:43</p>
          </div>
        </div>
      </div>

      <div className="border-b border-[#C2D8C4]/18 px-4 py-3">
        <div className="flex items-center gap-3">
          <Bolt className="h-4 w-4 text-[#C2D8C4]" aria-hidden="true" />
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9BA59B]">Sprint Capacity</p>
          <Progress
            value={96}
            className="h-2.5"
            indicatorClassName="bg-gradient-to-r from-[#8EA98F] via-[#AFC5B1] to-[#C2D8C4]"
          />
          <p className="text-sm font-semibold text-[#DDE8DE]">24</p>
          <p className="text-sm text-[#9BA59B]">/ 20 SP</p>
          <Badge className="border-[#C2D8C4]/35 bg-[#C2D8C4]/18 text-[#EAF1EA]">Overloaded</Badge>
        </div>
      </div>

      <ScrollArea className="min-h-0 flex-1 p-3">
        <div className="grid min-w-[980px] gap-3 xl:grid-cols-4">
          {board.map((column) => (
            <section key={column.title} className="rounded-xl border border-[#C2D8C4]/18 bg-[#2A2A2A]/70">
              <div className="flex items-center justify-between border-b border-[#C2D8C4]/18 px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${column.dot}`} />
                  <h2 className="text-sm font-semibold text-[#F5F5F5]">{column.title}</h2>
                  <span className="text-xs text-[#9BA59B]">{column.tasks.length}</span>
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-[#9BA59B] hover:text-[#DDE8DE]">
                  <Ellipsis className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>

              <div className="space-y-3 p-2.5">
                {column.tasks.map((task) => (
                  <Card key={task.title} className="rounded-xl border-[#C2D8C4]/20 bg-[#222222]/75">
                    <CardContent className="space-y-3 p-3">
                      <Badge className={priorityClass(task.priority)}>{task.priority}</Badge>
                      <div>
                        <p className="text-sm font-semibold leading-tight text-[#F5F5F5]">{task.title}</p>
                        <p className="mt-1 text-xs text-[#AAB4AA] line-clamp-2">{task.description}</p>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {task.tags.map((tag) => (
                          <Badge key={tag} className={tagClass(tag)}>
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="items-center justify-between border-t border-[#C2D8C4]/18 px-3 py-2">
                      <div className="flex items-center gap-1.5">
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="bg-[#5F7361] text-[9px] text-white">{task.initials}</AvatarFallback>
                        </Avatar>
                        <p className="text-[11px] text-[#9BA59B]">{task.date}</p>
                      </div>
                      <div className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#C2D8C4]/30 text-[11px] text-[#EAF1EA]">
                        {task.points}
                      </div>
                    </CardFooter>
                  </Card>
                ))}
                {column.tasks.length === 0 ? (
                  <div className="flex h-24 items-center justify-center rounded-xl border border-dashed border-[#C2D8C4]/20 text-sm text-[#9BA59B]">
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
