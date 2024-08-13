// Array to hold cart items
let cart = [];

// Function to add item to cart
function addToCart(name, price) {
    // Create a cart item object
    const cartItem = {
        name: name,
        price: price
    };

    // Add item to cart array
    cart.push(cartItem);

    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Alert the user
    alert(`${name} has been added to your cart.`);

    // Update cart count (optional)
    updateCartCount();
}

// Function to update cart count
function updateCartCount() {
    const cartCount = cart.length;
    document.querySelector('.cart-icon').setAttribute('data-count', cartCount);
}

// Function to load cart from localStorage
function loadCart() {
    // Get cart from localStorage
    const storedCart = localStorage.getItem('cart');

    if (storedCart) {
        cart = JSON.parse(storedCart);
    }

    // Display cart items
    displayCartItems();
}

// Function to display cart items in the cart page
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmountElement = document.getElementById('total-amount');
    let totalAmount = 0;

    // Clear the current items
    cartItemsContainer.innerHTML = '';

    // Add each item to the cart display
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <p>${item.name}</p>
            <p>$${item.price}</p>
        `;
        cartItemsContainer.appendChild(itemElement);

        // Add to total amount
        totalAmount += item.price;
    });

    // Update total amount
    totalAmountElement.innerText = totalAmount.toFixed(2);
}

// Function for checkout (just a placeholder)
function checkout() {
    alert('Proceeding to checkout...');
    // Implement checkout logic here
}

// Load cart on page load
window.onload = function() {
    loadCart();
    updateCartCount();
}
