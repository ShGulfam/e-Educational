// index.js

// Function to open the order form popup and fill product info
function openOrderPopup(productName, productPrice) {
  document.getElementById('product').value = productName;
  document.getElementById('price').value = productPrice;
  document.getElementById('order-popup').style.display = 'flex';
}


// Function to close the order form popup
function closeOrderPopup() {
  document.getElementById('order-popup').style.display = 'none';
}

// Handle order form submission to redirect to the payment page with product and price details
document.getElementById('order-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const product = document.getElementById('product').value;
  const price = document.getElementById('price').value;

  // Redirect to the payment page with query parameters for product and price
  window.location.href = `payment.html?product=${encodeURIComponent(product)}&price=${encodeURIComponent(price)}`;
});

// Function to simulate adding a product to the cart
function addToCart(productName, productPrice) {
  // Check if cart exists in localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  // Check if product already exists in cart
  const existingProduct = cart.find(item => item.name === productName);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ name: productName, price: productPrice, quantity: 1 });
  }
  // Update cart in localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${productName} has been added to your cart!`);
}

// Function to update cart count in the navigation menu
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  document.getElementById('cart-count').innerText = cart.reduce((total, item) => total + item.quantity, 0);
}

// Function to display cart items on cart.html
function displayCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cartItemsContainer.innerHTML = '';
  let cartTotal = 0;

  cart.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    cartTotal += subtotal;
    cartItemsContainer.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>₹${item.price}</td>
        <td>
          <button onclick="changeQuantity(${index}, -1)">-</button>
          ${item.quantity}
          <button onclick="changeQuantity(${index}, 1)">+</button>
        </td>
        <td>₹${subtotal}</td>
        <td><button onclick="removeFromCart(${index})">Remove</button></td>
      </tr>
    `;
  });

  cartTotalElement.innerText = cartTotal;
  updateCartCount();
}

// Function to change the quantity of a cart item
function changeQuantity(index, delta) {
  let cart = JSON.parse(localStorage.getItem('cart'));
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCartItems();
}

// Function to remove an item from the cart
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart'));
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCartItems();
}

// Function to handle checkout
function checkout() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  // Calculate total amount
  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  // Redirect to the payment page with total amount
  window.location.href = `payment.html?total=${encodeURIComponent(totalAmount)}`;
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function() {
  updateCartCount();
  if (window.location.pathname.endsWith('cart.html')) {
    displayCartItems();
  }
});

// Function to show help popups
function showPopup(message) {
  document.getElementById('popup-text').innerText = message;
  document.getElementById('popup').style.display = 'flex';
}

// Function to close help popup
function closePopup() {
  document.getElementById('popup').style.display = 'none';
}

// Newsletter form submission
document.getElementById('newsletter-form').addEventListener('submit', function(event) {
  event.preventDefault();
  alert('Thank you for subscribing to our newsletter!');
  document.getElementById('newsletter-form').reset();
});
