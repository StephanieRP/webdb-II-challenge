const express = require('express');
const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet());

const zooRouter = require("./zoo-router.js")

server.use('/api/zoo', zooRouter);

module.exports = server;