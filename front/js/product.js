import { addProductInCart, createElement } from "./utils.js";
//Recover product ID

let url = window.location.href;
let urlId = new URL(url);
let productId = urlId.searchParams.get("id");

// API Call

fetch("http://localhost:3000/api/products/" + productId)
    .then((res) => {
        return res.json();
    })
    .then((value) => {
        console.log(value);
        // Display our product details
        let productImg = document.querySelector(".item__img");
        let productImageCreate = createElement("img", productImg);
        productImageCreate.setAttribute("src", value.imageUrl);
        let productTitle = document.getElementById("title");
        productTitle.innerHTML = value.name;
        let productPrice = document.getElementById("price");
        productPrice.innerHTML = value.price;
        let productDescription = document.getElementById("description");
        productDescription.innerHTML = value.description;

        // Loop to display the colors of our products

        for (let i = 0; i < value.colors.length; i++) {
            let productOptions = document.getElementById("colors");
            let productOptionsList = createElement("option", productOptions);
            productOptionsList.setAttribute("value", value.colors[i]);
            productOptionsList.innerHTML = value.colors[i];
        }

        // Add products to local storage(cart)

        addToCart.addEventListener("click", (e) => {
            e.stopPropagation;
            let productColors = document.getElementById("colors").value;
            let productQuantity = document.getElementById("quantity").value;
            let productData = {
                price: value.price,
                color: productColors,
                quantity: productQuantity,
                id: value._id,
                altTxt: value.altTxt,
                imageUrl: value.imageUrl,
                name: value.name,
            };
            let productExist = false;
            let productInCart = JSON.parse(localStorage.getItem("data"));
            if (productInCart) {
                productInCart.forEach((element) => {
                    if (element.id === productData.id && element.color === productData.color) {
                        productExist = true;
                    }
                });
            } else {
                addProductInCart(productData, productInCart);
            }
            if (productExist) {
                productInCart.forEach((element, idx) => {
                    if (productInCart[idx].color === productData.color && productInCart[idx].id === productData.id) {
                        productInCart[idx].quantity = Number(productInCart[idx].quantity) + Number(productData.quantity);
                        localStorage.setItem("data", JSON.stringify(productInCart));
                    }
                });
            } else {
                addProductInCart(productData, productInCart);
            }
        });
    })

    .catch((err) => {});
