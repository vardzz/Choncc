"use client";

import { useRouter } from "next/navigation";
import { Plus, ArrowRight } from "lucide-react";
import { useState } from "react";
import type { Workspace } from "@/lib/types";

// Mock workspaces
const mockWorkspaces: Workspace[] = [
  {
    id: "ws-dentara",
    slug: "dentara",
    name: "Dentara",
    description: "Health platform",
    createdBy: "user-1",
    createdAt: new Date(),
    members: [],
    invites: [],
  },
  {
    id: "ws-horizon",
    slug: "horizon",
    name: "Horizon AI",
    description: "AI/ML project",
    createdBy: "user-1",
    createdAt: new Date(),
    members: [],
    invites: [],
  },
  {
    id: "ws-portfolio",
    slug: "portfolio",
    name: "Personal Portfolio",
    description: "Web project",
    createdBy: "user-1",
    createdAt: new Date(),
    members: [],
    invites: [],
  },
];

export default function WorkspacesPage() {
  const router = useRouter();
  const [workspaces, setWorkspaces] = useState(mockWorkspaces);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newWSName, setNewWSName] = useState("");
  const [newWSDesc, setNewWSDesc] = useState("");

  const handleCreateWorkspace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWSName.trim()) return;

    const slug = newWSName.toLowerCase().replace(/\s+/g, "-");
    const newWS: Workspace = {
      id: `ws-${Date.now()}`,
      slug,
      name: newWSName,
      description: newWSDesc,
      createdBy: "user-1",
      createdAt: new Date(),
      members: [],
      invites: [],
    };

    setWorkspaces([...workspaces, newWS]);
    setShowCreateForm(false);
    setNewWSName("");
    setNewWSDesc("");

    // Navigate to new workspace
    setTimeout(() => router.push(`/workspace/${slug}`), 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#222222] to-[#2A2A2A] p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-[#F5F5F5]">Workspaces</h1>
          <p className="text-[#A0A0A0]">
            Select a workspace to start collaborating, or create a new one
          </p>
        </div>

        {/* Workspaces Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workspaces.map((ws) => (
            <button
              key={ws.id}
              onClick={() => router.push(`/workspace/${ws.slug}`)}
              className="group relative p-6 rounded-3xl border border-[#C2D8C4]/20 bg-[#2A2A2A]/50 backdrop-blur-md hover:border-[#C2D8C4]/50 hover:bg-[#2A2A2A]/80 transition-all duration-300 text-left overflow-hidden"
            >
              {/* Background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#C2D8C4]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative z-10 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-[#F5F5F5] group-hover:text-[#C2D8C4] transition">
                      {ws.name}
                    </h3>
                    <p className="text-sm text-[#A0A0A0]">
                      {ws.description || "No description"}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-[#C2D8C4]/30 group-hover:text-[#C2D8C4] group-hover:translate-x-1 transition-all" />
                </div>

                <div className="flex items-center gap-2 text-xs text-[#A0A0A0]">
                  <span className="px-2 py-1 rounded bg-[#C2D8C4]/10">
                    {ws.members.length} members
                  </span>
                </div>
              </div>
            </button>
          ))}

          {/* Create New Workspace Card */}
          <button
            onClick={() => setShowCreateForm(true)}
            className="group p-6 rounded-3xl border-2 border-dashed border-[#C2D8C4]/30 bg-[#2A2A2A]/20 hover:border-[#C2D8C4]/60 hover:bg-[#2A2A2A]/40 transition-all duration-300 flex flex-col items-center justify-center gap-3 min-h-[200px]"
          >
            <Plus className="h-8 w-8 text-[#C2D8C4]/50 group-hover:text-[#C2D8C4] transition" />
            <p className="text-sm font-semibold text-[#A0A0A0] group-hover:text-[#F5F5F5] transition">
              Create Workspace
            </p>
          </button>
        </div>

        {/* Create Form Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#2A2A2A] rounded-3xl border border-[#C2D8C4]/20 max-w-md w-full p-6 space-y-4">
              <h2 className="text-xl font-bold text-[#F5F5F5]">Create New Workspace</h2>

              <form onSubmit={handleCreateWorkspace} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#F5F5F5]">
                    Workspace Name
                  </label>
                  <input
                    type="text"
                    value={newWSName}
                    onChange={(e) => setNewWSName(e.target.value)}
                    placeholder="e.g., Dentara"
                    autoFocus
                    className="w-full px-4 py-2 rounded-xl bg-[#222222]/70 border border-[#C2D8C4]/20 text-[#F5F5F5] placeholder:text-[#A0A0A0] outline-none focus:border-[#C2D8C4]/50 transition"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#F5F5F5]">
                    Description (optional)
                  </label>
                  <input
                    type="text"
                    value={newWSDesc}
                    onChange={(e) => setNewWSDesc(e.target.value)}
                    placeholder="e.g., Health platform"
                    className="w-full px-4 py-2 rounded-xl bg-[#222222]/70 border border-[#C2D8C4]/20 text-[#F5F5F5] placeholder:text-[#A0A0A0] outline-none focus:border-[#C2D8C4]/50 transition"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="flex-1 px-4 py-2 rounded-xl border border-[#C2D8C4]/20 text-[#F5F5F5] hover:bg-[#222222]/50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 rounded-xl bg-[#C2D8C4] text-[#222222] font-semibold hover:bg-[#C2D8C4]/90 transition"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
