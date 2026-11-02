// Minimal static server with gzip + long-cache for hashed assets (mirrors a typical static host).
import http from "node:http"; import fs from "node:fs"; import path from "node:path"; import zlib from "node:zlib";
const root = path.resolve(process.argv[2]); const port = +process.argv[3] || 4175;
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".avif": "image/avif", ".webp": "image/webp", ".jpg": "image/jpeg", ".woff2": "font/woff2", ".txt": "text/plain", ".xml": "application/xml", ".json": "application/json" };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  let f = path.join(root, p);
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, "index.html");
  if (!fs.existsSync(f)) { res.writeHead(404, { "Content-Type": "text/html" }); return fs.createReadStream(path.join(root, "404.html")).pipe(res); }
  const ext = path.extname(f); const h = { "Content-Type": types[ext] || "application/octet-stream" };
  if (p.startsWith("/_next/static/")) h["Cache-Control"] = "public, max-age=31536000, immutable";
  const compressible = /\.(html|js|css|svg|txt|xml|json)$/.test(ext);
  if (compressible && /gzip/.test(req.headers["accept-encoding"] || "")) { h["Content-Encoding"] = "gzip"; res.writeHead(200, h); fs.createReadStream(f).pipe(zlib.createGzip({ level: 9 })).pipe(res); }
  else { res.writeHead(200, h); fs.createReadStream(f).pipe(res); }
}).listen(port, "127.0.0.1", () => console.log("ready " + port));
