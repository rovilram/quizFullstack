"use strict;"

//main function: le pasamos por parámetro el document
const main = async (d) => {


  const numQuestions =
    (!isNaN(window.location.search.split("=")[1])) ?
      parseInt(window.location.search.split("=")[1]) : 5

  let questionIndex = 0; //contador para recorrer las preguntas del quiz
  let results = []; //guardará los objetos con el resultado de cada pregunta
  let result = {}; //guardará el resultado de una pregunta
  const $formParent = d.getElementById("questionWrapper");
  const $screenParent = d.getElementById("footerWrapper");
  let clickFlag = false; //Flag para evitar hacer dos veces seguidas click en evento


  //para guardar las preguntas elegidas para el quiz
  //tengo doble await para esperar primero al fetch y luego a que se haga el json
  //si lo hago con .then tengo que meter todo el código dentro (incluido los eventos)
  //por lo que queda menos legible.
  const quizQuestions = await (await fetch(`http://localhost:3000/questions/${numQuestions}`)).json()

  printQuestion(quizQuestions, questionIndex, $formParent, $screenParent)


  //GESTIÓN DE LOS EVENTOS 
  //TODO: meterla en la función printQuestion
  d.addEventListener("click", e => {

    //dejo este evento porque no se si es necesario en un futuro para pasar datos a backend
    if (e.target.id === "questionBtn") {
      e.preventDefault();
    }
    else if (e.target.classList.contains("answerLabel")) {
      if (clickFlag) return false; //para que no se pueda hacer varios clicks seguidos en respuestas
      clickFlag = true;
      d.getElementById("questionBtn").click(); //simulo el haber pinchado sobre el botón
      const $selectedInput =
        d.querySelector(`#${e.target.htmlFor}`);
      const $selectedLabel =
        d.querySelector(`label[for=answer_${$selectedInput.value}]`);
      result = validateAnswer(
        $selectedInput,
        $selectedLabel,
        quizQuestions[questionIndex].validAnswer
      );

      if (result) {
        result.quID = quizQuestions[questionIndex].questionID;
        results.push(result);
        questionIndex++;
        if (results.length === numQuestions) {
          setTimeout(() => {
            printResults(results, $screenParent, $formParent);
            clickFlag = false;
          }, 1000);
        }
        else {
          setTimeout(() => {
            printQuestion(quizQuestions, questionIndex, $formParent, $screenParent);
            clickFlag = false;
          }, 1000);
        }
      }
    }
    //si hacemos click en el answerWrapper simulamos el click en el label
    else if (e.target.classList.contains("answerWrapper")) {
      e.target.lastChild.click();
    }
    else if (e.target.classList.contains("goIndex")) {
      window.location.assign("index.html");
    }
    else if (e.target.classList.contains("newGame")) {
      window.location.assign("quiz.html");
    }
  })
  //eventos de teclado 
  d.addEventListener("keyup", (e) => {
    if (e.code === "Escape") {
      window.location.assign("index.html");
    }
    //generamos los eventos de teclado dinámicamente sobre el número de etiquetas de preguntas que tenemos
    d.querySelectorAll('.answerLabel').forEach((label, index) => {
      if ((e.code === `Digit${index + 1}`) || (e.code === `Numpad${index + 1}`)) {
        d.querySelector(`label[for="answer_${index}"]`).click();
      }//TODO: Preguntar si hay alguna forma de "optimizar" esto
    })
  })

}


window.onload = main(document);
