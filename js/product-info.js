const URL = PRODUCT_INFO_URL + localStorage.getItem("catID") + EXT_TYPE;
const URL2 = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("catID") + EXT_TYPE;
let info = [];
let comment = [];

/*  Funcion que se ejecuta una vez se haya cargado el documento y se encuentren los elementos.
    El primero es para la info de los productos, el segundo para los comentarios. */
document.addEventListener("DOMContentLoaded", () => {
getJSONData(URL)
.then(function (resultObj) {
        if (resultObj.status === "ok") {
            info = resultObj.data;
            showInfo();
            productosRelacionados();
        }
    });

getJSONData(URL2)
.then (function (resultComment) {
    if (resultComment.status === "ok") {
        comment =  resultComment.data;
        mostrarComentarios();
    }
})

});

//  Funcion para mostrar la info del producto
function showInfo() {
    let arrayImg = info.images;
    let htmlContenido = "";
    let htmlImagenes = "";

        htmlContenido += `
                <div class="form float-end">
                        <button type="button" 
                                class="btn btn-outline-success btn-lg active" 
                                onClick="carrito()"
                                id="btnComprar">
                            Comprar
                        </button>
                    </div>
                <div class="row">
                    <h1>${info.name}</h1> 
                    <hr>
                    <p class="mb-1 fw-bold">Precio</p>
                    <p>${info.currency} ${info.cost}</p><br>
                    <p class="mb-1 fw-bold">Descripción</p>
                    <p>${info.description}</p><br>
                    <p class="mb-1 fw-bold">Categoria</p>
                    <p>${info.category}</p><br>
                    <p class="mb-1 fw-bold">Cantidad de vendidos</p>
                    <p>${info.soldCount}</p><br>
                    <p class="mb-3 fw-bold">Imágenes Ilustrativas</p><br>
                </div>
    `
        document.getElementById("infoLista").innerHTML += htmlContenido;
    

        htmlImagenes += `
        <div class="carousel-item active">
            <img src="${arrayImg[0]}" alt="productoImg" class="d-block w-100">
        </div>
        `
    //Mostrar las imagenes, con un for para recorrer el array
        for (let i=1; i < arrayImg.length; i++) {
    
        htmlImagenes += `
            <div class="carousel-item">
                <img src="${arrayImg[i]}" alt="productoImg" class="d-block w-100">
            </div>
        `

        }
        
        document.getElementById("infoImagenes").innerHTML += htmlImagenes;
    }

//  Funcion para mostrar los comentarios
function mostrarComentarios() {
    let htmlComentarios = "";
    let arrayComment = comment;
    
    htmlComentarios = `
    <h1>Comentarios</h1>
    <hr>
    `

    //  Recorrido por los comentarios
    for (let i = 0; i < arrayComment.length; i++) {

        htmlComentarios += `
                <li class="list-group-item list-group-item-action">
                            <p class="mb-1 fw-bold">${arrayComment[i].user} ${stars(arrayComment[i].score)}</p>
                            <p class="mb-1">${arrayComment[i].dateTime}</p>
                            <p class="mb-1">${arrayComment[i].description}</p>
                </li>
        `
    }

    document.getElementById("infoComments").innerHTML = htmlComentarios;
}

// - - - - - - -- - - - - - - - - - - - - - - - - -- - - - - - -  -

//  Funcion para E4 - Mostrar relacionados.
function productosRelacionados() {
    let htmlRelacionados = "";
    let arrayRelacionados = info.relatedProducts;

    htmlRelacionados = `
    <h2>Productos Relacionados:</h2>
    <hr>
    `

    for (let j = 0; j < arrayRelacionados.length; j++) {

        htmlRelacionados += `
            <div style="width: 20rem">
                <div class= "col cursor-active" onClick="setCatID(${arrayRelacionados[j].id})">
                        <img src="${arrayRelacionados[j].image}" alt="imgRelacionado" class="img-thumbnail">
                        <h4 class="text-center">${arrayRelacionados[j].name}</h4>
                </div>
            </div>
        `
    }

    document.getElementById("prodRelacionados").innerHTML = htmlRelacionados;
}

//  Funcion que obtiene la id del producto relacionado y redirecciona a product-info.
function setCatID(id) {
    localStorage.setItem("catID", id);
    window.location = "product-info.html"
}

// - - - - - - -- - - - - - - - - - - - - - - - - -- - - - - - -  -

let carritoNuevo = [];
// Convierto la ID del producto a una coleccion en formato JSON con JSON.stringify
function carrito() {

  let compra_ID = "";
  let producto_id = "";
  let producto_name = "";
  let producto_count = "";
  let producto_unitCost = "";
  let producto_currency = "";
  let producto_image = "";

  compra_ID = localStorage.getItem("catID");
  producto_id = info.id;
  producto_name = info.name;
  producto_count = 1;
  producto_unitCost = info.cost;
  producto_currency = info.currency;
  producto_image = info.images[0];

  carritoNuevo.push({
    ID: compra_ID,
    articles: [
      {
        id: producto_id,
        name: producto_name,
        count: producto_count,
        unitCost: producto_unitCost,
        currency: producto_currency,
        image: producto_image,
      },
    ],
  });

  localStorage.setItem("catID", JSON.stringify(carritoNuevo));

  window.location = "cart.html";
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

//  Funcion para mostrar la cantidad de estrellas ingresadas en parámetro
function stars(puntaje) {
    let add = "";

    for (let s = 1; s < 6; s++) {
        if (s <= puntaje) {
            add +=
            `<span class="fa fa-star checked"></span>`
        } else {
            add += 
            `<span class="fa fa-star"></span>`
        }
    }
    return (add);
}
//  Evento para el botón de enviar comentario y añadirlo a la lista de los otros
document.getElementById("enviarComment").addEventListener('click', () => {

var comentario = document.getElementById("userComment").value;
var puntaje = document.getElementById("puntuacion").value;

var hoy = new Date();
var fecha = hoy.getDate() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getFullYear();
var hora = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
var fechaHora = fecha + " " + hora;
let agregarComentario = "";

agregarComentario += `
    <li class="list-group-item list-group-item-action">
        <p class="mb-1 fw-bold">${localStorage.getItem("userInput")} ${stars(puntaje)}<p>
        <p class="mb-1">${fechaHora}<p>
        <p class="mb-1">${comentario}<p>
    </li>
`

document.getElementById("comentarioNuevo").innerHTML += agregarComentario;

})