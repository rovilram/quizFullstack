function getQuestions(questions, num) {
    //devuelve tantas preguntas como pasemos en el parámetro "num"
    //de entre el array de preguntas que le pasemos.
    //TODO: Hacer que sean aleatorias las retornadas
    //TODO: Hacer que el orden de las respuestas de cada pregunta también sea aleatorio

    const returnQuestions = [];
    for (let i = 0; i < num; i++) {
        returnQuestions[returnQuestions.length] = questions[i];
    }

    return returnQuestions;
}

function formGenerator(question, index) {

    //creamos la estructura del formulario de cada pregunta
    const questionHTML = document.createElement("form");
    questionHTML.className = "quizForm";
    questionHTML.id = `question_${index}`;
    questionHTML.name = `question_${index}`;
    questionHTML.dataset.validAnswer = question.validAnswer;
    //creamos el título de cada pregunta
    const titleHTML = document.createElement("p");
    titleHTML.id = `title_${index}`;
    titleHTML.className = "title";
    const titleHTMLText = document.createTextNode(question.title);
    //añadimos el texto al title
    titleHTML.appendChild(titleHTMLText);
    //añadimos el title al formulario
    questionHTML.appendChild(titleHTML);


    const submitBtnHTML = document.createElement("input");
    submitBtnHTML.type = "submit";
    submitBtnHTML.id = `question_${index}Btn`;
    submitBtnHTML.className = "questionBtn";
    submitBtnHTML.value = "Corregir Pregunta";
    questionHTML.appendChild(submitBtnHTML);

    return questionHTML;

}

function answersGenerator(answers, index) {
    //creamos el html de las preguntas
    const answersHTML = document.createElement("div");
    answersHTML.id = "answerWrapper";

    for (let j = 0; j < answers.length; j++) {
        //creamos el html de cada pregunta

        const answerHTMLinput = document.createElement("input");
        answerHTMLinput.type = "radio";
        answerHTMLinput.name = `question_${index}`;
        answerHTMLinput.id = `answer_${index}-${j}`;
        answerHTMLinput.value = j;
        answerHTMLinput.class = "answerInput"
        answersHTML.appendChild(answerHTMLinput);

        //creamos las label
        const answerHTMLlabel = document.createElement("label");
        answerHTMLlabel.for = `answer_${index}-${j}`;
        answerHTMLlabel.class = "answerLabel";
        const answerHTMLlabelText = document.createTextNode(answers[j]);
        answerHTMLlabel.appendChild(answerHTMLlabelText);
        answersHTML.appendChild(answerHTMLlabel);

    }
    return answersHTML;
}



function htmlGenerator(questions, $parent) {
    //va a recibir las preguntas y un elemento del DOM donde luego añadir los nodos creados.

    for (let i = 0; i < questions.length; i++) {
        let questionHTML;
        let question = questions[i];
        let answersHTML;

        questionHTML = formGenerator(question, i);

        answersHTML = answersGenerator(question.answers, i);

        const questionBtn = questionHTML.querySelector(".questionBtn");
        console.log(questionBtn);

        //pegamos los nodos de las respuestas antes del botón que ya estaba generado
        questionHTML.insertBefore(answersHTML, questionBtn);


        $parent.appendChild(questionHTML);
    };
}

const questions = [
    {
        title: "title 1",
        answers: ["answer1_1", "answer1_2", "answer1_3", "answer1_4"],
        validAnswer: 1
    },
    {
        title: "title 2",
        answers: ["answer2_1", "answer2_2", "answer2_3", "answer2_4"],
        validAnswer: 1
    },
    {
        title: "title 3",
        answers: ["answer3_1", "answer3_2", "answer3_3", "answer3_4"],
        validAnswer: 1
    },
    {
        title: "title 4",
        answers: ["answer4_1", "answer4_2", "answer4_3", "answer4_4"],
        validAnswer: 1
    },
    {
        title: "title 5",
        answers: ["answer5_1", "answer5_2", "answer5_3", "answer5_4"],
        validAnswer: 1
    },
    {
        title: "title 6",
        answers: ["answer6_1", "answer6_2", "answer6_3", "answer6_4"],
        validAnswer: 1
    },
    {
        title: "title 7",
        answers: ["answer7_1", "answer7_2", "answer7_3", "answer7_4"],
        validAnswer: 1
    },
    {
        title: "title 8",
        answers: ["answer8_1", "answer8_2", "answer8_3", "answer8_4"],
        validAnswer: 1
    },
    {
        title: "title 9",
        answers: ["answer9_1", "answer9_2", "answer9_3", "answer9_4"],
        validAnswer: 1
    },
    {
        title: "title 10",
        answers: ["answer10_1", "answer10_2", "answer10_3", "answer10_4"],
        validAnswer: 1
    }
];
const NUM_QUESTIONS = 5;
let quizQuestions = [];
const $divParent = document.getElementById("questionWrapper");
quizQuestions = getQuestions(questions, NUM_QUESTIONS);

htmlGenerator(quizQuestions, $divParent);

//Eventos
document.addEventListener("click", function () {
//TODO: Continuar añadiendo los eventos de los botones y probarlos
})