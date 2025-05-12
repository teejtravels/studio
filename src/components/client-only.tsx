
"use client";

import { useState, useEffect, type ReactNode } from 'react';

interface ClientOnlyProps {
  children: ReactNode;
}

/**
 * Renders children only on the client-side after mounting.
 * Useful for preventing hydration mismatches with components that
 * might be affected by browser extensions or rely on browser APIs.
 */
export default function ClientOnly({ children }: ClientOnlyProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? <>{children}</> : null;
}
