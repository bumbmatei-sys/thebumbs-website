"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Users, BookOpen, Mail, HeartHandshake } from "lucide-react";
import { RomaniaFlag } from "@/components/flags/countries/ro";
import { UnitedKingdomFlag } from "@/components/flags/countries/gb";

const items = [
  { href: "/", label: "Home", Icon: House },
  { href: "/about", label: "About", Icon: Users },
  { href: "/journal", label: "Journal", Icon: BookOpen },
  { href: "/contact", label: "Contact", Icon: Mail },
  { href: "/partner", label: "Partner", Icon: HeartHandshake },
];

export function Navigation() {
  const path = usePathname();
  const isRomanian = path === "/ro" || path.startsWith("/ro/");
  const isHome = path === "/" || path === "/ro";
  const isPartner = path === "/partner" || path === "/ro/partner";
  const isContact = path === "/contact" || path === "/ro/contact";
  const isJournal = path === "/journal" || path.startsWith("/journal/") || path === "/ro/journal" || path.startsWith("/ro/journal/");
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
  const menu = isRomanian ? ["Acasă","Despre noi","Jurnal","Contact"] : ["Home","About","Journal","Contact"];

  return (
    <>
      <header className={`header site-header ${showLogo ? "header-after-tunnel" : "header-during-tunnel"}`}>
        <div className="header-identity">
          {showLogo ? (
            <a className="brand" href={isRomanian ? "/ro#intro-tunnel" : "/#intro-tunnel"} aria-label="THEBUMBS — return to top of home">THEBUMBS</a>
          ) : (
            <a className="header-personal-name" href={isRomanian ? "/ro#intro-tunnel" : "/#intro-tunnel"} aria-label="Matei and Larisa Bumb — return to top of home">MATEI &amp; LARISA BUMB</a>
          )}
        </div>
        <nav className="nav" aria-label="Main navigation">
          {items.slice(0, 5).map(({ href }, index) => (
            <Link
              key={href}
              href={isRomanian && href === "/" ? "/ro" : isRomanian && href === "/partner" ? "/ro/partner" : isRomanian && href === "/contact" ? "/ro/contact" : isRomanian && href === "/journal" ? "/ro/journal" : href}
              aria-current={path === href || (href !== "/" && path.startsWith(href + "/")) ? "page" : undefined}
            >
              {menu[index]}
            </Link>
          ))}
          <a href="https://calltoreset.site/" target="_blank" rel="noopener noreferrer">{isRomanian ? "Ucenicizare" : "Be Discipled"}</a>
        </nav>
        <div className="header-actions">
          <div className="header-language-flags" aria-label="Website languages">
            <Link href={isPartner ? "/ro/partner" : isContact ? "/ro/contact" : isJournal ? "/ro/journal" : "/ro"} className={`header-language-choice ${isRomanian ? "header-language-current" : ""}`} title="Română" aria-label="Română" aria-current={isRomanian ? "page" : undefined}><RomaniaFlag width={25} decorative /></Link>
            <Link href={isPartner ? "/partner" : isContact ? "/contact" : isJournal ? "/journal" : "/"} className={`header-language-choice ${!isRomanian ? "header-language-current" : ""}`} title="English" aria-label="English" aria-current={!isRomanian ? "page" : undefined}><UnitedKingdomFlag width={25} decorative /></Link>
          </div>
          <Link className="button header-partner" href={isRomanian ? "/ro/partner" : "/partner"}>{isRomanian ? "Devino Partener" : "Partner With Us"}</Link>
        </div>
      </header>
      <nav className="dock" aria-label="Mobile navigation">
        {items.map(({ href, label, Icon }, index) => {
          const localizedHref = isRomanian && href === "/" ? "/ro" : isRomanian && href === "/partner" ? "/ro/partner" : isRomanian && href === "/journal" ? "/ro/journal" : isRomanian && href === "/contact" ? "/ro/contact" : href;
          const active = path === localizedHref || (localizedHref !== "/" && path.startsWith(localizedHref + "/"));
          return (
            <Link key={href} href={localizedHref} aria-label={isRomanian ? (menu[index] || "Partener") : label} title={isRomanian ? (menu[index] || "Partener") : label} aria-current={active ? "page" : undefined}>
              <Icon size={21} strokeWidth={1.8} />
              <span className="dock-label">{isRomanian ? (menu[index] || "Partener") : label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
