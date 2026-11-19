import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {title:"Website Terms",description:"Terms for using the THEBUMBS ministry website."};

export default function Terms() {
  return <main className="legal-page">
    <span className="eyebrow">SITE INFORMATION</span>
    <h1>Website terms.</h1>
    <p className="legal-updated">Last updated: November 19, 2026</p>
    <p>THEBUMBS shares information about the evangelism, discipleship, and missionary journey of Matei and Larisa Bumb. By using this website, you agree to use it respectfully and lawfully.</p>
    <section><h2>Information on this website</h2><p>Mission plans, event details, fundraising goals, and other information may change. We aim to keep the website accurate, but not every future activity described here is guaranteed.</p></section>
    <section><h2>External services</h2><p>Links to platforms such as WhatsApp and Call to Reset take you to websites and services operated separately from THEBUMBS. Their terms and privacy practices apply when you use them.</p></section>
    <section><h2>Messages and subscriptions</h2><p>When submitting a contact form or subscribing to mission updates, please provide information you are entitled to share. Newsletter participation is voluntary, and you can unsubscribe. Our <Link href="/privacy">privacy policy</Link> explains how information is handled.</p></section>
    <section><h2>Questions</h2><p>If you have any questions about this website, please <Link href="/contact">get in touch</Link>.</p></section>
  </main>;
}
