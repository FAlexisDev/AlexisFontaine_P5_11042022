// Var init

let productInCart = JSON.parse(localStorage.getItem("data"));

/**
 * Add product data in local storage
 *
 * @param {*} productData Object with product data.
 */
export function addProductInCart(productData) {
    productInCart.push(productData);
    localStorage.setItem("data", JSON.stringify(productInCart));
}
/**
 * Init an array and push the first product data in local storage.
 *
 * @param {*} productData Object with product data.
 */
export function addFirstProductInCart(productData) {
    let productInCart = [];
    productInCart.push(productData);
    localStorage.setItem("data", JSON.stringify(productInCart));
}

/**
 * Generate DOM element and append it to a given parent.
 *
 * @param {*} element Element that we want to create.
 * @param {*} parent The parent where we want to append it.
 * @returns Return the created element.
 */
export function createElement(element, parent) {
    let content = document.createElement(element);
    parent.appendChild(content);
    return content;
}

/**
 * Display total price and quantity in cart.
 *
 */
export function updateCartPrice() {
    let totalPrice = 0;
    let totalQuantity = 0;
    let productInCart = JSON.parse(localStorage.getItem("data"));
    let totalPriceInCart = document.getElementById("totalPrice");
    let totalQuantityInCart = document.getElementById("totalQuantity");
    productInCart.forEach((element) => {
        totalPrice += Number(element.price) * Number(element.quantity);
        totalQuantity += Number(element.quantity);
    });
    totalPriceInCart.innerHTML = totalPrice;
    totalQuantityInCart.innerHTML = totalQuantity;
}

/**
 * Listen event on input change's, update quantity in localStorage and DOM.
 */
export function handleQuantityChange() {
    const productInputQuantity = document.querySelectorAll(".itemQuantity");
    productInputQuantity.forEach((product, idx) => {
        product.addEventListener("change", function (e) {
            let elementData = e.target.closest(".cart__item");
            let elementDataSelector = elementData.querySelector(".cart__item__content__settings__quantity");
            let elementDataSelectorP = elementDataSelector.querySelector("p");
            elementDataSelectorP.innerText = "Qté : " + this.value;
            productInCart[idx].quantity = this.value;
            localStorage.setItem("data", JSON.stringify(productInCart));
            updateCartPrice();
        });
    });
}

/**
 * Listen event on paragraph (delete) click's and update localStorage by removing it.
 */
export function handleProductDeletion() {
    const productDelete = document.querySelectorAll(".deleteItem");
    productDelete.forEach((elementDelete) => {
        elementDelete.addEventListener("click", function (e) {
            e.stopPropagation();
            let elementTarget = e.target.closest(".cart__item");

            elementTarget.remove();
            productInCart.find((product) => {
                if (product.id == elementTarget.dataset.id && product.color == elementTarget.dataset.color) {
                    let deleteProductInCart = productInCart.indexOf(product);
                    productInCart.splice(deleteProductInCart, 1);
                }
                localStorage.setItem("data", JSON.stringify(productInCart));
                updateCartPrice();
            });
        });
    });
}

/**
 * Test input with Regex patern and display error message if the test fail.
 *
 * @param {*} regexVar const with the Regex's pattern.
 * @param {*} e Input event data.
 */
export function formTest(regexVar, e) {
    let errorMsg = e.target.name + "ErrorMsg";
    if (regexVar.test(e.target.value) === false) {
        document.getElementById(errorMsg).style.color = "#ff6961";
        document.getElementById(errorMsg).innerHTML = "Le champ saisi est incorrect ou incomplet!";
        e.target.style.border = "3px solid #ff6961";
    } else {
        e.target.style.border = "3px solid #77dd77";
        document.getElementById(errorMsg).innerHTML = "";
    }
}

/**
 * Reset cart by removing everything into it and update it in the local storage + recover ID and open a new window with a link that contain ID.
 *
 * @param {*} value Value of our API request (POST /order).
 */
export function onValidation(value) {
    productInCart.splice(0);
    localStorage.setItem("data", JSON.stringify(productInCart));
    //ajouter clear au local storage
    window.location.href = "http://127.0.0.1:5500/front/html/confirmation.html?id=" + value.orderId;
}
