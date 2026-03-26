import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const outputDir = path.join(rootDir, '.pages-artifact');

const deployEntries = [
  'index.html',
  'favicon.ico',
  'favicon-32x32.png',
  'apple-touch-icon.png',
  'manifest.webmanifest',
  'assets',
  'css',
  'data',
  'js',
];

rmSync(outputDir, { recursive: true, force: true });
mkdirSync(outputDir, { recursive: true });

deployEntries.forEach((entry) => {
  const sourcePath = path.join(rootDir, entry);
  const targetPath = path.join(outputDir, entry);

  if (!existsSync(sourcePath)) {
    throw new Error(`Missing deploy entry: ${entry}`);
  }

  cpSync(sourcePath, targetPath, { recursive: true });
});

console.log(`Pages artifact prepared at ${outputDir}.`);
