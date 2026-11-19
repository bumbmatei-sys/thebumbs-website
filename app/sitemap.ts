import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const base = "https://thebumbs.space";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/about", "/missions", "/journal", "/partner", "/contact", "/privacy", "/terms"].map(path => ({
    url: `${base}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
