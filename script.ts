// scripts.js

// Function to add product to cart
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

// Event listener for the "Add to Cart" button
document.getElementById('add-to-cart-btn').addEventListener('click', function() {
    // Example product details (you might want to get these dynamically)
    let productId = 'saree1';  // Unique product identifier
    let productName = 'Designer Saree';
    let productPrice = 99.99;

    addToCart(productId, productName, productPrice);
});
