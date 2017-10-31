$(document).ready(function() {
console.log("ready!")

$('#shopping-cart').load(function(){
updateModal()
})

var itemName = "";
var itemPrice = 0;
var subtotal = JSON.parse(localStorage.getItem('subtotal')) || 0;
var tax = 1.03;
var total = 0;
var cart = JSON.parse(localStorage.getItem('cart')) || {};
var quantity;



// Function to Update Total
function updateTotal() {
  subtotal += itemPrice;
  total = subtotal * tax;
  localStorage.setItem('subtotal',JSON.stringify(subtotal));
  $("#subtotal").empty().text("Subtotal = "+"$" + subtotal);
  console.log(subtotal)
}

//Function to Update Modal
function updateModal(){
$('#shopping-cart').empty();
    for (let key in cart){
      $('#shopping-cart').append("<tr>" + "<td>" + key + "</td>" + "<td>" + "$" + cart[key][0] + "</td>" + "<td>" + cart[key][1] +"</td>" + "</tr>");
    }
}//end of function


// CLICK EVENT FOR TOP BUTTON
$('.card-content a').click(function (event) {
event.preventDefault();
var $target = $(event.target);
var $itemName = $target.siblings()[0].innerText;
  itemName = $itemName.slice(0,-12);
var $itemPrice = $target.siblings()[2].innerText;
  itemPrice = Number($itemPrice.replace(/[^0-9\.]+/g,""));

updateTotal();

if(cart.hasOwnProperty(itemName) === false) {
  cart[itemName] = [itemPrice,1];
  localStorage.setItem('cart',JSON.stringify(cart));
} else {
  cart[itemName][1]++
  localStorage.setItem('cart',JSON.stringify(cart));
}

updateModal();

});

// CLICK EVENT FOR INNER BUTTON
$('.card-reveal a').click(function (event) {
event.preventDefault();
var $target = $(event.target);
var $itemName =$target.parentsUntil('.card').siblings()[2].innerText;
  itemName = $itemName.slice(0,-5);
var $itemPrice = $target.parents('.card').children().children()[3].innerText;
  itemPrice = Number($itemPrice.replace(/[^0-9\.]+/g,""));


if(cart.hasOwnProperty(itemName) === false) {
  cart[itemName] = [itemPrice,1];
  localStorage.setItem('cart',JSON.stringify(cart));
} else {
  cart[itemName][1]++
  localStorage.setItem('cart',JSON.stringify(cart));
}

updateTotal();
updateModal();

});

//Collapsable Table
$('.collapsible').collapsible();
$('.modal').modal({
});

//STRIPE
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
