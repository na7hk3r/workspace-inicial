let nombre =  document.getElementById("nombre");
let apellido = document.getElementById("apellido");
let segNombre = document.getElementById("segNombre");
let segApellido = document.getElementById("segApellido");
let tel = document.getElementById("tel");
let emailUser = document.getElementById("emailUser");
let empty = false;

document.addEventListener("DOMContentLoaded", () => {
    checkLogin();
});

//Verifica que esté logeado.
function checkLogin() {
    if(localStorage.getItem("userInput") !== null){
        showUser()
    };
};

//Validacion de campos requeridos llenos
function validate() {
    if (nombre.value === '') {
        nombre.classList.add('is-invalid');
        empty = true;
    }

    if (apellido.value === '') {
        apellido.classList.add('is-invalid');
        empty = true;
    }
 
    if (tel.value === '') {
        tel.classList.add('is-invalid');
        empty = true;
    }

    if (!empty) { 
        saveProfileData();
    }
  };

//Guarda la info de los input en localStorage
function saveProfileData() {
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("segNombre", segNombre);
    localStorage.setItem("apellido", apellido);
    localStorage.setItem("segApellido", segApellido);
    localStorage.setItem("tel", tel);
}

/*  En caso de tener info guardada en localStorage, 
    se muestra al usuario   */

function showUser() {
    emailUser.value = localStorage.getItem("userInput")
    nombre.value = localStorage.getItem("nombre")
    segNombre.value = localStorage.getItem("segNombre")
    apellido.value = localStorage.getItem("apellido")
    segApellido.value = localStorage.getItem("segApellido")
    tel.value = localStorage.getItem("tel")
}

