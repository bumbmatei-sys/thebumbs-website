"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Unsubscribe() {
  const [token, setToken] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setToken(new URLSearchParams(window.location.search).get("token") || "");
  }, []);

  async function unsubscribe() {
    if (busy || done) return;
    setBusy(true);
    setError("");
    try {
      const result = await fetch("/api/newsletter/unsubscribe", {
        method: "POST",
        headers: {"content-type":"application/json"},
        body: JSON.stringify({token})
      });
      const data = await result.json() as {ok?:boolean;error?:string};
      if (result.ok && data.ok) setDone(true);
      else setError(data.error || "Please try again.");
    } catch {
      setError("We couldn't connect right now. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="subscription-page">
      <span className="eyebrow">EMAIL PREFERENCES</span>
      <h1>Manage your updates.</h1>
      {done ? (
        <p>You've been unsubscribed from THEBUMBS ministry emails. You won't receive future newsletter updates.</p>
      ) : (
        <>
          <p>Would you like to stop receiving THEBUMBS ministry updates by email?</p>
          {token && /^[0-9a-f]{64}$/.test(token) ? (
            <button type="button" className="button" disabled={busy} onClick={unsubscribe}>
              {busy ? "Updating…" : "Unsubscribe from updates"}
            </button>
          ) : <p>To manage your subscription, open the unique link you received when you signed up.</p>}
          {error && <p role="alert">{error}</p>}
        </>
      )}
      <p><Link href="/">Return to homepage</Link></p>
    </main>
  );
}
