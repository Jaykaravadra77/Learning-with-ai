const http = require("http");
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("Welcome to my server!");
  } else if (req.url === "/time") {
    res.end(new Date().toISOString());
  } else {
    res.end("Not found!");
  }
});
server.listen(3000, () => console.log("Server is running!"));
