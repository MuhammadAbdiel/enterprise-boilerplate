import { test, expect } from '@playwright/test'

test.describe('Features Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/features')
  })

  test('should display features title', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: /features/i }).first()
    ).toBeVisible()
  })

  test('should display feature cards', async ({ page }) => {
    // Check for specific features
    await expect(page.getByText(/app router/i)).toBeVisible()
    await expect(page.getByText(/tailwind/i)).toBeVisible()
    await expect(page.getByText(/type safety/i)).toBeVisible()
    await expect(page.getByText(/shadcn/i)).toBeVisible()
  })

  test('should have responsive layout', async ({ page }) => {
    // Desktop view
    await page.setViewportSize({ width: 1280, height: 720 })
    const cards = page.locator('[class*="grid"]').first()
    await expect(cards).toBeVisible()

    // Mobile view
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(cards).toBeVisible()
  })
})
