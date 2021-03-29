const Questions = require("../models/questionsModel");


exports.getQuestions = async (req, res) => {
    const num = (req.params.num > 0 || req.params.num < questions.length) ?
        parseInt(req.params.num) : questions.length;

    const quizQuestions = await Questions.aggregate().match({}).sample(num);

    res.json(quizQuestions)
}


