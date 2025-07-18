"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, Filter, X } from "lucide-react"
import { PLANS, STATUSES } from "@/lib/constants"

interface CustomerFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  selectedPlan: string
  onPlanChange: (value: string) => void
  selectedStatus: string
  onStatusChange: (value: string) => void
  onClearFilters: () => void
}

export function CustomerFilters({
  searchTerm,
  onSearchChange,
  selectedPlan,
  onPlanChange,
  selectedStatus,
  onStatusChange,
  onClearFilters
}: CustomerFiltersProps) {
  const hasActiveFilters = searchTerm || selectedPlan || selectedStatus

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-medium">フィルター</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="h-auto p-1 text-muted-foreground hover:text-foreground"
          >
            <X className="h-3 w-3" />
            クリア
          </Button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="search">顧客名・メール・電話番号で検索</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="search"
              placeholder="検索..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="plan">プラン</Label>
          <Select value={selectedPlan} onValueChange={onPlanChange}>
            <SelectTrigger>
              <SelectValue placeholder="全てのプラン" />
            </SelectTrigger>
            <SelectContent>
              {PLANS.map((plan) => (
                <SelectItem key={plan} value={plan}>
                  {plan}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">ステータス</Label>
          <Select value={selectedStatus} onValueChange={onStatusChange}>
            <SelectTrigger>
              <SelectValue placeholder="全てのステータス" />
            </SelectTrigger>
            <SelectContent>
              {STATUSES.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}