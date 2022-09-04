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
    document.getElementById("regresar").addEventListener('click', function(){
        location.href='./index.html';
    })
};

    // Capturar nombre de usuario en localStorage: 

document.getElementById("submit").addEventListener('click', () => {
    localStorage.setItem("userInput", document.getElementById('floatingInput').value)
});
