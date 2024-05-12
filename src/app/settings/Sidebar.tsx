'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Settings, User } from 'lucide-react'

export default function Sidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 flex-col bg-muted p-4">
      {/* Sidebar header */}
      {/* ... */}
      <nav className="flex flex-col gap-2">
        <Link
          href="/settings/user"
          className={`flex items-center gap-2 rounded-md p-3 text-sm font-medium ${
            isActive('/settings/user')
              ? 'bg-muted/60 text-primary'
              : 'text-muted-foreground hover:bg-muted/60 hover:text-primary'
          }`}
        >
          <User className="h-5 w-5" />
          User Settings
        </Link>
        <Link
          href="/settings/wca"
          className={`flex items-center gap-2 rounded-md p-3 text-sm font-medium ${
            isActive('/settings/wca')
              ? 'bg-muted/60 text-primary'
              : 'text-muted-foreground hover:bg-muted/60 hover:text-primary'
          }`}
        >
          <User className="h-5 w-5" />
          WCA Settings
        </Link>
        <Link
          href="/settings/general"
          className={`flex items-center gap-2 rounded-md p-3 text-sm font-medium ${
            isActive('/settings/general')
              ? 'bg-muted/60 text-primary'
              : 'text-muted-foreground hover:bg-muted/60 hover:text-primary'
          }`}
        >
          <Settings className="h-5 w-5" />
          General Settings
        </Link>
        <Link
          href="/settings/appearance"
          className={`flex items-center gap-2 rounded-md p-3 text-sm font-medium ${
            isActive('/settings/appearance')
              ? 'bg-muted/60 text-primary'
              : 'text-muted-foreground hover:bg-muted/60 hover:text-primary'
          }`}
        >
          <Settings className="h-5 w-5" />
          Appearance
        </Link>
      </nav>
    </aside>
  )
}
