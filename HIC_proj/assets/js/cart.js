document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const checkoutButton = document.getElementById('checkout-btn');
    const cartTotalElement = document.getElementById('cart-total'); // Element to display the total

    // Get cart items from local storage or initialize an empty array
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Function to calculate and display the cart total
    const updateCartTotal = () => {
        const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
    };

    // Render cart items dynamically
    const renderCart = () => {
        cartItemsContainer.innerHTML = '';
        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            checkoutButton.style.display = 'none';
            cartTotalElement.textContent = 'Total: $0.00'; // Reset total to $0.00
        } else {
            checkoutButton.style.display = 'block';
            cartItems.forEach((item, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('cart-item');
                itemDiv.innerHTML = `
                    <div>
                        <img src="${item.image}" alt="${item.name}" style="width:100px;height:auto;">
                        <p>${item.name}</p>
                        <p>Price: $${item.price}</p>
                        <p>Quantity: ${item.quantity}</p>
                    </div>
                    <button class="remove-btn" data-index="${index}">Remove</button>
                `;
                cartItemsContainer.appendChild(itemDiv);
            });
        }
        updateCartTotal(); // Update the cart total whenever the cart is rendered
    };

    // Remove item from cart
    const removeItem = (index) => {
        cartItems.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCart();

        // Explicitly update the cart total if the cart becomes empty
        if (cartItems.length === 0) {
            cartTotalElement.textContent = 'Total: $0.00';
        }
    };

    // Add event listener for remove buttons
    cartItemsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-btn')) {
            const index = event.target.dataset.index;
            removeItem(index);
        }
    });

    // Render cart on page load
    renderCart();
});
