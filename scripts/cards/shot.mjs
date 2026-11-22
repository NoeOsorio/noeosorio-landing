import {chromium} from '/private/tmp/claude-501/-Users-noe-Dev-Web/2507de66-3b5f-4d4b-b0d4-cab428c99f73/scratchpad/refs/node_modules/playwright/index.mjs';
import os from 'os';
const b=await chromium.launch({headless:true,executablePath:os.homedir()+'/Library/Caches/ms-playwright/chromium_headless_shell-1217/chrome-headless-shell-mac-arm64/chrome-headless-shell'});
const p=await b.newPage({deviceScaleFactor:2,viewport:{width:700,height:600}});
await p.goto('file://'+process.cwd()+'/pyventa.html');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(800);
await p.locator('#full').screenshot({path:'pyventa-full.png'});
await p.locator('#stripwrap').screenshot({path:'pyventa-strip.png'});
await b.close();
