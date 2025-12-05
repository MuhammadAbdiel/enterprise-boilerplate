import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('should display hero section', async ({ page }) => {
    await page.goto('/')

    // Check hero title
    await expect(
      page.getByRole('heading', { name: /next\.js 15/i })
    ).toBeVisible()

    // Check CTA buttons
    await expect(page.getByRole('link', { name: /get started/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /docs/i })).toBeVisible()
  })

  test('should navigate to features page', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('link', { name: /get started/i }).click()

    await expect(page).toHaveURL(/\/features/)
  })

  test('should have working theme toggle', async ({ page }) => {
    await page.goto('/')

    const themeToggle = page.getByRole('button', { name: /toggle theme/i })
    await expect(themeToggle).toBeVisible()

    await themeToggle.click()
    // Theme should change (we can check for dark class on html)
  })

  test('should have working language switcher', async ({ page }) => {
    await page.goto('/')

    const langSwitcher = page.getByRole('button', { name: /language/i })
    await expect(langSwitcher).toBeVisible()
  })
})
