import { JournalMissionNotes } from "@/components/journal-mission-notes";
import { BlogGrid } from "@/components/blog-grid";
export const metadata={title:"Journal",description:"Stories, lessons, and moments of faith from wherever God leads us.",alternates:{canonical:"/journal",languages:{en:"/journal",ro:"/ro/journal"}}};
export default function Journal(){return <main className="blog-page journal-page"><header className="blog-hero"><span className="eyebrow">THEBUMBS / JOURNAL</span><h1>A little from our hearts,{" "}<em className="journal-title-second-line">a little from the road.</em></h1><p>Stories, lessons, and moments of faith from wherever God leads us.</p></header><BlogGrid/><JournalMissionNotes/></main>;}
