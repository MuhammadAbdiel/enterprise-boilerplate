'use client'

import { Header } from '@/components/shared/header'
import { UserList } from '@/features/users/components/user-list'
import { UserFilters } from '@/features/users/components/user-filters'
import { UserStats } from '@/features/users/components/user-stats'
import { Button } from '@/components/ui/button'
import { Plus, Users as UsersIcon } from 'lucide-react'
import { useUserStore } from '@/stores/user-store'

export default function UsersPage() {
  const selectedUser = useUserStore((state) => state.selectedUser)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Users Section */}
      <section className="container px-12 py-12 md:py-24">
        <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 rounded-lg p-3">
              <UsersIcon className="text-primary h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">
                User Management
              </h1>
              <p className="text-muted-foreground">
                Manage users with TanStack Query & Zustand
              </p>
            </div>
          </div>
          <Button size="lg">
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>

        {selectedUser && (
          <div className="bg-muted mb-6 rounded-lg p-4">
            <p className="text-sm font-medium">
              Selected User:{' '}
              <span className="text-primary">{selectedUser.name}</span>
            </p>
            <p className="text-muted-foreground text-xs">
              This demonstrates Zustand state management
            </p>
          </div>
        )}

        <UserStats />
        <UserFilters />
        <UserList />
      </section>
    </div>
  )
}
