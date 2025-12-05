# 🧪 Testing Guide

## 📋 Overview

This project uses **Vitest** for unit/integration testing and **Playwright** for end-to-end (E2E) testing, following enterprise-grade testing standards.

## 🎯 Testing Stack

### Unit & Integration Testing

- **Vitest** - Fast unit test framework (Vite-native)
- **React Testing Library** - Component testing utilities
- **@testing-library/user-event** - User interaction simulation
- **@testing-library/jest-dom** - Custom matchers for DOM

### E2E Testing

- **Playwright** - Cross-browser E2E testing
- **Multiple browsers** - Chromium, Firefox, WebKit
- **Mobile viewports** - Pixel 5, iPhone 12

---

## 🚀 Quick Start

### Run All Unit Tests

```bash
npm test
```

### Run Tests in UI Mode

```bash
npm run test:ui
```

### Run Tests Once (CI Mode)

```bash
npm run test:run
```

### Generate Coverage Report

```bash
npm run test:coverage
```

### Run E2E Tests

```bash
npm run test:e2e
```

### Run E2E Tests in UI Mode

```bash
npm run test:e2e:ui
```

### Debug E2E Tests

```bash
npm run test:e2e:debug
```

---

## 📁 Project Structure

```
src/
├── test/
│   ├── setup.ts           # Global test setup
│   └── test-utils.tsx     # Custom render utilities
├── features/
│   └── users/
│       ├── components/
│       │   ├── user-card.tsx
│       │   ├── user-card.test.tsx      # Unit tests
│       │   ├── user-filters.tsx
│       │   └── user-filters.test.tsx
│       └── services/
│           ├── api.ts
│           └── api.test.ts             # API tests
e2e/
├── home.spec.ts           # Home page E2E tests
├── features.spec.ts       # Features page E2E tests
├── articles.spec.ts       # Articles page E2E tests
└── users.spec.ts          # Users page E2E tests
```

---

## 🧪 Unit Testing

### Writing Tests

#### Component Test Example

```typescript
import { describe, it, expect, vi } from 'vitest'
import { renderWithProviders, screen } from '@/test/test-utils'
import { UserCard } from './user-card'

describe('UserCard', () => {
  it('renders user information', () => {
    const mockUser = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      // ...
    }

    renderWithProviders(<UserCard user={mockUser} onDelete={vi.fn()} />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
  })

  it('calls onDelete when button clicked', async () => {
    const onDelete = vi.fn()
    const { user } = renderWithProviders(
      <UserCard user={mockUser} onDelete={onDelete} />
    )

    await user.click(screen.getByRole('button', { name: /delete/i }))

    expect(onDelete).toHaveBeenCalledTimes(1)
  })
})
```

#### API Service Test Example

```typescript
import { describe, it, expect, vi } from 'vitest'
import { getUsers } from './api'
import axiosInstance from '@/lib/axios'

vi.mock('@/lib/axios')

describe('Users API', () => {
  it('fetches users successfully', async () => {
    const mockUsers = [{ id: 1, name: 'John' }]
    vi.mocked(axiosInstance.get).mockResolvedValue({ data: mockUsers })

    const result = await getUsers()

    expect(axiosInstance.get).toHaveBeenCalledWith('/users')
    expect(result).toEqual(mockUsers)
  })
})
```

### Custom Test Utilities

#### `renderWithProviders`

Renders components with all necessary providers:

```typescript
import { renderWithProviders } from '@/test/test-utils'

const { user, queryClient } = renderWithProviders(<MyComponent />)
```

**Includes**:

- ✅ QueryClientProvider (TanStack Query)
- ✅ User event utilities
- ✅ Custom query client for testing

### Mocking

#### Next.js Router

```typescript
// Already mocked in setup.ts
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
}))
```

#### Next-intl

```typescript
// Already mocked in setup.ts
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}))
```

#### Axios

```typescript
vi.mock('@/lib/axios')
vi.mocked(axiosInstance.get).mockResolvedValue({ data: mockData })
```

#### Zustand Store

```typescript
import { useFilterStore } from '@/stores/filter-store'

// Reset store
useFilterStore.setState({ searchQuery: '' })

// Get state
const state = useFilterStore.getState()
```

---

## 🎭 E2E Testing

### Writing E2E Tests

#### Page Test Example

```typescript
import { test, expect } from '@playwright/test'

test.describe('Users Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/users')
  })

  test('should display user list', async ({ page }) => {
    await page.waitForSelector('[class*="grid"]')

    const userCards = page.locator('[class*="grid"] > div')
    await expect(userCards.first()).toBeVisible()
  })

  test('should filter users by search', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search users/i)
    await searchInput.fill('John')

    await expect(page.getByText(/john/i)).toBeVisible()
  })
})
```

### Test Patterns

#### Navigation

```typescript
await page.goto('/en/users')
await page.getByRole('link', { name: /features/i }).click()
await expect(page).toHaveURL(/\/features/)
```

#### Form Interaction

```typescript
await page.getByPlaceholder('Search...').fill('query')
await page.getByRole('button', { name: /submit/i }).click()
```

#### Waiting for Elements

```typescript
await page.waitForSelector('[data-testid="user-card"]')
await expect(page.getByText('Loading...')).not.toBeVisible()
```

#### Dialog Interaction

```typescript
await page.getByRole('button', { name: /delete/i }).click()
await expect(page.getByRole('dialog')).toBeVisible()
await page.getByRole('button', { name: /confirm/i }).click()
```

---

## 📊 Coverage

### Generate Coverage Report

```bash
npm run test:coverage
```

### View Coverage Report

Open `coverage/index.html` in your browser.

### Coverage Thresholds

Configure in `vitest.config.ts`:

```typescript
coverage: {
  provider: 'v8',
  reporter: ['text', 'json', 'html'],
  exclude: [
    'node_modules/',
    'src/test/',
    '**/*.d.ts',
    '**/*.config.*',
  ],
}
```

---

## 🎯 Best Practices

### Unit Tests

1. **Test User Behavior** - Not implementation details
2. **Use Semantic Queries** - `getByRole`, `getByLabelText`
3. **Avoid Test IDs** - Use accessible queries first
4. **Mock External Dependencies** - APIs, routers, etc.
5. **Test Edge Cases** - Loading, error, empty states

### E2E Tests

1. **Test Critical User Flows** - Login, checkout, etc.
2. **Use Page Object Model** - For complex pages
3. **Wait for Elements** - Don't use fixed timeouts
4. **Test Across Browsers** - Chromium, Firefox, WebKit
5. **Keep Tests Independent** - Each test should be isolated

### General

1. **Write Descriptive Test Names** - What is being tested
2. **Follow AAA Pattern** - Arrange, Act, Assert
3. **One Assertion Per Test** - When possible
4. **Clean Up After Tests** - Reset state, clear mocks
5. **Run Tests Before Commit** - Catch issues early

---

## 🔧 Configuration

### Vitest Config (`vitest.config.ts`)

```typescript
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
})
```

### Playwright Config (`playwright.config.ts`)

```typescript
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
})
```

---

## 🚀 CI/CD Integration

### GitHub Actions Example

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Run unit tests
        run: npm run test:run

      - name: Run E2E tests
        run: npm run test:e2e

      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

---

## 📚 Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

## ✅ Test Checklist

### Before Committing

- [ ] All unit tests pass (`npm test`)
- [ ] All E2E tests pass (`npm run test:e2e`)
- [ ] Coverage meets threshold
- [ ] No console errors/warnings
- [ ] Tests are descriptive and maintainable

### Before Deploying

- [ ] All tests pass in CI
- [ ] E2E tests pass on all browsers
- [ ] Performance tests pass (if applicable)
- [ ] Security tests pass (if applicable)

---

**Remember**: Good tests are an investment in code quality and team productivity! 🚀
