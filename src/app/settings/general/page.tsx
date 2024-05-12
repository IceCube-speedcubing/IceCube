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

export default function GeneralSettingsPage() {
  const [storeName, setStoreName] = useState('')
  const [pluginsDirectory, setPluginsDirectory] = useState('/content/plugins')
  const [allowAdminDirectoryChange, setAllowAdminDirectoryChange] = useState(true)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/general', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ storeName, pluginsDirectory, allowAdminDirectoryChange }),
      })

      if (response.ok) {
        // General settings updated successfully
        console.log('General settings updated')
        // Optionally, you can redirect or show a success message
      } else {
        // Handle error
        console.error('Error updating general settings')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Store Name"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Plugins Directory"
            value={pluginsDirectory}
            onChange={(e) => setPluginsDirectory(e.target.value)}
          />
          <div className="flex items-center space-x-2">
            <Input
              type="checkbox"
              id="allowAdminDirectoryChange"
              checked={allowAdminDirectoryChange}
              onChange={(e) => setAllowAdminDirectoryChange(e.target.checked)}
            />
            <label htmlFor="allowAdminDirectoryChange">
              Allow administrators to change the directory
            </label>
          </div>
          <Button type="submit" className="mt-4">
            Update General Settings
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
