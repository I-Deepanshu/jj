// scripts.js

// Load cart items from localStorage and display them
function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItemsContainer = document.getElementById('cart-items');
    let cartTotal = 0;

    cartItemsContainer.innerHTML = ''; // Clear existing content

    cart.forEach(item => {
        let itemTotal = item.price * item.quantity;
        cartTotal += itemTotal;

        let cartItem = `
            <div class="cart-item">
                <h4>${item.name}</h4>
                <p>Price: $${item.price.toFixed(2)}</p>
                <p>Quantity: 
                    <input type="number" value="${item.quantity}" min="1" data-id="${item.id}" class="quantity-input">
                </p>
                <p>Total: $${itemTotal.toFixed(2)}</p>
                <button class="btn remove-btn" data-id="${item.id}">Remove</button>
            </div>
        `;

        cartItemsContainer.innerHTML += cartItem;
    });

    document.getElementById('cart-total').innerText = cartTotal.toFixed(2);

    // Attach event listeners for quantity change and remove buttons
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', updateQuantity);
    });
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}

// Update cart item quantity
function updateQuantity(event) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let productId = event.target.getAttribute('data-id');
    let newQuantity = parseInt(event.target.value);

    cart = cart.map(item => {
        if (item.id === productId) {
            item.quantity = newQuantity;
        }
        return item;
    });

    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart(); // Reload cart to reflect changes
}

// Remove item from cart
function removeFromCart(event) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let productId = event.target.getAttribute('data-id');

    cart = cart.filter(item => item.id !== productId);

    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart(); // Reload cart to reflect changes
}

// Function to add product to cart (same as before)
function addToCart(productId, productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product is already in cart
    let existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
}

// Load the cart when the cart page is loaded
if (document.getElementById('cart-items')) {
    loadCart();
}
