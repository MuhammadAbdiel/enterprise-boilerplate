import { describe, it, expect, beforeEach } from 'vitest'
import { renderWithProviders, screen } from '@/test/test-utils'
import { UserFilters } from './user-filters'
import { useFilterStore } from '@/stores/filter-store'

describe('UserFilters', () => {
  beforeEach(() => {
    // Reset store before each test
    useFilterStore.setState({
      searchQuery: '',
      sortBy: 'name',
      sortOrder: 'asc',
    })
  })

  it('renders search input', () => {
    renderWithProviders(<UserFilters />)
    const searchInput = screen.getByPlaceholderText('Search users...')
    expect(searchInput).toBeInTheDocument()
  })

  it('updates search query when typing', async () => {
    const { user } = renderWithProviders(<UserFilters />)
    const searchInput = screen.getByPlaceholderText('Search users...')

    await user.type(searchInput, 'John')

    expect(useFilterStore.getState().searchQuery).toBe('John')
  })

  it('renders sort by select', () => {
    renderWithProviders(<UserFilters />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('renders reset button', () => {
    renderWithProviders(<UserFilters />)
    const resetButton = screen.getByRole('button', { name: /reset/i })
    expect(resetButton).toBeInTheDocument()
  })

  it('resets filters when reset button is clicked', async () => {
    const { user } = renderWithProviders(<UserFilters />)

    // Set some filter values
    useFilterStore.setState({
      searchQuery: 'test',
      sortBy: 'email',
      sortOrder: 'desc',
    })

    const resetButton = screen.getByRole('button', { name: /reset/i })
    await user.click(resetButton)

    const state = useFilterStore.getState()
    expect(state.searchQuery).toBe('')
    expect(state.sortBy).toBe('name')
    expect(state.sortOrder).toBe('asc')
  })
})
