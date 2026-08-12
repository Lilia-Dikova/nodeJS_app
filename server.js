const http = require("http");
const fs = require("fs");
const path = require("path");

const port = Number(process.env.PORT || 3000);
const host = process.env.HOST;
const publicDir = path.join(__dirname, "public");

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8"
};

function send(res, statusCode, body, contentType = "text/plain; charset=utf-8") {
  res.writeHead(statusCode, {
    "Content-Type": contentType,
    "Cache-Control": "no-store"
  });
  res.end(body);
}

function serveStatic(res, fileName) {
  const filePath = path.join(publicDir, fileName);

  fs.readFile(filePath, (error, data) => {
    if (error) {
      send(res, 404, "Not found");
      return;
    }

    send(res, 200, data, contentTypes[path.extname(filePath)] || "application/octet-stream");
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === "/" || url.pathname === "/index.html") {
    serveStatic(res, "index.html");
    return;
  }

  if (url.pathname === "/styles.css") {
    serveStatic(res, "styles.css");
    return;
  }

  if (url.pathname === "/api/status") {
    send(
      res,
      200,
      JSON.stringify(
        {
          ok: true,
          app: "Node.js preview app",
          message: process.env.PREVIEW_MESSAGE || "Hello from the deployed Node.js app.",
          deployedAt: new Date().toISOString(),
          nodeVersion: process.version
        },
        null,
        2
      ),
      "application/json; charset=utf-8"
    );
    return;
  }

  send(res, 404, "Not found");
});

server.listen(port, host, () => {
  const address = host || "0.0.0.0";
  console.log(`Node.js preview app is running on http://${address}:${port}`);
});
