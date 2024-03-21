const { test, expect } = require('@playwright/test');

test.describe('Select', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
  });
  

  test('Test that the about button works', async ({ page }) => {
   await page.click('text=About')
   await expect(page).toHaveURL('http://localhost:3000/about')
   await expect(page.locator('h2')).toContainText("Information about Quiz 'N' Sum:")
  });

  test('Should select an option from the generation select dropdown', async ({ page }) => {
    await page.selectOption('#ques-gen-selector', 'bool');
    const selectedValue = await page.$eval('#ques-gen-selector', (element ) => element.value);
    expect(selectedValue).toContain('bool')
  });

  test('Should select an option from the export select dropdown', async ({ page }) => {
    await page.fill('#textinput', 'This is a test to input data.');
    await page.selectOption('#ques-gen-selector', 'bool');
    await page.click('text=Generate Questions');
    await page.selectOption('#export-selector', 'text');
    const selectedValue = await page.$eval('#export-selector', (element ) => element.value);
   expect(selectedValue).toContain('text')
  });

  test('Should reset the textbox', async ({ page }) => {
    await page.fill('#textinput',' This is a test to input data.');
    await page.click('text=Reset Text');
    expect(page.locator('textarea'), { hasText : ""});
  });

  test('Should export the questions as text file', async ({ page }) => {
    await page.fill('#textinput',' This is a test to input data.');
    await page.selectOption('#ques-gen-selector', 'bool');
    await page.click('text=Generate Questions');
    await page.selectOption('#export-selector', 'text');
    const [ download ] = await Promise.all([
      page.waitForEvent('download'),
      page.locator('#export-button').click()
    ])
    const path = await download.path()
    expect(download)
  });

  test('Should generate boolean questions', async ({ page }) => {
    await page.fill('#textinput',' This is a test to input data.');
    await page.selectOption('#ques-gen-selector', 'bool');
    await page.click('text=Generate Questions');
    expect(page.locator('#li'))
  });

  test('Should generate FAQ questions', async ({ page }) => {
    await page.fill('#textinput',' This is a test to input data.');
    await page.selectOption('#ques-gen-selector', 'faq');
    await page.click('text=Generate Questions');
    expect(page.locator('#li'))
  });

  test('Should generate multiple choice questions', async ({ page }) => {
    await page.fill('#textinput',' This is a test to input data.');
    await page.selectOption('#ques-gen-selector', 'mcq');
    await page.click('text=Generate Questions');
    expect(page.locator('#li'))
  });

}); 