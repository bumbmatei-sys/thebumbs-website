/** Real, approved stories only. Add the first post when copy and photographs arrive. */
export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingMinutes: number;
  cover: string;
  coverAlt: string;
  body: {heading?:string; paragraphs:string[]; image?:string; imageAlt?:string}[];
};
export const blogPosts: BlogPost[] = [];
export const getBlogPost = (slug:string) => blogPosts.find(post=>post.slug===slug);
