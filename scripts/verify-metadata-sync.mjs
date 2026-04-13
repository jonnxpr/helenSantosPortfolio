import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const args = process.argv.slice(2);

const getArgValue = (flagName, fallbackValue) => {
  const flagIndex = args.indexOf(flagName);
  if (flagIndex === -1) {
    return fallbackValue;
  }

  const nextValue = args[flagIndex + 1];
  if (!nextValue || nextValue.startsWith('--')) {
    return fallbackValue;
  }

  return nextValue;
};

const rootDir = path.resolve(__dirname, '..', getArgValue('--root', '.'));
const validationLabel = getArgValue('--label', 'Metadata sync');

const siteShellPath = path.join(rootDir, 'data', 'site-shell.json');
const indexPath = path.join(rootDir, 'index.html');

const siteShellData = JSON.parse(readFileSync(siteShellPath, 'utf8'));
const indexHtml = readFileSync(indexPath, 'utf8');

const getTagAttributeById = (tagName, id, attributeName) => {
  const pattern = new RegExp(`<${tagName}[^>]*\\sid=["']${id}["'][^>]*\\s${attributeName}=["']([^"']+)["'][^>]*>`, 'i');
  const match = indexHtml.match(pattern);
  return match?.[1] ?? null;
};

const getScriptContentById = (id) => {
  const pattern = new RegExp(`<script[^>]*\\sid=["']${id}["'][^>]*>([\\s\\S]*?)<\\/script>`, 'i');
  const match = indexHtml.match(pattern);
  return match?.[1]?.trim() ?? null;
};

const normalizeUrl = (value) => (typeof value === 'string' ? value.trim() : '');

const profile = siteShellData?.profile ?? {};
const schemaContent = getScriptContentById('person-schema');

if (!schemaContent) {
  console.error(`${validationLabel} check failed: missing #person-schema script in index.html`);
  process.exit(1);
}

let schemaJson;
try {
  schemaJson = JSON.parse(schemaContent);
} catch (error) {
  console.error(`${validationLabel} check failed: invalid JSON in #person-schema`);
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

const expectations = [
  {
    label: 'canonical link',
    actual: getTagAttributeById('link', 'canonical-link', 'href'),
    expected: profile.siteUrl,
  },
  {
    label: 'og:url',
    actual: getTagAttributeById('meta', 'meta-og-url', 'content'),
    expected: profile.siteUrl,
  },
  {
    label: 'og:image',
    actual: getTagAttributeById('meta', 'meta-og-image', 'content'),
    expected: profile.ogImage,
  },
  {
    label: 'twitter:image',
    actual: getTagAttributeById('meta', 'meta-twitter-image', 'content'),
    expected: profile.ogImage,
  },
  {
    label: 'schema url',
    actual: schemaJson?.url,
    expected: profile.siteUrl,
  },
  {
    label: 'schema image',
    actual: schemaJson?.image,
    expected: profile.image,
  },
];

const mismatches = expectations.filter(({ actual, expected }) => normalizeUrl(actual) !== normalizeUrl(expected));

if (mismatches.length > 0) {
  console.error(`${validationLabel} check failed. The following values are out of sync:`);
  mismatches.forEach(({ label, actual, expected }) => {
    console.error(`- ${label}: expected "${expected}", got "${actual}"`);
  });
  process.exit(1);
}

console.log(`${validationLabel} check passed for ${rootDir}.`);
