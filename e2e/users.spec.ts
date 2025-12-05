import { test, expect } from '@playwright/test'

test.describe('Users Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/users')
  })

  test('should display user management title', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: /user management/i })
    ).toBeVisible()
  })

  test('should display statistics cards', async ({ page }) => {
    await page.waitForSelector('[class*="grid"]', { timeout: 10000 })

    // Check for stat cards
    await expect(page.getByText(/total users/i)).toBeVisible()
    await expect(page.getByText(/companies/i)).toBeVisible()
    await expect(page.getByText(/email accounts/i)).toBeVisible()
  })

  test('should display user filters', async ({ page }) => {
    // Check search input
    const searchInput = page.getByPlaceholder(/search users/i)
    await expect(searchInput).toBeVisible()

    // Check sort select
    await expect(page.getByRole('combobox')).toBeVisible()

    // Check reset button
    await expect(page.getByRole('button', { name: /reset/i })).toBeVisible()
  })

  test('should filter users by search query', async ({ page }) => {
    await page.waitForSelector('[class*="grid"]', { timeout: 10000 })

    const searchInput = page.getByPlaceholder(/search users/i)
    await searchInput.fill('Leanne')

    // Wait for filtered results
    await page.waitForTimeout(500)

    // Check if filtered user is displayed
    await expect(page.getByText(/leanne/i)).toBeVisible()
  })

  test('should load and display user cards', async ({ page }) => {
    await page.waitForSelector('[class*="grid"]', { timeout: 10000 })

    // Check if user cards are displayed
    const userCards = page.locator('[class*="grid"] > div')
    await expect(userCards.first()).toBeVisible()

    // Check user card content
    await expect(page.getByText(/@/)).toBeVisible() // Username with @
  })

  test('should open delete dialog when delete button clicked', async ({
    page,
  }) => {
    await page.waitForSelector('[class*="grid"]', { timeout: 10000 })

    // Click first delete button
    const deleteButton = page.getByRole('button', { name: /trash/i }).first()
    await deleteButton.click()

    // Check if dialog appears
    await expect(
      page.getByRole('heading', { name: /are you absolutely sure/i })
    ).toBeVisible()

    // Check dialog buttons
    await expect(page.getByRole('button', { name: /cancel/i })).toBeVisible()
    await expect(
      page.getByRole('button', { name: /delete user/i })
    ).toBeVisible()
  })

  test('should cancel delete operation', async ({ page }) => {
    await page.waitForSelector('[class*="grid"]', { timeout: 10000 })

    // Click delete button
    await page.getByRole('button', { name: /trash/i }).first().click()

    // Click cancel
    await page.getByRole('button', { name: /cancel/i }).click()

    // Dialog should close
    await expect(
      page.getByRole('heading', { name: /are you absolutely sure/i })
    ).not.toBeVisible()
  })

  test('should reset filters', async ({ page }) => {
    await page.waitForSelector('[class*="grid"]', { timeout: 10000 })

    const searchInput = page.getByPlaceholder(/search users/i)
    await searchInput.fill('test query')

    // Click reset
    await page.getByRole('button', { name: /reset/i }).click()

    // Search should be cleared
    await expect(searchInput).toHaveValue('')
  })
})
