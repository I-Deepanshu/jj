// Add product to cart
function addToCart(productName, productPrice) {
    // Convert productPrice to a number in case it's passed as a string
    productPrice = parseFloat(productPrice);

    // Get the cart from local storage or initialize an empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Add the product to the cart
    cart.push({ name: productName, price: productPrice });

    // Save the updated cart back to local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart total
    updateCartTotal();

    // Notify user that the product has been added to the cart (optional)
    alert(`${productName} has been added to your cart.`);
}

// Update the cart total on the cart page
function updateCartTotal() {
    // Get the cart from local storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Calculate the total price
    let total = cart.reduce((sum, product) => sum + product.price, 0);

    // Update the total on the page
    document.getElementById('cart-total').textContent = '$' + total.toFixed(2);

    // Update the cart items display
    displayCartItems();
}

// Display cart items on the cart page
function displayCartItems() {
    // Get the cart from local storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Get the cart items container
    let cartItemsContainer = document.getElementById('cart-items');

    // Clear any existing items
    cartItemsContainer.innerHTML = '';

    // Loop through each item in the cart and display it
    cart.forEach((product, index) => {
        let itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <span>${product.name}</span>
            <span>$${product.price.toFixed(2)}</span>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });
}

// Remove a product from the cart
function removeFromCart(index) {
    // Get the cart from local storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Remove the item at the given index
    cart.splice(index, 1);

    // Save the updated cart back to local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart total
    updateCartTotal();
}

// Call this function when the cart page loads to initialize the cart display and total
document.addEventListener('DOMContentLoaded', updateCartTotal);
