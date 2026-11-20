const socials = [
  {label:"WhatsApp",href:"https://whatsapp.com/channel/0029Vb6jl7GEAKW7CeyUOx01",icon:"https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"},
  {label:"Instagram",href:"https://instagram.com/mateibumb",icon:"https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"},
  {label:"Facebook",href:"https://www.facebook.com/share/1F3zUkkWkk/",icon:"https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"}
];
export function ContactSocials({locale="en"}:{locale?:"en"|"ro"}) {
  return <div className="contact-socials">
    <span className="eyebrow">{locale==="ro"?"RĂMÂI CONECTAT":"CONNECT WITH US"}</span>
    <p className="contact-socials-intro">{locale==="ro"?"Urmărește-ne și rămâi la curent cu ceea ce face Dumnezeu în călătoria noastră.":"Follow our journey and stay connected with what God is doing."}</p>
    <div className="contact-social-links">
      {socials.map(s=><a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"><img src={s.icon} width="25" height="25" alt="" loading="lazy"/><span>{s.label}</span><span className="contact-social-arrow" aria-hidden="true">↗</span></a>)}
    </div>
  </div>;
}
