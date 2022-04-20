// Var initialisation
let productInCartArticle = document.getElementById("cart__items");
let productInCart = JSON.parse(localStorage.getItem("data"));

console.log(productInCart);

fetch("http://localhost:3000/api/products/")
  .then((res) => {
    return res.json();
  })
  .then((value) => {
    console.log(value);
    productInCart.forEach((element, idx) => {
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
      productImg.setAttribute("src", value[idx].imageUrl);
      productImg.setAttribute("alt", value[idx].altTxt);
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
      productNameDescription.innerHTML = value[idx].name;
      productColorDescription.innerHTML = element.color;
      productPriceDescription.innerHTML = value[idx].price + " " + "€";
      let productDivContentSettings = document.createElement("div");
      productDivContent.appendChild(productDivContentSettings);
      productDivContentSettings.setAttribute(
        "class",
        "cart__item__content__settings"
      );
      let productDivContentSettingsQuantity = document.createElement("div");
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

      let productDivContentSettingsQuantityInfos = document.createElement("p");
      productDivContentSettingsQuantityInfos.innerHTML =
        "Qté :" + " " + element.quantity + " ";
      let productDivContentSettingsQuantityInput =
        document.createElement("input");
      productDivContentSettingsQuantityInput.setAttribute("type", "number");
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
      let productDivContentSettingsDeleteInfos = document.createElement("p");
      productDivContentSettingsDeleteInfos.setAttribute("class", "deleteItem");
      productDivContentSettingsDeleteInfos.innerHTML = "Supprimer";
      productDivContentSettingsDelete.appendChild(
        productDivContentSettingsDeleteInfos
      );
    });
    let totalQuantity = 0;
    let totalPrice = 0;
    productInCart.forEach((element, idx) => {
      totalPrice = totalPrice + Number(value[idx].price);
      totalQuantity = totalQuantity + Number(element.quantity);
      console.log(totalQuantity);
      console.log(totalPrice);
    });
    let totalQuantityInCart = document.getElementById("totalQuantity");
    totalQuantityInCart.innerHTML = totalQuantity;
    let totalPriceInCart = document.getElementById("totalPrice");
    totalPriceInCart.innerHTML = totalPrice;
  })
  .catch(function (err) {});
