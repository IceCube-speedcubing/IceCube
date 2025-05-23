"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

const SIDEBAR_COOKIE_NAME = "sidebar-state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year

interface SidebarContextValue {
  open: boolean
  setOpen: (open: boolean) => void
}

const SidebarContext = React.createContext<SidebarContextValue | undefined>(undefined)

export function SidebarProvider({
  children,
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
}: {
  children: React.ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }

      // Set cookie to persist sidebar state
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open]
  )

  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }
  return context
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "left" | "right"
  variant?: "default" | "ghost"
  collapsible?: "icon" | "full"
}

export function Sidebar({
  className,
  side = "left",
  variant = "default",
  collapsible,
  ...props
}: SidebarProps) {
  const { open } = useSidebar()

  return (
    <div
      data-side={side}
      data-variant={variant}
      data-collapsible={collapsible}
      data-state={open ? "open" : "closed"}
      className={cn(
        "group relative flex h-full flex-col",
        {
          "border-r": side === "left",
          "border-l": side === "right",
          "bg-background": variant === "default",
          "bg-transparent": variant === "ghost",
        },
        className
      )}
      {...props}
    />
  )
}

export function SidebarHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex h-14 items-center border-b px-4", className)}
      {...props}
    />
  )
}

export function SidebarContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <ScrollArea className={cn("flex-1 px-2", className)} {...props} />
  )
}

export function SidebarFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex h-14 items-center border-t px-4", className)}
      {...props}
    />
  )
}

export function SidebarGroup({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col gap-2 py-2", className)}
      {...props}
    />
  )
}

export function SidebarGroupLabel({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("px-2 text-xs font-semibold text-muted-foreground", className)}
      {...props}
    />
  )
}

export function SidebarGroupContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col gap-1", className)}
      {...props}
    />
  )
}

export function SidebarMenu({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col gap-1", className)}
      {...props}
    />
  )
}

export function SidebarMenuItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  )
}

export function SidebarMenuButton({
  className,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-2",
        "data-[active=true]:bg-accent data-[active=true]:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

export function SidebarMenuAction({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("ml-auto opacity-0 group-hover:opacity-100", className)}
      {...props}
    />
  )
}

export function SidebarMenuBadge({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "ml-auto rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground",
        className
      )}
      {...props}
    />
  )
}

export function SidebarMenuSkeleton({
  className,
  showIcon = true,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  showIcon?: boolean
}) {
  return (
    <div
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {showIcon && (
        <div className="h-4 w-4 animate-pulse rounded bg-muted" />
      )}
      <div className="h-4 w-24 animate-pulse rounded bg-muted" />
    </div>
  )
}

export function SidebarSeparator({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("my-2 h-px bg-border", className)}
      {...props}
    />
  )
}

export function SidebarTrigger({
  className,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen } = useSidebar()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("md:hidden", className)}
          {...props}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] p-0">
        <Sidebar />
      </SheetContent>
    </Sheet>
  )
} 