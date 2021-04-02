const mongoose = require("../database/mongoose");


const questionsSchema = new mongoose.Schema({
    questionID: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    answers: [{
        type: String,
        required: true
    }],
    validAnswer: Number
});

const Questions = mongoose.model('Questions', questionsSchema);


module.exports = Questions;


