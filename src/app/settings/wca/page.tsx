'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useRouter } from 'next/navigation'

export default function WcaSettingsPage() {
  const [wcaEmail, setWcaEmail] = useState('')
  const [wcaPassword, setWcaPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/user/wca', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wcaEmail, wcaPassword }),
      })

      if (response.ok) {
        // WCA settings updated successfully
        console.log('WCA settings updated')
        // Optionally, you can redirect or show a success message
      } else {
        // Handle error
        console.error('Error updating WCA settings')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>WCA Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="email"
            placeholder="WCA Email"
            value={wcaEmail}
            onChange={(e) => setWcaEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="WCA Password"
            value={wcaPassword}
            onChange={(e) => setWcaPassword(e.target.value)}
          />
          <Button type="submit" className="mt-4">
            Update WCA Settings
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
