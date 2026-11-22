import { chromium } from '/private/tmp/claude-501/-Users-noe-Dev-Web/2507de66-3b5f-4d4b-b0d4-cab428c99f73/scratchpad/refs/node_modules/playwright/index.mjs';
import { execSync } from 'child_process';
const exe = execSync('ls -d ~/Library/Caches/ms-playwright/chromium_headless_shell-1217/chrome-headless-shell-mac-arm64/chrome-headless-shell').toString().trim();
const b = await chromium.launch({ headless: true, executablePath: exe });
const D = '/private/tmp/claude-501/-Users-noe-Dev-Web/2507de66-3b5f-4d4b-b0d4-cab428c99f73/scratchpad/cards/';
for (const id of process.argv.slice(2)) {
  const p = await b.newPage({ viewport: { width: 700, height: 600 }, deviceScaleFactor: 2 });
  await p.goto('file://' + D + id + '.html'); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(800);
  await p.locator('#full').screenshot({ path: D + id + '-full.png' });
  await p.locator('#strip').screenshot({ path: D + id + '-strip.png' });
}
await b.close();
