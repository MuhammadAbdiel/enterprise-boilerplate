import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface FilterState {
  searchQuery: string
  sortBy: 'name' | 'email' | 'company'
  sortOrder: 'asc' | 'desc'
  setSearchQuery: (query: string) => void
  setSortBy: (sortBy: 'name' | 'email' | 'company') => void
  setSortOrder: (order: 'asc' | 'desc') => void
  resetFilters: () => void
}

export const useFilterStore = create<FilterState>()(
  devtools((set) => ({
    searchQuery: '',
    sortBy: 'name',
    sortOrder: 'asc',
    setSearchQuery: (query) => set({ searchQuery: query }),
    setSortBy: (sortBy) => set({ sortBy }),
    setSortOrder: (order) => set({ sortOrder: order }),
    resetFilters: () =>
      set({ searchQuery: '', sortBy: 'name', sortOrder: 'asc' }),
  }))
)
