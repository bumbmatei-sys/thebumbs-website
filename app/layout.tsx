import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/navigation";
export const metadata: Metadata = { title: { default: "The Bumbs | Sharing Jesus Across Nations", template: "%s | The Bumbs" }, description: "Follow our evangelism and discipleship journey, read mission reports, and partner with us." };
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body><div className="container"><Navigation/>{children}<footer className="footer">© {new Date().getFullYear()} The Bumbs · Sharing Jesus across nations.</footer></div></body></html>}
