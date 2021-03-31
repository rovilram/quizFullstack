"use strict";

const printError = (err) => {
    //TODO: VER QUE HACER CON LOS ERRORES DE ESTA PAGINA
    //CUIDADO, hay de varios tipos 
    //hay algunos para redirigir a questions y otros a login...
    //los hay que tienen message y status y otros no...
    setInterval(() => {
        window.location.href = "/admin/questions"
    }, 1000);
    const errorWrapper = createNode("div", {
        className: "errorWrapper"
    });
    const errorDiv = createNode("div", {
        className: "errorDiv"
    }, errorWrapper);
    errorDiv.appendChild(document.createTextNode(JSON.stringify(err)))
    return errorWrapper;
}


const printAnswerEditor = (answer, index, validAnswer) => {
    let checked;

    if (index === validAnswer) checked = true
    else checked = false


    const answerWrapper = createNode("div", {
        className: "answerWrapper"
    });

    const answerLabel = createNode("label", {
        for: `answer${index}`
    }, answerWrapper);
    answerLabel.appendChild(document.createTextNode(`Respuesta ${index + 1}:`))


    createNode("input", {
        type: "text",
        className: "answerInput",
        id: `answer${index}`,
        value: answer
    }, answerWrapper);



    createNode("input", {
        type: "radio",
        checked: checked,
        className: "answerRadio",
        name: "validAnswer",
        value: index
    }, answerWrapper);

    const answerDelBtn = createNode("button", {
        type: "button",
        className: "answerDelBtn",
    }, answerWrapper);
    answerDelBtn.appendChild(document.createTextNode("Borrar"))


    //eventos
    answerDelBtn.addEventListener("click", () => {
        answerWrapper.remove();
    })


    return answerWrapper;

}



const printQuestionEditor = (question, token) => {


    if (question === null) {
        question = {};
        question.questionID = "",
            question.title = "",
            question.answers = []
    }


    //create div title
    const questionWrapper = createNode("div", {
        className: "questionWrapper"
    });

    //create H3 questionID
    const h3Text = (question.questionID) ? `questionID: ${question.questionID}` : "Nueva Pregunta";

    const h3 = createNode("h3", {
        className: "questionID"
    }, questionWrapper);
    h3.appendChild(document.createTextNode(h3Text))


    //create div title
    const titleWrapper = createNode("div", {
        className: "titleWrapper",
    }, questionWrapper)


    const titleLabel = createNode("label", {
        for: "questionTitle"
    }, titleWrapper);
    titleLabel.appendChild(document.createTextNode("Pregunta:"))


    const titleInput = createNode("input", {
        classname: "titleInput",
        type: "text",
        id: "questionTitle",
        value: question.title
    }, titleWrapper);

    //create div answers
    const answersWrapper = createNode("div", {
        className: "answersWrapper"
    }, questionWrapper)
    question.answers.map((answer, index) => answersWrapper.appendChild(printAnswerEditor(answer, index, question.validAnswer)));


    //create new Answer button
    const newAnswerBtnWrapper = createNode("div", {
        className: "editBtnWrapper",
    }, questionWrapper)
    const newAnswerBtn = createNode("button", {
        className: "newAnswerBtn",
        type: "button"
    }, newAnswerBtnWrapper);
    newAnswerBtn.appendChild(document.createTextNode("Añadir Respuesta"));



    //create Save button
    const editBtnWrapper = createNode("div", {
        className: "editBtnWrapper",
    }, questionWrapper)
    const editBtn = createNode("button", {
        className: "editBtn",
        type: "button"
    }, editBtnWrapper);
    editBtn.appendChild(document.createTextNode("Guardar"));

    //create cancel button
    const cancelBtnWrapper = createNode("button", {
        className: "cancelBtnWrapper",
        type: "button"
    }, questionWrapper)
    const cancelBtn = createNode("div", {
        className: "cancelBtn",
    }, cancelBtnWrapper);
    cancelBtn.appendChild(document.createTextNode("Cancelar"));


    //eventos
    newAnswerBtn.addEventListener("click", () => {
        const newAnswerIndex = document.querySelectorAll(".answerInput").length;
        const newAnswer = printAnswerEditor("", newAnswerIndex);
        answersWrapper.appendChild(newAnswer)
    })


    cancelBtn.addEventListener("click", () => {
        window.location.href = "/admin/questions"
    })

    editBtn.addEventListener("click", () => {
        const answersInput = document.querySelectorAll(".answerInput");
        const answersRadio = document.querySelector(".answerRadio:checked");
        const newQuestion = {};


        if (answersInput.length < 2) alert("Tiene que haber por lo menos 2 respuestas");
        else if (!answersRadio) alert("Hay que marcar una respuesta válida");
        else if (!titleInput.value) alert("La pregunta tiene que tener título");
        else {
            newQuestion.validAnswer = answersRadio.value;
            newQuestion.answers = [...answersInput].map(answer => answer.value);
            newQuestion.questionID = question.questionID;
            newQuestion.title = titleInput.value;


            if (!newQuestion.questionID) {//creamos nuevo
                fetch(`http://localhost:3000/question/`, {
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': 'Bear ' + token
                    }),
                    body: JSON.stringify(newQuestion)
                })
                    .then(data => data.json())
                    .then(async (response) => {
                        await alert(`Pregunta añadida: ${JSON.stringify(response)}`);
                    })
                    .catch(async (err) => {
                        await alert(`Ha habido un error ${err}`);
                    })
                    .finally(() => window.location.href = "/admin/questions")
            }
            else {
                fetch(`http://localhost:3000/question/${newQuestion.questionID}`, {
                    method: 'PUT',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': 'Bear ' + token
                    }),
                    body: JSON.stringify(newQuestion)
                })
                    .then(data => data.json())
                    .then(async (response) => {
                        await alert(`Pregunta modificada: ${JSON.stringify(response)}`);
                        window.location.href = "/admin/questions"
                    })
                    .catch(async (err) => {
                        await alert(`Ha habido un error ${err}`);
                        window.location.href = "/admin/questions"
                    })
            }
        }
    })

    return questionWrapper;
}



window.addEventListener("load", () => {
    //recojo los parámetros del URL
    const params = new URLSearchParams(window.location.search.substring(1));

    const questionID = params.get("id");



    //TODO: quitar este token hardcodeado
    //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoicm9iZXJ0bzJAZW1haWwuY29tIiwidXNlclR5cGUiOiJzdHVkZW50IiwiaWF0IjoxNjE3MDk5NzE1fQ.InglUxNoNGYlQN1jDNpyi3qm6yi3P5Feh1fB4TpnpLk";
    const token = localStorage.getItem("token");
    console.log("token", token);
    
    const wrapper = document.querySelector(".wrapper");


    if (questionID) {
        fetch(`http://localhost:3000/question/${questionID}`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bear ' + token,
            })
        })
            .catch(err => printError(err))
            .then(response => response.json())
            .then(response => {
                if (!response.OK) {
                    wrapper.appendChild(printError(response));
                }
                else {
                    const questionWrapper = printQuestionEditor(response.question, token);
                    wrapper.appendChild(questionWrapper);
                }
            })

    }
    else { //hago este fetch para evitar que salga la pantalla de añadir pregunta
           //si no estás autorizado
        fetch(`http://localhost:3000/user/authuser`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bear ' + token,
            })
        })
        .then (response=> response.json())
        .then (response => {
            if (response.OK) {
                const questionWrapper = printQuestionEditor(null, token);
                wrapper.appendChild(questionWrapper);
                console.log ("usuario autorizado");
            }
            else {
                printError(response);
            }
        })

    }


})