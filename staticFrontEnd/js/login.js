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





"use strict"
const token = localStorage.getItem("token");


function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    console.log(id_token);

    fetch('http://localhost:3000/user/googleauth', {
        method: 'GET', 
        headers: {
            'Authorization': `bearer ${id_token}`,
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            console.log('Success:', response);
            localStorage.setItem("token", response.token);
            window.location.href = "/admin"
        })
        .then( () => signOut()) //como ya tenemos nuestro token salimos de la cuenta de google

}



function signOut() {
    var auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}


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

