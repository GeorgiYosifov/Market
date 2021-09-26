"use strict";

let products = [];

fetch(`http://localhost:8080/api/customer/1`)
  .then(r => {
    if (!r.ok) throw new Error(`Test problem`);
    return r.json();
  })
  .then(data => {
    document.getElementById("customer-money").innerText = `Money: ${data.Money}`;
  })
  .catch(function (err) {
    console.log(err.message);
  });

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
        Price: <span id=price>${p.Price.toFixed(2)}</span> &nbsp;&nbsp;&nbsp;
        Category: ${p.Category} &nbsp;&nbsp;&nbsp;
        ExpireOn: ${p.ExpireOn} &nbsp;&nbsp;&nbsp;
        Quantity: <span id=quantity>${p.Quantity}</span> &nbsp;&nbsp;&nbsp;
        <button id="add" type="button" class="btn btn-primary">Add</button>
      </li>`;
      liItems.insertAdjacentHTML("beforeend", html);
    });

    const liBtnItems = document.querySelectorAll("#products>.list-group-item>#add");
    liBtnItems.forEach(btn => {
      btn.addEventListener("click", function(e) {
        const selectedProduct = products.find(p => p.Id === e.target.parentElement.id);
        (async function (p) {
          const rawResponse = await fetch(
            "http://localhost:8080/api/product",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify(p),
            }
          );
          const content = await rawResponse.json();
          if (content === "ACCEPTED") {
            document.querySelector('ul#products').removeChild(document.getElementById(p.Id));
            // add to cart
          }
        })(selectedProduct);
      });
    });
  })
  .catch(function (err) {
    console.log(err.message);
  });
  
let source = new EventSource('http://localhost:8080/api/priceReducer');
source.addEventListener('reduce', function(e) {
  const data = JSON.parse(e.data)
  const product = document.querySelector(`ul#products>li#${CSS.escape(data.Id)}>span#price`)
  if (product)
    product.innerText = data.Price.toFixed(2) 
}, false);
// source.addEventListener('open', function(e) {
//   // Connection was opened.
// }, false);

// source.addEventListener('error', function(e) {
//   if (e.readyState == EventSource.CLOSED) {
//     // Connection was closed.
//   }
// }, false);