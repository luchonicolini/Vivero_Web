import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'http://localhost:3000';
const OUT_DIR = path.resolve('docs/portfolio-screenshots');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function capture() {
  console.log('Launching Chrome...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();

  // Helper function
  async function takeShot(url, filename, { viewport, fullPage = false, actions = null }) {
    console.log(`Capturing ${filename} from ${url}...`);
    await page.setViewport(viewport);
    await page.goto(`${BASE_URL}${url}`, { waitUntil: 'networkidle0', timeout: 30000 });
    
    // Wait for fonts and images to settle
    await new Promise(r => setTimeout(r, 1500));

    if (actions) {
      await actions(page);
      await new Promise(r => setTimeout(r, 800));
    }

    const filepath = path.join(OUT_DIR, filename);
    await page.screenshot({ path: filepath, fullPage });
    console.log(`Saved: ${filename} (${(fs.statSync(filepath).size / 1024).toFixed(1)} KB)`);
  }

  const DESKTOP = { width: 1440, height: 900, deviceScaleFactor: 2 };
  const MOBILE = { width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true };

  // 1. Desktop - Home Hero (Viewport)
  await takeShot('/', '01-desktop-home-hero.png', {
    viewport: DESKTOP,
    fullPage: false
  });

  // 2. Desktop - Home Full Page
  await takeShot('/', '02-desktop-home-full.png', {
    viewport: DESKTOP,
    fullPage: true
  });

  // 3. Desktop - Catálogo
  await takeShot('/catalogo', '03-desktop-catalogo.png', {
    viewport: DESKTOP,
    fullPage: false
  });

  // 4. Desktop - Ficha Producto (Monstera)
  await takeShot('/catalogo/monstera', '04-desktop-producto-monstera.png', {
    viewport: DESKTOP,
    fullPage: false
  });

  // 5. Desktop - Con Mi Consulta abierta (Interactive drawer)
  await takeShot('/catalogo/monstera', '05-desktop-mi-consulta-drawer.png', {
    viewport: DESKTOP,
    fullPage: false,
    actions: async (p) => {
      // Add product to consulta
      const addBtn = await p.$('button::-p-text(+ Agregar a mi consulta)');
      if (addBtn) await addBtn.click();
      await new Promise(r => setTimeout(r, 500));

      // Open drawer
      const drawerBtn = await p.$('button::-p-text(Mi consulta)');
      if (drawerBtn) await drawerBtn.click();
      else {
        const anyDrawerBtn = await p.$('header button');
        if (anyDrawerBtn) await anyDrawerBtn.click();
      }
    }
  });

  // 6. Desktop - Mayoristas
  await takeShot('/mayoristas', '06-desktop-mayoristas.png', {
    viewport: DESKTOP,
    fullPage: false
  });

  // 7. Desktop - Contacto
  await takeShot('/contacto', '07-desktop-contacto.png', {
    viewport: DESKTOP,
    fullPage: false
  });

  // 8. Mobile - Home Hero
  await takeShot('/', '08-mobile-home.png', {
    viewport: MOBILE,
    fullPage: false
  });

  // 9. Mobile - Catálogo
  await takeShot('/catalogo', '09-mobile-catalogo.png', {
    viewport: MOBILE,
    fullPage: false
  });

  // 10. Mobile - Ficha Producto
  await takeShot('/catalogo/monstera', '10-mobile-producto.png', {
    viewport: MOBILE,
    fullPage: false
  });

  await browser.close();
  console.log('All portfolio screenshots generated successfully!');
}

capture().catch(err => {
  console.error('Error taking screenshots:', err);
  process.exit(1);
});
