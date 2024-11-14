// Function to display the order form and fill product info
function orderProduct(productName, productPrice) {
  document.getElementById('order-form').style.display = 'block';
  document.getElementById('product').value = productName;
  document.getElementById('price').value = productPrice;
}

// Add event listener for the form
document.getElementById('form').addEventListener('submit', function(event) {
  event.preventDefault();
  const product = document.getElementById('product').value;
  const price = document.getElementById('price').value;

  // Redirect to the payment page with product and price as query parameters
  window.location.href = `payment.html?product=${encodeURIComponent(product)}&price=${encodeURIComponent(price)}`;
});
