import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/navigation";
export const metadata: Metadata = {
 metadataBase: new URL("https://thebumbs.space"),
 title: {default:"The Bumbs | Sharing Jesus Across Nations",template:"%s | The Bumbs"},
 description:"Meet Matei and Larisa Bumb. Follow their evangelism and discipleship journey, explore upcoming missions, and learn how to partner in the Gospel.",
 openGraph:{type:"website",siteName:"The Bumbs",locale:"en_US",title:"The Bumbs | Sharing Jesus Across Nations",description:"Meet Matei and Larisa Bumb and follow their Gospel mission across nations.",url:"https://thebumbs.space"},
 twitter:{card:"summary",title:"The Bumbs | Sharing Jesus Across Nations",description:"Evangelism, discipleship, and a journey of faith across nations."},
 robots:{index:true,follow:true}
};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body><a href="#main-content" className="skip-link">Skip to content</a><div className="container"><Navigation/><div id="main-content">{children}</div><footer className="footer">© {new Date().getFullYear()} The Bumbs · Sharing Jesus across nations.</footer></div></body></html>}
