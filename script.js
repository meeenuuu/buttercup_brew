window.onload = function() {
    alert("Welcome to Buttercup Brews Cafe! Enjoy your visit.");
};

const coffeeQuotes = [
    "Coffee is always a good idea.",
    "Life begins after coffee.",
    "Espresso yourself!",
    "A yawn is a silent scream for coffee!",
    "Brew-tiful mornings start with coffee.",
    "Coffee solves everything."
];

function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * coffeeQuotes.length);
    document.getElementById("quoteDisplay").innerText = coffeeQuotes[randomIndex];
}

document.addEventListener("DOMContentLoaded", () => {
    updateTotalPrice();

   
    document.querySelectorAll("#coffeeType, #coffeeSize, input[type='checkbox'], #quantity").forEach(input => {
        input.addEventListener("change", updateTotalPrice);
    });
});

function updateTotalPrice() {
    let basePrice = parseFloat(document.querySelector("#coffeeType").selectedOptions[0].dataset.price) || 0;
    let sizeMultiplier = parseFloat(document.querySelector("#coffeeSize").selectedOptions[0].dataset.multiplier) || 1;
    let extras = Array.from(document.querySelectorAll("input[type='checkbox']:checked")).reduce((sum, extra) => sum + parseFloat(extra.dataset.price), 0);
    let quantity = parseInt(document.querySelector("#quantity").value) || 1;

    let totalPrice = ((basePrice * sizeMultiplier) + extras) * quantity;
    document.querySelector("#totalPrice").textContent = totalPrice.toFixed(2);
}

let cart = [];

function addToCart() {
    let coffeeType = document.querySelector("#coffeeType").value;
    let size = document.querySelector("#coffeeSize").value;
    let extras = Array.from(document.querySelectorAll("input[type='checkbox']:checked")).map(extra => {
        
        let labelText = extra.nextSibling.textContent || extra.nextSibling.nodeValue || "";
        return labelText.trim();
    });
    let quantity = parseInt(document.querySelector("#quantity").value) || 1;
    let totalPrice = parseFloat(document.querySelector("#totalPrice").textContent) || 0;

    let order = { coffeeType, size, extras, quantity, totalPrice };
    cart.push(order);
    updateCart();
}

function updateCart() {
    let cartList = document.querySelector("#cartItems");
    cartList.innerHTML = "";
    let grandTotal = 0;

    cart.forEach((item, index) => {
        let extrasText = item.extras.length ? `(${item.extras.join(", ")})` : "";
        let listItem = document.createElement("li");
        listItem.textContent = `${item.quantity}x ${item.size} ${item.coffeeType} ${extrasText} - Rs ${item.totalPrice.toFixed(2)}`;

        let removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.className = "remove-btn";
        removeBtn.onclick = () => {
            cart.splice(index, 1);
            updateCart();
        };

        listItem.appendChild(removeBtn);
        cartList.appendChild(listItem);

        grandTotal += item.totalPrice;
    });

    document.querySelector("#grandTotal").textContent = grandTotal.toFixed(2);
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert("Thank you for your order! Your coffee is being prepared.");
        cart = [];
        updateCart();
    }
}


function validateForm(event) {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        alert("Please fill in all fields.");
        return false;
    }
    
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    alert("Message sent successfully!");
    
    event.target.reset();
    return true;
}
