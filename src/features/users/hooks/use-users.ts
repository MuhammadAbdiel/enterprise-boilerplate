import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../services/api'
import { User } from '../types'
import { toast } from 'sonner'

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })
}

export const useUser = (id: number) => {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  })
}

export const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('User created successfully!')
    },
    onError: (error: Error) => {
      toast.error(`Failed to create user: ${error.message}`)
    },
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, user }: { id: number; user: Partial<User> }) =>
      updateUser(id, user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('User updated successfully!')
    },
    onError: (error: Error) => {
      toast.error(`Failed to update user: ${error.message}`)
    },
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('User deleted successfully!')
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete user: ${error.message}`)
    },
  })
}
