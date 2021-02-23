//main function: le pasamos por parámetro el document
const main = (d) => {
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
    },
    {
      "questionID": 10,
      "title": "¿Cuál es el segundo instrumento favorito de Beethoven?",
      "answers": [
        "Gong",
        "Triángulo",
        "Clarinete",
        "Guitarra",
        "Clavicordio",
        "Saxofón"
      ],
      "validAnswer": 2
    },
    {
      "questionID": 11,
      "title": "¿Qué tipo de instrumento es el piano?",
      "answers": [
        "Viento",
        "Percusión",
        "Cuerda",
        "Fuego",
        "Tierra"
      ],
      "validAnswer": 2
    },
    {
      "questionID": 12,
      "title": "¿En qye ciudad nació Beethoven?",
      "answers": [
        "Illescas",
        "Madrid",
        "Nueva York",
        "Bonn",
        "París",
        "Viena"
      ],
      "validAnswer": 3
    },
    {
      "questionID": 13,
      "title": "¿Cuál era el instrumento favorito de Bethoven?",
      "answers": [
        "Corneta",
        "Violín",
        "Piano",
        "Clarinete",
        "Arpa",
        "Pandereta"
      ],
      "validAnswer": 2
    }
  ];
  let numQuestions = getNumQuestions(); //número de preguntas del quiz
  let quizQuestions = [];//para guardar las preguntas elegidas para el quiz
  let questionIndex = 0; //contador para recorrer las preguntas del quiz
  let results = []; //guardará los objetos con el resultado de cada pregunta
  let result = {}; //guardará el resultado de una pregunta
  const $formParent = d.getElementById("questionWrapper");
  const $screenParent = d.getElementById("footerWrapper");
  let clickFlag = false; //Flag para evitar hacer dos veces seguidas click en evento


  //guardamos las numQuestions que vamos a necesitar en el quiz
  quizQuestions = getQuestions(questions, numQuestions);

  //generamos la primera pregunta
  printQuestion(quizQuestions, questionIndex, $formParent, $screenParent)


  //GESTIÓN DE LOS EVENTOS
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
        results[questionIndex] = result;
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
    if (e.code === "Digit1" || e.code === "Numpad1") {
      d.querySelector('label[for="answer_0"]').click();
    }
    else if (e.code === "Digit2" || e.code === "Numpad2") {
      d.querySelector('label[for="answer_1"]').click();
    }
    else if (e.code === "Digit3" || e.code === "Numpad3") {
      d.querySelector('label[for="answer_2"]').click();
    }
    else if (e.code === "Digit4" || e.code === "Numpad4") {
      d.querySelector('label[for="answer_3"]').click();
    }
    else if (e.code === "Escape") {
      window.location.assign("index.html");
    }
  })

}


window.onload = main(document);
