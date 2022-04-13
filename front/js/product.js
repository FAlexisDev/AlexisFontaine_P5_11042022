let url = window.location.href;
let urlId = new URL(url);
let productId = urlId.searchParams.get("id");
console.log(productId);
