import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Plus, Settings, BarChart3 } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">顧客管理システム</h1>
        <p className="text-muted-foreground">
          美容・ファッション関連の顧客情報を管理できます
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              <CardTitle>顧客管理</CardTitle>
            </div>
            <CardDescription>
              顧客情報の登録・編集・削除ができます
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Button asChild className="w-full">
                <Link href="/dashboard/customers">
                  <Users className="h-4 w-4 mr-2" />
                  顧客一覧を見る
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/dashboard/customers/new">
                  <Plus className="h-4 w-4 mr-2" />
                  新規顧客登録
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-500" />
              <CardTitle>統計・レポート</CardTitle>
            </div>
            <CardDescription>
              顧客データの分析と統計情報
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground mb-4">
                統計機能は今後追加予定です
              </p>
              <Button disabled variant="outline" className="w-full">
                <BarChart3 className="h-4 w-4 mr-2" />
                近日公開
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-gray-500" />
              <CardTitle>システム設定</CardTitle>
            </div>
            <CardDescription>
              システムの設定と管理
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground mb-4">
                設定機能は今後追加予定です
              </p>
              <Button disabled variant="outline" className="w-full">
                <Settings className="h-4 w-4 mr-2" />
                近日公開
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>ようこそ</CardTitle>
          <CardDescription>
            システムの基本機能から始めて、段階的に機能を追加していきます
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>✅ 顧客情報の管理（追加・編集・削除）</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-yellow-500" />
              <span>🚧 統計・レポート機能（開発予定）</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-yellow-500" />
              <span>🚧 予約管理機能（開発予定）</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-yellow-500" />
              <span>🚧 認証・ユーザー管理（開発予定）</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}