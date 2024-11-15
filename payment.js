// Updated payment.js

// Function to get query parameters
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}


// Display product and amount based on query parameters
document.addEventListener('DOMContentLoaded', function() {
  const productName = getQueryParam('product');
  const amount = getQueryParam('price') || getQueryParam('total');

  if (productName) {
    document.getElementById('product-name').textContent = productName;
  } else {
    document.getElementById('product-name').textContent = 'Multiple Items';
  }
  document.getElementById('amount').textContent = Number(amount).toLocaleString();
});

// Simulate UPI payment
function payWithUPI() {
  if (confirm('Do you want to proceed with UPI Payment of ₹' + document.getElementById('amount').textContent + '?')) {
    alert('UPI Payment initiated successfully!');
    // Redirect to a success page or show confirmation message
    window.location.href = 'success.html';
  }
}

// Simulate Wallet payment
function payWithWallet() {
  if (confirm('Do you want to proceed with Wallet Payment of ₹' + document.getElementById('amount').textContent + '?')) {
    // Check if user has sufficient wallet balance (simulation)
    const walletBalance = parseFloat(localStorage.getItem('walletBalance')) || 0;
    const paymentAmount = parseFloat(getQueryParam('price') || getQueryParam('total')) || 0;

    if (walletBalance >= paymentAmount) {
      localStorage.setItem('walletBalance', (walletBalance - paymentAmount).toFixed(2));
      alert('Wallet Payment successful!');
      window.location.href = 'success.html';
    } else {
      alert('Insufficient wallet balance. Please add funds to your wallet or choose another payment method.');
    }
  }
}
