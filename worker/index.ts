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
export default {
 async fetch(request: Request, env: Env): Promise<Response> {
   const url = new URL(request.url);
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
} satisfies ExportedHandler<Env>;
