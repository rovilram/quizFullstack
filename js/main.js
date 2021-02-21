const randomizeAnswer = (question) => { //para mezclar las respuestas
  let array = question.answers;
  let validAnswer = question.validAnswer;
  for (let i = 0; i < array.length - 1; i++) {
    if (Math.random() > 0.5) {
      [array[i], array[i + 1]] = [array[i + 1], array[i]];
      question.answers = array;
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
//TODO: ver donde podemos usar esta función para limpiar código
const createNode = (element, message, className, container) => {

  const tempNode = document.createElement(element);
  tempNode.innerText = message;
  tempNode.className = className;
  if (container) {
    container.appendChild(tempNode);
  }
  else return tempNode; //Lo devolvemos por si queremos usarlo en la llamada a la función
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

  const subDivArray = [];
  //para empaquetar las preguntas de dos en dos
  for (let j = 0; j < answers.length / 2; j++) {

    subDivArray[j] = createNode("div", "", "answersSubWraper");
    console.log(subDivArray[j]);
  }

  for (let i = 0; i < answers.length; i++) { //creamos el html de cada pregunta
    //vemos en que subWrapper hay que ponerlo:
    let subWrapper = Math.floor(i / 2);

    const answerWrapper = document.createElement("div");
    answerWrapper.className = "answerWrapper"

    const answerHTMLinput = document.createElement("input");
    answerHTMLinput.type = "radio";
    answerHTMLinput.name = `quID_${question.questionID}`;
    answerHTMLinput.id = `answer_${i}`;
    answerHTMLinput.value = i;
    answerHTMLinput.className = "answerInput"

    //creamos las label
    const answerHTMLlabel = document.createElement("label");
    answerHTMLlabel.htmlFor = `answer_${i}`;
    answerHTMLlabel.className = "answerLabel";
    const answerHTMLlabelText = document.createTextNode(answers[i]);
    answerHTMLlabel.appendChild(answerHTMLlabelText);

    answerWrapper.appendChild(answerHTMLinput);
    answerWrapper.appendChild(answerHTMLlabel);


    subDivArray[subWrapper].appendChild(answerWrapper);

    for (let j = 0; j < subDivArray.length; j++) {
      answersHTML.appendChild(subDivArray[j]);
    }

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

const changeScreen = ($div, questionIndex, numQuestions, message) => { //TODO: PONER MENSAJE CADA VEZ QUE FALLAS O ACIERTAS
  const screen = document.createElement("div");;
  if ($div.querySelector(".footScreen")) $div.querySelector(".footScreen").remove();

  screen.className = "footScreen";
  screen.innerText = `Pregunta ${questionIndex + 1} de ${numQuestions}`;
  $div.insertAdjacentElement("afterbegin", screen);
}





const questions = [
  {
    "questionID": 0,
    "title": "¿Quién es el mejor amigo de Bob Esponja?",
    "answers": [
      "Patricio",
      "Calamardo",
      "El señor cangrejo",
      "Pepa Pig"
    ],
    "validAnswer": 0
  },
  { 
    "questionID": 1,
    "title": "Si yo tengo 5 manzanas, y me regalan 10 manzanas. ¿Cuántas manzanas tengo?",
    "answers": [
      "15 peras",
      "15 manzanas",
      "7 manzanas",
      "14 manzanas"
    ],
    "validAnswer": 1
  },
  {
    "questionID": 2,
    "title": "Charmandler, ¿qué tipo de pokemon es?",
    "answers": [
      "No es un pokemon",
      "Agua",
      "Fuego",
      "Hielo"
    ],
    "validAnswer": 2
  },
  {
    "questionID": 3,
    "title": "14-7",
    "answers": [
      "Siete",
      "Doce",
      "Cuatro",
      "Naranja"
    ],
    "validAnswer": 0
  },
  {
    "questionID": 4,
    "title": "¿De que color es el caballo blanco de Santiago?",
    "answers": [
      "Era un burro",
      "Verde",
      "Blanco",
      "Gris"
    ],
    "validAnswer": 2
  },
  {
    "questionID": 5,
    "title": "¿Cuál es el animal que come con las patas?",
    "answers": [
      "El humano",
      "El pato",
      "La nariz",
      "El gato"
    ],
    "validAnswer": 1
  },
  {
    "questionID": 6,
    "title": "¿Qué tipo de instrumento es el violín?",
    "answers": [
      "Percusión",
      "Viento",
      "Cuerda",
      "Mariposa"
    ],
    "validAnswer": 2
  },
  {
    "questionID": 7,
    "title": "¿Cuál de estos Pokemon es de tipo dragon?",
    "answers": [
      "Charizard",
      "Pikachu",
      "La patrulla canina",
      "Dragonite"
    ],
    "validAnswer": 3
  },
  {
    "questionID": 8,
    "title": "Sigue la serie: Blanco, rojo, amarillo, blanco, ...",
    "answers": [
      "Blanco",
      "Rojo",
      "Amarillo",
      "Azul"
    ],
    "validAnswer": 1
  },
  {
    "questionID": 9,
    "title": "Si tengo diez coches y me quitan dos, ¿Cuántos coches me quedan?",
    "answers": [
      "No tengo carnet de conducir",
      "Ocho",
      "10",
      "Cinco"
    ],
    "validAnswer": 1
  }
];

let numQuestions;
let quizQuestions = [];//para guardar las preguntas elegidas para el quiz
let selectedInput; //value del input seleccionado
let validAnswer; //respuesta válida recogida del objeto
let questionIndex = 0; //contador para recorrer las preguntas del quiz
let results = []; //guardará los objetos con el resultado de cada pregunta
let result = {}; //guardará el resultado de una pregunta
const $formParent = document.getElementById("questionWrapper");
const $screenParent = document.getElementById("footerWrapper");

//vemos si en el URL nos dicen cuantas preguntas usar:
if (!isNaN(window.location.search.split("=")[1])) {
  numQuestions=window.location.search.split("=")[1];
}
else numQuestions=5;

if (numQuestions<1) numQuestions=1;
if (numQuestions>questions.length) numQuestions=10;



//guardamos las numQuestions que vamos a necesitar en el quiz
quizQuestions = getQuestions(questions, numQuestions);

//generamos la primera pregunta
printQuestion(quizQuestions[0], $formParent);
changeScreen($screenParent, questionIndex, numQuestions);



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
      if (results.length === numQuestions) {
        setTimeout(() => {
          printResults(results, $screenParent, $formParent);
        }, 1000);
      }
      else {
        setTimeout(() => {
          //TODO unificar estas dos funciones
          printQuestion(quizQuestions[questionIndex], $formParent);
          changeScreen($screenParent, questionIndex, numQuestions);
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

document.addEventListener("keydown", (e) => { //se puede responder con el teclado
  if (e.code === "Digit1" || e.code === "Numpad1") document.querySelector('label[for="answer_0"]').click();
  if (e.code === "Digit2" || e.code === "Numpad2") document.querySelector('label[for="answer_1"]').click();
  if (e.code === "Digit3" || e.code === "Numpad3") document.querySelector('label[for="answer_2"]').click();
  if (e.code === "Digit4" || e.code === "Numpad4") document.querySelector('label[for="answer_3"]').click();

})

