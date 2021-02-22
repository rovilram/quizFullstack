//------------------------------------------------------------------
//numQuestions = getNumQuestions()
//Mira si en la URL viene dado un valor de preguntas 
//sino da un valor predefinido
const getNumQuestions = () => {
    let numQuestions;
    //vemos si en el URL nos dicen cuantas preguntas usar:
    if (!isNaN(window.location.search.split("=")[1])) {
        numQuestions = parseInt(window.location.search.split("=")[1]);
    }
    else numQuestions = 5; //predeterminado 5

    if (numQuestions < 1) {
        numQuestions = 1;
    }
    else if (numQuestions > questions.length) {
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
getQuestions = (questions, num) => {
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
//HTMLnode=createNode = (tipo, message, className, container)
//creamos un nuevo nodo del tipo tipo, con el texto message en su interior
//y de la clase className
//Si container existe añadimos el nuevo nodo en container y devolvemos true;
//si container no existe devolvemos el nodo
const createNode = (tipo, message, className, container) => {
    const HTMLnode = document.createElement(tipo);
    HTMLnode.innerText = (message) ?? message;
    HTMLnode.className = (className) ?? className;
    if (container) {
        container.appendChild();
        return true;
    } else {
        return HTMLnode;
    }
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
    }

    for (let i = 0; i < answers.length; i++) { //creamos el html de cada pregunta
        //vemos en que subWrapper hay que ponerlo:
        let subWrapper = Math.floor(i / 2);

        const answerWrapper = document.createElement("div");
        answerWrapper.className = "answerWrapper btn"

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



function generateHTML(question, $parent) {
    //va a recibir las preguntas y un elemento del DOM donde luego añadir los nodos creados.

    let questionHTML;
    let answersHTML;

    console.log("HTML GENERATOR", $parent);
    //primero borramos el formulario anterior si existe
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
        //TODO: HAY QUE PASAR DE ALGUNA FORMA questions y questionsIndex como parametro
        if ($selectedInput.value == questions[questionIndex].validAnswer) {
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
/*  ANTIGUA FUNCIÓN
    const printQuestion = (question, $div) => {
    generateHTML(question, $div);
    validAnswer = question.validAnswer;
} */
/* ANTES ESTO SE HACÍA EN LA LLAMADA DE LA FUNCIÓN, Y AHORA HAY QUE HACERLO DENTRO
    printQuestion(quizQuestions[0], $formParent);
    changeScreen($screenParent, questionIndex, numQuestions);
*/
const printQuestion = (quizQuestions, questionIndex, $formParent, $screenParent) => {
    console.log("PRINT QUESTION",$formParent);
    generateHTML(quizQuestions[questionIndex], $formParent);
    changeScreen($screenParent, questionIndex, numQuestions);
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

    divNewGame.className = "finishedBtn newGame btn";
    createNode("span", "Jugar nueva partida", "finishedBtnText newGame", divNewGame);
    divGoIndex.className = "finishedBtn goIndex btn"
    createNode("span", "Volver al inicio", "finishedBtnText goIndex", divGoIndex);


    div.appendChild(divNewGame);
    div.appendChild(divGoIndex);



    $formParent.appendChild(div);
    $screenParent.appendChild(screen);
}

const changeScreen = ($div, questionIndex, numQuestions, message) => { //TODO: PONER MENSAJE CADA VEZ QUE FALLAS O ACIERTAS
    const screen = document.createElement("div");;
    if ($div.querySelector(".footScreen")) $div.querySelector(".footScreen").remove();

    screen.className = "footScreen";
    screen.innerText = `Pregunta ${questionIndex + 1} de ${numQuestions}`;
    $div.insertAdjacentElement("afterbegin", screen);
}




