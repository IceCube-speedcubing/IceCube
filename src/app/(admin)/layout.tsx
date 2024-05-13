import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth' // You'll need to create this file
import { redirect } from 'next/navigation'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user.isAdmin) {
    redirect('/no-permission')
  }

  return <div>{children}</div>
}
