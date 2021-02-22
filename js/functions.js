//TODO: HACER ALGUNA ANIMACIón de movimiento con los botones cuando aciertas o fallas


//------------------------------------------------------------------
//numQuestions = getNumQuestions(maxNum)
//Mira si en la URL viene dado un valor de preguntas 
//sino da un valor predefinido.
//el máximo puede ser maxNum (longitud del array questions)
//el mínimo puede ser 1
const getNumQuestions = (maxNum) => {
    let numQuestions;
    //vemos si en el URL nos dicen cuantas preguntas usar:
    if (!isNaN(window.location.search.split("=")[1])) {
        numQuestions = parseInt(window.location.search.split("=")[1]);
    }
    else numQuestions = 5; //predeterminado 5

    if (numQuestions < 1) {
        numQuestions = 1;
    }
    else if (numQuestions > maxNum) {
        numQuestions = 10;
    }
    return numQuestions;
}
//------------------------------------------------------------------
// question = randomizeAnswer(question);
// devuelve el mismo objeto pero mezclando las respuestas
const randomizeAnswer = (question) => {
    let array = question.answers;
    //para modificar la respuesta válida si cambiamos su orden
    let validAnswer = question.validAnswer;

    //mezclamos sin usar el método Array.sort()
    for (let i = 0; i < array.length - 1; i++) {
        if (Math.random() > 0.5) {
            [array[i], array[i + 1]] = [array[i + 1], array[i]];
            question.answers = array;
            //modificamos la posición de la respuesta válida
            if (validAnswer === i + 1) {
                validAnswer = i;
            }
            else if (validAnswer === i) {
                validAnswer = i + 1;
            }
            question.validAnswer = validAnswer;
        }
    }

    return question;
}

//------------------------------------------------------------------
//returnQuestions = getQuestions(questions, num)
//devuelve tantas preguntas como pasemos en el parámetro "num"
//de entre el array de preguntas que le pasemos.
const getQuestions = (questions, num) => {
    const returnQuestions = [];
    let randomQuestion;//índice generado aleatoriamente

    for (let i = 0; i < num; i++) {
        do {
            randomQuestion = Math.floor(Math.random() * questions.length);
        }
        //hacerlo mientras no encuentre una pregunta que no esté ya añadida
        while (returnQuestions.includes(questions[randomQuestion]));
        //guarda la pregunta aleatoria y mezcla sus respuestas
        returnQuestions[i] = randomizeAnswer(questions[randomQuestion]);
    }
    return returnQuestions;
}


//------------------------------------------------------------------
//HTMLnode=createNode(tipo, message, className, container)
//creamos un nuevo nodo del tipo tipo, con el texto message en su interior
//y de la clase className
//Si container existe añadimos el nuevo nodo en container y devolvemos true;
//si container no existe devolvemos el nodo
const createNode = (tipo, message = "", className = "", container = false) => {
    //TODO: Preguntar operador ternario
    //TODO: hacer objeto con parámetros?

    const HTMLnode = document.createElement(tipo);
    if (message) HTMLnode.innerText = message;

    if (className) HTMLnode.className = className;

    if (container) {
        container.appendChild(HTMLnode);
        return true;
    } else {
        return HTMLnode;
    }
}

//------------------------------------------------------------------
// questionHTML=generateForm(question)
// hace el nodo del formulario de una pregunta y lo devuelve
const generateForm = (question) => {

    //HTMLnode=createNode(tipo, message, className, container)

    const questionHTML = createNode("form", "", "quizForm invisible");
    questionHTML.name = `quID_${question.questionID}`;

    //creamos el título de cada pregunta
    const titleHTML = createNode("p", question.title, "title");

    //creamos un wrapper para el título y lo añadimos dentro
    const titleWrapper = createNode("div", "");
    titleWrapper.id = "titleWrapper";
    titleWrapper.appendChild(titleHTML);

    //añadimos el wrapper al formulario
    questionHTML.appendChild(titleWrapper);

    const submitBtnHTML = createNode("input", "", "hidden");
    submitBtnHTML.type = "submit";
    submitBtnHTML.id = "questionBtn";
    submitBtnHTML.value = "Corregir Pregunta";
    questionHTML.appendChild(submitBtnHTML);

    return questionHTML;
}


//------------------------------------------------------------------
//answersHTML = generateAnswers(question)
//creamos un nodo que contiene las label e input de cada pregunta
//y lo devolvemos
function generateAnswers(question) {
    const answers = question.answers;

    const answersHTML = createNode("div");
    answersHTML.id = "answersWrapper";

    const subDivArray = [];
    //para empaquetar las preguntas de dos en dos
    for (let j = 0; j < answers.length / 2; j++) {
        subDivArray[j] = createNode("div", "", "answersSubWraper");
    }

    for (let i = 0; i < answers.length; i++) { //creamos el html de cada pregunta
        //vemos en que subWrapper hay que ponerlo:
        let subWrapper = Math.floor(i / 2);

        const answerWrapper = createNode("div", "", "answerWrapper btn");

        //creamos los input
        const answerHTMLinput = createNode("input", "", "answerInput");
        answerHTMLinput.type = "radio";
        answerHTMLinput.name = `quID_${question.questionID}`;
        answerHTMLinput.id = `answer_${i}`;
        answerHTMLinput.value = i;

        //creamos las label
        const answerHTMLlabel = createNode("label", answers[i], "answerLabel btn");
        answerHTMLlabel.htmlFor = `answer_${i}`;

        //los metemos en el wrapper de respuesta
        answerWrapper.appendChild(answerHTMLinput);
        answerWrapper.appendChild(answerHTMLlabel);

        //lo metemos en el subWrapper de respuesta que corresponde
        subDivArray[subWrapper].appendChild(answerWrapper);

        //unimos los subDivArray en answersHTML
        subDivArray.forEach(subDiv => {
            answersHTML.appendChild(subDiv)
        })
    }
    //devolvemos el nodo con todas las respuestas.
    return answersHTML;
}


//------------------------------------------------------------------
//va a generar el nodo HTML con el form de cada pregunta y lo va a añadir al documento.
//va a recibir las preguntas y un elemento del DOM donde luego añadir los nodos creados.
const generateHTML = (question, $parent) => {

    //llamamos a las funciones que hacen los nodos del formulario y de las respuestas
    const questionHTML = generateForm(question);
    const answersHTML = generateAnswers(question);

    //borramos el formulario anterior si existe
    if ($parent.querySelector(".quizForm")) {
        $parent.querySelector(".quizForm").remove();
    }

    //pegamos los nodos de las respuestas antes del botón que ya estaba generado en el nodo del formulario
    questionHTML
        .insertBefore(answersHTML, questionHTML.querySelector(".questionBtn"));

    //pegamos el nuevo nodo en el documento html
    $parent.appendChild(questionHTML);

}



//------------------------------------------------------------------
//return result = validateAnswer ($selectedInput, $selectedLabel, validAnswer)
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


//------------------------------------------------------------------
//printQuestion(quizQuestions, questionIndex, numQuestion, $formParent, $screenParent)
//va a generar el HTML del formulario y cambiar el texto en el div.footer
const printQuestion = (quizQuestions, questionIndex, $formParent, $screenParent) => {
    generateHTML(quizQuestions[questionIndex], $formParent);
    changeScreen($screenParent, questionIndex, quizQuestions.length);

    //para animación cuando se pinta la pregunta
    window.setTimeout(function () {
        document.querySelector(".quizForm").classList.remove("invisible");
    }, 100);


}

//------------------------------------------------------------------
//va a generar el nodo html de los resultados
//printResults = (results, $screenParent, $formParent)
const printResults = (results, $screenParent, $formParent) => {
    let points = 0;
    const totalPoints = results.length;
    const screen = createNode("div");
    const divResultsScreen = createNode("div", "", "quizForm resultScreen invisible");
    const divFinished = createNode("div", "", "finished");
    const divNewGame = createNode("div", "", "finishedBtn newGame btn");
    const divGoIndex = createNode("div", "", "finishedBtn goIndex btn");

    //vemos la puntuación obtenida
    results.forEach(result => {
        if (result.isRight) points++;
    });

    //eliminamos del DOM los formularios y footScreen anteriores
    if ($formParent.querySelector(".quizForm")) $formParent.querySelector(".quizForm").remove();
    if ($screenParent.querySelector(".footScreen")) $screenParent.querySelector(".footScreen").remove();

    //creamos los nodos del HTML
    createNode("h2", "Partida finalizada", "finishedHeader", divFinished);
    createNode("span", "has acertado", "finishedText", divFinished);
    createNode("div", points.toString(), "finishedNumber", divFinished);
    createNode("span", "de", "finishedText", divFinished);
    createNode("div", totalPoints, "finishedNumber", divFinished);
    createNode("span", "preguntas", "finishedText", divFinished);

    divResultsScreen.appendChild(divFinished);

    createNode("span", "Jugar nueva partida", "finishedBtnText newGame", divNewGame);
    createNode("span", "Volver al inicio", "finishedBtnText goIndex", divGoIndex);

    divResultsScreen.appendChild(divNewGame);
    divResultsScreen.appendChild(divGoIndex);

    $formParent.appendChild(divResultsScreen);
    $screenParent.appendChild(screen);

    //para animación cuando se pinta la pantalla de resultados
    window.setTimeout(function () {
        document.querySelector(".quizForm").classList.remove("invisible");
    })


}
//------------------------------------------------------------------
//changeScreen = ($div, questionIndex, numQuestions, message)
//cambia el screen del footer con datos sobre la evolución del juego
//TODO: PONER MENSAJE CADA VEZ QUE FALLAS O ACIERTAS. Para eso está el parámetro sin uso message
const changeScreen = ($div, questionIndex, numQuestions, message) => {
    const screen = createNode("div",
        `Pregunta ${questionIndex + 1} de ${numQuestions}`, "footScreen");
    //borrar el footscreen que había antes
    if ($div.querySelector(".footScreen")) {
        $div.querySelector(".footScreen").remove();
    }

    //añade el nuevo nodo como primer hijo del footer
    $div.insertAdjacentElement("afterbegin", screen);
}

