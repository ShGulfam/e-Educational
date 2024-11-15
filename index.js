// Cart Functionality
let cart = [];

// Function to add a product to the cart
function addToCart(productName, productPrice) {
  // Check if product already exists in cart
  const existingProduct = cart.find(item => item.name === productName);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ name: productName, price: productPrice, quantity: 1 });
  }
  updateCartCount();
  alert(`${productName} has been added to your cart!`);
}

// Function to update cart count in the navigation menu
function updateCartCount() {
  document.getElementById('cart-count').innerText = cart.reduce((total, item) => total + item.quantity, 0);
}

// Function to display cart items on cart.html
function displayCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');
  cartItemsContainer.innerHTML = '';
  let cartTotal = 0;

  cart.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    cartTotal += subtotal;
    cartItemsContainer.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>
          <button onclick="changeQuantity(${index}, -1)">-</button>
          ${item.quantity}
          <button onclick="changeQuantity(${index}, 1)">+</button>
        </td>
        <td>${subtotal}</td>
        <td><button onclick="removeFromCart(${index})">Remove</button></td>
      </tr>
    `;
  });

  cartTotalElement.innerText = cartTotal;
  updateCartCount();
}

// Function to change the quantity of a cart item
function changeQuantity(index, delta) {
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  displayCartItems();
}

// Function to remove an item from the cart
function removeFromCart(index) {
  cart.splice(index, 1);
  displayCartItems();
}

// Function to handle checkout
function checkout() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  // For simplicity, redirect to payment page with total amount
  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  window.location.href = `payment.html?total=${encodeURIComponent(totalAmount)}`;
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function() {
  updateCartCount();
  if (window.location.pathname.endsWith('cart.html')) {
    displayCartItems();
  }
});
