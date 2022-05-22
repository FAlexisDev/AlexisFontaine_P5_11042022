import { formValidation, handleProductDeletion, createElement, handleQuantityChange, calculateCartPrice, sendOrder } from "./utils.js";

// Create cart display
let productInCart = JSON.parse(localStorage.getItem("data"));

fetch("http://localhost:3000/api/products/")
    .then((res) => res.json())
    .then((value) => {
        const products = [];
        const productIds = productInCart.map((product) => product.id);
        productIds.forEach((productId) => {
            // Get cart element
            let currentProduct = productInCart.find((element) => element.id === productId);

            // Get request element
            let currentProductResult = value.find((element) => element._id === productId);

            products.push({
                ...currentProduct,
                price: currentProductResult.price,
            });
        });

        products.forEach((element) => {
            // console.log(element);
            let productInCartArticle = document.getElementById("cart__items");
            let productArticle = createElement("article", productInCartArticle);
            productArticle.setAttribute("data-id", element.id);
            productArticle.setAttribute("class", "cart__item");
            productArticle.setAttribute("data-color", element.color);

            let productDivImg = createElement("div", productArticle);
            productDivImg.setAttribute("class", "cart__item__img");

            let productImg = createElement("img", productDivImg);
            productImg.setAttribute("src", element.imageUrl);
            productImg.setAttribute("alt", element.altTxt);

            let productDivContent = createElement("div", productArticle);
            productDivContent.setAttribute("class", "cart__item__content");

            let productDivContentDescription = createElement("div", productDivContent);
            productDivContentDescription.setAttribute("class", "cart__item__content__description");

            let productNameDescription = createElement("h2", productDivContentDescription);
            let productColorDescription = createElement("p", productDivContentDescription);
            let productPriceDescription = createElement("p", productDivContentDescription);

            productNameDescription.innerText = element.name;
            productColorDescription.innerText = element.color;
            productPriceDescription.innerText = element.price + " " + "€";
            let productDivContentSettings = createElement("div", productDivContent);
            productDivContentSettings.setAttribute("class", "cart__item__content__settings");
            let productDivContentSettingsQuantity = createElement("div", productDivContentSettings);
            productDivContentSettingsQuantity.setAttribute("class", "cart__item__content__settings__quantity");
            let productDivContentSettingsDelete = createElement("div", productDivContentSettings);
            productDivContentSettingsDelete.setAttribute("class", "cart__item__content__settings__delete");

            let productDivContentSettingsQuantityInfos = createElement("p", productDivContentSettingsQuantity);
            productDivContentSettingsQuantityInfos.innerText = "Qté :" + " " + element.quantity + " ";
            let productDivContentSettingsQuantityInput = createElement("input", productDivContentSettingsQuantity);

            productDivContentSettingsQuantityInput.setAttribute("type", "number");
            productDivContentSettingsQuantityInput.setAttribute("class", "itemQuantity");
            productDivContentSettingsQuantityInput.setAttribute("min", "1");
            productDivContentSettingsQuantityInput.setAttribute("max", "100");
            productDivContentSettingsQuantityInput.setAttribute("name", "itemQuantity");
            productDivContentSettingsQuantityInput.setAttribute("value", element.quantity);

            let productDivContentSettingsDeleteInfos = createElement("p", productDivContentSettingsDelete);
            productDivContentSettingsDeleteInfos.setAttribute("class", "deleteItem");
            productDivContentSettingsDeleteInfos.innerText = "Supprimer";
        });

        // Display total price and articles in cart.
        calculateCartPrice(products);

        // // Change quantity
        handleQuantityChange(products);

        // // Delete items
        handleProductDeletion(products);
    })
    .catch((err) => {
        console.error(err);
    });

// Form validation

let cartForm = document.querySelector(".cart__order__form");
let regexInfos = false;
let regex = {
    lastName: /^\D+$/,
    firstName: /^\D+$/,
    city: /^\D+$/,
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    address: /./,
};

cartForm.addEventListener("input", (e) => {
    formValidation(regex[e.target.name], e);
});

cartForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(cartForm);
    let contact = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        address: formData.get("address"),
        city: formData.get("city"),
        email: formData.get("email"),
    };
    let productObject = productInCart.map((product) => product.id);
    let products = productObject;

    let order = {
        contact: contact,
        products: products,
    };
    if (
        regex.lastName.test(formData.get("lastName")) &&
        regex.firstName.test(formData.get("firstName")) &&
        regex.city.test(formData.get("city")) &&
        regex.email.test(formData.get("email")) &&
        regex.address.test(formData.get("address"))
    ) {
        sendOrder(order, productInCart);
    } else {
        alert("Merci de bien vouloir compléter correctement les champs du formulaire.");
    }
});
