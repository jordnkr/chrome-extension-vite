/* eslint-disable no-undef */
var http = require("http");

const server = http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(
    '<div style="background:green;padding:15px;"><input type="text" /></div>'
  );
  res.end();
});

server.listen(8080);

process.on("SIGTERM", function () {
  console.log("Received SIGTERM, shutting down server...");
  server.close(function () {
    console.log("Server shut down.");
    process.exit(0);
  });
});
