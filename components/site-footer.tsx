"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowUp, Mail, Globe2 } from "lucide-react";

const WHATSAPP_LOGO = "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg";
const INSTAGRAM_LOGO = "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png";
const FACEBOOK_LOGO = "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg";

const explore = [
  {href:"/",label:"Home"},
  {href:"/about",label:"About us"},
  {href:"/missions",label:"Missions"},
  {href:"/blog",label:"Blog"},
];
const participate = [
  {href:"/partner",label:"Partner with us"},
  {href:"/#stay-connected",label:"Newsletter"},
];

export function SiteFooter() {
  const path = usePathname();
  const ro = path === "/ro" || path.startsWith("/ro/");
  return (
    <footer className="footer site-footer" aria-label="Website footer">
      <div className="site-footer-grid">
        <div className="site-footer-lead">
          <span className="eyebrow">MATEI &amp; LARISA BUMB</span>
          <h2>{ro ? "Până când întreaga lume va auzi." : "Until the whole world hears."}</h2>
          <p>{ro ? "Vestind Evanghelia, investind în oameni și invitându-i pe alții să ia parte la ceea ce face Dumnezeu printre națiuni." : "Sharing the Gospel, walking with people, and inviting others to be part of what God is doing across nations."}</p>
        </div>
        <nav className="site-footer-links" aria-label="Footer navigation">
          <div className="site-footer-link-group">
            <h3>{ro ? "Explorează" : "Explore"}</h3>
            {explore.map(({href,label})=><Link key={href} href={ro && href === "/" ? "/ro" : href}>{ro ? ({"Home":"Acasă","About us":"Despre noi","Missions":"Misiuni","Blog":"Blog"}[label] || label) : label}</Link>)}
          </div>
          <div className="site-footer-link-group">
            <h3>{ro ? "Implică-te" : "Get involved"}</h3>
            {participate.map(({href,label})=><Link key={href} href={ro && href === "/partner" ? "/ro/partner" : href}>{ro && label === "Partner with us" ? "Devino Partener" : label}</Link>)}
            <Link href={ro ? "/ro/contact" : "/contact"}><Mail size={15} aria-hidden="true"/> {ro ? "Trimite un email" : "Send an email"}</Link>
          </div>
          <div className="site-footer-link-group">
            <h3>{ro ? "Rămâi conectat" : "Stay connected"}</h3>
            <a href="https://whatsapp.com/channel/0029Vb6jl7GEAKW7CeyUOx01" target="_blank" rel="noopener noreferrer"><img className="site-footer-social-icon" src={WHATSAPP_LOGO} alt="" width="18" height="18" /> {ro ? "Canal WhatsApp" : "WhatsApp channel"}</a>
            <a href="https://instagram.com/mateibumb" target="_blank" rel="noopener noreferrer"><img className="site-footer-social-icon" src={INSTAGRAM_LOGO} alt="" width="18" height="18" /> Instagram</a>
            <a href="https://www.facebook.com/share/1F3zUkkWkk/" target="_blank" rel="noopener noreferrer"><img className="site-footer-social-icon" src={FACEBOOK_LOGO} alt="" width="18" height="18" /> Facebook</a>
            <a href="https://calltoreset.site/" target="_blank" rel="noopener noreferrer"><Globe2 size={17} aria-hidden="true" /> Call to Reset</a>
          </div>
        </nav>
      </div>
      <Link className="footer-wordmark" href={ro ? "/ro#intro-tunnel" : "/#intro-tunnel"} aria-label="THEBUMBS — go to homepage">THEBUMBS</Link>
      <div className="site-footer-bottom">
        <span>© {new Date().getFullYear()} Matei &amp; Larisa Bumb. {ro ? "Toate drepturile rezervate." : "All rights reserved."}</span>
        <nav aria-label="Legal and site information">
          <Link href="/privacy">{ro ? "Confidențialitate" : "Privacy"}</Link>
          <Link href="/terms">{ro ? "Termeni și condiții" : "Terms"}</Link>
          <a href="#main-content" className="site-footer-back">{ro ? "Înapoi sus" : "Back to top"} <ArrowUp size={14} aria-hidden="true"/></a>
        </nav>
      </div>
    </footer>
  );
}
