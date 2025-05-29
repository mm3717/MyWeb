document.addEventListener('DOMContentLoaded', () => {
    const summaryItemsContainer = document.getElementById('summary-items');
    const orderTotalElement = document.getElementById('order-total');
    const shippingMessage = document.getElementById('shipping-message');
    const discountCodeInput = document.getElementById('discount-code');
    const applyDiscountButton = document.getElementById('apply-discount');
    const checkoutForm = document.getElementById('checkout-form');

    // Load cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let total = 0;
    let discountApplied = false;

    // Render cart items in the order summary
    cartItems.forEach(item => {
        const summaryItem = document.createElement('div');
        summaryItem.classList.add('summary-item');
        summaryItem.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;">
                <p>${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        `;

        summaryItemsContainer.appendChild(summaryItem);
        total += item.price * item.quantity;
    });

    // Calculate and display shipping message
    const updateShipping = () => {
        if (total >= 50) {
            shippingMessage.textContent = 'Congratulations! You qualify for free shipping.';
        } else {
            shippingMessage.textContent = 'Orders below $50 include a $10 shipping fee.';
            total += 10; // Add base shipping fee
        }
        orderTotalElement.textContent = total.toFixed(2);
    };

    // Apply discount code
    applyDiscountButton.addEventListener('click', () => {
        const discountCode = discountCodeInput.value.trim();
        if (discountCode === 'HATS20' && !discountApplied) {
            total *= 0.8; // Apply 20% discount
            discountApplied = true;
            Swal.fire({
                icon: 'success',
                title: 'Discount Applied!',
                text: 'You received 20% off your order!',
                confirmButtonText: 'OK'
            });
        } else if (discountApplied) {
            Swal.fire({
                icon: 'info',
                title: 'Discount Already Applied',
                text: 'You have already applied the discount code.',
                confirmButtonText: 'OK'
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Code',
                text: 'Please enter a valid discount code.',
                confirmButtonText: 'Try Again'
            });
        }
        orderTotalElement.textContent = total.toFixed(2);
    });

    // Update shipping and total on page load
    updateShipping();

    // Handle form submission
    checkoutForm.addEventListener('submit', (event) => {
        event.preventDefault();
        Swal.fire({
            icon: 'success',
            title: 'Order Placed!',
            text: 'Thank you for your purchase. Your order is on its way!',
            confirmButtonText: 'Return to Home'
        }).then(() => {
            localStorage.removeItem('cartItems'); // Clear cart
            window.location.href = 'home.html'; // Redirect to home
        });
    });
});
