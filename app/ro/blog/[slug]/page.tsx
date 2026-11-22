import { notFound } from "next/navigation";
import { blogPosts,getBlogPost } from "@/lib/blog";
import { BlogArticle } from "@/components/blog-article";
export function generateStaticParams(){return blogPosts.map(post=>({slug:post.slug}));}
export default async function BlogPostRo({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const post=getBlogPost(slug);if(!post)notFound();return <BlogArticle post={post} locale="ro"/>;}
