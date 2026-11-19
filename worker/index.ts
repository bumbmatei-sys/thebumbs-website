interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  RESEND_API_KEY?: string;
  CONTACT_RECIPIENTS?: string;
  CONTACT_FROM_EMAIL?: string;
  NEWSLETTER_DB?: {
    prepare(sql: string): {
      bind(...params: (string | number | null)[]): {
        run(): Promise<{success: boolean}>;
      };
    };
  };
}
type ContactPayload = { name?: unknown; email?: unknown; subject?: unknown; message?: unknown; website?: unknown };
const topics = new Set(["General question","Ministry invitation","Prayer and encouragement","Financial partnership"]);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function json(body: unknown, status = 200) { return new Response(JSON.stringify(body), {status,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store","x-content-type-options":"nosniff"}}); }
function escapeHtml(value: string) {return value.replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch] ?? ch));}

// The newsletter is stored in Cloudflare D1. Resend remains for contact messages only.
function makeUnsubscribeToken() {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)), byte => byte.toString(16).padStart(2, "0")).join("");
}
async function hashToken(token: string) {
  const bytes = new TextEncoder().encode(token);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(hash), byte => byte.toString(16).padStart(2, "0")).join("");
}

async function subscribeNewsletter(request: Request, env: Env): Promise<Response> {
  if (request.method !== "POST") return json({error:"Method not allowed"},405);
  const url = new URL(request.url);
  const origin = request.headers.get("origin");
  if (origin && origin !== url.origin) return json({error:"Invalid origin"},403);
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return json({error:"Expected JSON"},415);
  if (Number(request.headers.get("content-length") || 0) > 2000) return json({error:"Message too large"},413);

  let fields: Record<string, unknown>;
  try {
    const body = await request.text();
    if (body.length > 2000) return json({error:"Message too large"},413);
    const data: unknown = JSON.parse(body);
    if (!data || typeof data !== "object" || Array.isArray(data)) return json({error:"Invalid form"},400);
    fields = data as Record<string, unknown>;
  } catch { return json({error:"Please check your details and try again."},400); }

  if (fields.website) return json({ok:true}); // Quietly ignore bot honeypot submissions.
  const name = typeof fields.name === "string" ? fields.name.trim().replace(/\\s+/g," ") : "";
  const email = typeof fields.email === "string" ? fields.email.trim().toLowerCase() : "";
  if (fields.consent !== true || name.length < 2 || name.length > 120 || email.length > 254 || !emailPattern.test(email)) {
    return json({error:"Please provide your name, a valid email, and permission to receive ministry updates."},400);
  }
  if (!env.NEWSLETTER_DB) return json({error:"Newsletter signup is temporarily unavailable."},503);

  try {
    const unsubscribeToken = makeUnsubscribeToken();
    const tokenHash = await hashToken(unsubscribeToken);
    const result = await env.NEWSLETTER_DB
      .prepare(`INSERT INTO newsletter_subscribers (full_name, email, unsubscribe_token_hash)
        VALUES (?, ?, ?)
        ON CONFLICT(email) DO UPDATE SET
          full_name=excluded.full_name,
          consented_at=CURRENT_TIMESTAMP,
          updated_at=CURRENT_TIMESTAMP,
          unsubscribed_at=NULL,
          unsubscribe_token_hash=excluded.unsubscribe_token_hash`)
      .bind(name,email,tokenHash)
      .run();
    if (!result.success) return json({error:"Subscription could not be saved. Please try again."},502);
    return json({ok:true,unsubscribeUrl:`/unsubscribe?token=${unsubscribeToken}`});
  } catch {
    return json({error:"Subscription could not be saved. Please try again."},502);
  }
}
async function unsubscribeNewsletter(request: Request, env: Env): Promise<Response> {
  if(request.method !== "POST") return json({error:"Method not allowed"},405);
  const url = new URL(request.url);
  const origin = request.headers.get("origin");
  if (origin && origin !== url.origin) return json({error:"Invalid origin"},403);
  if(!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return json({error:"Expected JSON"},415);
  let data: Record<string,unknown>;
  try {
    const raw = await request.text();
    if(raw.length > 1000) return json({error:"Invalid request"},400);
    const body: unknown = JSON.parse(raw);
    if(!body || typeof body !== "object" || Array.isArray(body)) return json({error:"Invalid request"},400);
    data = body as Record<string,unknown>;
  } catch {return json({error:"Invalid request"},400);}
  const token = typeof data.token === "string" ? data.token : "";
  if(!/^[0-9a-f]{64}$/.test(token)) return json({error:"Invalid unsubscribe link"},400);
  if(!env.NEWSLETTER_DB) return json({error:"Subscription management is temporarily unavailable."},503);
  try {
    const hash = await hashToken(token);
    const result = await env.NEWSLETTER_DB
      .prepare("UPDATE newsletter_subscribers SET unsubscribed_at=CURRENT_TIMESTAMP, updated_at=CURRENT_TIMESTAMP WHERE unsubscribe_token_hash=? AND unsubscribed_at IS NULL")
      .bind(hash)
      .run();
    if(!result.success) return json({error:"Could not update subscription. Please try again."},502);
    return json({ok:true});
  } catch{return json({error:"Could not update subscription. Please try again."},502);}
}

export default {
 async fetch(request: Request, env: Env): Promise<Response> {
   const url = new URL(request.url);
   if(url.pathname === "/api/newsletter") return subscribeNewsletter(request, env);
   if(url.pathname === "/api/newsletter/unsubscribe") return unsubscribeNewsletter(request, env);
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
