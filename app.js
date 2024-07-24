let productTemplate = {
    nameP: "",
    price: 0,
    description: "",
    id: ""
};
let products = new Array;


function addProducts(ev){

    ev.preventDefault()
    console.log("Añadiendo productos");

    productTemplate = {
        nameP: document.getElementById("productName").value,
        price: document.getElementById("productPrice").value,
        description: document.getElementById("productDescription").value,
        id: generateUUID()
    }
    products.push(productTemplate);
    console.log("Productos", products);

    renderProducts();       
    getTotalPrice();

    document.getElementById("productsForm").reset();
 
}

function renderProducts(){

    console.log("Pintando productos");
    let copyOfProducts = [].concat(products);
    let copyOfProduct = copyOfProducts.pop();

    let currentDiv = document.getElementById("addedProducts");
    let newDiv = document.createElement("div");
    newDiv.setAttribute("id", copyOfProduct.id);
    let newProductName = document.createElement("p");
    let newProductPrice = document.createElement("p");
    let newProductDescription = document.createElement("p");
    let newButton = document.createElement("button");
    newButton.textContent = "❌";
    newButton.onclick = function(ev){
        console.log("Borrando productos ay lmao");
        const nodes = ev.composedPath();
        let productDel = nodes.find(node => node.nodeName === "DIV").id;
        document.getElementById(productDel).remove();
        products = products.filter(p => p.id != productDel);
        getTotalPrice();
    };

    let nameP = document.createTextNode(copyOfProduct.nameP);
    let price = document.createTextNode(parseFloat(copyOfProduct.price).toFixed(2) + "€");
    let description = document.createTextNode(copyOfProduct.description);

    newProductName.appendChild(nameP);
    newProductPrice.appendChild(price);
    newProductDescription.append(description);
    newDiv.appendChild(newProductName);
    newDiv.appendChild(newProductDescription);
    newDiv.appendChild(newProductPrice);
    newDiv.appendChild(newButton);
    currentDiv.appendChild(newDiv);

}

function getTotalPrice(){

    console.log("Calculando el precio ^^");
    let totalPrice = 0.00;
    let currentPrice = document.getElementById("totalPrice");
    
    products.forEach(element => {
        console.log(parseFloat(element.price));
        totalPrice = totalPrice + parseFloat(element.price);
    });
    
    currentPrice.innerHTML = totalPrice.toFixed(2) + "€";

}
    
function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}