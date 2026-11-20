import { ContactSocials } from "@/components/contact-socials";
import { ContactForm } from "@/components/contact-form";
export const metadata={title:"Contact",alternates:{canonical:"/contact",languages:{en:"/contact",ro:"/ro/contact"}}};
export default function Contact(){return <main><section className="hero reveal contact-hero"><span className="eyebrow">Get in touch</span><h1>Let's <em>connect.</em></h1><p className="lead">Have a question, a ministry invitation, or a desire to partner with us?<br/>We would love to hear from you.</p></section><section className="section contact-section"><div className="contact-grid"><div><span className="eyebrow">Start a conversation</span><h2>We'd love to hear your story.</h2><ContactSocials locale="en"/></div><ContactForm/></div></section></main>}
