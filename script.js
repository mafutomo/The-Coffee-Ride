var itemName = "";
var itemPrice = 0;
var subtotal = JSON.parse(localStorage.getItem('subtotal')) || 0;
var tax = 1.03;
var total = 0;
var cart = JSON.parse(localStorage.getItem('cart')) || {};

//Function to update totals
function updateTotalVal(itemPrice,tax) {
  subtotal += itemPrice;
  total = subtotal * tax;
  localStorage.setItem('subtotal',JSON.stringify(subtotal));
  $("#subtotal").empty().text("Subtotal = "+"$" + subtotal);
  return (total > subtotal);
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

//Begin doc ready
$(document).ready(function() {
console.log("ready!")

$('#shopping-cart').load(function(){
updateModal()
})


// CLICK EVENT FOR TOP BUTTON
$('.card-content a').click(function (event) {
event.preventDefault();
var $target = $(event.target);
var $itemName = $target.siblings()[0].innerText;
  itemName = $itemName.slice(0,-12);
var $itemPrice = $target.siblings()[2].innerText;
  itemPrice = Number($itemPrice.replace(/[^0-9\.]+/g,""));

  updateTotalVal(itemPrice,tax)

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

updateTotalVal(itemPrice,tax)

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


});
