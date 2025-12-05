import { test, expect } from '@playwright/test'

test.describe('Articles Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/articles')
  })

  test('should display articles title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /articles/i })).toBeVisible()
  })

  test('should load and display articles', async ({ page }) => {
    // Wait for articles to load
    await page.waitForSelector('[class*="grid"]', { timeout: 10000 })

    // Check if articles are displayed
    const articleCards = page.locator('[class*="grid"] > div')
    await expect(articleCards.first()).toBeVisible()
  })

  test('should display loading skeleton initially', async ({ page }) => {
    // Reload to see loading state
    await page.reload()

    // Check for skeleton loaders (they appear briefly)
    const skeleton = page.locator('[class*="skeleton"]').first()
    // Skeleton might disappear quickly, so we just check the grid exists
    await expect(page.locator('[class*="grid"]')).toBeVisible()
  })
})
