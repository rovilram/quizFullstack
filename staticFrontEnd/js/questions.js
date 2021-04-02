"use strict";
import {createNode} from "./functions.js"

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
                const header = document.querySelector(".header");
                if (questions.user.picture) {
                    console.log(questions.user.picture)
                    const picWrapper = createNode("div", {
                        className: "picWrapper",
                    }, header);
                    createNode("img", {
                        className: "userPicture",
                        src: questions.user.picture
                    },picWrapper)
                }
                questions.questions.map((question) => {
                    const questionTitleWrapper = printQuestionTitle(question, token);
                    questionsWrapper.appendChild(questionTitleWrapper);
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
    const questionTitleWrapper = createNode("div", {
        className: "questionTitleWrapper"
    });

    const questionID = createNode("div", {
        className: "questionID"
    }, questionTitleWrapper);
    const questionIDText = document.createTextNode(`questionID: ${question.questionID}`);
    questionID.appendChild(questionIDText)

    const questionTitle = createNode("div", {
        className: "questionTitle"
    }, questionTitleWrapper);
    questionTitle.appendChild(document.createTextNode(question.title))

    const btnWrapper = createNode("div", {
        className: "btnWrapper"
    }, questionTitleWrapper)

    const editQuestionBtn = createNode("button", {
        className: "editQuestionBtn"
    }, btnWrapper);
    editQuestionBtn.appendChild(document.createTextNode("Editar"));

    const delQuestionBtn = createNode("button", {
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
                        questionTitleWrapper.remove();
                    }
                    else printError(response.message, "/admin/questions")
                }
                )
                .catch(error => printError(error.message, "/admin/questions"))
        }
    })



    editQuestionBtn.addEventListener("click", async () => {
        window.location.href = `/admin/question?id=${question.questionID}`;
    })

    return questionTitleWrapper;

}