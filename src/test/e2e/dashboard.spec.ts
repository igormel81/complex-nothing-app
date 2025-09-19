import { test, expect } from '@playwright/test'

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard')
  })

  test('should display dashboard title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /welcome back/i })).toBeVisible()
  })

  test('should display metrics cards', async ({ page }) => {
    const metricsCards = page.locator('[data-testid="metric-card"]')
    await expect(metricsCards).toHaveCount(4)
  })

  test('should display charts', async ({ page }) => {
    const charts = page.locator('[data-testid="chart"]')
    await expect(charts).toHaveCount(2)
  })

  test('should display quick actions', async ({ page }) => {
    const quickActions = page.locator('[data-testid="quick-action"]')
    await expect(quickActions).toHaveCount(4)
  })

  test('should display recent activity', async ({ page }) => {
    const activityItems = page.locator('[data-testid="activity-item"]')
    await expect(activityItems).toHaveCount(5)
  })

  test('should handle quick action clicks', async ({ page }) => {
    const exportButton = page.getByRole('button', { name: /export data/i })
    await exportButton.click()
    
    // Should show notification
    await expect(page.locator('[role="alert"]')).toBeVisible()
  })

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Check if sidebar is collapsed
    await expect(page.locator('[data-testid="sidebar"]')).toHaveClass(/w-16/)
    
    // Check if metrics are stacked
    const metricsContainer = page.locator('[data-testid="metrics-grid"]')
    await expect(metricsContainer).toHaveCSS('grid-template-columns', /1fr/)
  })

  test('should support keyboard navigation', async ({ page }) => {
    // Tab through focusable elements
    await page.keyboard.press('Tab')
    await expect(page.locator(':focus')).toBeVisible()
    
    // Test Enter key on focused element
    await page.keyboard.press('Enter')
    
    // Should show notification
    await expect(page.locator('[role="alert"]')).toBeVisible()
  })

  test('should support screen reader', async ({ page }) => {
    // Check for proper ARIA labels
    await expect(page.getByRole('main')).toBeVisible()
    await expect(page.getByRole('navigation')).toBeVisible()
    
    // Check for heading hierarchy
    const headings = page.locator('h1, h2, h3, h4, h5, h6')
    await expect(headings).toHaveCount(6)
  })

  test('should handle theme switching', async ({ page }) => {
    const themeButton = page.getByRole('button', { name: /theme/i })
    await themeButton.click()
    
    const darkThemeOption = page.getByRole('button', { name: /dark/i })
    await darkThemeOption.click()
    
    // Check if dark theme is applied
    await expect(page.locator('html')).toHaveClass(/dark/)
  })

  test('should handle language switching', async ({ page }) => {
    const languageButton = page.getByRole('button', { name: /language/i })
    await languageButton.click()
    
    const spanishOption = page.getByRole('button', { name: /español/i })
    await spanishOption.click()
    
    // Check if Spanish text is displayed
    await expect(page.getByText('Bienvenido de nuevo')).toBeVisible()
  })
})
