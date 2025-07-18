"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Edit, Trash2, Mail, Phone, Calendar, User, Package } from "lucide-react"
import Link from "next/link"
import { getCustomer, deleteCustomer } from "@/lib/firestore"
import { Customer } from "@/types/customer"

const getPlanBadgeVariant = (plan: string) => {
  switch (plan) {
    case 'ベーシック':
      return 'secondary'
    case 'スタンダード':
      return 'default'
    case 'プレミアム':
      return 'destructive'
    default:
      return 'outline'
  }
}

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case '契約締結':
      return 'outline'
    case '入金済み':
      return 'secondary'
    case '事前ノウハウ学習済み':
      return 'default'
    case '初回カウンセリング済み':
      return 'destructive'
    default:
      return 'outline'
  }
}

export default function CustomerDetailPage() {
  const router = useRouter()
  const params = useParams()
  const customerId = params.id as string

  const [customer, setCustomer] = useState<Customer | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadCustomer = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await getCustomer(customerId)
        
        if (!data) {
          setError("顧客が見つかりません")
          return
        }

        setCustomer(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "データの読み込みに失敗しました")
      } finally {
        setIsLoading(false)
      }
    }

    if (customerId) {
      loadCustomer()
    }
  }, [customerId])

  const handleDelete = async () => {
    if (!customer) return

    if (window.confirm(`「${customer.name}」を削除してもよろしいですか？\nこの操作は取り消せません。`)) {
      try {
        await deleteCustomer(customerId)
        router.push("/dashboard/customers")
      } catch (err) {
        alert(err instanceof Error ? err.message : "削除に失敗しました")
      }
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard/customers">
              <ArrowLeft className="h-4 w-4 mr-2" />
              戻る
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">顧客詳細</h1>
            <p className="text-muted-foreground">読み込み中...</p>
          </div>
        </div>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
                <p className="text-muted-foreground">データを読み込んでいます...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error || !customer) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard/customers">
              <ArrowLeft className="h-4 w-4 mr-2" />
              戻る
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">顧客詳細</h1>
            <p className="text-muted-foreground">エラーが発生しました</p>
          </div>
        </div>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-red-600 mb-4">{error || "顧客が見つかりません"}</p>
              <Button asChild>
                <Link href="/dashboard/customers">
                  顧客一覧に戻る
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard/customers">
              <ArrowLeft className="h-4 w-4 mr-2" />
              戻る
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{customer.name}</h1>
            <p className="text-muted-foreground">顧客詳細情報</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href={`/dashboard/customers/${customer.id}/edit`}>
              <Edit className="h-4 w-4 mr-2" />
              編集
            </Link>
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            削除
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* 基本情報 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              基本情報
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>顧客名</Label>
              <p className="font-medium">{customer.name}</p>
            </div>
            
            {customer.email && (
              <div>
                <Label>メールアドレス</Label>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <p>{customer.email}</p>
                </div>
              </div>
            )}
            
            {customer.phone && (
              <div>
                <Label>電話番号</Label>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <p>{customer.phone}</p>
                </div>
              </div>
            )}
            
            {customer.contractDate && (
              <div>
                <Label>契約日</Label>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <p>{customer.contractDate}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* プラン・ステータス */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              プラン・ステータス
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>プラン</Label>
              <div className="mt-1">
                <Badge variant={getPlanBadgeVariant(customer.plan)}>
                  {customer.plan}
                </Badge>
              </div>
            </div>
            
            <div>
              <Label>ステータス</Label>
              <div className="mt-1">
                <Badge variant={getStatusBadgeVariant(customer.status)}>
                  {customer.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* サービス利用回数 */}
        <Card>
          <CardHeader>
            <CardTitle>サービス利用回数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>メイクサービス</span>
                <span className="font-semibold">{customer.makeupCount}回</span>
              </div>
              <div className="flex justify-between items-center">
                <span>ヘアサービス</span>
                <span className="font-semibold">{customer.hairCount}回</span>
              </div>
              <div className="flex justify-between items-center">
                <span>ファッション相談</span>
                <span className="font-semibold">{customer.fashionCount}回</span>
              </div>
              <div className="border-t pt-2 mt-3">
                <div className="flex justify-between items-center font-medium">
                  <span>合計</span>
                  <span>{customer.makeupCount + customer.hairCount + customer.fashionCount}回</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 次回予定 */}
        <Card>
          <CardHeader>
            <CardTitle>次回予定</CardTitle>
          </CardHeader>
          <CardContent>
            {customer.nextDate || customer.nextContent ? (
              <div className="space-y-3">
                {customer.nextDate && (
                  <div>
                    <Label>予定日</Label>
                    <p className="font-medium">{customer.nextDate}</p>
                  </div>
                )}
                {customer.nextContent && (
                  <div>
                    <Label>内容</Label>
                    <p className="font-medium">{customer.nextContent}</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground">次回の予定は未定です</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 登録・更新日時 */}
      <Card>
        <CardHeader>
          <CardTitle>システム情報</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>登録日時</Label>
              <p className="text-sm text-muted-foreground">
                {customer.createdAt?.toDate().toLocaleString()}
              </p>
            </div>
            <div>
              <Label>最終更新日時</Label>
              <p className="text-sm text-muted-foreground">
                {customer.updatedAt?.toDate().toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-sm font-medium text-muted-foreground mb-1">{children}</div>
}