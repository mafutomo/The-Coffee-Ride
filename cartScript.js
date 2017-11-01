$('document').ready(function(){

console.log('ready!')

var subtotal = JSON.parse(localStorage.getItem('subtotal')) || 0;
var cart = JSON.parse(localStorage.getItem('cart')) || {};
var tax = 1.03;
var taxedAmount = (subtotal * tax) - subtotal;
var total = subtotal + taxedAmount;

//To update table

    for (let key in cart){
      $('#cart-final').append("<tr>" + "<td>" + key + "</td>" + "<td>" + "$" + cart[key][0] + "</td>" + "<td>" + cart[key][1] +"</td>" + "</tr>");
    }

//To update subtotal

  $("#subtotal-val").empty().text("$" + subtotal);

//To update tax amount
$("#tax-val").empty().text("$" + taxedAmount.toFixed(2));


//To update total amount
$("#total-val").empty().text("$" + total.toFixed(2));

$("#checkout_button").click(function(event) {
  let $name = $("#name").val();
  let $phone = $("#phone").val().split("-").join("");
  let $streetAddress = $("#street-address").val();
  let $city = $("#city").val();
  let $state = $("#state").val();
  let $zip = $("#zip").val();

  console.log(parseInt($phone));
  console.log(isNaN(parseInt($phone)));

  if (total === 0) {
    Materialize.toast('Please add items to your cart!', 4000)

  } else if ($name === "") {

    Materialize.toast('Please fill out your name', 4000)

  } else if ($phone.length !== 10) {

    Materialize.toast('Please enter a valid phone number', 4000)

  } else if ($phone === "") {

    Materialize.toast('Please enter a phone number', 4000)

  } else if ($streetAddress === "" || $city === "" || $state === "" || $zip === "") {

    Materialize.toast('One or more of your address information is not complete', 4000)

  } else if ($zip.length !== 5) {

    Materialize.toast('Please enter a valid zipcode', 4000)

  } else {
    Materialize.toast('Order Received!', 4000);
    console.log("NOT zero!");
  }

}); //end of submit click


})
