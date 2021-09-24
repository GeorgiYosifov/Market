"use strict";

const request = new XMLHttpRequest();
request.open("GET", "url");
request.send();

request.addEventListener("load", function () {
  const data = JSON.parse(this.responseText);
  const html = `
  <ul class="list-group">
  <li class="list-group-item">A second item</li>
  <li class="list-group-item">A third item</li>
  <li class="list-group-item">A fourth item</li>
  <li class="list-group-item">And a fifth one</li>
</ul>

<ul class="list-group">
  <li class="list-group-item">Anem</li>
  <li class="list-group-item">An item</li>
  <li class="list-group-item">A second item</li>
  <li class="list-group-item">A third item</li>
  <li class="list-group-item">A fourth item</li>
  <li class="list-group-item">And a fifth one</li>
</ul>`;
});
