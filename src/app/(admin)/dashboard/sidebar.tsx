import { ClipboardList, Home } from "lucide-react"
import Link from "next/link"

const AdminSidebar = () => {
    return (
        <div className="hidden bg-muted/70 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4 mt-10">
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <ClipboardList className="h-4 w-4" />
                Algorithms 
              </Link>
            </nav>
          </div>
          </div>
        </div>
    )
}

export default AdminSidebar