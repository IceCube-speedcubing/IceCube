import Sidebar from './Sidebar'

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 ml-64">{children}</main>
    </div>
  )
}
