import { BlogGrid } from "@/components/blog-grid";
export const metadata={title:"Blog",description:"Povești și reflecții din călătoria lui Matei și Larisa Bumb.",alternates:{canonical:"/ro/blog",languages:{en:"/blog",ro:"/ro/blog"}}};
export default function BlogRo(){return <main className="blog-page" lang="ro"><header className="blog-hero"><span className="eyebrow">THEBUMBS / BLOG</span><h1>Povești din<br/><em>călătoria noastră.</em></h1><p>Întâmplări, reflecții și mărturii despre ceea ce face Dumnezeu pe parcursul călătoriei noastre.</p></header><BlogGrid locale="ro"/></main>;}
