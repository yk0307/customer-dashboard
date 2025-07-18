"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  Users, 
  Calendar, 
  Settings, 
  BarChart3, 
  Mail,
  Home,
  AlertTriangle
} from "lucide-react"

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

const navigation = [
  {
    name: "ダッシュボード",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "顧客管理",
    href: "/dashboard/customers",
    icon: Users,
  },
  {
    name: "予約管理",
    href: "/dashboard/reservations",
    icon: Calendar,
  },
  {
    name: "連携ログ",
    href: "/dashboard/integration/logs",
    icon: Mail,
  },
  {
    name: "重複チェック",
    href: "/dashboard/integration/duplicates",
    icon: AlertTriangle,
  },
  {
    name: "分析",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    name: "設定",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 transform border-r bg-background transition-transform duration-200 ease-in-out md:static md:z-0 md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          <nav className="flex-1 space-y-1 p-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== "/dashboard" && pathname.startsWith(item.href))
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <div className="border-t p-4">
            <div className="text-xs text-muted-foreground">
              v1.0.0 - 顧客管理システム
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}