import type { Metadata } from "next"
import WaitlistClient from "./waitlist-client"

export const metadata: Metadata = {
  title: "Stratos Football — Member Spot",
  description: "Join Stratos Football, the platform built for the ones the world hasn't discovered yet. Get your exclusive member spot now!",
  openGraph: {
    title: "Stratos Football — Member Spot",
    description: "Join Stratos Football, the platform built for the ones the world hasn't discovered yet. Get your exclusive member spot now!",
    images: [
      {
        url: "/stratos-logo.png",
        width: 1200,
        height: 630,
        alt: "Stratos Football Logo",
      },
    ],
    type: "website",
    siteName: "Stratos Football",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stratos Football — Member Spot",
    description: "Join Stratos Football, the platform built for the ones the world hasn't discovered yet.",
    images: ["/stratos-logo.png"],
    creator: "@stratosfootball",
  },
}

export default function WaitlistPage() {
  return <WaitlistClient />
}
