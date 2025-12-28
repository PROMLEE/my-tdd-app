import { test, expect } from '@playwright/test';

test('메인 페이지 접속 후 카운터 동작 확인', async ({ page }) => {
  // 1. 페이지 접속 (localhost:5173)
  await page.goto('http://localhost:5173');

  // 2. 초기 상태 확인 ("Vite + React" 글자가 보이는가?)
  await expect(page.getByText('Vite + React')).toBeVisible();

  // 3. 버튼 클릭 ("count is 0" 버튼 찾아서 클릭)
  // Vite 초기 템플릿 기준 버튼 텍스트입니다. 우리가 만든 Counter라면 '+' 버튼을 찾으면 됩니다.
  const button = page.getByRole('button', { name: /count is/i });
  await expect(button).toBeVisible();

  await button.click();

  // 4. 결과 검증 (숫자가 1로 바뀌었는가?)
  await expect(button).toHaveText('count is 1');
});