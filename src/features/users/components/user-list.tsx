'use client'

import { useUsers, useDeleteUser } from '../hooks/use-users'
import { UserCard } from './user-card'
import { DeleteUserDialog } from './delete-user-dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { useFilterStore } from '@/stores/filter-store'
import { useMemo, useState } from 'react'

export function UserList() {
  const { data: users, isLoading, error } = useUsers()
  const deleteUserMutation = useDeleteUser()
  const { searchQuery, sortBy, sortOrder } = useFilterStore()

  // Dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<{
    id: number
    name: string
  } | null>(null)

  const handleDeleteClick = (id: number, name: string) => {
    setUserToDelete({ id, name })
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    if (userToDelete) {
      deleteUserMutation.mutate(userToDelete.id)
      setDeleteDialogOpen(false)
      setUserToDelete(null)
    }
  }

  // Filter and sort users based on Zustand store state
  const filteredAndSortedUsers = useMemo(() => {
    if (!users) return []

    let filtered = users.filter((user) => {
      const query = searchQuery.toLowerCase()
      return (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.username.toLowerCase().includes(query) ||
        user.company.name.toLowerCase().includes(query)
      )
    })

    // Sort users
    filtered.sort((a, b) => {
      let aValue = ''
      let bValue = ''

      if (sortBy === 'name') {
        aValue = a.name
        bValue = b.name
      } else if (sortBy === 'email') {
        aValue = a.email
        bValue = b.email
      } else if (sortBy === 'company') {
        aValue = a.company.name
        bValue = b.company.name
      }

      const comparison = aValue.localeCompare(bValue)
      return sortOrder === 'asc' ? comparison : -comparison
    })

    return filtered
  }, [users, searchQuery, sortBy, sortOrder])

  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col space-y-3">
            <Skeleton className="h-[280px] w-full rounded-xl" />
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Error loading users: {error.message}
        </AlertDescription>
      </Alert>
    )
  }

  if (filteredAndSortedUsers.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">No users found</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredAndSortedUsers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onDelete={() => handleDeleteClick(user.id, user.name)}
          />
        ))}
      </div>

      <DeleteUserDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        userName={userToDelete?.name || ''}
      />
    </>
  )
}
