import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function parseCliOptions(argv) {
  const options = {};

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === '--host' && index + 1 < argv.length) {
      options.host = argv[index + 1];
      index += 1;
      continue;
    }

    if (argument === '--port' && index + 1 < argv.length) {
      options.port = Number.parseInt(argv[index + 1], 10);
      index += 1;
    }
  }

  return options;
}

function isPathInsideRoot(candidatePath) {
  const relativePath = path.relative(rootDir, candidatePath);
  return relativePath === '' || (!relativePath.startsWith('..') && !path.isAbsolute(relativePath));
}

const cliOptions = parseCliOptions(process.argv.slice(2));
const port = cliOptions.port ?? Number.parseInt(process.env.PORT ?? '8000', 10);
const host = cliOptions.host ?? process.env.HOST ?? 'localhost';

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.webp': 'image/webp'
};

function resolvePath(urlPath) {
  const decodedPath = decodeURIComponent(urlPath.split('?')[0]);
  const requestedPath = decodedPath === '/' ? '/index.html' : decodedPath;
  const candidatePath = path.resolve(rootDir, `.${requestedPath}`);

  if (!isPathInsideRoot(candidatePath)) {
    return { statusCode: 403 };
  }

  try {
    const stats = statSync(candidatePath);
    if (stats.isDirectory()) {
      return { filePath: path.join(candidatePath, 'index.html') };
    }
    return { filePath: candidatePath };
  } catch {
    if (path.extname(candidatePath) !== '') {
      return { statusCode: 404 };
    }

    return { filePath: path.resolve(rootDir, 'index.html') };
  }
}

const server = createServer(async (req, res) => {
  try {
    const resolved = resolvePath(req.url ?? '/');
    if ('statusCode' in resolved) {
      const body = resolved.statusCode === 403 ? 'Forbidden' : 'Not found';
      res.writeHead(resolved.statusCode, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(body);
      return;
    }

    const { filePath } = resolved;
    if (!filePath) {
      res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Forbidden');
      return;
    }

    const body = await readFile(filePath);
    const extension = path.extname(filePath).toLowerCase();
    const contentType = contentTypes[extension] ?? 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(body);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
  }
});

server.listen(port, host, () => {
  console.log(`Static server running at http://${host}:${port}/`);
});
