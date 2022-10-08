const URL = CART_INFO_URL + "25801" + EXT_TYPE;
let producto = {};
let unitPrice = 0;

// Hago la peticion al fetch
document.addEventListener("DOMContentLoaded", () => {
    getJSONData(URL)
    .then(function (resultObj) {
            if (resultObj.status === "ok") {
                producto = resultObj.data;
                showCartInfo();
            }
        })
    });

// Muestro la información del producto a añadirse en la tabla
function showCartInfo() {
    unitPrice = producto.articles[0].unitCost

    productoCarrito = `
          <tr>
            <th scope="row">
                <img class="img-thumbnail" width=150rem src="${producto.articles[0].image}"/>
            </th>
            <td>${producto.articles[0].name}</td>
            <td>${producto.articles[0].currency} ${unitPrice}</td>
            <td>
                <div class="form-group col">
                    <input type="number" value=1 id="cantArticulo" onchange="subtotal()">
                </div>
           </td>
            <td id="subtotal"><strong>${producto.articles[0].currency} ${unitPrice}</strong></td>
          </tr>
    `
document.getElementById("cartProduct").innerHTML = productoCarrito;
}

// Calculo el subtotal, función que se activa en el cambio (onchange) del valor del input
function subtotal() {
        let cantArtic = document.getElementById("cantArticulo")
        let currency = producto.articles[0].currency

        document.getElementById("subtotal").innerHTML = currency + " " + unitPrice * cantArtic.value
} 