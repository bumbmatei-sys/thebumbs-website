import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogPosts, getBlogPost } from "@/lib/blog";
import { BlogArticle } from "@/components/blog-article";
export function generateStaticParams(){return blogPosts.map(post=>({slug:post.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const post=getBlogPost(slug);return post?{title:post.title,description:post.excerpt,openGraph:{images:[post.cover]}}:{title:"Story not found"};}
export default async function BlogPostPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const post=getBlogPost(slug);if(!post)notFound();return <BlogArticle post={post}/>;}
