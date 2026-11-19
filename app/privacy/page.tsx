import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {title:"Privacy Policy",description:"How THEBUMBS handles newsletter and contact information."};

export default function PrivacyPolicy() {
  return <main className="legal-page">
    <span className="eyebrow">YOUR INFORMATION</span>
    <h1>Privacy policy.</h1>
    <p className="legal-updated">Last updated: November 19, 2026</p>
    <p>THEBUMBS is a personal ministry website run by Matei and Larisa Bumb. This page explains how information submitted through the website is handled. To ask a privacy question or request access to or deletion of your information, please use our <Link href="/contact">contact form</Link>.</p>
    <section><h2>Newsletter subscriptions</h2><p>When you choose to join the mission newsletter, we collect your name and email address. We also record when you subscribed and whether you later unsubscribed. This information is used to manage voluntary mission email updates, not to sell your details or add you to unrelated mailing lists.</p><p>Subscriber records are stored in a Cloudflare D1 database with EU data residency. You can unsubscribe using your unique subscription-management link, or contact us to request removal of your record.</p></section>
    <section><h2>Contact messages</h2><p>When you send a message through our contact form, we use the name, email address, topic, and message you provide to respond to your request. The form uses Resend to deliver the message to us; Resend is not used for newsletter signup or subscriber storage.</p></section>
    <section><h2>Website hosting and third parties</h2><p>Cloudflare provides hosting, security, and database infrastructure and may process necessary technical information to provide those services. Links to WhatsApp and <a href="https://calltoreset.site/" target="_blank" rel="noopener noreferrer">Call to Reset</a> lead to separate services or websites with their own privacy practices.</p></section>
    <section><h2>Your choices</h2><p>You can request details of the personal information held about you, ask for corrections or deletion, or withdraw your newsletter subscription. Certain records may need to be retained where required by applicable law. To make a request, <Link href="/contact">contact us</Link>.</p></section>
  </main>;
}
