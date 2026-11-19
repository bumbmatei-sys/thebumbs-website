import Link from "next/link";
import { ArrowUpRight, ArrowUp, Mail, Globe2 } from "lucide-react";

const WHATSAPP_LOGO = "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg";
const INSTAGRAM_LOGO = "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png";

const explore = [
  {href:"/",label:"Home"},
  {href:"/about",label:"About us"},
  {href:"/missions",label:"Missions"},
  {href:"/journal",label:"Blog"},
];
const participate = [
  {href:"/partner",label:"Partner with us"},
  {href:"/#stay-connected",label:"Newsletter"},
];

export function SiteFooter() {
  return (
    <footer className="footer site-footer" aria-label="Website footer">
      <div className="site-footer-grid">
        <div className="site-footer-lead">
          <span className="eyebrow">MATEI &amp; LARISA BUMB</span>
          <h2>Until the whole world hears.</h2>
          <p>Sharing the Gospel, walking with people, and inviting others to be part of what God is doing across nations.</p>
          <Link href="/partner" className="site-footer-cta">Partner with us <ArrowUpRight size={17} aria-hidden="true"/></Link>
        </div>
        <nav className="site-footer-links" aria-label="Footer navigation">
          <div className="site-footer-link-group">
            <h3>Explore</h3>
            {explore.map(({href,label})=><Link key={href} href={href}>{label}</Link>)}
          </div>
          <div className="site-footer-link-group">
            <h3>Get involved</h3>
            {participate.map(({href,label})=><Link key={href} href={href}>{label}</Link>)}
            <Link href="/contact"><Mail size={15} aria-hidden="true"/> Send an email</Link>
          </div>
          <div className="site-footer-link-group">
            <h3>Stay connected</h3>
            <a href="https://whatsapp.com/channel/0029Vb6jl7GEAKW7CeyUOx01" target="_blank" rel="noopener noreferrer"><img className="site-footer-social-icon" src={WHATSAPP_LOGO} alt="" width="18" height="18" /> WhatsApp channel</a>
            <span className="site-footer-social-label"><img className="site-footer-social-icon" src={INSTAGRAM_LOGO} alt="" width="18" height="18" /> Instagram</span>
            <a href="https://calltoreset.site/" target="_blank" rel="noopener noreferrer"><Globe2 size={17} aria-hidden="true" /> Call to Reset</a>
          </div>
        </nav>
      </div>
      <Link className="footer-wordmark" href="/#intro-tunnel" aria-label="THEBUMBS — go to homepage">THEBUMBS</Link>
      <div className="site-footer-bottom">
        <span>© {new Date().getFullYear()} Matei &amp; Larisa Bumb. All rights reserved.</span>
        <nav aria-label="Legal and site information">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <a href="#main-content" className="site-footer-back">Back to top <ArrowUp size={14} aria-hidden="true"/></a>
        </nav>
      </div>
    </footer>
  );
}
