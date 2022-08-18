/*function Success() {
        window.location.href="index.html"
    }; */

function controlError() {
    var error = false;

    var email = document.getElementById("floatingInput").value;
    var password = document.getElementById("floatingPassword").value;

    // Comprobación de campos vacios:
    
    if (password == "" || email == "") {
        error = true;
    } 

    if (error) {
        alertError();
    } else {
        window.location.href='./index.html';
    }
}

function alertError() {
    alert("Debe completar los campos solicitados");
}

function regresar() {
    document.querySelector("button").addEventListener("click", function(){
        window.location.href="./index.html"
    }
)};