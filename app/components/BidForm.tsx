"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getApiUrl } from "../../utils/api"

export default function BidForm() {
  const [formData, setFormData] = useState({
    position: "",
    company: "",
    link: "",
    resume: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(getApiUrl("/api/"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        alert("Bid logged successfully!")
        setFormData({ position: "", company: "", link: "", resume: "" })
      } else {
        alert("Failed to log bid. Please try again.")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("An error occurred. Please try again.")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Log a New Bid</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="position">Position</Label>
            <Input id="position" name="position" value={formData.position} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="company">Company</Label>
            <Input id="company" name="company" value={formData.company} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="link">Job Link</Label>
            <Input id="link" name="link" type="url" value={formData.link} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="resume">Resume Link</Label>
            <Input id="resume" name="resume" type="url" value={formData.resume} onChange={handleChange} required />
          </div>
          <Button type="submit">Log Bid</Button>
        </form>
      </CardContent>
    </Card>
  )
}

