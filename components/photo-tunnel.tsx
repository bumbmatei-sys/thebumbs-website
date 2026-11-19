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

  const step = progress * (photos.length - 1);
  const titleOpacity = reducedMotion ? 1 : clamp(1 - progress * 4.5);

  return (
    <section id="intro-tunnel" className="photo-tunnel" ref={root} aria-label="Our journey in nine photographs">
      <div className="photo-tunnel-stage">
        <div className="photo-tunnel-perspective">
          {photos.map(({ file, alt }, index) => {
            const delta = index - step;
            const distance = Math.abs(delta);
            const opacity = reducedMotion ? 1 : clamp(1 - distance * 1.75);
            const transform = reducedMotion
              ? undefined
              : `translate(-50%, -50%) translate3d(${delta * 7}vw, ${-delta * 2.5}vh, ${-distance * 500}px) rotate(${delta * -5}deg) scale(${1 - Math.min(distance, 1) * 0.13})`;
            return (
              <figure
                className="tunnel-photo"
                key={file}
                style={{ opacity, transform, zIndex: photos.length - Math.round(distance * 2) }}
              >
                <img src={`/images/scroll/${file}`} alt={alt} loading="eager" decoding="async" />
              </figure>
            );
          })}
        </div>
        <div className="photo-tunnel-label" aria-hidden="true">
          <span>OUR JOURNEY IN FRAMES</span>
          <span>{String(Math.min(9, Math.round(step) + 1)).padStart(2, "0")} / 09</span>
        </div>
        <div
          className="intro-brand-lockup"
          style={{
            opacity: titleOpacity,
            transform: reducedMotion ? undefined : `translateY(${(1 - titleOpacity) * 24}px)`,
          }}
        >
          <p className="cinematic-subtitle">Taking the Gospel beyond familiar places.</p>
          <h1 id="hero-title" className="cinematic-title">THEBUMBS</h1>
        </div>
      </div>
    </section>
  );
}
