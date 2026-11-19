import Link from "next/link";
import { ArrowUpRight, ArrowUp, Mail, MessageCircle } from "lucide-react";

const explore = [
  {href:"/",label:"Home"},
  {href:"/about",label:"About us"},
  {href:"/missions",label:"Missions"},
  {href:"/journal",label:"Journal"},
];
const participate = [
  {href:"/partner",label:"Partner with us"},
  {href:"/#stay-connected",label:"Mission newsletter"},
  {href:"/contact",label:"Contact us"},
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
          </div>
          <div className="site-footer-link-group">
            <h3>Stay connected</h3>
            <a href="https://whatsapp.com/channel/0029Vb6jl7GEAKW7CeyUOx01" target="_blank" rel="noopener noreferrer"><MessageCircle size={15} aria-hidden="true"/> WhatsApp channel <ArrowUpRight size={14} aria-hidden="true"/></a>
            <a href="https://calltoreset.site/" target="_blank" rel="noopener noreferrer">Call to Reset <ArrowUpRight size={14} aria-hidden="true"/></a>
            <Link href="/contact"><Mail size={15} aria-hidden="true"/> Send a message</Link>
          </div>
        </nav>
      </div>
      <div className="site-footer-brandline" aria-hidden="true">
        <span>FAITH · EVANGELISM · DISCIPLESHIP</span>
        <span>SHARING JESUS ACROSS NATIONS</span>
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
