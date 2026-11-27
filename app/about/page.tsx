import { AboutStory, aboutMetadata } from "@/components/about-story";

export const metadata = aboutMetadata("en");

export default function About() {
  return <AboutStory locale="en" />;
}
