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

// Handle form submission to redirect to the payment page with product and price details
document.getElementById('form').addEventListener('submit', function(event) {
  event.preventDefault();
  const product = document.getElementById('product').value;
  const price = document.getElementById('price').value;

  // Redirect to the payment page with query parameters for product and price
  window.location.href = `payment.html?product=${encodeURIComponent(product)}&price=${encodeURIComponent(price)}`;
});

// Function to simulate adding a product to the cart
function addToCart(productName) {
  alert(`${productName} has been added to your cart!`);
}
