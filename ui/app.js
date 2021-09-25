"use strict";

const countryData = function(country) {
    const data = fetch(`http://localhost:8080/api/products`)
        .then((response) => {
            if (!response.ok) throw new Error(`Test problem `);
            return response.json();
        })
        .then((data) => {
            console.log(data)
            console.log(
                `Hello there!The capital of the country is ${data[0].capital}`
            );
        })
        .catch(function(errorObject) {
            console.log(errorObject.message);
        });
};

countryData("portugal");

// const itemsList = document.querySelector(".items");

// const request = new XMLHttpRequest();
// request.open("GET", "http://localhost:8080/api/products");
// request.send();

// request.addEventListener("load", function() {
//     const data = JSON.parse(this.responseText);
//     console.log(data);
//     const html = `
//   <ul class="list-group">
//   <li class="list-group-item"></li>
//   <li class="list-group-item">A third item</li>
//   <li class="list-group-item">A fourth item</li>
//   <li class="list-group-item">And a fifth one</li>
// </ul>

// <ul class="list-group">
//   <li class="list-group-item">Anem</li>
//   <li class="list-group-item">An item</li>
//   <li class="list-group-item">A second item</li>
//   <li class="list-group-item">A third item</li>
//   <li class="list-group-item">A fourth item</li>
//   <li class="list-group-item">And a fifth one</li>
// </ul>`;

//     itemsList.insertAdjacentHTML("beforeend", html);
// });