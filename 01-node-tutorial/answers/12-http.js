const http = require('http')
const server = http.createServer((req, res) => {
  //req - incoming request; res - response
  if(req.url === '/'){
    res.end('Welcome to home page')
  }
  else if (req.url === '/about') {
    res.end("Welcome to about page");
  } else {
  res.end ( `<h1>Oopps</h1>
    <p>Page not found</p>
    <a href='/'>home page</a>`
  )}
})

server.listen(3000)