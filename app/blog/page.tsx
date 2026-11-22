import { BlogGrid } from "@/components/blog-grid";
export const metadata={title:"Blog",description:"Real stories, field notes and reflections from Matei and Larisa Bumb.",alternates:{canonical:"/blog",languages:{en:"/blog",ro:"/ro/blog"}}};
export default function Blog(){return <main className="blog-page"><header className="blog-hero"><span className="eyebrow">THEBUMBS / BLOG</span><h1>Stories from<br/><em>the journey.</em></h1><p>Field notes, reflections, and stories of what God is doing along the way.</p></header><BlogGrid/></main>;}
