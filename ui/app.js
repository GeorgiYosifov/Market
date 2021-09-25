"use strict";
let products = [];
const data = fetch(`http://localhost:8080/api/products`)
  .then((response) => {
    if (!response.ok) throw new Error(`Test problem `);
    return response.json();
  })
  .then((data) => {
    const itemsList = document.querySelector(".list-group");
    products = data;
    data.forEach((data) => {
      const html = `<li class="list-group-item" id="${data.Id}">${data.Name}
      <button type="button" class="btn btn-primary" id="btn">Primary</button></li>`;
      itemsList.insertAdjacentHTML("beforeend", html);
    });

    const liItemsBtn = document.querySelectorAll(".list-group-item>#btn");
    liItemsBtn.forEach((item) => {
      item.addEventListener("click", function (e) {
        console.log(e.target.parentElement.id);
        (async () => {
          const rawResponse = await fetch(
            "http://localhost:8080/api/products",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(
                products.find((p) => p.Id == e.target.parentElement.id)
              ),
            }
          );
          const content = await rawResponse.json();
        })();
      });
    });
  })
  .catch(function (errorObject) {
    console.log(errorObject.message);
  });
