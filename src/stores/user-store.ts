import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface User {
  id: number
  name: string
  email: string
  username: string
  phone: string
  website: string
  company: {
    name: string
  }
}

interface UserState {
  users: User[]
  selectedUser: User | null
  setUsers: (users: User[]) => void
  setSelectedUser: (user: User | null) => void
  addUser: (user: User) => void
  updateUser: (id: number, user: Partial<User>) => void
  deleteUser: (id: number) => void
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        users: [],
        selectedUser: null,
        setUsers: (users) => set({ users }),
        setSelectedUser: (user) => set({ selectedUser: user }),
        addUser: (user) => set((state) => ({ users: [...state.users, user] })),
        updateUser: (id, updatedUser) =>
          set((state) => ({
            users: state.users.map((user) =>
              user.id === id ? { ...user, ...updatedUser } : user
            ),
          })),
        deleteUser: (id) =>
          set((state) => ({
            users: state.users.filter((user) => user.id !== id),
          })),
      }),
      {
        name: 'user-storage',
      }
    )
  )
)
