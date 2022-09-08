/*

DESARROLLAR. Para mostrar en ProductInfo, Titulo, descripcion, fotos, etc.
Resolver en Products obtencion de ID, localStorage.

const URL = PRODUCT_INFO_URL + localStorage.prodID + EXT_TYPE;
let arrayInfo = [];

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONdata(URL).then(function (resultObj) {
        if (resultObj.status === 'ok') {
            arrayInfo = resultObj.data.products;
            infoProductos();
            localStorage.getItem(prodID)
        }
    });
}; 

function infoProductos() {
document.innerHTML= `
<div>
    <h1>${product.catID}</h1>
        <hr>
    <div>
        <h4>Precio</h4>
            <p class="" id="precio"></p>
        <h4>Descripcion</h4>
            <p class="" id="descripcion"></p>
        <h4>Categoria</h4>
            <p class="" id="categoria"></p>

        <h4>Cantidad de productos</h4>
            <p class="" id="imagenes"></p>
        <h4>Imagenes del producto</h4>
        <img src="" alt=""><img src="" alt="">
        <img src="" alt=""><img src="" alt="">
    </div>
</div>
`
};

*/
