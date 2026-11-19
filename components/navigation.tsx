"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Users, Globe2, Mail, HeartHandshake } from "lucide-react";
const items = [{href:"/",label:"Home",Icon:House},{href:"/about",label:"About",Icon:Users},{href:"/missions",label:"Missions",Icon:Globe2},{href:"/contact",label:"Contact",Icon:Mail},{href:"/partner",label:"Partner",Icon:HeartHandshake}];
export function Navigation(){const path=usePathname();return <><header className="header"><Link className="brand" href="/">the bumbs.</Link><nav className="nav" aria-label="Main navigation">{items.slice(0,4).map(x=><Link key={x.href} href={x.href}>{x.label}</Link>)}<Link className="button" href="/partner">Partner With Us</Link></nav></header><nav className="dock" aria-label="Mobile navigation">{items.map(({href,label,Icon})=><Link key={href} href={href} aria-current={path===href||(href!=="/"&&path.startsWith(href+"/"))?"page":undefined}><Icon size={20} strokeWidth={1.7}/><span>{label}</span></Link>)}</nav></>}
