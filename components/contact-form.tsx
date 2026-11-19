"use client";
import { useState, type FormEvent } from "react";
type Status="idle"|"sending"|"sent"|"error";
export function ContactForm({locale="en"}:{locale?:"en"|"ro"}){
 const ro=locale==="ro";
 const tr=(en:string,romanian:string)=>ro?romanian:en;
 const [name,setName]=useState("");const [email,setEmail]=useState("");const [subject,setSubject]=useState("General question");const [message,setMessage]=useState("");const [website,setWebsite]=useState("");const [status,setStatus]=useState<Status>("idle");const [notice,setNotice]=useState("");
 const draft=`Subject: ${subject}\n\nFrom: ${name} <${email}>\n\n${message}`;
 async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();setStatus("sending");setNotice("");try{
 const response=await fetch("/api/contact",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({name,email,subject,message,website})});
 const result=await response.json() as {ok?:boolean;error?:string};
 if(!response.ok||!result.ok)throw new Error(result.error||tr("Message could not be sent.","Mesajul nu a putut fi trimis."));
 setStatus("sent");setNotice("");setMessage("");
 }catch(error){setStatus("error");setNotice(error instanceof Error?error.message :tr("Message could not be sent.","Mesajul nu a putut fi trimis."));}}
 async function copy(){try{await navigator.clipboard.writeText(draft);setNotice(tr("Message copied. You can paste it into your email app. Nothing was sent.","Mesajul a fost copiat. Îl poți lipi în aplicația de email. Nu a fost trimis."));}catch{setNotice(tr("Copy unavailable in this browser.","Copierea nu este disponibilă în acest browser."));}}
 if(status==="sent")return <div className="contact-form contact-success" role="status" aria-live="polite" aria-atomic="true"><div className="success-icon" aria-hidden="true">✓</div><h3>{tr("Message sent successfully!","Mesajul a fost trimis cu succes!")}</h3><p>{tr("Thank you for reaching out. Your message has been submitted to our ministry inboxes.","Îți mulțumim că ne-ai scris. Mesajul tău a fost trimis către adresele noastre de email.")}</p><button className="button" type="button" onClick={()=>{setStatus("idle");setNotice("");setName("");setEmail("");setSubject("General question");setMessage("");}}>{tr("Send another message","Trimite un alt mesaj")}</button></div>;
 return <form className="contact-form" onSubmit={submit}>
 <div className="form-row"><label>{tr("Your name","Numele tău")}<input required minLength={2} maxLength={120} value={name} onChange={e=>setName(e.target.value)} autoComplete="name" placeholder={tr("Your name","Numele tău")}/></label><label>{tr("Your email","Adresa ta de email")}<input required type="email" maxLength={254} value={email} onChange={e=>setEmail(e.target.value)} autoComplete="email" placeholder="you@example.com"/></label></div>
 <label>{tr("I\'m writing about","Îți scriu în legătură cu")}<select value={subject} onChange={e=>setSubject(e.target.value)}><option value="General question">{tr("General question","Întrebare generală")}</option><option value="Ministry invitation">{tr("Ministry invitation","Invitație la slujire")}</option><option value="Prayer and encouragement">{tr("Prayer and encouragement","Rugăciune și încurajare")}</option><option value="Financial partnership">{tr("Financial partnership","Parteneriat financiar")}</option></select></label>
 <label>{tr("Message","Mesaj")}<textarea required minLength={10} maxLength={5000} rows={6} value={message} onChange={e=>setMessage(e.target.value)} placeholder={tr("Write your message here...","Scrie mesajul tău aici...")}/></label>
 <div className="sr-only" aria-hidden="true"><label>{tr("Leave this field blank","Lasă acest câmp necompletat")}<input tabIndex={-1} autoComplete="off" value={website} onChange={e=>setWebsite(e.target.value)}/></label></div>
 <div className="actions"><button className="button" type="submit" disabled={status==="sending"}>{status==="sending"?tr("Sending…","Se trimite…"):tr("Send Message","Trimite mesajul")}</button>{status==="error"&&<button className="button secondary" type="button" onClick={copy}>{tr("Copy Instead","Copiază mesajul")}</button>}</div>
 <p className="microcopy" role="status" aria-live="polite">{notice||tr("Your message is sent privately to our ministry inboxes. Recipient email addresses are not displayed.","Mesajul tău este trimis în privat către adresele noastre de email. Adresele destinatarilor nu sunt afișate.")}</p>
 </form>
}
