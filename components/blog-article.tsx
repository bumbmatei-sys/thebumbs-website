import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { BlogPost } from "@/lib/blog";
export function BlogArticle({post,locale="en"}:{post:BlogPost;locale?:"en"|"ro"}) {
 const ro=locale==="ro";
 return <main className="blog-article-page">
   <header className="blog-article-header"><Link href={ro?"/ro/journal":"/journal"} className="blog-back"><ArrowLeft size={17}/>{ro?"Înapoi la blog":"Back to journal"}</Link><div className="blog-article-meta"><span>{post.category}</span><span>{post.date}</span><span>{post.readingMinutes} {ro?"min de citit":"min read"}</span></div><h1>{post.title}</h1><p className="blog-article-deck">{post.excerpt}</p><span className="blog-article-byline">MATEI &amp; LARISA BUMB</span></header>
   <figure className="blog-article-cover"><img src={post.cover} alt={post.coverAlt}/></figure>
   <article className="blog-article-body">{post.body.map((section,i)=><section key={i}>{section.heading&&<h2>{section.heading}</h2>}{section.paragraphs.map((paragraph,j)=><p key={j}>{paragraph}</p>)}{section.image&&<figure><img src={section.image} alt={section.imageAlt||""}/></figure>}</section>)}</article>
   <footer className="blog-article-footer"><span className="eyebrow">{ro?"POVESTEA CONTINUĂ":"FROM OUR JOURNAL"}</span><h2>{ro?"Urmărește călătoria noastră.":"Follow the journey."}</h2><Link href={ro?"/ro/blog":"/blog"} className="button">{ro?"Toate articolele":"All articles"} <span aria-hidden="true">↗</span></Link></footer>
 </main>;
}
