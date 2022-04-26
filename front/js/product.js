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
let cartButton = document.getElementById("addToCart");

// API Call

fetch("http://localhost:3000/api/products/" + productId)
  .then((res) => {
    return res.json();
  })
  .then((value) => {
    console.log(value);
    // Display our product details
    let productImageCreate = document.createElement("img");
    productImageCreate.setAttribute("src", value.imageUrl);
    productImg.appendChild(productImageCreate);
    productTitle.innerHTML = value.name;
    productPrice.innerHTML = value.price;
    productDescription.innerHTML = value.description;

    // Loop to display the colors of our products

    for (let i = 0; i < value.colors.length; i++) {
      let productOptionsList = document.createElement("option");
      productOptionsList.setAttribute("value", value.colors[i]);
      productOptions.appendChild(productOptionsList);
      productOptionsList.innerHTML = value.colors[i];
    }

    // Add products to local storage(cart)

    addToCart.addEventListener("click", function (e) {
      let productColors = document.getElementById("colors").value;
      let productQuantity = document.getElementById("quantity").value;

      let productData = {
        color: productColors,
        id: value._id,
        quantity: productQuantity,
      };
      e.stopPropagation;
      let productsInCart = JSON.parse(localStorage.getItem("data"));
      console.log(productsInCart);
      if (productsInCart) {
        // Vérifier la présence de l'ID dans le tableau.
        let isProductExist = false;
        productsInCart.forEach((product) => {
          if (
            product.color === productData.color &&
            product.id === productData.id
          ) {
            isProductExist = true;
          }
        });
        // Si existe, incrémente la quantité.
        if (isProductExist) {
          for (let i = 0; i < productsInCart.length; i++) {
            if (
              productsInCart[i].color === productData.color &&
              productsInCart[i].id === productData.id
            ) {
              productsInCart[i].quantity = `${
                Number(productData.quantity) +
                Number(productsInCart[i].quantity)
              }`;
            }
          }
          // Sinon ==> Ajouter l'élément.
        } else {
          productsInCart.push(productData);
        }
        localStorage.setItem("data", JSON.stringify(productsInCart));
      } else {
        productsInCart = [];
        productsInCart.push(productData);
        localStorage.setItem("data", JSON.stringify(productsInCart));
        console.log(productsInCart);
      }
    });
  })

  .catch((err) => {});

//Question à poser:  Pourquoi getElementsByClassName n'a pas fonctionné pour afficher mon image ??
