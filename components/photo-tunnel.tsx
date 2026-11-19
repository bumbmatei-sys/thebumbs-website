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

  // Move the viewer forward through nine spaced photographs, rather than stacking cards.
  // The final interval lets the ninth photograph pass out of view into the next section.
  const step = progress * photos.length;
  const titleOpacity = reducedMotion ? 1 : clamp(1 - progress * 4.5);

  return (
    <section id="intro-tunnel" className="photo-tunnel" ref={root} aria-label="Our journey in nine photographs">
      <div className="photo-tunnel-stage">
        <div className="photo-tunnel-perspective">
          {photos.map(({ file, alt }, index) => {
            // Negative distance: the photo is waiting ahead of the viewer.
            // Positive distance: the viewer has passed through the photo.
            const passed = step - index;
            // Each photo approaches from deep in the scene, grows to fill the
            // viewport, then passes the camera. Never keep old photos stacked.
            const depth = Math.min(940, 75 + passed * 1450);
            const entering = clamp((passed + 1.15) / 0.8);
            const leaving = clamp((0.82 - passed) / 0.45);
            const opacity = reducedMotion ? 1 : Math.min(entering, leaving);
            const transform = reducedMotion
              ? undefined
              : `translate(-50%, -50%) translate3d(0, 0, ${depth}px)`;
            return (
              <figure
                className="tunnel-photo"
                key={file}
                style={{ opacity, transform, zIndex: photos.length - index }}
              >
                <img src={`/images/scroll/${file}`} alt={alt} loading="eager" decoding="async" />
              </figure>
            );
          })}
        </div>
        <div className="photo-tunnel-label" aria-hidden="true">
          <span>{String(Math.min(9, Math.floor(step) + 1)).padStart(2, "0")} / 09</span>
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
