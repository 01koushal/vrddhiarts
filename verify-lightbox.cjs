const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const results = [];
  const pass = (name, ok, detail = '') => results.push({ name, ok, detail });

  await page.goto('http://127.0.0.1:5176/product/deep-casting-varmala-preservation-frames', { waitUntil: 'networkidle' });
  await page.locator('.gallery-image-button').click();
  await page.locator('.product-lightbox .yarl__slide_image').waitFor({ state: 'visible', timeout: 10000 });

  const img = page.locator('.product-lightbox .yarl__slide_image').first();
  const getState = async () => img.evaluate((node) => {
    const rect = node.getBoundingClientRect();
    const style = getComputedStyle(node);
    return {
      src: node.currentSrc || node.src,
      width: rect.width,
      height: rect.height,
      naturalWidth: node.naturalWidth,
      naturalHeight: node.naturalHeight,
      transform: style.transform,
      objectFit: style.objectFit,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
    };
  });

  const initial = await getState();
  pass('Image opens contained', initial.objectFit === 'contain' && initial.width <= initial.viewportWidth && initial.height <= initial.viewportHeight, JSON.stringify(initial));

  await page.getByLabel('Zoom in').click();
  await page.waitForTimeout(350);
  const afterZoomIn = await getState();
  pass('Zoom In works', afterZoomIn.width > initial.width || afterZoomIn.height > initial.height || afterZoomIn.transform !== initial.transform, JSON.stringify(afterZoomIn));

  await page.getByLabel('Zoom out').click();
  await page.waitForTimeout(350);
  const afterZoomOut = await getState();
  pass('Zoom Out works', afterZoomOut.width < afterZoomIn.width || afterZoomOut.height < afterZoomIn.height || afterZoomOut.transform !== afterZoomIn.transform, JSON.stringify(afterZoomOut));

  const box = await img.boundingBox();
  await page.mouse.wheel(0, -600);
  await page.waitForTimeout(350);
  const afterWheel = await getState();
  pass('Mouse wheel zoom works', afterWheel.width > afterZoomOut.width || afterWheel.height > afterZoomOut.height || afterWheel.transform !== afterZoomOut.transform, JSON.stringify(afterWheel));

  await page.mouse.dblclick(box.x + box.width / 2, box.y + box.height / 2);
  await page.waitForTimeout(350);
  const afterDoubleClick = await getState();
  pass('Double-click zoom works', afterDoubleClick.transform !== afterWheel.transform || afterDoubleClick.width !== afterWheel.width || afterDoubleClick.height !== afterWheel.height, JSON.stringify(afterDoubleClick));

  const beforePan = await getState();
  const panBox = await img.boundingBox();
  await page.mouse.move(panBox.x + panBox.width / 2, panBox.y + panBox.height / 2);
  await page.mouse.down();
  await page.mouse.move(panBox.x + panBox.width / 2 + 120, panBox.y + panBox.height / 2 + 60, { steps: 8 });
  await page.mouse.up();
  await page.waitForTimeout(200);
  const afterPan = await getState();
  pass('Pan while zoomed works', afterPan.transform !== beforePan.transform, JSON.stringify(afterPan));

  const beforeNext = await getState();
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(350);
  const afterNext = await getState();
  pass('Keyboard/Next navigation works', afterNext.src !== beforeNext.src, `${beforeNext.src} -> ${afterNext.src}`);

  await page.keyboard.press('ArrowLeft');
  await page.waitForTimeout(350);
  const afterPrev = await getState();
  pass('Keyboard/Previous navigation works', afterPrev.src === beforeNext.src, `${afterNext.src} -> ${afterPrev.src}`);

  const containedAfterNav = afterPrev.objectFit === 'contain' && afterPrev.width <= afterPrev.viewportWidth && afterPrev.height <= afterPrev.viewportHeight;
  pass('Images are never cropped by viewer fit', containedAfterNav, JSON.stringify(afterPrev));

  await page.keyboard.press('Escape');
  await page.waitForTimeout(250);
  pass('ESC closes modal', await page.locator('.product-lightbox').count() === 0 || !(await page.locator('.product-lightbox').first().isVisible().catch(() => false)));

  for (const result of results) {
    console.log(`${result.ok ? 'PASS' : 'FAIL'} ${result.name}${result.detail ? ` :: ${result.detail}` : ''}`);
  }

  await browser.close();
  if (results.some((result) => !result.ok)) process.exit(1);
})().catch(async (error) => {
  console.error(error);
  process.exit(1);
});
