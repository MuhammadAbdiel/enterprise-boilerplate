import { render, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import userEvent from '@testing-library/user-event'

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  })

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  queryClient?: QueryClient
}

export function renderWithProviders(
  ui: ReactElement,
  {
    queryClient = createTestQueryClient(),
    ...renderOptions
  }: CustomRenderOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
  }

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    queryClient,
    user: userEvent.setup(),
  }
}

export * from '@testing-library/react'
export { userEvent }
