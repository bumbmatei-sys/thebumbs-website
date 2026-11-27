import { AboutStory, aboutMetadata } from "@/components/about-story";

export const metadata = aboutMetadata("ro");

export default function About() {
  return <AboutStory locale="ro" />;
}
