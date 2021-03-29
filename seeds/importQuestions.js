"use strict";

const { importQuestion } = require("../controllers/questionController");
const { questions } = require("./questions/questions");
questions.map(question => {
    if (importQuestion(question)) console.log("QUESTION ADDED", question)
});
