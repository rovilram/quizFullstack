"use strict";




window.addEventListener("load", () => {

    //TODO: quitar este token hardcodeado
    const token = localStorage.getItem("token");

    fetch(`http://localhost:3000/question/`, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bear ' + token,
        })
    })
        .then(data => data.json())
        .then(questions => {
            if (questions.OK) {
                console.log("questions", questions)
                questions.questions.map((question) => printQuestionTitle(question, token));
            }
            else {
                const questionsWrapper = document.querySelector(".questionsWrapper");
                const errorDiv = createNode("div", {
                    className: "errorDiv"
                }, questionsWrapper);
                errorDiv.appendChild(document.createTextNode(`ERROR: ${questions.message}`));
                window.location.href = "/login"
                //TODO: hacer redirección a Login
            }

        })
        .catch(error => {
            const questionsWrapper = document.querySelector(".questionsWrapper");
            const errorDiv = createNode("div", {
                className: "errorDiv"
            }, questionsWrapper);
            errorDiv.appendChild(document.createTextNode(`ERROR: ${error}`));
            //TODO: hacer redirección a Login

        })

    //eventos

    document.
        querySelector(".newQuestionBtn").
        addEventListener("click", async () => {
            window.location.href = "/admin/question";
        })

    document.
        querySelector(".toIndexBtn").
        addEventListener("click", async () => {
            window.location.href = "/";
        })

    document.
        querySelector(".disconnectBtn").
        addEventListener("click", async () => {
            fetch(`http://localhost:3000/user/signout`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': 'Bear ' + token,
                })
            })
                .then(result => result.json())
                .then(result => {
                    console.log("Usuario desconectado");
                    window.location.href = "/"
                })

        })

})


const printQuestionTitle = (question, token) => {
    //TODO sacar este questionsWrapper a la función principal
    const questionsWrapper = document.querySelector(".questionsWrapper");
    const questionWrapper = createNode("div", {
        className: "questionWrapper"
    }, questionsWrapper);

    const questionID = createNode("div", {
        className: "questionID"
    }, questionWrapper);
    const questionIDText = document.createTextNode(`questionID: ${question.questionID}`);
    questionID.appendChild(questionIDText)

    const questionTitle = createNode("div", {
        className: "questionTitle"
    }, questionWrapper);
    questionTitle.appendChild(document.createTextNode(question.title))

    const btnWrapper = createNode("div", {
        className: "btnWrapper"
    }, questionWrapper)

    const editQuestionBtn = createNode("div", {
        className: "editQuestionBtn"
    }, btnWrapper);
    editQuestionBtn.appendChild(document.createTextNode("Editar"));

    const delQuestionBtn = createNode("div", {
        className: "delQuestionBtn"
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
        window.location.href = `./question?id=${question.questionID}`;
    })



}