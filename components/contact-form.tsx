"use client";
import { useState } from "react";
export function ContactForm(){
 const [name,setName]=useState("");const [email,setEmail]=useState("");const [subject,setSubject]=useState("General question");const [message,setMessage]=useState("");const [copied,setCopied]=useState(false);
 const draft=`To: The Bumbs (add their confirmed email address)\nSubject: ${subject}\n\nFrom: ${name} <${email}>\n\n${message}`;
 async function copy(){try{await navigator.clipboard.writeText(draft);setCopied(true);}catch{setCopied(false);}}
 return <form className="contact-form" onSubmit={e=>{e.preventDefault();void copy();}}>
 <div className="form-row"><label>Your name<input required value={name} onChange={e=>setName(e.target.value)} autoComplete="name" placeholder="Your name"/></label><label>Your email<input required type="email" value={email} onChange={e=>setEmail(e.target.value)} autoComplete="email" placeholder="you@example.com"/></label></div>
 <label>I'm writing about<select value={subject} onChange={e=>setSubject(e.target.value)}><option>General question</option><option>Ministry invitation</option><option>Prayer and encouragement</option><option>Financial partnership</option></select></label>
 <label>Message<textarea required rows={6} value={message} onChange={e=>setMessage(e.target.value)} placeholder="Write your message here..."/></label>
 <button className="button" type="submit">Copy Message</button>
 <p className="microcopy" role="status">{copied?"Message copied. Paste it into your email or messaging app. Nothing has been sent.":"This form prepares a message for you to copy. It does not send or store your information. Direct delivery will be enabled once our ministry inbox is confirmed."}</p>
 </form>
}
