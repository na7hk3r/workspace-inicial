const URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"
let arrayAutos = [];

function mostrarAutos() {
    let htmlContentToAppend = "";

    for (let i = 0; i < arrayAutos.length; i++) {
        let car = arrayAutos[i];

        htmlContentToAppend += `
        <div  class="list-group-item ">
            <div class="row">
                <div class="col-3">
                    <img src="${car.image}" alt="${car.description}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${car.name}-${car.cost}${" "}${car.currency}</h4>
                        <small class="text-muted">${car.soldCount} vendidos</small>
                    </div>
                    <p class="mb-1">${car.description}</p>
                </div>
            </div>
        </div>
        `
        document.getElementById("lista").innerHTML = htmlContentToAppend;
    };

}


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            arrayAutos = resultObj.data.products;
            mostrarAutos();

        }
    });

});