import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, TrendingUp, AlertTriangle } from "lucide-react"

export default function DashboardPage() {
  const stats = [
    {
      title: "総顧客数",
      value: "127",
      description: "前月比 +12%",
      icon: Users,
      trend: "up"
    },
    {
      title: "今月の予約",
      value: "43",
      description: "前月比 +8%",
      icon: Calendar,
      trend: "up"
    },
    {
      title: "アクティブ顧客",
      value: "89",
      description: "前月比 +15%",
      icon: TrendingUp,
      trend: "up"
    },
    {
      title: "要確認項目",
      value: "3",
      description: "重複チェック待ち",
      icon: AlertTriangle,
      trend: "neutral"
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">ダッシュボード</h1>
        <p className="text-muted-foreground">
          顧客管理システムの概要をご確認ください
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>最近の活動</CardTitle>
            <CardDescription>
              システムでの最新の活動を確認できます
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <div className="flex-1 text-sm">
                  新しい顧客「田中花子」が登録されました
                </div>
                <div className="text-xs text-muted-foreground">2分前</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <div className="flex-1 text-sm">
                  予約「佐藤美咲」のメイクサービスが完了しました
                </div>
                <div className="text-xs text-muted-foreground">15分前</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-2 w-2 rounded-full bg-yellow-500" />
                <div className="flex-1 text-sm">
                  重複顧客の可能性があります - 確認が必要
                </div>
                <div className="text-xs text-muted-foreground">1時間前</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>今週の予定</CardTitle>
            <CardDescription>
              今週予定されているサービスの概要
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">メイクサービス</div>
                  <div className="text-sm text-muted-foreground">15件</div>
                </div>
                <div className="text-2xl font-bold">15</div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">ヘアサービス</div>
                  <div className="text-sm text-muted-foreground">12件</div>
                </div>
                <div className="text-2xl font-bold">12</div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">ファッション相談</div>
                  <div className="text-sm text-muted-foreground">8件</div>
                </div>
                <div className="text-2xl font-bold">8</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}