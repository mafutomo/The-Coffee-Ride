$(document).ready(function() {

  var stripeTokenID = "";

  var utcSeconds = 1234567890;
  var d = new Date(0);
  d.setUTCSeconds(utcSeconds);

  function stripeTokenHandler(token) {
    // Insert the token ID into the form so it gets submitted to the server
    var form = document.getElementById('payment-form');
    var hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'stripeToken');
    hiddenInput.setAttribute('value', token.id);
    form.appendChild(hiddenInput);
    alert('Your order has been received! \n \nYour Purchase ID is =\n' + stripeTokenID)
  }



  //STRIPE
  var stripe = Stripe('pk_test_tYEpLQtxS7g099ysYO8jRShL');
  var elements = stripe.elements();
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
  var card = elements.create('card', {
    style: style
  });
  // Add an instance of the card Element into the `card-element` <div>
  card.mount('#card-element');
  // Handle real-time validation errors from the card Element.
  card.addEventListener('change', function(event) {
    var displayError = document.getElementById('card-errors');
    if (event.error) {
      displayError.textContent = event.error.message;
      Materialize.toast('Please enter a valid credit card', 4000);
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
        stripeTokenID = result.token.id
        stripeTokenHandler(result.token);
      }
    });
  });


  $("#phone").keyup(function() {
    $(this).val($(this).val().replace(/(\d{3})\-?(\d{3})\-?(\d{4})/, '$1-$2-$3'))
  });

  $("#checkout_button").click(function(event) {
    let $name = $("#name").val();
    let $phone = $("#phone").val().split("-").join("");
    let $streetAddress = $("#street-address").val();
    let $city = $("#city").val();
    let $state = $("#state").val();
    let $zip = $("#zip").val();
    if ($name === "") {
      Materialize.toast('Please fill out your name', 4000)
    } else if ($phone.length !== 10) {
      Materialize.toast('Please enter a valid phone number', 4000)
    } else if ($phone === "") {
      Materialize.toast('Please enter a phone number', 4000)
    } else if ($streetAddress === "" || $city === "" || $state === "" || $zip === "") {
      Materialize.toast('One or more of your address information is not complete', 4000)
    } else if ($zip.length !== 5) {
      Materialize.toast('Please enter a valid zipcode', 4000)
    }
  });

});
