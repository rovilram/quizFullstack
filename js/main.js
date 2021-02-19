function getQuestions(questions, num) {
    //devuelve tantas preguntas como pasemos en el parámetro "num"
    //de entre el array de preguntas que le pasemos.
    //TODO: Hacer que sean aleatorias las retornadas
    //TODO: Hacer que el orden de las respuestas de cada pregunta también sea aleatorio

    const returnQuestions = [];
    //para hacer aleatorios las preguntas
    /* const questionNumber = questions.length;
    let=randomQuestion;
    for (let i = 0; i < num; i++) {
        randomQuestion=Math.random()*questionNumber
        returnQuestions[returnQuestions.length] = questions[i];
    } */
    for (let i = 0; i < num; i++) {
        returnQuestions.push(questions[i]);
    }
    console.log(returnQuestions)
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
    answersHTML.id = "answersWrapper";


    for (let j = 0; j < answers.length; j++) {
        //creamos el html de cada pregunta
        const answerWrapper = document.createElement("div");
        answerWrapper.className = "answerWrapper"
        const answerHTMLinput = document.createElement("input");
        answerHTMLinput.type = "radio";
        answerHTMLinput.name = `quID_${question.questionID}`;
        answerHTMLinput.id = `answer_${j}`;
        answerHTMLinput.value = j;
        answerHTMLinput.class = "answerInput"

        //creamos las label
        const answerHTMLlabel = document.createElement("label");
        answerHTMLlabel.htmlFor = `answer_${j}`;
        answerHTMLlabel.className = "answerLabel";
        const answerHTMLlabelText = document.createTextNode(answers[j]);
        answerHTMLlabel.appendChild(answerHTMLlabelText);
        answersHTML.appendChild(answerHTMLlabel);

        answerWrapper.appendChild(answerHTMLinput);
        answerWrapper.appendChild(answerHTMLlabel);

        answersHTML.appendChild(answerWrapper);

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
      "questionID": 0,
      "title": "Officia exercitation reprehenderit ad Lorem velit.",
      "answers": [
        "commodo nostrud anim voluptate deserunt",
        "ea nulla tempor irure ad",
        "dolore exercitation pariatur veniam et",
        "eiusmod veniam sunt cupidatat ex"
      ],
      "validAnswer": 1
    },
    {
      "questionID": 1,
      "title": "Excepteur mollit elit consectetur duis ad dolor nisi nisi amet Lorem sunt ex dolore nisi.",
      "answers": [
        "ipsum dolore irure nulla laborum",
        "mollit dolor ea duis dolor",
        "reprehenderit non cupidatat est qui",
        "irure amet dolore exercitation mollit"
      ],
      "validAnswer": 2
    },
    {
      "questionID": 2,
      "title": "Pariatur mollit Lorem Lorem voluptate.",
      "answers": [
        "non duis irure excepteur nostrud",
        "officia sunt do mollit do",
        "minim aliquip do aute et",
        "excepteur aliquip duis consectetur culpa"
      ],
      "validAnswer": 3
    },
    {
      "questionID": 3,
      "title": "Ea do exercitation minim est deserunt cupidatat minim nulla sunt ut occaecat sit aliqua.",
      "answers": [
        "officia qui laboris officia adipisicing",
        "do proident aliquip ipsum sit",
        "excepteur culpa laborum elit aliqua",
        "do magna laboris excepteur in"
      ],
      "validAnswer": 3
    },
    {
      "questionID": 4,
      "title": "Ex ex adipisicing esse culpa id exercitation elit sunt deserunt cupidatat esse cupidatat ut.",
      "answers": [
        "quis velit ad deserunt adipisicing",
        "cupidatat ea laboris in id",
        "culpa dolore tempor excepteur tempor",
        "veniam pariatur dolor sit irure"
      ],
      "validAnswer": 3
    },
    {
      "questionID": 5,
      "title": "Anim anim ea reprehenderit excepteur occaecat aliqua minim ullamco mollit non deserunt.",
      "answers": [
        "irure aute nostrud id ipsum",
        "dolor est deserunt cupidatat irure",
        "et anim ut fugiat reprehenderit",
        "aliquip officia minim proident id"
      ],
      "validAnswer": 3
    },
    {
      "questionID": 6,
      "title": "Quis nostrud laboris do velit ullamco cillum quis sint do nulla.",
      "answers": [
        "duis pariatur anim non ea",
        "ullamco aute non labore ex",
        "deserunt velit Lorem cupidatat dolor",
        "voluptate eu voluptate commodo ullamco"
      ],
      "validAnswer": 3
    },
    {
      "questionID": 7,
      "title": "Qui do sint laborum exercitation ullamco cupidatat ullamco.",
      "answers": [
        "labore non qui mollit ea",
        "non duis laborum labore non",
        "reprehenderit mollit sint minim magna",
        "irure consectetur consectetur labore proident"
      ],
      "validAnswer": 2
    },
    {
      "questionID": 8,
      "title": "Commodo deserunt laborum consequat eiusmod pariatur tempor ullamco cillum ea.",
      "answers": [
        "est aute quis dolor amet",
        "sint ad veniam fugiat aliquip",
        "tempor do pariatur occaecat culpa",
        "commodo aute incididunt aliqua mollit"
      ],
      "validAnswer": 0
    },
    {
      "questionID": 9,
      "title": "Adipisicing irure fugiat consequat adipisicing laborum Lorem deserunt.",
      "answers": [
        "sit ad eu magna sit",
        "labore Lorem sit deserunt est",
        "eu eiusmod id anim mollit",
        "aliqua ex ex laborum ea"
      ],
      "validAnswer": 1
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

