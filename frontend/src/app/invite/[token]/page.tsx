"use client";

/**
 * Invite join page
 * User clicks invite link -> authenticates -> joins workspace with default role
 */

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isInviteValid } from "@/lib/invite";

export default function InvitePage() {
  const params = useParams();
  const router = useRouter();
  const token = params?.token as string;

  const [status, setStatus] = useState<'loading' | 'valid' | 'invalid' | 'joined'>('loading');
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!token) {
      setStatus('invalid');
      setError('Invalid invite link');
      return;
    }

    // Simulate invite validation and joining
    // In production:
    // 1. POST /api/invites/validate - validate token
    // 2. POST /api/invites/join - add user to workspace
    // 3. Redirect to workspace

    const validateAndJoin = async () => {
      try {
        // Mock validation
        const mockInvites = [
          {
            token: 'test-token-123',
            workspaceId: 'ws-dentara',
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            usedCount: 0,
            defaultRole: 'DEVELOPER' as const,
          },
        ];

        const invite = mockInvites.find((i) => i.token === token);
        if (!invite) {
          setStatus('invalid');
          setError('Invite not found or already expired');
          return;
        }

        if (!isInviteValid(invite.expiresAt, invite.usedCount)) {
          setStatus('invalid');
          setError('This invite has expired');
          return;
        }

        // Simulate joining workspace
        setStatus('joined');
        setTimeout(() => {
          router.push(`/workspace/dentara`);
        }, 1500);
      } catch (err) {
        setStatus('invalid');
        setError(err instanceof Error ? err.message : 'Failed to process invite');
      }
    };

    validateAndJoin();
  }, [token, router]);

  return (
    <div className="flex h-screen items-center justify-center bg-[#222222]">
      <div className="text-center">
        {status === 'loading' && (
          <>
            <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#C2D8C4]/30 border-t-[#C2D8C4]"></div>
            <h1 className="text-2xl font-bold text-[#F5F5F5] mb-2">Processing Invite...</h1>
            <p className="text-[#A0A0A0]">Adding you to the workspace</p>
          </>
        )}

        {status === 'joined' && (
          <>
            <div className="mb-4 text-4xl">✓</div>
            <h1 className="text-2xl font-bold text-[#C2D8C4] mb-2">Welcome!</h1>
            <p className="text-[#A0A0A0]">Redirecting to workspace...</p>
          </>
        )}

        {status === 'invalid' && (
          <>
            <div className="mb-4 text-4xl">✕</div>
            <h1 className="text-2xl font-bold text-red-400 mb-2">Invalid Invite</h1>
            <p className="text-[#A0A0A0] mb-4">{error}</p>
            <button
              onClick={() => router.push('/')}
              className="rounded-xl bg-[#C2D8C4] px-6 py-2 text-[#222222] font-semibold hover:bg-[#C2D8C4]/90 transition"
            >
              Back to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
}
