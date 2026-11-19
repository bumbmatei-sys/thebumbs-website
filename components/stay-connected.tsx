"use client";

import { useState, type FormEvent } from "react";
import { Mail, MessageCircle, ArrowUpRight } from "lucide-react";

export function StayConnected() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy || subscribed) return;
    setBusy(true);
    setFeedback("");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({email, consent, website})
      });
      const data = await response.json() as {ok?:boolean; error?:string};
      if (!response.ok || !data.ok) {
        setFeedback(data.error || "Something went wrong. Please try again.");
      } else {
        setSubscribed(true);
        setFeedback("You're on the list! We'll share our next ministry update by email.");
        setEmail("");
        setConsent(false);
      }
    } catch {
      setFeedback("We couldn't connect right now. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="stay-connected" aria-labelledby="stay-connected-title">
      <div className="stay-connected-intro">
        <span className="eyebrow">STAY CONNECTED</span>
        <h2 id="stay-connected-title">Stay close to the mission.</h2>
        <p>Follow the stories, prayer needs, and moments from the field as we share the Gospel.</p>
      </div>
      <div className="stay-connected-grid">
        <article className="stay-connected-card stay-connected-newsletter">
          <div className="stay-connected-card-top">
            <Mail size={23} strokeWidth={1.7} aria-hidden="true"/>
            <span>01 / EMAIL UPDATES</span>
          </div>
          <div className="stay-connected-card-copy">
            <h3>Letters from the field.</h3>
            <p>Mission reports, testimonies, upcoming outreaches, and ways you can pray with us. Delivered to your inbox.</p>
          </div>
          <form className="newsletter-form" onSubmit={subscribe}>
            <label htmlFor="mission-newsletter-email">Your email address</label>
            <div className="newsletter-field-row">
              <input
                id="mission-newsletter-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
                maxLength={254}
                value={email}
                disabled={busy || subscribed}
                onChange={event=>setEmail(event.target.value)}
              />
              <button type="submit" disabled={busy || subscribed || !consent}>
                {subscribed ? "Subscribed" : busy ? "Joining…" : "Join newsletter"}
              </button>
            </div>
            <label className="newsletter-consent">
              <input type="checkbox" required checked={consent} disabled={busy || subscribed} onChange={event=>setConsent(event.target.checked)} />
              <span>I agree to receive mission updates by email. I can unsubscribe at any time.</span>
            </label>
            <div className="newsletter-honeypot" aria-hidden="true">
              <label htmlFor="mission-newsletter-website">Website</label>
              <input id="mission-newsletter-website" tabIndex={-1} autoComplete="off" value={website} onChange={event=>setWebsite(event.target.value)} />
            </div>
            {feedback && <p className={subscribed ? "newsletter-feedback success" : "newsletter-feedback"} role="status" aria-live="polite">{feedback}</p>}
          </form>
        </article>
        <article className="stay-connected-card stay-connected-whatsapp">
          <div className="stay-connected-card-top">
            <MessageCircle size={23} strokeWidth={1.7} aria-hidden="true"/>
            <span>02 / WHATSAPP CHANNEL</span>
          </div>
          <div className="stay-connected-card-copy">
            <h3>Follow the journey as it happens.</h3>
            <p>Shorter updates, testimonies, and prayer requests shared along the way through our WhatsApp channel.</p>
          </div>
          <a className="whatsapp-channel-button" href="https://whatsapp.com/channel/0029Vb6jl7GEAKW7CeyUOx01" target="_blank" rel="noopener noreferrer">
            Follow our WhatsApp channel <ArrowUpRight size={19} strokeWidth={1.8} aria-hidden="true"/>
          </a>
          <p className="stay-connected-footnote">Open the channel in WhatsApp and follow along.</p>
        </article>
      </div>
    </section>
  );
}
