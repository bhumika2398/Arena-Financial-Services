"use client";

import { useCallback, useEffect, useState } from "react";

/** Bump when the Terms / Privacy Policy change materially to re-prompt everyone. */
export const CONSENT_VERSION = "1";
const KEY = "arena-consent";

export type ConsentChoice = "accepted" | "essential";
export interface StoredConsent {
  choice: ConsentChoice;
  version: string;
  timestamp: string;
}

export function readConsent(): StoredConsent | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    return parsed.version === CONSENT_VERSION ? parsed : null;
  } catch {
    return null;
  }
}

export function writeConsent(choice: ConsentChoice) {
  try {
    const value: StoredConsent = { choice, version: CONSENT_VERSION, timestamp: new Date().toISOString() };
    localStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    // Storage unavailable (private mode etc.): the banner shows again next visit.
  }
  window.dispatchEvent(new Event("arena:consent-change"));
}

/**
 * Current consent choice. `choice` is null until the visitor decides.
 * Gate any future analytics/third-party script on `choice === "accepted"`.
 */
export function useConsent() {
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => {
      setChoice(readConsent()?.choice ?? null);
      setReady(true);
    };
    sync();
    window.addEventListener("arena:consent-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("arena:consent-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const accept = useCallback(() => writeConsent("accepted"), []);
  const essentialOnly = useCallback(() => writeConsent("essential"), []);
  const reopen = useCallback(() => window.dispatchEvent(new Event("arena:consent-open")), []);

  return { choice, ready, accept, essentialOnly, reopen };
}
