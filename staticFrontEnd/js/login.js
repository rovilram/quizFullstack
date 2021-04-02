//Recursos Google OAuth
//modo "ñapa"
//https://developers.google.com/identity/sign-in/web/sign-in
//https://developers.google.com/identity/sign-in/web/people
//https://developers.google.com/identity/sign-in/web/backend-auth
//https://www.youtube.com/watch?v=f70d7-kLQKk
//https://www.youtube.com/watch?v=kUi6Z5bxHfE

//modo "como dios manda"
//https://developers.google.com/identity/sign-in/web/server-side-flow

//teoría procedimiento OAuth
//https://www.returngis.net/2019/04/oauth-2-0-openid-connect-y-json-web-tokens-jwt-que-es-que/



//Recursos más recientes de GOOGLE
//Para cliente
//https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow#js-client-library
//Para node
//https://github.com/googleapis/google-api-nodejs-client#retrieve-access-token



"use strict";

const token = localStorage.getItem("token");


//hacemos un fetch por si ya tenemos un token en localstorage nos lleve directamente a questions.html
//y sino nos saca la pantalla de login
if (token) {
    fetch(`http://localhost:3000/user/authuser`, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bear ' + token,
        })
    })
        .then(response => response.json())
        .then(response => {
            if (response.OK) {
                window.location.href = "admin/questions"
            }
            else {
                localStorage.removeItem("token");
            }
        })
        .catch(error => {
            console.log("ERROR: ", error);
        })
}
//eventos
const loginBtn = document.querySelector(".loginBtn");
loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const user = document.querySelector("#user").value;
    const password = document.querySelector("#password").value;

    if (!user || !password) alert("Los campos usuario y contraseña no pueden estar vacíos")
    else {
        fetch("http://localhost:3000/user/login", {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                user,
                password
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response.OK) {
                    localStorage.setItem("token", response.token);
                    console.log(response.token)
                    window.location.href = "admin/questions"
                }
                else {
                    alert(response.message)
                }
            })
    }
})

const signInCallBack = (authResult) => {
    console.log(authResult)
    if (authResult['code']) {
        // Hide the sign-in button now that the user is authorized, for example:
        //$('#signinButton').attr('style', 'display: none');

        // Send the code to the server

        fetch('http://localhost:3000/user/postgooglecode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(authResult)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.status === 200) {
                    localStorage.setItem("token", data.token);
                    window.location.href = "/admin/questions";
                }
                else {
                    alert(`ERROR: ${data.message}`);
                }
            })
            .catch(error => alert(JSON.stringify(error)))

    } else {
        console.log("ERROR: No se ha podido autenticar a ningún usuario")
    }
}






document.querySelector("#signinButton").addEventListener("click", () => {
    console.log("click")
    auth2.grantOfflineAccess()
        .then(signInCallBack);
});



