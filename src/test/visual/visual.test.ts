import { test, expect } from '@playwright/test'

test.describe('Visual Regression Tests', () => {
  test('dashboard should match snapshot', async ({ page }) => {
    await page.goto('/dashboard')
    await page.waitForLoadState('networkidle')
    
    // Take full page screenshot
    await expect(page).toHaveScreenshot('dashboard-full.png')
    
    // Take screenshot of specific components
    const metricsSection = page.locator('[data-testid="metrics-section"]')
    await expect(metricsSection).toHaveScreenshot('dashboard-metrics.png')
    
    const chartsSection = page.locator('[data-testid="charts-section"]')
    await expect(chartsSection).toHaveScreenshot('dashboard-charts.png')
  })

  test('analytics page should match snapshot', async ({ page }) => {
    await page.goto('/analytics')
    await page.waitForLoadState('networkidle')
    
    await expect(page).toHaveScreenshot('analytics-full.png')
  })

  test('users page should match snapshot', async ({ page }) => {
    await page.goto('/users')
    await page.waitForLoadState('networkidle')
    
    await expect(page).toHaveScreenshot('users-full.png')
  })

  test('settings page should match snapshot', async ({ page }) => {
    await page.goto('/settings')
    await page.waitForLoadState('networkidle')
    
    await expect(page).toHaveScreenshot('settings-full.png')
  })

  test('profile page should match snapshot', async ({ page }) => {
    await page.goto('/profile')
    await page.waitForLoadState('networkidle')
    
    await expect(page).toHaveScreenshot('profile-full.png')
  })

  test('mobile layout should match snapshot', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/dashboard')
    await page.waitForLoadState('networkidle')
    
    await expect(page).toHaveScreenshot('dashboard-mobile.png')
  })

  test('tablet layout should match snapshot', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/dashboard')
    await page.waitForLoadState('networkidle')
    
    await expect(page).toHaveScreenshot('dashboard-tablet.png')
  })

  test('dark theme should match snapshot', async ({ page }) => {
    await page.goto('/dashboard')
    await page.waitForLoadState('networkidle')
    
    // Switch to dark theme
    await page.getByRole('button', { name: /theme/i }).click()
    await page.getByRole('button', { name: /dark/i }).click()
    
    await expect(page).toHaveScreenshot('dashboard-dark.png')
  })

  test('loading states should match snapshot', async ({ page }) => {
    // Intercept API calls to show loading state
    await page.route('**/api/**', route => {
      // Delay response to show loading state
      setTimeout(() => route.continue(), 1000)
    })
    
    await page.goto('/dashboard')
    
    // Take screenshot during loading
    await expect(page).toHaveScreenshot('dashboard-loading.png')
  })

  test('error states should match snapshot', async ({ page }) => {
    // Mock API error
    await page.route('**/api/**', route => {
      route.fulfill({ status: 500, body: 'Internal Server Error' })
    })
    
    await page.goto('/dashboard')
    
    await expect(page).toHaveScreenshot('dashboard-error.png')
  })

  test('modal should match snapshot', async ({ page }) => {
    await page.goto('/users')
    await page.waitForLoadState('networkidle')
    
    // Open user modal
    await page.getByRole('button', { name: /view/i }).first().click()
    
    await expect(page).toHaveScreenshot('user-modal.png')
  })

  test('notifications should match snapshot', async ({ page }) => {
    await page.goto('/dashboard')
    await page.waitForLoadState('networkidle')
    
    // Trigger notification
    await page.getByRole('button', { name: /export data/i }).click()
    
    await expect(page).toHaveScreenshot('notification.png')
  })

  test('sidebar states should match snapshot', async ({ page }) => {
    await page.goto('/dashboard')
    await page.waitForLoadState('networkidle')
    
    // Expanded sidebar
    await expect(page.locator('[data-testid="sidebar"]')).toHaveScreenshot('sidebar-expanded.png')
    
    // Collapsed sidebar
    await page.getByRole('button', { name: /toggle sidebar/i }).click()
    await expect(page.locator('[data-testid="sidebar"]')).toHaveScreenshot('sidebar-collapsed.png')
  })

  test('charts should match snapshot', async ({ page }) => {
    await page.goto('/analytics')
    await page.waitForLoadState('networkidle')
    
    // Line chart
    const lineChart = page.locator('[data-testid="line-chart"]')
    await expect(lineChart).toHaveScreenshot('line-chart.png')
    
    // Bar chart
    const barChart = page.locator('[data-testid="bar-chart"]')
    await expect(barChart).toHaveScreenshot('bar-chart.png')
    
    // Pie chart
    const pieChart = page.locator('[data-testid="pie-chart"]')
    await expect(pieChart).toHaveScreenshot('pie-chart.png')
  })

  test('animations should match snapshot', async ({ page }) => {
    await page.goto('/dashboard')
    await page.waitForLoadState('networkidle')
    
    // Wait for animations to complete
    await page.waitForTimeout(2000)
    
    await expect(page).toHaveScreenshot('dashboard-animated.png')
  })

  test('accessibility overlays should match snapshot', async ({ page }) => {
    await page.goto('/dashboard')
    await page.waitForLoadState('networkidle')
    
    // Enable accessibility overlays
    await page.addInitScript(() => {
      document.body.classList.add('accessibility-overlay')
    })
    
    await expect(page).toHaveScreenshot('dashboard-accessibility.png')
  })
})
