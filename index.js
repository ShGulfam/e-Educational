// Define the version of the Google Pay API
const baseRequest = {
  apiVersion: 2,
  apiVersionMinor: 0
};

// Define the allowed payment methods
const allowedCardNetworks = ["AMEX", "DISCOVER", "JCB", "MASTERCARD", "VISA"];
const allowedCardAuthMethods = ["PAN_ONLY", "CRYPTOGRAM_3DS"];

// Define the tokenization specification
const tokenizationSpecification = {
  type: 'PAYMENT_GATEWAY',
  parameters: {
    'gateway': 'example',
    'gatewayMerchantId': 'exampleGatewayMerchantId'
  }
};

// Define the payment method
const baseCardPaymentMethod = {
  type: 'CARD',
  parameters: {
    allowedAuthMethods: allowedCardAuthMethods,
    allowedCardNetworks: allowedCardNetworks
  }
};

// Combine the payment method with the tokenization specification
const cardPaymentMethod = Object.assign(
  {},
  baseCardPaymentMethod,
  {
    tokenizationSpecification: tokenizationSpecification
  }
);

// Define the merchant information
const merchantInfo = {
  merchantName: 'Computer & Software Store'
};

// Initialize the Google Pay API client
const paymentsClient = new google.payments.api.PaymentsClient({ environment: 'TEST' });

// Function to show the order form and populate product info
function orderProduct(productName, productPrice) {
  document.getElementById('order-form').style.display = 'block';
  document.getElementById('product').value = productName;
  document.getElementById('price').value = productPrice;
  addGooglePayButton();
}

// Add the Google Pay button to the page
function addGooglePayButton() {
  const button = paymentsClient.createButton({
    onClick: onGooglePayButtonClicked
  });
  document.getElementById('container').appendChild(button);
}

// Handle the Google Pay button click
function onGooglePayButtonClicked() {
  const paymentDataRequest = Object.assign({}, baseRequest, {
    allowedPaymentMethods: [cardPaymentMethod],
    transactionInfo: getTransactionInfo(),
    merchantInfo: merchantInfo
  });

  paymentsClient.loadPaymentData(paymentDataRequest)
    .then(function(paymentData) {
      processPayment(paymentData);
    })
    .catch(function(err) {
      console.error('Error loading payment data:', err);
    });
}

// Get transaction information
function getTransactionInfo() {
  const price = document.getElementById('price').value;
  return {
    totalPriceStatus: 'FINAL',
    totalPrice: price,
    currencyCode: 'USD'
  };
}

// Process the payment data
function processPayment(paymentData) {
  // Extract the payment token
  const paymentToken = paymentData.paymentMethodData.tokenizationData.token;

  // Send the payment token to your server for processing
  // Example:
  // fetch('/process-payment', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({ token: paymentToken })
  // }).then(function(response) {
  //   // Handle the server response
  // }).catch(function(err) {
  //   console.error('Error processing payment:', err);
  // });
}
