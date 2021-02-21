const randomizeAnswer = (question) => { //para mezclar las respuestas
  let array = question.answers;
  let validAnswer = question.validAnswer;
  for (let i = 0; i < array.length - 1; i++) {
    if (Math.random() > 0.5) {
      [array[i], array[i + 1]] = [array[i + 1], array[i]];
      question.answers=array;
      if (validAnswer === i + 1) {
        validAnswer = i;
        question.validAnswer = validAnswer;
      }
      else if (validAnswer === i) {
        validAnswer = i + 1;
        question.validAnswer = validAnswer;
      }
    }
  }
  return question;
}


function getQuestions(questions, num) {
  //devuelve tantas preguntas como pasemos en el parámetro "num"
  //de entre el array de preguntas que le pasemos.
  //TODO: Hacer que sean aleatorias las retornadas
  //TODO: Hacer que el orden de las respuestas de cada pregunta también sea aleatorio

  const returnQuestions = [];
  //para hacer aleatorios las preguntas
  const questionNumber = questions.length;
  let randomQuestion;
  for (let i = 0; i < num; i++) {
    do {
      randomQuestion = Math.floor(Math.random() * questionNumber);
    }
    while (returnQuestions.includes(questions[randomQuestion]));
    questions[randomQuestion] = randomizeAnswer(questions[randomQuestion]);
    //TODO: Asegurarse de que está cogiendo bien la respuesta correcta tras desordenar
    returnQuestions[i] = questions[randomQuestion];

  }

  console.log("Preguntas aleatorias para el Test", returnQuestions)
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
  //creamos un wrapper para el título y lo añadimos dentro
  const titleWrapper = document.createElement("div");
  titleWrapper.id = "titleWrapper";
  titleWrapper.appendChild(titleHTML);

  //añadimos el wrapper al formulario
  questionHTML.appendChild(titleWrapper);


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
    answerHTMLinput.className = "answerInput"

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

  if ($parent.querySelector(".quizForm")) $parent.querySelector(".quizForm").remove();

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
      $selectedLabel.parentNode.style.backgroundColor = "green";
      result.isRight = true;

    }
    else {
      $selectedLabel.parentNode.style.backgroundColor = "red";
      result.isRight = false;
    }
    return result;
  }


}
//TODO: limpiar esta función
const printQuestion = (question, $div) => {
  htmlGenerator(question, $div);
  validAnswer = question.validAnswer;
}
//TODO: ver donde podemos usar esta función para limpiar código
const createNode = (element, message, className, container) => {

  const tempNode = document.createElement(element);
  tempNode.innerText = message;
  tempNode.className = className;
  container.appendChild(tempNode);
  return tempNode; //Lo devolvemos por si queremos usarlo en la llamada a la función
}


const printResults = (results, $screenParent, $formParent) => {
  let points = 0;
  const totalPoints = results.length;
  const screen = document.createElement("div");;
  const div = document.createElement("div");
  const divFinished = document.createElement("div");
  const divNewGame = document.createElement("div");
  const divGoIndex = document.createElement("div");



  results.forEach(result => {
    console.log(result);
    if (result.isRight) points++;
  });

  if ($formParent.querySelector(".quizForm")) $formParent.querySelector(".quizForm").remove();
  if ($screenParent.querySelector(".footScreen")) $screenParent.querySelector(".footScreen").remove();

  div.className = "quizForm resultScreen";
  divFinished.className = "finished"

  createNode("h2", "Partida finalizada", "finishedHeader", divFinished);
  createNode("span", "has acertado", "finishedText", divFinished);
  createNode("div", points, "finishedNumber", divFinished);
  createNode("span", "de", "finishedText", divFinished);
  createNode("div", totalPoints, "finishedNumber", divFinished);
  createNode("span", "preguntas", "finishedText", divFinished);

  div.appendChild(divFinished);

  divNewGame.className = "finishedBtn newGame";
  createNode("span", "Jugar nueva partida", "finishedBtnText newGame", divNewGame);
  divGoIndex.className = "finishedBtn goIndex"
  createNode("span", "Volver al inicio", "finishedBtnText goIndex", divGoIndex);


  div.appendChild(divNewGame);
  div.appendChild(divGoIndex);



  $formParent.appendChild(div);
  $screenParent.appendChild(screen);

  console.log(`Has conseguido ${points} puntos de ${totalPoints}`);
}

const changeScreen = ($div, questionIndex, NUM_QUESTIONS, message) => { //TODO: PONER MENSAJE CADA VEZ QUE FALLAS O ACIERTAS
  const screen = document.createElement("div");;
  if ($div.querySelector(".footScreen")) $div.querySelector(".footScreen").remove();

  screen.className = "footScreen";
  screen.innerText = `Pregunta ${questionIndex + 1} de ${NUM_QUESTIONS}`;
  $div.insertAdjacentElement("afterbegin", screen);
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
let quizQuestions = [];//para guardar las preguntas elegidas para el quiz
let selectedInput; //value del input seleccionado
let validAnswer; //respuesta válida recogida del objeto
let questionIndex = 0; //contador para recorrer las preguntas del quiz
let results = []; //guardará los objetos con el resultado de cada pregunta
let result = {}; //guardará el resultado de una pregunta
const $formParent = document.getElementById("questionWrapper");
const $screenParent = document.getElementById("footerWrapper");

//guardamos las NUM_QUESTIONS que vamos a necesitar en el quiz
quizQuestions = getQuestions(questions, NUM_QUESTIONS);

//generamos la primera pregunta
printQuestion(quizQuestions[0], $formParent);
changeScreen($screenParent, questionIndex, NUM_QUESTIONS);



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
        printResults(results, $screenParent, $formParent);
      }
      else {
        setTimeout(() => {
          //TODO unificar estas dos funciones
          printQuestion(quizQuestions[questionIndex], $formParent);
          changeScreen($screenParent, questionIndex, NUM_QUESTIONS);
        }, 1000); //TODO: Volver a poner un tiempo mayor de espera
      }
    }
  }
  else if (e.target.classList.contains("answerWrapper")) {
    e.target.lastChild.click(); //hacemos lo mismo que si se hace click en el label
    console.log("click")
  }
  else if (e.target.classList.contains("goIndex")) {
    window.location.assign("index.html");
  }
  else if (e.target.classList.contains("newGame")) {
    window.location.assign("quiz.html");
  }
})

