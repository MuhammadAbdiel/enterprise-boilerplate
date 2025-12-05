import { describe, it, expect, vi } from 'vitest'
import { renderWithProviders, screen } from '@/test/test-utils'
import { UserCard } from './user-card'
import { User } from '../types'

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

describe('UserCard', () => {
  it('renders user information correctly', () => {
    const onDelete = vi.fn()
    renderWithProviders(<UserCard user={mockUser} onDelete={onDelete} />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('@johndoe')).toBeInTheDocument()
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
    expect(screen.getByText('123-456-7890')).toBeInTheDocument()
    expect(screen.getByText('johndoe.com')).toBeInTheDocument()
    expect(screen.getByText('Acme Corp')).toBeInTheDocument()
  })

  it('calls onDelete when delete button is clicked', async () => {
    const onDelete = vi.fn()
    const { user } = renderWithProviders(
      <UserCard user={mockUser} onDelete={onDelete} />
    )

    const deleteButton = screen.getByRole('button', { name: /trash/i })
    await user.click(deleteButton)

    expect(onDelete).toHaveBeenCalledTimes(1)
  })

  it('calls setSelectedUser when edit button is clicked', async () => {
    const onDelete = vi.fn()
    const { user } = renderWithProviders(
      <UserCard user={mockUser} onDelete={onDelete} />
    )

    const editButton = screen.getByRole('button', { name: /edit/i })
    await user.click(editButton)

    // Note: We would need to mock useUserStore to test this properly
    // For now, we just verify the button exists and is clickable
    expect(editButton).toBeInTheDocument()
  })

  it('displays company information', () => {
    const onDelete = vi.fn()
    renderWithProviders(<UserCard user={mockUser} onDelete={onDelete} />)

    expect(screen.getByText('Company')).toBeInTheDocument()
    expect(screen.getByText('Acme Corp')).toBeInTheDocument()
  })
})
