$(document).ready(function() {
console.log("ready!")

var itemName = "";
var itemPrice = 0;


// Adding Items to Cart
// LIGHT


$('.card-content a').click(function (event) {
event.preventDefault();

var $target = $(event.target);
var $itemName = $target.siblings()[0].innerText;
itemName = $itemName.slice(0,-12);
console.log('itemName =', itemName);
var $itemPrice = $target.siblings()[2].innerText;
var itemPrice = Number($itemPrice.replace(/[^0-9\.]+/g,""));

console.log('itemPrice = ',itemPrice);


});

$('.card-reveal a').click(function (event) {
event.preventDefault();
console.log("I'm clicked!");

var $target = $(event.target);
var $itemName = $target.parentsUntil('.card').siblings()[2].innerText;
itemName = $itemName.slice(0,-5);

console.log('itemName = ', itemName);

console.log($target.parentsUntil('.card-image'));



});






$('.collapsible').collapsible();
$('.modal').modal({

});




//Collapsable Table

  // Create a Stripe client
  var stripe = Stripe('pk_test_tYEpLQtxS7g099ysYO8jRShL');

  // Create an instance of Elements
  var elements = stripe.elements();

  // Custom styling can be passed to options when creating an Element.
  // (Note that this demo uses a wider set of styles than the guide below.)
  var style = {
    base: {
      color: '#32325d',
      lineHeight: '24px',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  };

  // Create an instance of the card Element
  var card = elements.create('card', {style: style});

  // Add an instance of the card Element into the `card-element` <div>
  card.mount('#card-element');

  // Handle real-time validation errors from the card Element.
  card.addEventListener('change', function(event) {
    var displayError = document.getElementById('card-errors');
    if (event.error) {
      displayError.textContent = event.error.message;
    } else {
      displayError.textContent = '';
    }
  });

  // Handle form submission
  var form = document.getElementById('payment-form');
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    stripe.createToken(card).then(function(result) {
      if (result.error) {
        // Inform the user if there was an error
        var errorElement = document.getElementById('card-errors');
        errorElement.textContent = result.error.message;
      } else {
        // Send the token to your server
        stripeTokenHandler(result.token);
      }
    });
  });



});
