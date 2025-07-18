"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Edit, Trash2, Plus, Mail, Phone } from "lucide-react"
import { Customer } from "@/types/customer"

interface CustomerTableProps {
  customers: Customer[]
  loading?: boolean
  onEdit?: (customer: Customer) => void
  onDelete?: (customerId: string) => void
}

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

export function CustomerTable({ customers, loading, onEdit, onDelete }: CustomerTableProps) {
  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-muted-foreground">読み込み中...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (customers.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 text-muted-foreground">
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.712-3.714M14 40v-4a9.971 9.971 0 01.712-3.714M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.712-3.714M14 40v-4a9.971 9.971 0 01.712-3.714"
                />
              </svg>
            </div>
            <h3 className="mt-2 text-sm font-semibold">顧客がありません</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              新しい顧客を登録して始めましょう
            </p>
            <div className="mt-6">
              <Button asChild>
                <Link href="/dashboard/customers/new">
                  <Plus className="h-4 w-4 mr-2" />
                  新規顧客登録
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>顧客一覧</CardTitle>
          <Button asChild>
            <Link href="/dashboard/customers/new">
              <Plus className="h-4 w-4 mr-2" />
              新規登録
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>顧客名</TableHead>
              <TableHead>連絡先</TableHead>
              <TableHead>プラン</TableHead>
              <TableHead>ステータス</TableHead>
              <TableHead>実施回数</TableHead>
              <TableHead>次回予定</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <div className="font-medium">{customer.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {customer.contractDate && `契約: ${customer.contractDate}`}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    {customer.email && (
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="h-3 w-3" />
                        {customer.email}
                      </div>
                    )}
                    {customer.phone && (
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="h-3 w-3" />
                        {customer.phone}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getPlanBadgeVariant(customer.plan)}>
                    {customer.plan}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(customer.status)}>
                    {customer.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>メイク: {customer.makeupCount}回</div>
                    <div>ヘア: {customer.hairCount}回</div>
                    <div>ファッション: {customer.fashionCount}回</div>
                  </div>
                </TableCell>
                <TableCell>
                  {customer.nextDate ? (
                    <div>
                      <div className="font-medium">{customer.nextDate}</div>
                      <div className="text-sm text-muted-foreground">
                        {customer.nextContent}
                      </div>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">未定</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/dashboard/customers/${customer.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    {onEdit && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(customer)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDelete(customer.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}