'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ThemeProvider } from '@/components/ThemeProvider'
import { ModeToggle } from '@/components/ModeToggle'
import { useRouter } from 'next/navigation'

export default function AppearanceSettingsPage() {
  const [theme, setTheme] = useState('system')
  const router = useRouter()

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)

    // Update the theme on the server
    fetch('/api/appearance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ theme: newTheme }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Appearance settings updated')
          // Optionally, you can show a success message
        } else {
          console.error('Error updating appearance settings')
        }
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  return (
    <ThemeProvider attribute="class" defaultTheme={theme} enableSystem>
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle>Appearance Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span>Theme</span>
              <ModeToggle/>
            </div>
            {/* Add more appearance settings here */}
          </div>
        </CardContent>
      </Card>
    </ThemeProvider>
  )
}
