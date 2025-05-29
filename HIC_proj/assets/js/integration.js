// integration.js
document.addEventListener('DOMContentLoaded', () => {
    // Find all "Add to Cart" buttons in products.html
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // Attach click event listeners to add products to localStorage
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const product = {
                name: button.dataset.name,
                price: parseFloat(button.dataset.price),
                image: button.dataset.image,
                quantity: 1, // Default quantity
            };
            addToCart(product);
        });
    });

    // Function to add a product to localStorage
    function addToCart(product) {
        // Retrieve the cart from localStorage or initialize an empty array
        const cart = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Check if the product already exists in the cart
        const existingProductIndex = cart.findIndex(item => item.name === product.name);

        if (existingProductIndex !== -1) {
            // If the product exists, increment its quantity
            cart[existingProductIndex].quantity += 1;
        } else {
            // If the product does not exist, add it with quantity = 1
            cart.push({ ...product, quantity: 1 });
        }

        // Update localStorage with the new cart
        localStorage.setItem('cartItems', JSON.stringify(cart));

        // Show a SweetAlert2 popup for confirmation
        Swal.fire({
            icon: 'success',
            title: 'Added to Cart',
            text: `${product.name} has been added to your cart!`,
            confirmButtonText: 'Continue Shopping'
        });
    }
});
