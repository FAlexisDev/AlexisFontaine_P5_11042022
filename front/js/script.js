import { createElement } from "./utils.js";
//Var creation

// API call

fetch("http://localhost:3000/api/products/")
    .then((res) => {
        return res.json();
    })
    .then((value) => {
        console.log(value);
        value.forEach((element) => {
            // Create element
            let products = document.getElementById("items");
            let productsLinks = createElement("a", products);
            let productsArticle = createElement("article", productsLinks);
            let productsImg = createElement("img", productsArticle);
            let productsTitle = createElement("h3", productsArticle);
            let productsDescription = createElement("p", productsArticle);

            //Add element
            productsLinks.setAttribute("href", "./product.html?id=" + element._id);
            productsImg.setAttribute("src", element.imageUrl);
            productsImg.setAttribute("alt", element.altTxt);
            productsTitle.classList.add("productName");
            productsTitle.innerHTML = element.name;
            productsDescription.classList.add("productDescription");
            productsDescription.innerHTML = element.description;
        });
    })
    .catch((err) => {});
