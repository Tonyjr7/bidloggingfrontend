"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getApiUrl } from "../../utils/api"

interface Bid {
  id: number
  position: string
  company: string
  link: string
  resume: string
  created_at: string
}

export default function BidList() {
  const [allBids, setAllBids] = useState<Bid[]>([])
  const [filteredBids, setFilteredBids] = useState<Bid[]>([])
  const [searchData, setSearchData] = useState({ company: "", position: "" })

  useEffect(() => {
    fetchAllBids()
  }, [])

  const fetchAllBids = async () => {
    try {
      const response = await fetch(getApiUrl("/api/check"), {
        method: "GET",
      })
      if (response.ok) {
        const data = await response.json()
        setAllBids(data)
        setFilteredBids(data)
      } else {
        alert("Failed to fetch bids. Please try again.")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("An error occurred. Please try again.")
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const filtered = allBids.filter(
      (bid) =>
        bid.company.toLowerCase().includes(searchData.company.toLowerCase()) &&
        bid.position.toLowerCase().includes(searchData.position.toLowerCase()),
    )
    setFilteredBids(filtered)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value })
  }

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(getApiUrl(`/api/check/${id}/`), {
        method: "DELETE",
      })
      if (response.ok) {
        setAllBids(allBids.filter((bid) => bid.id !== id))
        setFilteredBids(filteredBids.filter((bid) => bid.id !== id))
      } else {
        alert("Failed to delete bid. Please try again.")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("An error occurred. Please try again.")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>View Bids</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="space-y-4 mb-6">
          <div>
            <Label htmlFor="company">Company</Label>
            <Input id="company" name="company" value={searchData.company} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="position">Position</Label>
            <Input id="position" name="position" value={searchData.position} onChange={handleChange} />
          </div>
          <Button type="submit">Search Bids</Button>
        </form>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">No.</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Job Link</TableHead>
              <TableHead>Resume Link</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBids.map((bid, index) => (
              <TableRow key={bid.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{bid.position}</TableCell>
                <TableCell>{bid.company}</TableCell>
                <TableCell>
                  <a
                    href={bid.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Job
                  </a>
                </TableCell>
                <TableCell>
                  <a
                    href={bid.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Resume
                  </a>
                </TableCell>
                <TableCell>{new Date(bid.created_at).toLocaleString()}</TableCell>
                <TableCell>
                  <Button onClick={() => handleDelete(bid.id)} variant="destructive" size="sm">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

