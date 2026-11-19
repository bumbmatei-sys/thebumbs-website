import Link from "next/link";
import { GivingMethods } from "@/components/giving-methods";

export const metadata = {title:"Partner With Us",description:"Join Matei and Larisa Bumb in carrying the vision of sharing the Gospel and making disciples across nations."};

export default function Partner(){
  return <main className="partner-page">
    <section className="partner-hero">
      <span className="eyebrow">PARTNER WITH US · THE GREAT COMMISSION</span>
      <h1>We're not looking for donors.<br/><em>We're looking for partners.</em></h1>
      <p className="partner-hero-lead">We're looking for people who share the same vision and want to carry the same mission with us.</p>
      <p className="partner-hero-body">People who believe in reaching the lost, preaching the Gospel, and making disciples across nations. Not simply giving to a cause, but standing together in faith, prayer, and action.</p>
      <a className="button partner-hero-action" href="#giving">Partner with us <span aria-hidden="true">↗</span></a>
    </section>
    <section className="partner-vision" aria-labelledby="partner-vision-title">
      <span className="eyebrow">ONE VISION · ONE MISSION</span>
      <h2 id="partner-vision-title">Different places.<br/><em>The same mission.</em></h2>
      <p>We may go to different places, but together we can carry the same mission: proclaiming Jesus, making disciples, and reaching people across nations with the Gospel.</p>
      <div className="partner-ways">
        <article><span className="eyebrow">01 / PRAYER</span><h3>Stand with us in prayer.</h3><p>Pray for open doors, boldness, and lasting fruit in every place we serve.</p></article>
        <article><span className="eyebrow">02 / GIVING</span><h3>Help us go.</h3><p>Your financial partnership helps make outreach, travel, and ongoing ministry possible.</p></article>
        <article><span className="eyebrow">03 / THE VISION</span><h3>Carry the vision together.</h3><p>Share the mission and be part of what God is doing across nations.</p></article>
      </div>
    </section>
    <section className="partner-giving" id="giving" aria-labelledby="partner-giving-title">
      <span className="eyebrow">WAYS TO GIVE</span>
      <h2 id="partner-giving-title">Partner in the Gospel.</h2>
      <p className="partner-giving-lead">Choose the way that works best for you. Every act of partnership helps us keep going.</p>
      <GivingMethods/>
    </section>
    <section className="partner-closing">
      <span className="eyebrow">TOGETHER</span>
      <h2>Let's carry the Gospel together.</h2>
      <p>Have a question or want to connect personally about partnership? We'd love to hear from you.</p>
      <Link href="/contact" className="button">Get in touch <span aria-hidden="true">↗</span></Link>
    </section>
  </main>;
}
