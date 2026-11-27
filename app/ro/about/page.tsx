import type { Metadata } from "next";
import { AboutStory } from "@/components/about-story";

const title = "Despre noi";
const description = "Cunoaște-i pe Matei și Larisa Bumb și află de ce vestesc Evanghelia, fac ucenici și slujesc alături de bisericile locale.";
const canonical = "/ro/about";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical, languages: { en: "/about", ro: "/ro/about" } },
  openGraph: {
    type: "website", siteName: "THEBUMBS", title, description, url: canonical,
    locale: "ro_RO", alternateLocale: "en_US",
  },
  twitter: { card: "summary", title, description },
};

export default function AboutPage() {
  return <AboutStory locale="ro" />;
}
