"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";

export default function BacklogPage() {
  const router = useRouter();
  const params = useParams();
  const workspaceSlug = params?.workspaceSlug as string;

  useEffect(() => {
    router.push(`/workspace/${workspaceSlug}`);
  }, [workspaceSlug, router]);

  return null;
}
