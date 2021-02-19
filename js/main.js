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
    submitBtnHTML.classList.add("hidden"); //el botón lo oculto, por si fuera necesario su uso para backend
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
const validateAnswer = ($selectedInput, $selectedLabel, validAnswer) => {
    const result = {};

    if ($selectedInput === null) {
        return false; //no se puede continuar mientras no elijan una respuesta (solo válida para versión con botón)
    }
    else {
        result.choiseAnswer = $selectedInput.value;
        if ($selectedInput.value == validAnswer) {
            $selectedLabel.style.backgroundColor = "green";
            result.isRight = true;
            
        }
        else {
            $selectedLabel.style.backgroundColor = "red";
            result.isRight = false;
        }
        return result;
    }
    
    
}
const printQuestion = (question) => {
    htmlGenerator(question, $divParent);
    validAnswer = question.validAnswer;
}

const printResults = (results) => {
    let points=0;
    const totalPoints=results.length;
    results.forEach(result => {
        console.log(result);
        if(result.isRight) points++;
    });
    console.log(`Has conseguido ${points} puntos de ${totalPoints}`);
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
let questionIndex = 0; //contador para recorrer las preguntas del quiz
let results = []; //guardará los objetos con el resultado de cada pregunta
let result = {}; //guardará el resultado de una pregunta

//guardamos las NUM_QUESTIONS que vamos a necesitar en el quiz
quizQuestions = getQuestions(questions, NUM_QUESTIONS);

//generamos la primera pregunta
printQuestion(quizQuestions[0]);

//Eventos
//Lo hago con delegación de eventos, porque me he dado cuenta de que cada vez que genero un nuevo formulario y elimino el anterior deja de funcionar el trigger.
// Creo que eso pasa porque no vuelve a recargar los elementos HTML y los que hay son nuevos y por lo tanto no les asocia los eventos.

document.addEventListener("click", e => {
    if (e.target.id === "questionBtn") {
        //dejo este evento porque no se si es necesario en un futuro para pasar datos a backend
        e.preventDefault(); //con esto hacemos que no tenga el comportamiento establecido
    }
    else if (e.target.tagName === "LABEL") {
        document.getElementById("questionBtn").click(); //simulo el haber pinchado sobre el botón
        const $label = document.querySelectorAll("label");
        const $selectedInput = document.querySelector(`#${e.target.htmlFor}`);
        const $selectedLabel = document.querySelector(`label[for=answer_${$selectedInput.value}]`);

        result = validateAnswer($selectedInput, $selectedLabel, validAnswer);
        if (result) {
            result.quID = quizQuestions[questionIndex].questionID;
            results.push(result);
            console.log(results);
            questionIndex++;
            if (results.length === NUM_QUESTIONS) {
                printResults(results);
            }
            else {
                setTimeout(() => {
                    document.querySelector(".quizForm").remove();
                    printQuestion(quizQuestions[questionIndex]);
                }, 2000);
            }
        }
    }
})

