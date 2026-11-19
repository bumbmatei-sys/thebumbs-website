"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Users, Globe2, BookOpen, Mail, HeartHandshake } from "lucide-react";

const items = [
  { href: "/", label: "Home", Icon: House },
  { href: "/about", label: "About", Icon: Users },
  { href: "/missions", label: "Missions", Icon: Globe2 },
  { href: "/journal", label: "Journal", Icon: BookOpen },
  { href: "/contact", label: "Contact", Icon: Mail },
  { href: "/partner", label: "Partner", Icon: HeartHandshake },
];

export function Navigation() {
  const path = usePathname();
  const isHome = path === "/";
  const [afterTunnel, setAfterTunnel] = useState(!isHome);

  useEffect(() => {
    if (!isHome) {
      setAfterTunnel(true);
      return;
    }
    const tunnel = document.getElementById("intro-tunnel");
    if (!tunnel) {
      setAfterTunnel(true);
      return;
    }
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        // Switch headers only when the sticky tunnel has finished.
        setAfterTunnel(tunnel.getBoundingClientRect().bottom <= window.innerHeight + 1);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [isHome]);

  const showLogo = !isHome || afterTunnel;

  return (
    <>
      <header className={`header site-header ${showLogo ? "header-after-tunnel" : "header-during-tunnel"}`}>
        <div className="header-identity">
          {showLogo ? (
            <Link className="brand" href="/" aria-label="THEBUMBS home">THEBUMBS</Link>
          ) : (
            <Link className="header-personal-name" href="/" aria-label="Matei and Larisa Bumb home">MATEI &amp; LARISA BUMB</Link>
          )}
        </div>
        <nav className="nav" aria-label="Main navigation">
          {items.slice(0, 5).map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={path === href || (href !== "/" && path.startsWith(href + "/")) ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link className="button header-partner" href="/partner">Partner With Us</Link>
      </header>
      <nav className="dock" aria-label="Mobile navigation">
        {items.map(({ href, label, Icon }) => {
          const active = path === href || (href !== "/" && path.startsWith(href + "/"));
          return (
            <Link key={href} href={href} aria-label={label} title={label} aria-current={active ? "page" : undefined}>
              <Icon size={21} strokeWidth={1.8} />
              <span className="sr-only">{label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
