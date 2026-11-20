import Link from "next/link";
import type { Metadata } from "next";
import { GivingMethods } from "@/components/giving-methods";

export const metadata: Metadata = {title:"Partner With Us",description:"Join Matei and Larisa Bumb in carrying the Gospel and making disciples across nations.",alternates:{canonical:"/partner",languages:{en:"/partner",ro:"/ro/partner"}}};

export default function Partner(){
  return <main className="partner-page">
    <section className="partner-hero">
      <span className="eyebrow">PARTNER WITH US · THE GREAT COMMISSION</span>
      <h1><span className="partner-headline-first">We're not looking for donors,</span><br/><em>but for partners.</em></h1>
      <p className="partner-hero-lead">We believe the Great Commission was never meant to be carried alone.</p>
      <p className="partner-hero-body">We're looking for people who share our heart for reaching the lost, preaching the Gospel, and making disciples across nations. Not simply giving to a cause, but standing together in faith, prayer, and action.</p>
    </section>
    <section className="partner-vision" aria-labelledby="partner-heart-title">
      <span className="eyebrow">THE HEART BEHIND THE MISSION</span>
      <h2 id="partner-heart-title">More than a moment.</h2>
      <p>Our heart is not only to see people encounter Jesus, but to see their lives transformed. From preaching the Gospel to walking alongside new believers, we want to see people grow in their relationship with God and become equipped to reach others.</p>
      <p><strong>Because the mission doesn't end when the crowd goes home.</strong></p>
    </section>
    <section className="partner-giving" id="giving" aria-labelledby="partner-giving-title">
      <span className="eyebrow">WAYS TO GIVE</span>
      <h2 id="partner-giving-title">Partner in the Gospel.</h2>
      <p className="partner-giving-lead">Whether once or regularly, your generosity helps us continue the work God has placed on our hearts.</p>
      <GivingMethods/>
    </section>
    <section className="partner-vision" aria-labelledby="partner-vision-title">
      <span className="eyebrow">THREE WAYS TO PARTNER</span>
      <h2 id="partner-vision-title">Let's carry the Gospel together.</h2>
      <div className="partner-ways">
        <article><span className="eyebrow">01 / PRAYER</span><h3>Pray with us.</h3><p>Stand with us in prayer for open doors, boldness, and lasting fruit wherever God leads.</p></article>
        <article><span className="eyebrow">02 / GIVING</span><h3>Help us go.</h3><p>Your generosity helps make evangelistic outreaches, travel, and discipleship possible.</p></article>
        <article><span className="eyebrow">03 / THE VISION</span><h3>Share the vision.</h3><p>Help us connect with others who carry the same heart for reaching people with the Gospel.</p></article>
      </div>
    </section>
    <section className="partner-closing">
      <span className="eyebrow">TOGETHER, FOR HIS GLORY</span>
      <h2>Because Jesus is worthy, and people need to know Him.</h2>
      <Link href="/contact" className="button">Get in touch <span aria-hidden="true">↗</span></Link>
    </section>
  </main>;
}
