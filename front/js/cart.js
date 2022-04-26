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

            // Display price and articles in cart.
            totalPrice =
                totalPrice + productCompare.price * Number(element.quantity);
            totalQuantity = totalQuantity + Number(element.quantity);

            let totalQuantityInCart = document.getElementById("totalQuantity");
            totalQuantityInCart.innerHTML = totalQuantity;
            let totalPriceInCart = document.getElementById("totalPrice");
            totalPriceInCart.innerHTML = totalPrice;
            // Change quantity and delete products
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
        });
    })
    .catch((err) => {});
