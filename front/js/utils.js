// Var init

/**
 * Add product data in local storage
 *
 * @param {*} productData Object with product data.
 */
export function addProductInCart(productData) {
    let productInCart = JSON.parse(localStorage.getItem("data"));
    productInCart ? productInCart.push(productData) : ((productInCart = []), productInCart.push(productData));
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
 * @param {*} products Cart products with price.
 */
export function calculateCartPrice(products) {
    let totalPrice = 0;
    let totalQuantity = 0;
    let totalPriceInCart = document.getElementById("totalPrice");
    let totalQuantityInCart = document.getElementById("totalQuantity");

    products.forEach((element) => {
        totalPrice += element.price * Number(element.quantity);
        totalQuantity += Number(element.quantity);
    });

    totalPriceInCart.innerText = totalPrice;
    totalQuantityInCart.innerText = totalQuantity;
}

/**
 * Listen event on input change's, update quantity in localStorage and DOM.
 *
 * @param {*} products Cart products with price.
 */
export function handleQuantityChange(products) {
    let productInCart = JSON.parse(localStorage.getItem("data"));
    const productInputQuantity = document.querySelectorAll(".itemQuantity");
    productInputQuantity.forEach((element, idx) => {
        element.addEventListener("change", (e) => {
            let elementData = e.target.closest(".cart__item");
            let elementDataSelector = elementData.querySelector(".cart__item__content__settings__quantity");
            let elementDataSelectorP = elementDataSelector.querySelector("p");

            elementDataSelectorP.innerText = "Qté : " + e.target.value;
            productInCart[idx].quantity = e.target.value;
            products[idx].quantity = e.target.value;

            localStorage.setItem("data", JSON.stringify(productInCart));
            calculateCartPrice(products);
        });
    });
}
/**
 * Listen event on paragraph (delete) click's and update localStorage by removing it.
 *
 * @param {*} products Cart products with price.
 */
export function handleProductDeletion(products) {
    let productInCart = JSON.parse(localStorage.getItem("data"));
    const productDelete = document.querySelectorAll(".deleteItem");
    productDelete.forEach((elementDelete) => {
        elementDelete.addEventListener("click", (e) => {
            e.stopPropagation();
            let elementTarget = e.target.closest(".cart__item");

            let product = productInCart.find((product) => product.id == elementTarget.dataset.id && product.color == elementTarget.dataset.color);
            let deleteProductInCart = productInCart.indexOf(product);

            productInCart.splice(deleteProductInCart, 1);
            products.splice(deleteProductInCart, 1);
            elementTarget.remove();

            localStorage.setItem("data", JSON.stringify(productInCart));

            handleQuantityChange(products);
            calculateCartPrice(products);
        });
    });
}

/**
 * Test input with Regex patern and display error message if the test fail.
 *
 * @param {*} regexVar const with the Regex's pattern.
 * @param {*} e Input event data.
 */
export function formValidation(regexVar, e) {
    let regexInfos = false;
    let errorMsg = e.target.name + "ErrorMsg";
    if (regexVar.test(e.target.value) === false) {
        document.getElementById(errorMsg).style.color = "#ff6961";
        document.getElementById(errorMsg).innerText = "Le champ saisi est incorrect ou incomplet!";
        e.target.style.border = "3px solid #ff6961";
    } else {
        e.target.style.border = "3px solid #77dd77";
        document.getElementById(errorMsg).innerText = "";
        regexInfos = true;
    }
    return regexInfos;
}

/**
 * Reset cart by removing everything into it and update it in the local storage + recover ID and open a new window with a link that contain ID.
 *
 * @param {*} value Value of our API request (POST /order).
 */
export function onSubmit(value) {
    localStorage.clear();
    //ajouter clear au local storage
    window.location.href = window.location.origin + "/front/html/confirmation.html?id=" + value.orderId;
}

/**
 * Process order from an API request
 *
 * @param {*} order Object with contact (object with form data) and order ( array of string with product in cart)
 * @param {*} cart Array of product in cart
 */
export function sendOrder(order, cart) {
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
            if (cart.length === 0) {
                alert("Merci de bien vouloir selectionner le ou les canapés de votre choix.");
            } else {
                onSubmit(value);
            }
        })
        .catch((err) => {
            console.log(err);
        });
}
