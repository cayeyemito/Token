"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { clearSession, getStoredSession, type StoredSession } from "@/lib/auth";

type AuthGuardProps = {
  children: (session: StoredSession) => ReactNode;
};

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [session, setSession] = useState<StoredSession | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const storedSession = getStoredSession();

    if (!storedSession) {
      router.replace("/login");
      setIsChecking(false);
      return;
    }

    setSession(storedSession);
    setIsChecking(false);
  }, [router]);

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="rounded-2xl border border-white/60 bg-white/80 px-6 py-4 text-sm text-slate-600 shadow-soft">
          Comprobando sesión...
        </div>
      </div>
    );
  }

  if (!session) {
    clearSession();
    return null;
  }

  return <>{children(session)}</>;
}
