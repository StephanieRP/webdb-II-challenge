const express = require('express');
const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet());

const zooRouter = require("./zoo-router.js")

server.use('/api/zoo', zooRouter);

server.get('/', (req, res) => {
  res.send(`
    <h2>Finding the zoo animals..!</h2>
    `);
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});

module.exports = server;