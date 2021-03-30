const express = require("express");
const router = express.Router();
const {getQuestion, postQuestion, putQuestion, delQuestion, getAllQuestions} = require("../controllers/questionController");



//TODO: Add auth with JWT token

router.route("/")
    .post(postQuestion)
    .get(getAllQuestions)


router.route("/:id")
    .get(getQuestion)
    .put(putQuestion)
    .delete(delQuestion)


    

module.exports = router;
