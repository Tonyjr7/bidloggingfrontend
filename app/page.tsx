import BidForm from "./components/BidForm"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="space-y-8">
      <BidForm />
      <div className="text-center">
        <Link href="/bids">
          <Button>View All Bids</Button>
        </Link>
      </div>
    </div>
  )
}

