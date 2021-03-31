"use strict"
const token = localStorage.getItem("token");

//hacemos un fetch por si ya tenemos un token en localstorage nos lleve directamente a questions.html
//y sino nos saca la pantalla de login
if (token) {
    console.log(token)
    fetch(`http://localhost:3000/user/authuser`, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bear ' + token,
        })
    })
        .then(response => response.json())
        .then(response => {
            console.log(response)
            if (response.OK) {
                console.log("usuario autentificado")
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

