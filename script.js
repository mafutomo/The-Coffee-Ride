$(document).ready(function() {
console.log("ready!")

var $itemName = "";
var itemName = "";
var $itemPrice = "";
var itemPrice = 0;

// Adding Items to Cart
// LIGHT
$('.light-1 a').click(function (event) {


$itemName = $('.card-content').siblings()
console.log($itemName);
itemName = $itemName.slice(0,-14);
console.log(itemName)
$itemPrice = $('.coffee-price').first().text()
itemPrice = Number($itemPrice.replace(/[^0-9\.-]+/g,""));
console.log(itemPrice);
});

$('.light-2 a').click(function (event) {
  $itemName = $('.card-title').first().text()
  console.log($itemName);
  itemName = $itemName.slice(0,-14);
  console.log(itemName)
  $itemPrice = $('.coffee-price').first().text()
  itemPrice = Number($itemPrice.replace(/[^0-9\.-]+/g,""));
  console.log(itemPrice);
});

$('.light-3').click(function () {
console.log("3 clicked!")
});

// MEDIUM
$('.medium-1').click(function () {
console.log("m1 clicked!")
});

$('.medium-2').click(function () {
console.log("m2 clicked!")
});

$('.medium-3').click(function () {
console.log("m3 clicked!")
});

//DARK
$('.dark-1').click(function () {
console.log("d1 clicked!")
});

$('.dark-2').click(function () {
console.log("d2 clicked!")
});

$('.dark-3').click(function () {
console.log("d3 clicked!")
});

$('.dark-4').click(function () {
console.log("d4 clicked!")
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
