"use Strict";

const express = require ("express");
require("dotenv").config();
const {authUser} = require("./controllers/userController");
server = express();

const HTTP = {
    port: process.env.HTTP_STATIC_PORT || 80,
    host: process.env.HTTP_STATIC_HOST || "127.0.0.1"
}


server.use(express.urlencoded({extended: false}))
server.use(express.json())


//servidor de ficheros estáticos 
server.use('/', express.static('./staticFrontEnd'));
//TODO: hacer que no aparezca la extensión de los html en la barra del navegador

server.listen(HTTP.port, HTTP.host, () => {
  console.log(`Static File server running at http://${HTTP.host}:${HTTP.port}`)
})





