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
      let productsLinks = document.createElement("a");
      let productsArticle = document.createElement("article");
      let productsImg = document.createElement("img");
      let productsTitle = document.createElement("h3");
      let productsDescription = document.createElement("p");
      // Add element
      productsLinks.setAttribute("href", "./product.html?id=" + value[i]._id);
      products.appendChild(productsLinks);
      productsLinks.appendChild(productsArticle);
      productsArticle.append(productsImg, productsTitle, productsDescription);
      productsImg.setAttribute("src", value[i].imageUrl);
      productsImg.setAttribute("alt", value[i].altTxt);
      productsTitle.classList.add("productName");
      productsTitle.innerHTML = value[i].name;
      productsDescription.classList.add("productDescription");
      productsDescription.innerHTML = value[i].description;
    }
  })
  .catch(function (err) {});
