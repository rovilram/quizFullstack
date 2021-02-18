



function getQuestions(questions, num) {
    //devuelve tantas preguntas como pasemos en el parámetro "num"
    //de entre el array de preguntas que le pasemos.
    //TODO: Hacer que sean aleatorias las retornadas
    //TODO: Hacer que el orden de las respuestas de cada pregunta también sea aleatorio

    const returnQuestions = [];
    for (let i = 0; i < 5; i++) {
        returnQuestions[returnQuestions.length] = questions[i];
    }

    return returnQuestions;


}

function htmlGenerator(questions, $parent) {
    //va a recibir las preguntas y un elemento del DOM donde luego añadir los nodos creados.

    for (let i = 0; i < questions.length; i++) {
        let questionHTML;
        let titleHTML;
        let titleHTMLText;
        let question = questions[i];
        let answersHTML;



        //creamos la estructura del formulario de cada pregunta
        questionHTML = document.createElement("form");
        questionHTML.className = "quizForm";
        questionHTML.id = `question_${i}`;
        questionHTML.name = `question_${i}`;
        //creamos el título de cada pregunta
        titleHTML = document.createElement("p");
        titleHTML.id = `title_${i}`;
        titleHTML.className = "title";
        titleHTMLText = document.createTextNode(question.title);
        //añadimos el texto al title
        titleHTML.appendChild(titleHTMLText);
        //añadimos el title al formulario
        questionHTML.appendChild(titleHTML);

        //creamos el html de las preguntas
        answersHTML = document.createDocumentFragment();

        for (let j = 0; j < question.answers.length; j++) {
            console.log("DENTRO");
            let answerHTML;
            //creamos el html de cada pregunta

            //TODO:CONTINUAR POR AQUI. METER LOS LABEL Y MIRAR COMO HACER EL CSS PARA QUE PAREZCA UN BOTON Y DONDE GUARDA EL TEXTO
            answerHTML = document.createElement("input");
            answerHTML.type = "radio";
            answerHTML.name = `question_${i}`;
            answerHTML.id = `answer_${i}-${j}`;
            answerHTML.value = j;
            answersHTML.appendChild(answerHTML);
        }
        questionHTML.appendChild(answersHTML);


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