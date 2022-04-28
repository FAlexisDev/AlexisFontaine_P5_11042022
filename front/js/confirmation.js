let commandId = document.getElementById("orderId");
let serachParams = new URLSearchParams(window.location.search);
let commandIdValue = serachParams.get("id");

commandId.innerHTML = " " + commandIdValue;
