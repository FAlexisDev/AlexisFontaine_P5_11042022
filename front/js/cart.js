// Var initialisation
let productInCartArticle = document.getElementById("cart__items");
let productInCart = JSON.parse(localStorage.getItem("data"));

console.log(productInCart);

let totalQuantity = 0;
let totalPrice = 0;

fetch("http://localhost:3000/api/products/")
    .then((res) => {
        return res.json();
    })
    .then((value) => {
        console.log(value);

        // Create cart display

        productInCart.forEach((element) => {
            let productCompare = value.find((product) => {
                return (
                    product._id === element.id &&
                    product.colors.includes(element.color)
                );
            });

            let productArticle = document.createElement("article");
            productArticle.setAttribute("class", "cart__item");
            productArticle.setAttribute("data-id", element.id);
            productArticle.setAttribute("data-color", element.color);
            productInCartArticle.appendChild(productArticle);
            let productDivImg = document.createElement("div");
            productArticle.appendChild(productDivImg);
            productDivImg.setAttribute("class", "cart__item__img");
            let productImg = document.createElement("img");
            productDivImg.appendChild(productImg);
            productImg.setAttribute("src", productCompare.imageUrl);
            productImg.setAttribute("alt", productCompare.altTxt);
            let productDivContent = document.createElement("div");
            productArticle.appendChild(productDivContent);
            productDivContent.setAttribute("class", "cart__item__content");
            let productDivContentDescription = document.createElement("div");
            productDivContent.appendChild(productDivContentDescription);
            productDivContentDescription.setAttribute(
                "class",
                "cart__item__content__description"
            );
            let productNameDescription = document.createElement("h2");
            let productColorDescription = document.createElement("p");
            let productPriceDescription = document.createElement("p");
            productDivContentDescription.append(
                productNameDescription,
                productColorDescription,
                productPriceDescription
            );
            productNameDescription.innerHTML = productCompare.name;
            productColorDescription.innerHTML = element.color;
            productPriceDescription.innerHTML =
                productCompare.price + " " + "€";
            let productDivContentSettings = document.createElement("div");
            productDivContent.appendChild(productDivContentSettings);
            productDivContentSettings.setAttribute(
                "class",
                "cart__item__content__settings"
            );
            let productDivContentSettingsQuantity =
                document.createElement("div");
            productDivContentSettingsQuantity.setAttribute(
                "class",
                "cart__item__content__settings__quantity"
            );
            let productDivContentSettingsDelete = document.createElement("div");
            productDivContentSettingsDelete.setAttribute(
                "class",
                "cart__item__content__settings__delete"
            );
            productDivContentSettings.append(
                productDivContentSettingsQuantity,
                productDivContentSettingsDelete
            );

            let productDivContentSettingsQuantityInfos =
                document.createElement("p");
            productDivContentSettingsQuantityInfos.innerHTML =
                "Qté :" + " " + element.quantity + " ";
            let productDivContentSettingsQuantityInput =
                document.createElement("input");
            productDivContentSettingsQuantityInput.setAttribute(
                "type",
                "number"
            );
            productDivContentSettingsQuantityInput.setAttribute(
                "class",
                "itemQuantity"
            );
            productDivContentSettingsQuantityInput.setAttribute("min", "1");
            productDivContentSettingsQuantityInput.setAttribute("max", "100");
            productDivContentSettingsQuantityInput.setAttribute(
                "name",
                "itemQuantity"
            );
            productDivContentSettingsQuantityInput.setAttribute(
                "value",
                element.quantity
            );
            productDivContentSettingsQuantity.append(
                productDivContentSettingsQuantityInfos,
                productDivContentSettingsQuantityInput
            );
            let productDivContentSettingsDeleteInfos =
                document.createElement("p");
            productDivContentSettingsDeleteInfos.setAttribute(
                "class",
                "deleteItem"
            );
            productDivContentSettingsDeleteInfos.innerHTML = "Supprimer";
            productDivContentSettingsDelete.appendChild(
                productDivContentSettingsDeleteInfos
            );
            let productInputQuantity =
                document.querySelectorAll(".itemQuantity");

            productInputQuantity.forEach((element, idx) => {
                element.addEventListener("change", function (e) {
                    let elementData = e.target.closest(".cart__item");
                    let elementDataSelector = elementData.querySelector(
                        ".cart__item__content__settings__quantity"
                    );
                    let elementDataSelectorP =
                        elementDataSelector.querySelector("p");
                    elementDataSelectorP.innerText = "Qté : " + this.value;
                    productInCart[idx].quantity = this.value;
                    localStorage.setItem("data", JSON.stringify(productInCart));
                });
            });
            // Display price and articles in cart.
            totalPrice =
                totalPrice + productCompare.price * Number(element.quantity);
            totalQuantity = totalQuantity + Number(element.quantity);

            let totalQuantityInCart = document.getElementById("totalQuantity");
            totalQuantityInCart.innerHTML = totalQuantity;
            let totalPriceInCart = document.getElementById("totalPrice");
            totalPriceInCart.innerHTML = totalPrice;
            // Change quantity and delete products

            // Delete items
            let productDelete = document.querySelectorAll(".deleteItem");
            productDelete.forEach((element) => {
                element.addEventListener("click", function (e) {
                    let elementTarget = e.target.closest(".cart__item");
                    elementTarget.remove();
                    productInCart.find((product) => {
                        if (
                            product.id == elementTarget.dataset.id &&
                            product.color == elementTarget.dataset.color
                        ) {
                            let deleteProductInCart =
                                productInCart.indexOf(product);
                            console.log(deleteProductInCart);
                            if (deleteProductInCart === 0) {
                                productInCart.splice(deleteProductInCart, 1);
                            } else {
                                productInCart.splice(
                                    deleteProductInCart,
                                    deleteProductInCart
                                );
                            }
                            console.log(productInCart);
                        }
                        localStorage.setItem(
                            "data",
                            JSON.stringify(productInCart)
                        );
                    });
                });
            });
        });
    })
    .catch((err) => {});

// Form validation

let cartForm = document.querySelector(".cart__order__form");
console.log(cartForm);
cartForm.addEventListener("input", function (e) {
    console.log(e.target);
    if (e.target.type === "email") {
        // prettier-ignore
        const regexEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        console.log();
        if (regexEmail.test(e.target.value) == false) {
            document.getElementById("emailErrorMsg").style.color = "#ff6961";
            document.getElementById("emailErrorMsg").innerHTML =
                "L'email saisi est incorrecte";
            e.target.style.border = "3px solid #ff6961";
        } else {
            document.getElementById("emailErrorMsg").innerHTML = "";
            e.target.style.border = "3px solid #77dd77";
        }
    } else {
        let errorMsg = e.target.name + "ErrorMsg";
        if (e.target.value == false) {
            document.getElementById(errorMsg).style.color = "#ff6961";
            document.getElementById(errorMsg).innerHTML =
                "Le champ saisi est incorrect ou incomplet!";
            console.log(errorMsg);
            e.target.style.border = "3px solid #ff6961";
        } else {
            e.target.style.border = "3px solid #77dd77";
            document.getElementById(errorMsg).innerHTML = "";
        }
    }
});

cartForm.addEventListener("submit", function (e) {
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
    console.log(products);

    let order = {
        contact: contact,
        products: products,
    };
    console.log(order);
    console.log(contact);
    console.log(products);
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
        .then((res) => {
            return res.json();
        })
        .then((value) => {
            console.log(value);
            if (productInCart.length == 0) {
                alert(
                    "Merci de bien vouloir selectionner ule ou les canapés de votre choix."
                );
            } else {
                let cartReset = productInCart.splice(0);
                localStorage.setItem("data", JSON.stringify(productInCart));
                console.log(value.orderId);
                window.location.href =
                    "http://127.0.0.1:5500/front/html/confirmation.html?id=" +
                    value.orderId;
            }
        })
        .catch((err) => {
            console.log(err);
        });
});
