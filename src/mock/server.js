// server.js
const jsonServer = require('json-server');
const db = require('./index.js')();

const server = jsonServer.create();
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
    // console.log(req);
    if (req.method === 'POST') {
        req.method = 'GET';
        req.query = req.body;
    }
  // Continue to JSON Server router
  next();
});

server.use(router);
server.listen(3004, () => {
  console.log('mock server port: 3004 is running');
});
