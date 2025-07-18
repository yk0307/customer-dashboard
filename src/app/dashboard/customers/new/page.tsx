"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { addCustomer } from "@/lib/firestore"
import { PLANS, STATUSES } from "@/lib/constants"

// バリデーションスキーマ
const customerSchema = z.object({
  name: z.string().min(1, "名前は必須です"),
  email: z.string().email("正しいメールアドレスを入力してください").optional().or(z.literal("")),
  phone: z.string().optional(),
  plan: z.enum(PLANS, { message: "プランを選択してください" }),
  status: z.enum(STATUSES, { message: "ステータスを選択してください" }),
  contractDate: z.string().optional(),
  makeupCount: z.number().min(0),
  hairCount: z.number().min(0),
  fashionCount: z.number().min(0),
  nextDate: z.string().optional(),
  nextContent: z.string().optional(),
})

type CustomerFormData = z.infer<typeof customerSchema>

export default function NewCustomerPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      makeupCount: 0,
      hairCount: 0,
      fashionCount: 0
    }
  })

  const selectedPlan = watch("plan")
  const selectedStatus = watch("status")

  const onSubmit = async (data: CustomerFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      // 空文字列を undefined に変換
      const cleanedData = {
        ...data,
        email: data.email || undefined,
        phone: data.phone || undefined,
        contractDate: data.contractDate || undefined,
        nextDate: data.nextDate || undefined,
        nextContent: data.nextContent || undefined,
      }

      await addCustomer(cleanedData)
      router.push("/dashboard/customers")
    } catch (err) {
      setError(err instanceof Error ? err.message : "登録に失敗しました")
    } finally {
      setIsLoading(false)
    }
  }

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
          <h1 className="text-3xl font-bold tracking-tight">新規顧客登録</h1>
          <p className="text-muted-foreground">
            新しい顧客情報を登録します
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>顧客情報</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {error}
              </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              {/* 基本情報 */}
              <div className="space-y-4">
                <h3 className="font-medium">基本情報</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="name">顧客名 *</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="例: 田中花子"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">メールアドレス</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="例: hanako@example.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">電話番号</Label>
                  <Input
                    id="phone"
                    {...register("phone")}
                    placeholder="例: 090-1234-5678"
                  />
                </div>
              </div>

              {/* プラン・ステータス */}
              <div className="space-y-4">
                <h3 className="font-medium">プラン・ステータス</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="plan">プラン *</Label>
                  <Select
                    value={selectedPlan}
                    onValueChange={(value) => setValue("plan", value as typeof PLANS[number])}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="プランを選択" />
                    </SelectTrigger>
                    <SelectContent>
                      {PLANS.map((plan) => (
                        <SelectItem key={plan} value={plan}>
                          {plan}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.plan && (
                    <p className="text-sm text-red-600">{errors.plan.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">ステータス *</Label>
                  <Select
                    value={selectedStatus}
                    onValueChange={(value) => setValue("status", value as typeof STATUSES[number])}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="ステータスを選択" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUSES.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.status && (
                    <p className="text-sm text-red-600">{errors.status.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contractDate">契約日</Label>
                  <Input
                    id="contractDate"
                    type="date"
                    {...register("contractDate")}
                  />
                </div>
              </div>
            </div>

            {/* サービス利用回数 */}
            <div className="space-y-4">
              <h3 className="font-medium">サービス利用回数</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="makeupCount">メイク回数</Label>
                  <Input
                    id="makeupCount"
                    type="number"
                    min="0"
                    {...register("makeupCount", { valueAsNumber: true })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hairCount">ヘア回数</Label>
                  <Input
                    id="hairCount"
                    type="number"
                    min="0"
                    {...register("hairCount", { valueAsNumber: true })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fashionCount">ファッション回数</Label>
                  <Input
                    id="fashionCount"
                    type="number"
                    min="0"
                    {...register("fashionCount", { valueAsNumber: true })}
                  />
                </div>
              </div>
            </div>

            {/* 次回予定 */}
            <div className="space-y-4">
              <h3 className="font-medium">次回予定</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nextDate">次回予定日</Label>
                  <Input
                    id="nextDate"
                    type="date"
                    {...register("nextDate")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nextContent">次回予定内容</Label>
                  <Input
                    id="nextContent"
                    {...register("nextContent")}
                    placeholder="例: メイクレッスン"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    登録中...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    登録する
                  </>
                )}
              </Button>
              <Button asChild variant="outline" type="button">
                <Link href="/dashboard/customers">
                  キャンセル
                </Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}