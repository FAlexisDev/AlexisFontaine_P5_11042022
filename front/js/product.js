//Recover product ID

let url = window.location.href;
let urlId = new URL(url);
let productId = urlId.searchParams.get("id");
console.log(productId);

// var initialisation
let productImg = document.querySelector(".item__img");
let productTitle = document.getElementById("title");
let productPrice = document.getElementById("price");
let productDescription = document.getElementById("description");
let productOptions = document.getElementById("colors");

// API Call

fetch("http://localhost:3000/api/products/" + productId)
  .then(function (res) {
    return res.json();
  })
  .then(function (value) {
    console.log(value);
    let productImageCreate = document.createElement("img");
    productImageCreate.setAttribute("src", value.imageUrl);
    productImg.appendChild(productImageCreate);
    productTitle.innerHTML = value.name;
    productPrice.innerHTML = value.price;
    productDescription.innerHTML = value.description;

    for (let i = 0; i < value.colors.length; i++) {
      let productOptionsList = document.createElement("option");
      productOptionsList.setAttribute("value", value.colors[i]);
      productOptions.appendChild(productOptionsList);
      productOptionsList.innerHTML = value.colors[i];
    }
  })
  .catch(function (err) {});

//Question à poser:  Pourquoi getElementsByClassName n'a pas fonctionné pour afficher mon image ??
