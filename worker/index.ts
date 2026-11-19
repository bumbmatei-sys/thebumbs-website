interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  RESEND_API_KEY?: string;
  CONTACT_RECIPIENTS?: string;
  CONTACT_FROM_EMAIL?: string;
}
type ContactPayload = { name?: unknown; email?: unknown; subject?: unknown; message?: unknown; website?: unknown };
const topics = new Set(["General question","Ministry invitation","Prayer and encouragement","Financial partnership"]);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function json(body: unknown, status = 200) { return new Response(JSON.stringify(body), {status,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store","x-content-type-options":"nosniff"}}); }
function escapeHtml(value: string) {return value.replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch] ?? ch));}

const NEWSLETTER_SEGMENT_ID = "2e6748e6-89a4-47d4-abb4-820e0f3791cd";

async function subscribeNewsletter(request: Request, env: Env): Promise<Response> {
  if (request.method !== "POST") return json({error:"Method not allowed"},405);
  const url = new URL(request.url);
  const origin = request.headers.get("origin");
  if (origin && origin !== url.origin) return json({error:"Invalid origin"},403);
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return json({error:"Expected JSON"},415);
  if (Number(request.headers.get("content-length") || 0) > 2000) return json({error:"Message too large"},413);

  let raw: unknown;
  try {
    const body = await request.text();
    if(body.length > 2000) return json({error:"Message too large"},413);
    raw = JSON.parse(body);
  } catch { return json({error:"Please check your email and try again."},400); }
  if (!raw || typeof raw !== "object") return json({error:"Invalid form"},400);
  const fields = raw as Record<string, unknown>;
  if (fields.website) return json({ok:true}); // Honeypot: quietly ignore bots.
  const email = typeof fields.email === "string" ? fields.email.trim().toLowerCase() : "";
  if (fields.consent !== true || email.length > 254 || !emailPattern.test(email)) {
    return json({error:"Enter a valid email and agree to receive ministry updates."},400);
  }
  if (!env.RESEND_API_KEY) return json({error:"Newsletter signup is temporarily unavailable."},503);
  const headers = {authorization:`Bearer ${env.RESEND_API_KEY}`, "content-type":"application/json"};
  try {
    // Contacts are stored only after an explicit opt-in. Existing global
    // unsubscribe preferences are never overridden by this endpoint.
    const created = await fetch("https://api.resend.com/contacts", {
      method:"POST",
      headers,
      body:JSON.stringify({email,unsubscribed:false,segments:[{id:NEWSLETTER_SEGMENT_ID}]})
    });
    if (created.status === 409) {
      const added = await fetch(`https://api.resend.com/contacts/${encodeURIComponent(email)}/segments/${NEWSLETTER_SEGMENT_ID}`,{method:"POST",headers});
      if (!added.ok && added.status !== 409) return json({error:"Subscription could not be saved. Please try again."},502);
    } else if(!created.ok) {
      return json({error:"Subscription could not be saved. Please try again."},502);
    }
    return json({ok:true});
  } catch {
    return json({error:"Subscription could not be saved. Please try again."},502);
  }
}

export default {
 async fetch(request: Request, env: Env): Promise<Response> {
   const url = new URL(request.url);
   if(url.pathname === "/api/newsletter") return subscribeNewsletter(request, env);
   if(url.pathname !== "/api/contact") return env.ASSETS.fetch(request);
   if(request.method !== "POST") return json({error:"Method not allowed"},405);
   const origin = request.headers.get("origin");
   if(origin && origin !== url.origin) return json({error:"Invalid origin"},403);
   if(!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return json({error:"Expected JSON"},415);
   if(Number(request.headers.get("content-length") ?? 0)>12000) return json({error:"Message too large"},413);
   let data: ContactPayload;
   try {const raw=await request.text();if(raw.length>12000)return json({error:"Message too large"},413);data=JSON.parse(raw) as ContactPayload;}catch{return json({error:"Invalid message"},400);}
   if(data.website) return json({ok:true});
   const name=typeof data.name==="string"?data.name.trim():"";
   const email=typeof data.email==="string"?data.email.trim():"";
   const subject=typeof data.subject==="string"?data.subject:"";
   const message=typeof data.message==="string"?data.message.trim():"";
   if(name.length<2||name.length>120||email.length>254||!emailPattern.test(email)||!topics.has(subject)||message.length<10||message.length>5000) return json({error:"Please check your message and try again."},400);
   const recipients=(env.CONTACT_RECIPIENTS??"").split(",").map(x=>x.trim()).filter(Boolean);
   if(!env.RESEND_API_KEY||!env.CONTACT_FROM_EMAIL||recipients.length!==2||!recipients.every(x=>emailPattern.test(x))) return json({error:"Contact delivery is not available yet. Please try again later."},503);
   try {
    const result=await fetch("https://api.resend.com/emails",{method:"POST",headers:{"authorization":`Bearer ${env.RESEND_API_KEY}`,"content-type":"application/json"},body:JSON.stringify({
      from:env.CONTACT_FROM_EMAIL,to:recipients,reply_to:email,subject:`Website contact: ${subject}`,
      text:`From: ${name}\nReply email: ${email}\nTopic: ${subject}\n\n${message}`,
      html:`<h2>Website contact: ${escapeHtml(subject)}</h2><p><strong>From:</strong> ${escapeHtml(name)}</p><p><strong>Reply email:</strong> ${escapeHtml(email)}</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`
    })});
    if(!result.ok)return json({error:"Message could not be delivered. Please try again later."},502);
    return json({ok:true});
   }catch{return json({error:"Message could not be delivered. Please try again later."},502);}
 }
};
