function add (x,y) {
  return x + y;
}

function updateTotalVal(subtotal,itemPrice,tax) {
  subtotal += itemPrice;
  total = subtotal * tax;
  localStorage.setItem('subtotal',JSON.stringify(subtotal));
  $("#subtotal").empty().text("Subtotal = "+"$" + subtotal);
  return parseInt(total);
}

//Begin doc ready

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

//Function to Update Cart Page
function updateCart() {
  $('#cart-final').empty();
  for (let key in cart){
    $('#cart-final').append("<tr>" + "<td>" + key + "</td>" + "<td>" + "$" + cart[key][0] + "</td>" + "<td>" + cart[key][1] +"</td>" + "</tr>");
  }
}


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

 $('.modal').modal();

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



});
