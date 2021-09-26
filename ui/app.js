"use strict";

let products = [];

fetch(`http://localhost:8080/api/products`)
  .then((response) => {
    if (!response.ok) throw new Error(`Test problem`);
    return response.json();
  })
  .then((data) => {
    products = data;

    const liItems = document.querySelector("#products");
    products.forEach(p => {
      const html = `<li id="${p.Id}" class="list-group-item">
        Name: ${p.Name} &nbsp;&nbsp;&nbsp;
        Price: ${p.Price} &nbsp;&nbsp;&nbsp;
        Category: ${p.Category} &nbsp;&nbsp;&nbsp;
        ExpireOn: ${p.ExpireOn} &nbsp;&nbsp;&nbsp;
        Quantity: ${p.Quantity} &nbsp;&nbsp;&nbsp;
        <button id="add" type="button" class="btn btn-primary">Add</button>
      </li>`;
      liItems.insertAdjacentHTML("beforeend", html);
    });

    const liBtnItems = document.querySelectorAll("#products>.list-group-item>#add");
    liBtnItems.forEach(btn => {
      btn.addEventListener("click", function(e) {
        const selectedProduct = products.find(p => p.Id == e.target.parentElement.id);
        (async () => {
          const rawResponse = await fetch(
            "http://localhost:8080/api/product",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify(
                selectedProduct
              ),
            }
          );
          // const content = await rawResponse.json();
        })();
      });
    });
  })
  .catch(function (errorObject) {
    console.log(errorObject.message);
  });
