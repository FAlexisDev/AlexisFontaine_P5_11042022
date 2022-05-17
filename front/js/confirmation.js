//Recover id and display command ID.

let commandId = document.getElementById("orderId");
let serachParams = new URLSearchParams(window.location.search);
let commandIdValue = serachParams.get("id");

commandId.innerText = " " + commandIdValue;
