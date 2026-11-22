import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { blogPosts } from "@/lib/blog";

export function BlogGrid({locale="en"}:{locale?:"en"|"ro"}) {
  const ro=locale==="ro";
  return <section className="blog-list" aria-labelledby="blog-list-heading">
    <div className="blog-list-heading"><div><span className="eyebrow">{ro?"DIN CĂLĂTORIA NOASTRĂ":"FROM THE JOURNEY"}</span><h2 id="blog-list-heading">{ro?"Povești și noutăți.":"Latest from our journal."}</h2></div><span className="blog-count">{String(blogPosts.length).padStart(2,"0")} {ro?"ARTICOLE":"ARTICLES"}</span></div>
    {blogPosts.length ? <div className="blog-grid">{blogPosts.map((post,i)=><Link href={(ro?"/ro/journal/":"/journal/")+post.slug} className={"blog-card"+(i===0?" blog-card-featured":"")} key={post.slug}>
      <div className="blog-card-media"><img src={post.cover} alt={post.coverAlt}/><span className="blog-card-visit"><ArrowUpRight size={22}/></span></div>
      <div className="blog-card-meta"><span>{post.category}</span><span>{post.date}</span></div>
      <h3>{post.title}</h3><p>{post.excerpt}</p><span className="blog-card-read">{ro?"Citește articolul":"Read article"} <ArrowUpRight size={16}/></span>
    </Link>)}</div> : <div className="blog-empty"><span className="blog-empty-number">01 — COMING SOON</span><h3>{ro?"Prima noastră poveste apare în curând.":"Our first journal entry is on its way."}</h3><p>{ro?"Pregătim primele povești și fotografii din călătoria noastră. Revino în curând.":"We're preparing the first story and photographs from our journey. Check back soon."}</p></div>}
  </section>;
}
