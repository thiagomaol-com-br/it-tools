#!/usr/bin/env node

/**
 * Script de Sincronização do Design System (Brand)
 * 
 * Copia os tokens, logotipos, ícones e fontes do repositório vizinho `../hub/brand`
 * para uma pasta local `src/brand/` no it-tools.
 * 
 * Uso:
 *   node pessoal/sync-brand.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho do it-tools (raiz do projeto)
const projectRoot = path.resolve(__dirname, '..');

// Caminho de origem da marca no repositório `hub`
const brandSourceDir = process.env.BRAND_DIR || path.resolve(projectRoot, '..', 'hub', 'brand');

// Caminho de destino local dentro do it-tools
const brandTargetDir = path.resolve(projectRoot, 'src', 'brand');

console.log('🔄 Iniciando sincronização da marca...');
console.log(`📂 Origem:  ${brandSourceDir}`);
console.log(`📁 Destino: ${brandTargetDir}\n`);

// 1. Validação da pasta de origem
if (!fs.existsSync(brandSourceDir)) {
  console.error(`❌ Erro: O diretório de origem da marca não foi encontrado em:`);
  console.error(`   ${brandSourceDir}`);
  console.error(`   Certifique-se de que o repositório 'hub' está clonado na mesma pasta pai que o 'it-tools'.`);
  process.exit(1);
}

// 2. Garantir que as pastas de destino existam
const targetDirs = [
  brandTargetDir,
  path.join(brandTargetDir, 'logo'),
  path.join(brandTargetDir, 'fonts'),
];

for (const dir of targetDirs) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Helper para copiar arquivo com log
function copyFile(src, dest, label) {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`  ✅ [${label}] ${path.basename(dest)}`);
    return true;
  } else {
    console.warn(`  ⚠️ [Aviso] Arquivo não encontrado: ${src}`);
    return false;
  }
}

// Helper para copiar pasta com filtro de extensão
function copyFolderFiles(srcDir, destDir, allowedExtensions, label) {
  if (!fs.existsSync(srcDir)) {
    console.warn(`  ⚠️ [Aviso] Pasta não encontrada: ${srcDir}`);
    return;
  }

  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (allowedExtensions.length === 0 || allowedExtensions.includes(ext)) {
        const srcFile = path.join(srcDir, entry.name);
        const destFile = path.join(destDir, entry.name);
        copyFile(srcFile, destFile, label);
      }
    }
  }
}

// 3. Sincronizar tokens.json
console.log('📦 1. Sincronizando Tokens de Design:');
const tokensSource = path.join(brandSourceDir, 'tokens.json');
const tokensTarget = path.join(brandTargetDir, 'tokens.json');
copyFile(tokensSource, tokensTarget, 'Tokens');

// 4. Sincronizar Logotipos e Ícones em SVG
console.log('\n🎨 2. Sincronizando Logotipos e Ícones SVG:');
const logoSvgSource = path.join(brandSourceDir, 'logo', 'svg');
const logoSvgTarget = path.join(brandTargetDir, 'logo');
copyFolderFiles(logoSvgSource, logoSvgTarget, ['.svg'], 'Logo/Ícone');

// Também atualizar o favicon no diretório public/ se existir favicon.svg
const faviconSource = path.join(logoSvgSource, 'favicon.svg');
const faviconPublicTarget = path.join(projectRoot, 'public', 'favicon.svg');
if (fs.existsSync(faviconSource)) {
  copyFile(faviconSource, faviconPublicTarget, 'Favicon Public');
}

// 5. Sincronizar Fontes Web (.woff2 e fonts.css)
console.log('\n🔤 3. Sincronizando Tipografia:');
const fontsSource = path.join(brandSourceDir, 'fonts');
const fontsTarget = path.join(brandTargetDir, 'fonts');
copyFolderFiles(fontsSource, fontsTarget, ['.woff2', '.css'], 'Fonte');

console.log('\n🎉 Sincronização concluída com sucesso!');
console.log(`Os arquivos agora estão prontos para uso em 'src/brand/'.\n`);
