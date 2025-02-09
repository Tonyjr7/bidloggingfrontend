import BidList from "../components/BidList"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Bids() {
  return (
    <div className="space-y-8">
      <BidList />
      <div className="text-center">
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    </div>
  )
}

