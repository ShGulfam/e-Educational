// Function to get query parameters
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Display product and amount based on query parameters
document.addEventListener('DOMContentLoaded', function() {
  const productName = getQueryParam('product');
  const amount = getQueryParam('price');

  document.getElementById('product-name').textContent = `Product: ${productName}`;
  document.getElementById('amount').textContent = `Amount: $${amount}`;
});

// Simulate UPI payment
function payWithUPI() {
  alert('UPI Payment initiated successfully!');
  // Redirect to a success page or show confirmation message
  window.location.href = 'success.html';  // Create this page for payment confirmation
}
