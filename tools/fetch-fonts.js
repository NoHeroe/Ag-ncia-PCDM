// Baixa as fontes (woff2, subset latim) do Google Fonts e gera assets/css/fonts.css local.
const fs = require('fs');
const path = require('path');
const ROOT = 'C:/Dev/Projetos/Cantos da Mata';
const FONTS_DIR = path.join(ROOT, 'assets', 'fonts');
const CSS_OUT = path.join(ROOT, 'assets', 'css', 'fonts.css');
const URL = 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600;700&display=swap';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

(async () => {
  fs.mkdirSync(FONTS_DIR, { recursive: true });
  const css = await (await fetch(URL, { headers: { 'User-Agent': UA } })).text();
  const blocks = css.match(/@font-face\s*\{[^}]+\}/g) || [];
  let out = '/* AUTO-GERADO por tools fetch-fonts.js — fontes locais (subset latim), offline-ok */\n';
  let n = 0, seen = {};
  for (const b of blocks) {
    const range = (b.match(/unicode-range:\s*([^;]+)/) || [])[1] || '';
    if (!range.includes('U+0000-00FF')) continue; // só o subset latim (cobre PT-BR)
    const fam = (b.match(/font-family:\s*'([^']+)'/) || [])[1];
    const style = (b.match(/font-style:\s*([^;]+)/) || [])[1].trim();
    const weight = (b.match(/font-weight:\s*([^;]+)/) || [])[1].trim();
    const url = (b.match(/url\((https:[^)]+\.woff2)\)/) || [])[1];
    if (!fam || !url) continue;
    const slug = `${fam.toLowerCase().replace(/\s+/g, '-')}-${style}-${weight.replace(/\s+/g, '_')}`;
    if (seen[slug]) continue; seen[slug] = 1;
    const file = `${slug}.woff2`;
    const buf = Buffer.from(await (await fetch(url, { headers: { 'User-Agent': UA } })).arrayBuffer());
    fs.writeFileSync(path.join(FONTS_DIR, file), buf);
    out += `@font-face{font-family:'${fam}';font-style:${style};font-weight:${weight};font-display:swap;src:url('../fonts/${file}') format('woff2');unicode-range:${range};}\n`;
    n++;
    console.log('OK', file, (buf.length / 1024).toFixed(0) + 'KB');
  }
  fs.writeFileSync(CSS_OUT, out, 'utf8');
  console.log(`\n${n} fontes -> ${FONTS_DIR}\nCSS -> ${CSS_OUT}`);
})().catch(e => { console.error('FALHOU:', e.message); process.exit(1); });
