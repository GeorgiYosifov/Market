"use strict";

let products = [];

let customerId = localStorage.getItem('customerId');
if (!localStorage.getItem('customerId')) {
  customerId = Math.floor(Math.random() * 4);
  localStorage.setItem('customerId', customerId);
}

fetch(`http://localhost:8080/api/customer/${customerId}`)
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
            const pQuantity = document.querySelector(`ul#products>li#${CSS.escape(p.Id)}>span#quantity`)
            pQuantity.innerText--;
            if (pQuantity.innerText.toString() === '0')
              document.querySelector('ul#products').removeChild(document.getElementById(p.Id));
            
            const productLiInCart = document.querySelector(`ul#cart>li#${CSS.escape(p.Id)}`);
            if (productLiInCart) {
              productLiInCart.children.item(0).innerText++;
            } else {
              const html = `<li id="${p.Id}" class="list-group-item">
                Name: ${p.Name} &nbsp;&nbsp;&nbsp;
                Quantity: <span id=quantity>1</span> &nbsp;&nbsp;&nbsp;
              </li>` 
              document.getElementById('cart').insertAdjacentHTML('beforeend', html)
            }
          }
        })(selectedProduct);
      });
    });
  })
  .catch(function (err) {
    console.log(err.message);
  });
  
let sourcePrice = new EventSource('http://localhost:8080/api/priceReducer');

sourcePrice.addEventListener('reduce', function(e) {
  const data = JSON.parse(e.data)
  const productPrice = document.querySelector(`ul#products>li#${CSS.escape(data.Id)}>span#price`)
  if (productPrice)
    productPrice.innerText = data.Price.toFixed(2) 
}, false);

sourcePrice.addEventListener('remove', function(e) {
  const data = JSON.parse(e.data)
  const p = document.querySelector(`ul#products>li#${CSS.escape(data.Id)}`)
  document.querySelector(`ul#products`).removeChild(p)
}, false);

// source.addEventListener('error', function(e) {
//   if (e.readyState == EventSource.CLOSED) {
//     // Connection was closed.
//   }
// }, false);

let sourceQuantity = new EventSource('http://localhost:8080/api/sendToOthers');

sourceQuantity.addEventListener('reduce', function(e) {
  const data = JSON.parse(e.data)
  const productQuantity = document.querySelector(`ul#products>li#${CSS.escape(data.Id)}>span#quantity`)
  if (productQuantity)
    productQuantity.innerText = data.Quantity 
}, false);

sourceQuantity.addEventListener('remove', function(e) {
  const data = JSON.parse(e.data)
  const p = document.querySelector(`ul#products>li#${CSS.escape(data.Id)}`)
  if (p)
    document.querySelector(`ul#products`).removeChild(p)
}, false);