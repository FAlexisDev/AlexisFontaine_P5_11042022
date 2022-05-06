import { createElement } from "./utils.js";
//Var creation

let products = document.getElementById("items");

// API call

fetch("http://localhost:3000/api/products/")
    .then((res) => {
        return res.json();
    })
    .then((value) => {
        console.log(value);
        for (let i = 0; i < value.length; i++) {
            // Create element
            let productsLinks = createElement("a", products);
            let productsArticle = createElement("article", productsLinks);
            let productsImg = createElement("img", productsArticle);
            let productsTitle = createElement("h3", productsArticle);
            let productsDescription = createElement("p", productsArticle);
            // Add element
            productsLinks.setAttribute("href", "./product.html?id=" + value[i]._id);

            productsImg.setAttribute("src", value[i].imageUrl);
            productsImg.setAttribute("alt", value[i].altTxt);
            productsTitle.classList.add("productName");
            productsTitle.innerHTML = value[i].name;
            productsDescription.classList.add("productDescription");
            productsDescription.innerHTML = value[i].description;
        }
    })
    .catch((err) => {});
