const URL = CART_INFO_URL + "25801" + EXT_TYPE;
let producto = {};
let unitPrice = 0;
let carritoUsuario = JSON.parse(localStorage.getItem('cartID'));
let fechaActual = new Date();
let mesActual = fechaActual.getFullYear() + "-" + (fechaActual.getMonth() + 1);


// Hago la peticion al fetch
document.addEventListener("DOMContentLoaded", () => {
    getJSONData(URL)
    .then(function (resultObj) {
            if (resultObj.status === "ok") {
                producto = resultObj.data;
                showCartInfo();
                compra();
                validarPago();
            }
        })
    });
// Muestro la información del producto a añadirse en la tabla
function showCartInfo() {
    unitPrice = producto.articles[0].unitCost

    productoCarrito = `
          <tr id="prod">
            <th scope="row">
                <img class="img-thumbnail" width=150rem src="${producto.articles[0].image}"/>
            </th>
            <td>${producto.articles[0].name}</td>
            <td>${producto.articles[0].currency} ${unitPrice}</td>
            <td>
                <div class="form-group col">
                    <input type="number" value=1 min=1 id="cantArticulo" style="width: 20%" onchange="subtotal()">
                </div>
           </td>
            <td id="subtotal"><strong>${producto.articles[0].currency} ${unitPrice}</strong></td> 
            <td><button class="btn btn-outline-danger" onclick=""><i class="bi bi-trash3-fill cursor-active"></i></button></td>
          </tr>
    `
document.getElementById("cartProduct").innerHTML = productoCarrito;
}
// Agrego el producto almacenado en localStorage a la tabla del carrito
function compra() {
if (carritoUsuario != undefined) {
    let nuevoProducto = "";

    for (let i = 0; i < carritoUsuario.length; i++) {
        let carriProd = carritoUsuario[i].articles[0];

        nuevoProducto = `
        <tr id="prod">
          <th scope="row">
              <img class="img-thumbnail" width=150rem src="${carriProd.image}"/>
          </th>
          <td>${carriProd.name}</td>
          <td>${carriProd.currency} ${carriProd.unitCost}</td>
          <td>
              <div class="form-group col">
                  <input type="number" value=1 min=1 id="cantArticulo2" style="width: 20%" onchange="subtotal()">
              </div>
         </td>
          <td id="subtotal2"><strong>${carriProd.currency} ${carriProd.unitCost}</strong></td>
          <td><button class="btn btn-outline-danger" onclick=""><i class="bi bi-trash3-fill cursor-active"></i></button></td>
        </tr>
        `
        document.getElementById("cartProduct").innerHTML += nuevoProducto;
    }
}
}
// Calculo el subtotal, función que se activa en el cambio (onchange) del valor del input
function subtotal() {
    let cantArtic = document.getElementById("cantArticulo")
    let currency = producto.articles[0].currency

    document.getElementById("subtotal").innerHTML = currency + " " + unitPrice * cantArtic.value
} 
// Función para validar el formulario
function validacion() {
    'use strict'
  
    // Obtener todos los formularios a los que queremos aplicar estilos de validación de Bootstrap personalizados
    var forms = document.querySelectorAll('.needs-validation')
  
    // Bucle sobre ellos y evitar el envío
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()){
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
      validarPago()
  };
// Función para validar el modal
function validarPago() {
        let credCard = document.getElementById("credCard");
        let transBank = document.getElementById("transBank");
        let cardInput = document.getElementById("cardInput");
        let secCode = document.getElementById("secCode");
        let vencimiento = document.getElementById("vencimiento");
        let accNum = document.getElementById("accNum");
    
        if (credCard.checked) {
            accNum.value = "";
            accNum.setAttribute('disabled', 'disabled');
            cardInput.removeAttribute('disabled');
            secCode.removeAttribute('disabled');
            vencimiento.removeAttribute('disabled');
            cardInput.classList.remove("is-invalid");
            cardInput.classList.remove("is-valid");
            cardInput.setAttribute('required', 'required');
            secCode.setAttribute('required', 'required');
            vencimiento.setAttribute('required', 'required');
            accNum.removeAttribute('required')
            vencimiento.setAttribute("min", `${mesActual}`);
        }
    
        if (transBank.checked) {
            cardInput.value = "";
            cardInput.setAttribute('disabled', 'disabled');
            secCode.value = "";
            secCode.setAttribute('disabled', 'disabled');
            vencimiento.value = "";
            vencimiento.setAttribute('disabled', 'disabled');
            accNum.removeAttribute('disabled');
            cardInput.classList.remove("is-invalid");
            cardInput.classList.remove("is-valid")
            secCode.classList.remove("is-invalid");
            secCode.classList.remove("is-valid");
            vencimiento.classList.remove("is-invalid");
            vencimiento.classList.remove("is-valid");
            cardInput.removeAttribute('required');
            secCode.removeAttribute('required');
            vencimiento.removeAttribute('required');
            accNum.setAttribute('required', 'required');
        }
};
