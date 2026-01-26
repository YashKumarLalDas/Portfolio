import { test, expect } from '@playwright/test';

test('homepage', async ({ page }) => {
  await page.goto('/');
  
  // Check main heading
  await expect(page.getByRole('heading', { name: /yash kumar lal das/i })).toBeVisible();
  
  // Check navigation links
  const navLinks = ['About', 'Experience', 'Projects', 'Skills', 'Contact'];
  for (const link of navLinks) {
    await expect(page.getByRole('link', { name: link })).toBeVisible();
  }
  
  // Check resume download link
  const resumeLink = page.getByRole('link', { name: /download resume/i });
  await expect(resumeLink).toBeVisible();
  
  // Check projects section
  await page.getByRole('link', { name: 'Projects' }).click();
  await expect(page.getByRole('heading', { name: 'Projects' })).toBeVisible();
  
  // Check contact links
  await page.getByRole('link', { name: 'Contact' }).click();
  await expect(page.getByRole('link', { name: /linkedin/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /github/i })).toBeVisible();
});