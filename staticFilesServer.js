"use Strict";

const express = require("express");
require("dotenv").config();
const { authUser } = require("./controllers/userController");
server = express();

const HTTP = {
  port: process.env.HTTP_STATIC_PORT || 80,
  host: process.env.HTTP_STATIC_HOST || "127.0.0.1"
}

//TODO: El servidor de front no tiene que conectarse a DB directamente
//ver porque aparece en el terminal
server.use(express.urlencoded({ extended: false }))
server.use(express.json())


//TODO: hacer que no aparezca la extensión de los html en la barra del navegador

console.log(__dirname)
const sendFileOptions = {
  root: `${__dirname}/staticFrontEnd/`,
}

server.get("/", (req, res) => {
  res.sendFile("index.html", sendFileOptions);
})

server.get("/login", (req, res) => {
  console.log("AI")
  res.sendFile("login.html", sendFileOptions);
}) 

server.get("/admin/questions", (req, res) => {
  console.log("AI")
  res.sendFile("admin/questions.html", sendFileOptions);
})

server.get("/admin/question", (req, res) => {
  console.log("AI")
  res.sendFile("admin/question.html", sendFileOptions);
})


//servidor de ficheros estáticos 
server.use('/', express.static('./staticFrontEnd'));

server.listen(HTTP.port, HTTP.host, () => {
  console.log(`Static File server running at http://${HTTP.host}:${HTTP.port}`)
})





