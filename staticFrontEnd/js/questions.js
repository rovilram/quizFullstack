"use strict";

document.
    querySelector(".newQuestionBtn").
    addEventListener("click", async () => {
    window.location.href = `question.html`;
    })

window.addEventListener("load", () => {

    //TODO: quitar este token hardcodeado
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoicm9iZXJ0bzJAZW1haWwuY29tIiwidXNlclR5cGUiOiJzdHVkZW50IiwiaWF0IjoxNjE3MDk5NzE1fQ.InglUxNoNGYlQN1jDNpyi3qm6yi3P5Feh1fB4TpnpLk";

    fetch(`http://localhost:3000/question/`, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bear ' + token,
        })
    })
        .then(data => data.json())
        .then(questions => {
            if (questions.OK) {
                console.log("questions",questions)
                questions.questions.map((question) => printQuestionTitle(question, token));
            }
            else {
                const questionsWrapper = document.querySelector(".questionsWrapper");
                const errorDiv = createNode("div", {
                    class: "errorDiv"
                }, questionsWrapper);
                errorDiv.appendChild(document.createTextNode(`ERROR: ${questions.message}`));
                //TODO: hacer redirección a Login
            }

        })
        .catch(error => {
            const questionsWrapper = document.querySelector(".questionsWrapper");
            const errorDiv = createNode("div", {
                class: "errorDiv"
            }, questionsWrapper);
            errorDiv.appendChild(document.createTextNode(`ERROR: ${error}`));
            //TODO: hacer redirección a Login

        })

})


const printQuestionTitle = (question, token) => {
    const questionsWrapper = document.querySelector(".questionsWrapper");
    const questionWrapper = createNode("div", {
        class: "questionWrapper"
    }, questionsWrapper);

    const questionID = createNode("div", {
        class: "questionID"
    }, questionWrapper);
    const questionIDText = document.createTextNode(`questionID: ${question.questionID}`);
    questionID.appendChild(questionIDText)

    const questionTitle = createNode("div", {
        class: "questionTitle"
    }, questionWrapper);
    questionTitle.appendChild(document.createTextNode(question.title))

    const btnWrapper = createNode("div", {
        class: "btnWrapper"
    }, questionWrapper)

    const editQuestionBtn = createNode("div", {
        class: "editQuestionBtn"
    }, btnWrapper);
    editQuestionBtn.appendChild(document.createTextNode("Editar"));

    const delQuestionBtn = createNode("div", {
        class: "delQuestionBtn"
    }, btnWrapper);
    delQuestionBtn.appendChild(document.createTextNode("Eliminar"));

    //eventos
    delQuestionBtn.addEventListener("click", () => {
        const result = confirm(`¿Quieres borrar la pregunta '${question.questionID}'`)
        if (result) {




            fetch(`http://localhost:3000/question/${question.questionID}`, {
                method: 'DELETE',
                headers: new Headers({
                    'Authorization': 'Bear ' + token,
                })
            })
                .then(data => data.json())
                .then(response => {
                    if (response.OK) {
                        console.log("Pregunta borrada");
                        questionWrapper.remove();
                    }
                    else console.log("Error al borrar", response.message)
                }
                )
                .catch(error => console.log(error))
        }
    })



    editQuestionBtn.addEventListener("click", async () => {
        window.location.href = `./question.html?id=${question.questionID}`;
    })


}