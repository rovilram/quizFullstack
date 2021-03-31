"use strict";

const printError = (err, redirection) => {
    setInterval(() => {
        window.location.href = redirection
    }, 2500);
    const errorWrapper = createNode("div", {
        className: "errorWrapper"
    });
    const errorDiv = createNode("div", {
        className: "errorDiv"
    }, errorWrapper);
    errorDiv.appendChild(document.createTextNode("ERROR: ", JSON.stringify(err)))
    return errorWrapper;
}


window.addEventListener("load", () => {

    const token = localStorage.getItem("token");
    const questionsWrapper = document.querySelector(".questionsWrapper");

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
                questions.questions.map((question) => {
                    const questionWrapper = printQuestionTitle(question, token);
                    questionsWrapper.appendChild(questionWrapper);
                })
            }
            else {
                const errorDiv = printError(questions.message, "/login");
                questionsWrapper.appendChild(errorDiv);

            }

        })
        .catch(error => {
            const errorDiv = printError(error.message, "/login");
            questionsWrapper.appendChild(errorDiv);

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
                .then(() => {
                    window.location.href = "/"
                })
                .catch(err => printError(err.message, "/admin/questions"))

        })

})


const printQuestionTitle = (question, token) => {
    //TODO sacar este questionsWrapper a la función principal
    const questionWrapper = createNode("div", {
        className: "questionWrapper"
    });

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
                    else printError(response.message, "/admin/questions")
                }
                )
                .catch(error => printError(error.message, "/admin/questions"))
        }
    })



    editQuestionBtn.addEventListener("click", async () => {
        window.location.href = `./question?id=${question.questionID}`;
    })

    return questionWrapper;

}