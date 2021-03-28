"use Strict";

const express = require("express");
const cors = require('cors')
require("dotenv").config();

//TODO: cambiar a base de datos
const { questions } = require("./questions/questions.js");

const getQuestions  = require("./functions/functions.js");

server = express();


const HTTP = {
    port: process.env.HTTP_API_PORT || 8081,
    host: process.env.HTTP_API_HOST || "127.0.0.1"
}

//permitimos CORS sin limitaciones
server.use(cors());

//test endpoint
server.get('/', (req, res) => {
    res.send("Hello World! I'm a API server")
})


//Questions endpoint (devuelve "num" preguntas o todas si no se pasa ese parámetro por body.params)
//test endpoint
server.get('/questions/:num?', (req, res) => {
    const num = (req.params.num > 0 || req.params.num < questions.length) ? req.params.num : questions.length;
    const quizQuestions = getQuestions(questions, num);

    console.log(quizQuestions);

    res.json(quizQuestions)
})


server.listen(HTTP.port, HTTP.host, () => {
    console.log(`API server running at http://${HTTP.host}:${HTTP.port}`)
})





