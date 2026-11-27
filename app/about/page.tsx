import type { Metadata } from "next";
import { AboutStory } from "@/components/about-story";

const title = "About Us";
const description = "Meet Matei and Larisa Bumb and learn why they share the Gospel, make disciples, and serve alongside local churches.";
const canonical = "/about";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical, languages: { en: "/about", ro: "/ro/about" } },
  openGraph: {
    type: "website", siteName: "THEBUMBS", title, description, url: canonical,
    locale: "en_US", alternateLocale: "ro_RO",
  },
  twitter: { card: "summary", title, description },
};

export default function AboutPage() {
  return <AboutStory locale="en" />;
}
