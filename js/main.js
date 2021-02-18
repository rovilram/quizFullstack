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

function formGenerator(question) {

    //creamos la estructura del formulario de cada pregunta
    const questionHTML = document.createElement("form");
    questionHTML.className = "quizForm";
    questionHTML.name = question.questionID;
    //creamos el título de cada pregunta
    const titleHTML = document.createElement("p");
    titleHTML.className = "title";
    const titleHTMLText = document.createTextNode(question.title);
    //añadimos el texto al title
    titleHTML.appendChild(titleHTMLText);
    //añadimos el title al formulario
    questionHTML.appendChild(titleHTML);


    const submitBtnHTML = document.createElement("input");
    submitBtnHTML.type = "submit";
    submitBtnHTML.className = "questionBtn";
    submitBtnHTML.value = "Corregir Pregunta";
    questionHTML.appendChild(submitBtnHTML);

    return questionHTML;

}

function answersGenerator(question) {
    //creamos el html de las preguntas
    const answersHTML = document.createElement("div");
    const answers = question.answers;
    answersHTML.id = "answerWrapper";

    for (let j = 0; j < answers.length; j++) {
        //creamos el html de cada pregunta

        const answerHTMLinput = document.createElement("input");
        answerHTMLinput.type = "radio";
        answerHTMLinput.required = "true";
        answerHTMLinput.name = question.questionID;
        answerHTMLinput.id = `answer_${j}`;
        answerHTMLinput.value = j;
        answerHTMLinput.class = "answerInput"
        answersHTML.appendChild(answerHTMLinput);

        //creamos las label
        const answerHTMLlabel = document.createElement("label");
        answerHTMLlabel.for = `answer_${j}`;
        answerHTMLlabel.className = "answerLabel";
        //TODO: AJUSTAR LOS NOMBRES DE LAS LABEL Y LAS ID DE LOS INPUT
        const answerHTMLlabelText = document.createTextNode(answers[j]);
        answerHTMLlabel.appendChild(answerHTMLlabelText);
        answersHTML.appendChild(answerHTMLlabel);

    }
    return answersHTML;
}



function htmlGenerator(question, $parent) {
    //va a recibir las preguntas y un elemento del DOM donde luego añadir los nodos creados.

    let questionHTML;
    let answersHTML;

    questionHTML = formGenerator(question);

    answersHTML = answersGenerator(question);

    const questionBtn = questionHTML.querySelector(".questionBtn");

    //pegamos los nodos de las respuestas antes del botón que ya estaba generado
    questionHTML.insertBefore(answersHTML, questionBtn);


    $parent.appendChild(questionHTML);

}

function validateAnswer(id) {
    const input = document.querySelector(`input[name=${id}]:checked`);
    const form = document.querySelector(`form[id=${id}]`);
    if (input.value === form.dataset.validAnswer) console.log("TOMA YA");
    input.style.backgroundColor = "#449922";
}


const questions = [
    {
        questionID: 0,
        title: "title 1",
        answers: ["answer1_1", "answer1_2", "answer1_3", "answer1_4"],
        validAnswer: 1
    },
    {
        questionID: 1,
        title: "title 2",
        answers: ["answer2_1", "answer2_2", "answer2_3", "answer2_4"],
        validAnswer: 1
    },
    {
        questionID: 2,
        title: "title 3",
        answers: ["answer3_1", "answer3_2", "answer3_3", "answer3_4"],
        validAnswer: 1
    },
    {
        questionID: 3,
        title: "title 4",
        answers: ["answer4_1", "answer4_2", "answer4_3", "answer4_4"],
        validAnswer: 1
    },
    {
        questionID: 4,
        title: "title 5",
        answers: ["answer5_1", "answer5_2", "answer5_3", "answer5_4"],
        validAnswer: 1
    },
    {
        questionID: 5,
        title: "title 6",
        answers: ["answer6_1", "answer6_2", "answer6_3", "answer6_4"],
        validAnswer: 1
    },
    {
        questionID: 6,
        title: "title 7",
        answers: ["answer7_1", "answer7_2", "answer7_3", "answer7_4"],
        validAnswer: 1
    },
    {
        questionID: 7,
        title: "title 8",
        answers: ["answer8_1", "answer8_2", "answer8_3", "answer8_4"],
        validAnswer: 1
    },
    {
        questionID: 8,
        title: "title 9",
        answers: ["answer9_1", "answer9_2", "answer9_3", "answer9_4"],
        validAnswer: 1
    },
    {
        questionID: 9,
        title: "title 10",
        answers: ["answer10_1", "answer10_2", "answer10_3", "answer10_4"],
        validAnswer: 1
    }
];
const NUM_QUESTIONS = 5;
let quizQuestions = [];
const $divParent = document.getElementById("questionWrapper");
quizQuestions = getQuestions(questions, NUM_QUESTIONS);

for (let i = 0; i < quizQuestions.length; i++) {
    console.log(i, quizQuestions)
    htmlGenerator(quizQuestions[i], $divParent);
}





//Eventos
document.addEventListener("click", function (event) {
    //TODO: Continuar añadiendo los eventos de los botones y probarlos
    if (event.target.className === "questionBtn") {
        event.preventDefault();

    }
})
