"use client"

import { useState, useMemo } from "react"
import { CustomerTable } from "@/components/customers/CustomerTable"
import { CustomerFilters } from "@/components/customers/CustomerFilters"
import { Customer } from "@/types/customer"
import { Timestamp } from "firebase/firestore"

// サンプルデータ - 実際のアプリケーションではFirestoreから取得
const sampleCustomers: Customer[] = [
  {
    id: "1",
    name: "田中花子",
    email: "hanako@example.com",
    phone: "090-1234-5678",
    plan: "プレミアム",
    status: "初回カウンセリング済み",
    contractDate: "2024-01-15",
    makeupCount: 3,
    hairCount: 2,
    fashionCount: 1,
    nextDate: "2024-02-20",
    nextContent: "メイクレッスン",
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  {
    id: "2",
    name: "佐藤美咲",
    email: "misaki@example.com",
    phone: "080-9876-5432",
    plan: "スタンダード",
    status: "事前ノウハウ学習済み",
    contractDate: "2024-01-10",
    makeupCount: 2,
    hairCount: 1,
    fashionCount: 2,
    nextDate: "2024-02-18",
    nextContent: "ヘアスタイリング",
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  {
    id: "3",
    name: "鈴木愛",
    email: "ai@example.com",
    phone: "070-5555-1111",
    plan: "ベーシック",
    status: "入金済み",
    contractDate: "2024-01-20",
    makeupCount: 1,
    hairCount: 0,
    fashionCount: 1,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  {
    id: "4",
    name: "高橋由美",
    phone: "090-7777-8888",
    plan: "スタンダード",
    status: "契約締結",
    contractDate: "2024-01-25",
    makeupCount: 0,
    hairCount: 0,
    fashionCount: 0,
    nextDate: "2024-02-15",
    nextContent: "初回カウンセリング",
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  {
    id: "5",
    name: "山田麻衣",
    email: "mai@example.com",
    plan: "プレミアム",
    status: "初回カウンセリング済み",
    contractDate: "2024-01-05",
    makeupCount: 4,
    hairCount: 3,
    fashionCount: 3,
    nextDate: "2024-02-22",
    nextContent: "ファッション相談",
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
]

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPlan, setSelectedPlan] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [loading] = useState(false)

  // フィルタリングされた顧客データ
  const filteredCustomers = useMemo(() => {
    return sampleCustomers.filter((customer) => {
      const matchesSearch = !searchTerm || 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (customer.email && customer.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (customer.phone && customer.phone.includes(searchTerm))
      
      const matchesPlan = !selectedPlan || customer.plan === selectedPlan
      const matchesStatus = !selectedStatus || customer.status === selectedStatus

      return matchesSearch && matchesPlan && matchesStatus
    })
  }, [searchTerm, selectedPlan, selectedStatus])

  const handleClearFilters = () => {
    setSearchTerm("")
    setSelectedPlan("")
    setSelectedStatus("")
  }

  const handleEdit = (customer: Customer) => {
    // TODO: 編集ダイアログまたは編集ページへの遷移
    console.log("Edit customer:", customer)
  }

  const handleDelete = (customerId: string) => {
    // TODO: 削除確認ダイアログと削除処理
    console.log("Delete customer:", customerId)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">顧客管理</h1>
        <p className="text-muted-foreground">
          顧客情報の確認・編集・削除ができます
        </p>
      </div>

      <CustomerFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedPlan={selectedPlan}
        onPlanChange={setSelectedPlan}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        onClearFilters={handleClearFilters}
      />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredCustomers.length}件の顧客が見つかりました
          </p>
        </div>

        <CustomerTable
          customers={filteredCustomers}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}