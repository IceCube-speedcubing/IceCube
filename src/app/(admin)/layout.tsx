import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { Session } from 'next-auth'

// Define a custom session type that extends the default Session type
interface CustomSession extends Session {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
    isAdmin: boolean
  }
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = (await getServerSession()) as CustomSession | null

  if (!session || !session.user.isAdmin) {
    redirect('/no-permission')
  }

  return <div className="flex min-h-screen flex-col">{children}</div>
}
