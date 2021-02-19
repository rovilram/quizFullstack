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
    questionHTML.name = `quID_${question.questionID}`;
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
    submitBtnHTML.id = "questionBtn";
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
        answerHTMLinput.name = `quID_${question.questionID}`;
        answerHTMLinput.id = `answer_${j}`;
        answerHTMLinput.value = j;
        answerHTMLinput.class = "answerInput"
        answersHTML.appendChild(answerHTMLinput);

        //creamos las label
        const answerHTMLlabel = document.createElement("label");
        answerHTMLlabel.htmlFor = `answer_${j}`;
        answerHTMLlabel.className = "answerLabel";
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
const validateAnswer = ($selectedInput, $label, validAnswer) => {
    
    if ($selectedInput === null) {
        console.log("hay que seleccionar un elemento");
        return false; //no se puede continuar
    }
    else {
        const $labelSelected = document.querySelector(`label[for=answer_${$selectedInput.value}]`);
        if ($selectedInput.value == validAnswer) {
            $selectedInput.style.backgroundColor = "green";
            $labelSelected.style.backgroundColor = "green";
        }
        else {
            $selectedInput.style.backgroundColor = "red";
            $labelSelected.style.backgroundColor = "red";
        }
        return true;
    }


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
const $divParent = document.getElementById("questionWrapper");
let quizQuestions = [];//para guardar las preguntas elegidas para el quiz
let selectedInput; //value del input seleccionado
let validAnswer; //respuesta válida recogida del objeto

//guardamos las NUM_QUESTIONS que vamos a necesitar en el quiz
quizQuestions = getQuestions(questions, NUM_QUESTIONS);



//Mostramos la primera de las preguntas
htmlGenerator(quizQuestions[0], $divParent);
//guardamos cual es la respuesta válida
validAnswer = quizQuestions[0].validAnswer;


//Eventos
//No hago delegación de eventos de momento
// document.addEventListener("click", function (event) {
//     //TODO: Continuar añadiendo los eventos de los botones y probarlos
//     if (event.target.className === "questionBtn") {
//         event.preventDefault();
//         console.log(event);
//         console.log(quizQuestions[0].questionID, quizQuestions[0].validAnswer);
//         event.validAnswer

//     }
// })
//evento click del botón.

document.getElementById("questionBtn").addEventListener(
    "click", (e) => {
        e.preventDefault();
        const $selectedInput = document.querySelector("input[type=radio]:checked");
        const $label = document.querySelector(`label`);
        if (validateAnswer($selectedInput, $label, validAnswer)) console.log("Podemos continuar");
    }

);
