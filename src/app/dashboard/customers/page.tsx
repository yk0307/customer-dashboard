"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CustomerTable } from "@/components/customers/CustomerTable"
import { CustomerFilters } from "@/components/customers/CustomerFilters"
import { Customer } from "@/types/customer"
import { getCustomers, deleteCustomer } from "@/lib/firestore"

export default function CustomersPage() {
  const router = useRouter()
  const [customers, setCustomers] = useState<Customer[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPlan, setSelectedPlan] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 顧客データを取得
  const loadCustomers = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getCustomers()
      setCustomers(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "データの取得に失敗しました")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCustomers()
  }, [])

  // フィルタリングされた顧客データ
  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch = !searchTerm || 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (customer.email && customer.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (customer.phone && customer.phone.includes(searchTerm))
      
      const matchesPlan = !selectedPlan || customer.plan === selectedPlan
      const matchesStatus = !selectedStatus || customer.status === selectedStatus

      return matchesSearch && matchesPlan && matchesStatus
    })
  }, [customers, searchTerm, selectedPlan, selectedStatus])

  const handleClearFilters = () => {
    setSearchTerm("")
    setSelectedPlan("")
    setSelectedStatus("")
  }

  const handleEdit = (customer: Customer) => {
    router.push(`/dashboard/customers/${customer.id}/edit`)
  }

  const handleDelete = async (customerId: string) => {
    const customer = customers.find(c => c.id === customerId)
    if (!customer) return

    if (window.confirm(`「${customer.name}」を削除してもよろしいですか？\nこの操作は取り消せません。`)) {
      try {
        await deleteCustomer(customerId)
        // ローカルの状態からも削除
        setCustomers(prev => prev.filter(c => c.id !== customerId))
      } catch (err) {
        alert(err instanceof Error ? err.message : "削除に失敗しました")
      }
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">顧客管理</h1>
        <p className="text-muted-foreground">
          顧客情報の確認・編集・削除ができます
        </p>
      </div>

      {error && (
        <div className="p-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
          <div className="flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={loadCustomers}
              className="text-red-700 hover:text-red-800 underline"
            >
              再試行
            </button>
          </div>
        </div>
      )}

      {!error && (
        <>
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
            {!loading && (
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {filteredCustomers.length}件の顧客が見つかりました
                </p>
              </div>
            )}

            <CustomerTable
              customers={filteredCustomers}
              loading={loading}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </>
      )}
    </div>
  )
}