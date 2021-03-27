"use Strict";

const express = require ("express");
require("dotenv").config();

server = express();

const HTTP = {
    port: process.env.HTTP_PORT || 80,
    host: process.env.HTTP_HOST || "127.0.0.1"
}

//servidor de ficheros estáticos 
server.use('/', express.static('./staticFrontEnd'));


server.listen(HTTP.port, HTTP.host, () => {
  console.log(`Static File server running at http://${HTTP.host}:${HTTP.port}`)
})





