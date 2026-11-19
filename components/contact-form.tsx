"use client";
import { useState, type FormEvent } from "react";
type Status="idle"|"sending"|"sent"|"error";
export function ContactForm(){
 const [name,setName]=useState("");const [email,setEmail]=useState("");const [subject,setSubject]=useState("General question");const [message,setMessage]=useState("");const [website,setWebsite]=useState("");const [status,setStatus]=useState<Status>("idle");const [notice,setNotice]=useState("");
 const draft=`Subject: ${subject}\n\nFrom: ${name} <${email}>\n\n${message}`;
 async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();setStatus("sending");setNotice("");try{
 const response=await fetch("/api/contact",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({name,email,subject,message,website})});
 const result=await response.json() as {ok?:boolean;error?:string};
 if(!response.ok||!result.ok)throw new Error(result.error||"Message could not be sent.");
 setStatus("sent");setNotice("");setMessage("");
 }catch(error){setStatus("error");setNotice(error instanceof Error?error.message:"Message could not be sent.");}}
 async function copy(){try{await navigator.clipboard.writeText(draft);setNotice("Message copied. You can paste it into your email app. Nothing was sent.");}catch{setNotice("Copy unavailable in this browser.");}}
 if(status==="sent")return <div className="contact-form contact-success" role="status" aria-live="polite" aria-atomic="true"><div className="success-icon" aria-hidden="true">✓</div><h3>Message sent successfully!</h3><p>Thank you for reaching out. Your message has been submitted to our ministry inboxes.</p><button className="button" type="button" onClick={()=>{setStatus("idle");setNotice("");setName("");setEmail("");setSubject("General question");setMessage("");}}>Send another message</button></div>;
 return <form className="contact-form" onSubmit={submit}>
 <div className="form-row"><label>Your name<input required minLength={2} maxLength={120} value={name} onChange={e=>setName(e.target.value)} autoComplete="name" placeholder="Your name"/></label><label>Your email<input required type="email" maxLength={254} value={email} onChange={e=>setEmail(e.target.value)} autoComplete="email" placeholder="you@example.com"/></label></div>
 <label>I'm writing about<select value={subject} onChange={e=>setSubject(e.target.value)}><option>General question</option><option>Ministry invitation</option><option>Prayer and encouragement</option><option>Financial partnership</option></select></label>
 <label>Message<textarea required minLength={10} maxLength={5000} rows={6} value={message} onChange={e=>setMessage(e.target.value)} placeholder="Write your message here..."/></label>
 <div className="sr-only" aria-hidden="true"><label>Leave this field blank<input tabIndex={-1} autoComplete="off" value={website} onChange={e=>setWebsite(e.target.value)}/></label></div>
 <div className="actions"><button className="button" type="submit" disabled={status==="sending"}>{status==="sending"?"Sending…":"Send Message"}</button>{status==="error"&&<button className="button secondary" type="button" onClick={copy}>Copy Instead</button>}</div>
 <p className="microcopy" role="status" aria-live="polite">{notice||"Your message is sent privately to our ministry inboxes. Recipient email addresses are not displayed."}</p>
 </form>
}
