"use client";

import { useState, type FormEvent } from "react";
import { Mail } from "lucide-react";

const WHATSAPP_LOGO = "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg";

export function StayConnected() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [unsubscribeUrl, setUnsubscribeUrl] = useState("");
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
      // Submitting this clearly labeled newsletter form is the user's opt-in.
      // The backend stores consent in Cloudflare D1, not in Resend.
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({name, email, consent: true, website})
      });
      const data = await response.json() as {ok?:boolean; error?:string; unsubscribeUrl?:string};
      if (!response.ok || !data.ok) {
        setFeedback(data.error || "Something went wrong. Please try again.");
      } else {
        setSubscribed(true);
        setUnsubscribeUrl(data.unsubscribeUrl || "");
        setFeedback("You're on the list! We'll share our next ministry update by email.");
        setName("");
        setEmail("");
      }
    } catch {
      setFeedback("We couldn't connect right now. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section id="stay-connected" className="stay-connected" aria-labelledby="stay-connected-title">
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
            <div className="newsletter-form-row">
              <div className="newsletter-field newsletter-field-name">
                <label htmlFor="mission-newsletter-name">Full name</label>
                <input
                  id="mission-newsletter-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  required
                  minLength={2}
                  maxLength={120}
                  value={name}
                  disabled={busy || subscribed}
                  onChange={event=>setName(event.target.value)}
                />
              </div>
              <div className="newsletter-field newsletter-field-email">
                <label htmlFor="mission-newsletter-email">Email address</label>
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
              </div>
              <button className="newsletter-submit" type="submit" disabled={busy || subscribed}>
                {subscribed ? "Subscribed" : busy ? "Joining…" : "Join newsletter"}
              </button>
            </div>
            <p className="newsletter-signup-note">
              Join to receive mission updates by email. Unsubscribe at any time.
            </p>
            <div className="newsletter-honeypot" aria-hidden="true">
              <label htmlFor="mission-newsletter-website">Website</label>
              <input id="mission-newsletter-website" tabIndex={-1} autoComplete="off" value={website} onChange={event=>setWebsite(event.target.value)} />
            </div>
            {feedback && <p className={subscribed ? "newsletter-feedback success" : "newsletter-feedback"} role="status" aria-live="polite">{feedback}</p>}
            {subscribed && unsubscribeUrl && <a className="newsletter-unsubscribe-link" href={unsubscribeUrl}>Manage or cancel your subscription</a>}
          </form>
        </article>
        <article className="stay-connected-card stay-connected-whatsapp">
          <div className="stay-connected-card-top">
            <img className="whatsapp-brand-mark" src={WHATSAPP_LOGO} alt="WhatsApp" width="28" height="28" loading="lazy" />
            <span>02 / WHATSAPP CHANNEL</span>
          </div>
          <div className="stay-connected-card-copy">
            <h3>Follow the journey as it happens.</h3>
            <p>Shorter updates, testimonies, and prayer requests shared along the way through our WhatsApp channel.</p>
          </div>
          <a className="whatsapp-channel-button" href="https://whatsapp.com/channel/0029Vb6jl7GEAKW7CeyUOx01" target="_blank" rel="noopener noreferrer">
            Follow our WhatsApp channel
          </a>
          <p className="stay-connected-footnote">Open the channel in WhatsApp and follow along.</p>
        </article>
      </div>
    </section>
  );
}
