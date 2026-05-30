import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const DIST = path.resolve("dist");
const PORT = 4001;

const MIME = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
};

http
  .createServer((req, res) => {
    let filePath = path.join(DIST, req.url === "/" ? "index.html" : req.url);
    if (!fs.existsSync(filePath)) {
      filePath = path.join(DIST, "index.html");
    }

    const ext = path.extname(filePath);
    const contentType = MIME[ext] || "application/octet-stream";

    // Hashed assets get immutable caching, everything else gets no-cache
    if (req.url.startsWith("/assets/")) {
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    } else {
      res.setHeader("Cache-Control", "no-cache");
    }

    res.setHeader("Content-Type", contentType);
    fs.createReadStream(filePath).pipe(res);
  })
  .listen(PORT, () => {
    console.log(`Serving dist/ at http://localhost:${PORT}`);
    console.log(
      `Assets get: Cache-Control: public, max-age=31536000, immutable`,
    );
  });
