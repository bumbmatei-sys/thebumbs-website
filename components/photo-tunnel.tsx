"use client";

import { useEffect, useRef, useState } from "react";

const photos = [
  { file: "01-matei-larisa-portrait.jpg", alt: "Matei and Larisa together" },
  { file: "02-matei-speaking-approved.jpg", alt: "Matei speaking at the microphone" },
  { file: "03-larisa-speaking.jpg", alt: "Larisa speaking at the microphone" },
  { file: "04-matei-larisa-outreach.jpg", alt: "Matei and Larisa at an outreach" },
  { file: "05-street-evangelism.jpg", alt: "Sharing the Gospel outdoors" },
  { file: "06-prayer-ministry.jpg", alt: "Prayer ministry" },
  { file: "07-worship-and-prayer.jpg", alt: "Worship and prayer gathering" },
  { file: "08-outreach-team-outdoors.jpg", alt: "Outreach ministry team" },
  { file: "09-matei-preaching-black-white.jpg", alt: "Matei preaching at an outreach" },
  { file: "10-matei-larisa-together.png", alt: "Matei and Larisa together at a gathering" },
] as const;

const clamp = (value: number) => Math.max(0, Math.min(1, value));

export function PhotoTunnel() {
  const root = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const updateMotion = () => setReducedMotion(media.matches);
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const distance = Math.max(1, node.offsetHeight - window.innerHeight);
        setProgress(clamp(-rect.top / distance));
      });
    };
    updateMotion();
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    media.addEventListener("change", updateMotion);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      media.removeEventListener("change", updateMotion);
    };
  }, []);

  // Move the viewer forward through ten spaced photographs, rather than stacking cards.
  // Stop the tunnel on the tenth photo. Keep it visible until the sticky
  // section ends and the next section scrolls directly into view.
  const step = progress * (photos.length - 1);
  const titleOpacity = reducedMotion ? 1 : clamp(1 - progress * 4.5);

  return (
    <section id="intro-tunnel" className="photo-tunnel" ref={root} aria-label="Our journey in ten photographs">
      <div className="photo-tunnel-stage">
        <div className="photo-tunnel-perspective">
          {photos.map(({ file, alt }, index) => {
            // Photos travel along alternating left/right lanes, rather than
            // appearing in a stack at the center of the screen.
            const passed = step - index;
            const side = index % 2 === 0 ? -1 : 1;
            // Every photo approaches from a side, then finishes in the
            // exact horizontal center when it reaches its full size.
            const approach = clamp(passed + 1);
            // Approach in perspective, then STOP growing before the image
            // fills the viewport. Let it slide past and fade out instead.
            const depth = Math.max(-1000, Math.min(310, 50 + passed * 960));
            const horizontal = side * 24 * Math.pow(1 - approach, 1.35);
            const entering = clamp((passed + 1.05) / 0.55);
            const leaving = clamp((0.7 - passed) / 0.36);
            const opacity = reducedMotion ? 1 : Math.min(entering, leaving);
            const transform = reducedMotion
              ? undefined
              : `translate(-50%, -50%) translate3d(${horizontal}vw, 0, ${depth}px)`;
            return (
              <figure
                className="tunnel-photo"
                key={file}
                style={{ opacity, transform, zIndex: photos.length - index }}
              >
                <img src={`/images/scroll/${file}${index === photos.length - 1 ? "?v=10-png" : ""}`} alt={alt} loading="eager" decoding="async" />
              </figure>
            );
          })}
        </div>
        <div className="photo-tunnel-label" aria-hidden="true">
          <span>{String(Math.min(photos.length, Math.floor(step) + 1)).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}</span>
        </div>
        <div
          className="intro-brand-lockup"
          style={{
            opacity: titleOpacity,
            transform: reducedMotion ? undefined : `translateY(${(1 - titleOpacity) * 24}px)`,
          }}
        >
          <h1 id="hero-title" className="cinematic-title">THEBUMBS</h1>
        </div>
      </div>
    </section>
  );
}
