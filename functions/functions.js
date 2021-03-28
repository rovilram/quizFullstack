
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


//TODO: sacar las funciones que no se vayan a usar en front, sino en back para cambiarlas de sitio
module.exports = getQuestions;