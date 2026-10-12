import { build } from 'esbuild';
import { mkdir, writeFile, copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('./', import.meta.url));
await mkdir(root + 'public', { recursive: true });
await build({ entryPoints: [root + 'preview.jsx'], bundle: true, minify: true, target: ['es2020'],
  outfile: root + 'public/chat.js', define: { 'process.env.NODE_ENV': '"production"', 'process.env.REACT_APP_CHAT_API_URL': '""' } });
await copyFile(root + '../public/Art4Hearts-Logo-NoBackground.png', root + 'public/logo.png');
await copyFile(root + '../src/assets/fonts/Kollektif.ttf', root + 'public/Kollektif.ttf');
await writeFile(root + 'public/index.html', `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Art4Hearts assistant</title><meta name="description" content="Ask the Art4Hearts assistant about volunteering, donations, and chapters.">
<link rel="icon" href="/logo.png"><link rel="stylesheet" href="/chat.css">
<style>@font-face{font-family:Kollektif;src:url('/Kollektif.ttf')}*{box-sizing:border-box}body{margin:0;font-family:Kollektif,system-ui,sans-serif;background:linear-gradient(135deg,#f8faf7,#e2efed);color:#283e3d;min-height:100vh}.welcome{max-width:650px;padding:clamp(60px,12vh,120px) 28px;margin:auto;text-align:center}.welcome img{object-fit:contain}.welcome h1{font-size:clamp(30px,6vw,46px);line-height:1.15;margin:25px 0 20px}.welcome p{font-size:18px;line-height:1.6}.welcome .hint{font-size:14px;color:#526d6a}.welcome a{display:inline-block;margin-top:18px;color:#285f5b;text-underline-offset:4px}</style></head>
<body><div id="root"></div><script src="/chat.js" defer></script></body></html>`);
console.log('Built the standalone chat preview.');
