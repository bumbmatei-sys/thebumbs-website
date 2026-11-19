"use client";

import { useEffect, useRef, useState } from "react";

const opening = "We believe the Gospel is the greatest news the world will ever hear. And we’re giving our lives to make sure the world hears it. Because";
const emphasis = "Jesus changes everything.";
const words = [...opening.split(" "), ...emphasis.split(" ")];
const fullText = `${opening} ${emphasis}`;
const clamp = (value: number) => Math.max(0, Math.min(1, value));

export function ScrollManifesto() {
  const heading = useRef<HTMLHeadingElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = heading.current;
    if (!node) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (media.matches) {
          setProgress(1);
          return;
        }
        const rect = node.getBoundingClientRect();
        const start = window.innerHeight * 0.88;
        const finish = -Math.min(window.innerHeight * 0.25, rect.height * 0.3);
        setProgress(clamp((start - rect.top) / (start - finish)));
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    media.addEventListener("change", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      media.removeEventListener("change", update);
    };
  }, []);

  return (
    <h2 id="manifesto-title" ref={heading} className="scroll-manifesto" aria-label={fullText}>
      <span aria-hidden="true">
        {words.map((word, index) => {
          const amount = clamp((progress - (index / words.length) * 0.64) * 4.4);
          return (
            <span
              key={index}
              className={index >= words.length - 3 ? "manifesto-word manifesto-word-accent" : "manifesto-word"}
              style={{
                opacity: 0.13 + amount * 0.87,
                transform: `translateY(${(1 - amount) * 14}px)`,
                filter: `blur(${(1 - amount) * 3}px)`,
              }}
            >
              {word}
            </span>
          );
        })}
      </span>
    </h2>
  );
}
