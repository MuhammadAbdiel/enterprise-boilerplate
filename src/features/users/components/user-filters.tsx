'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, X, ArrowUpDown } from 'lucide-react'
import { useFilterStore } from '@/stores/filter-store'

export function UserFilters() {
  const {
    searchQuery,
    sortBy,
    sortOrder,
    setSearchQuery,
    setSortBy,
    setSortOrder,
    resetFilters,
  } = useFilterStore()

  return (
    <div className="bg-muted/50 mb-6 flex flex-col gap-4 rounded-lg p-4 md:flex-row">
      <div className="relative flex-1">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
        <Input
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="flex gap-2">
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="company">Company</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="icon"
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          <ArrowUpDown className="h-4 w-4" />
        </Button>

        <Button variant="outline" onClick={resetFilters}>
          <X className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>
    </div>
  )
}
