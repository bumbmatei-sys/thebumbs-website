import type { MetadataRoute } from "next";
const base="https://thebumbs.space";
export default function sitemap():MetadataRoute.Sitemap{
 return ["","/about","/missions","/partner","/contact"].map(path=>({url:`${base}${path}`,changeFrequency:"monthly" as const,priority:path===""?1:0.7}));
}
