import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getUsers, getUserById, createUser, deleteUser } from './api'
import axiosInstance from '@/lib/axios'
import { User } from '../types'

vi.mock('@/lib/axios')

const mockUser: User = {
  id: 1,
  name: 'John Doe',
  username: 'johndoe',
  email: 'john@example.com',
  phone: '123-456-7890',
  website: 'johndoe.com',
  company: {
    name: 'Acme Corp',
  },
}

describe('Users API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getUsers', () => {
    it('fetches users successfully', async () => {
      const mockUsers = [mockUser]
      vi.mocked(axiosInstance.get).mockResolvedValue({ data: mockUsers })

      const result = await getUsers()

      expect(axiosInstance.get).toHaveBeenCalledWith('/users')
      expect(result).toEqual(mockUsers)
    })

    it('throws error when request fails', async () => {
      vi.mocked(axiosInstance.get).mockRejectedValue(new Error('Network error'))

      await expect(getUsers()).rejects.toThrow('Network error')
    })
  })

  describe('getUserById', () => {
    it('fetches single user successfully', async () => {
      vi.mocked(axiosInstance.get).mockResolvedValue({ data: mockUser })

      const result = await getUserById(1)

      expect(axiosInstance.get).toHaveBeenCalledWith('/users/1')
      expect(result).toEqual(mockUser)
    })
  })

  describe('createUser', () => {
    it('creates user successfully', async () => {
      const newUser = { ...mockUser }
      delete (newUser as any).id

      vi.mocked(axiosInstance.post).mockResolvedValue({ data: mockUser })

      const result = await createUser(newUser)

      expect(axiosInstance.post).toHaveBeenCalledWith('/users', newUser)
      expect(result).toEqual(mockUser)
    })
  })

  describe('deleteUser', () => {
    it('deletes user successfully', async () => {
      vi.mocked(axiosInstance.delete).mockResolvedValue({ data: undefined })

      await deleteUser(1)

      expect(axiosInstance.delete).toHaveBeenCalledWith('/users/1')
    })
  })
})
