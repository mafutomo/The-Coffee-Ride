$('document').ready(function() {

  var subtotal = JSON.parse(localStorage.getItem('subtotal')) || 0;
  var cart = JSON.parse(localStorage.getItem('cart')) || {};
  var tax = 1.03;
  var taxedAmount = (subtotal * tax) - subtotal;
  var total = subtotal + taxedAmount;

  //To update table
  for (let key in cart) {
    $('#cart-final').append(
      "<tr>" +
      "<td>" +
      key +
      "</td>" +
      "<td>" +
      cart[key][1] +
      "</td>" +
      "<td>" +
      "$  " +
      cart[key][0] +
      "</td>" +
      "</tr>");
  }

  //To update subtotal
  $("#subtotal-val").empty().text("$  " + subtotal);

  //To update tax amount
  $("#tax-val").empty().text("$  " + taxedAmount.toFixed(2));

  //To update total amount
  $("#total-val").empty().text("$  " + total.toFixed(2));

  //Clear Cart
  $("#clear-cart").click(function(event) {
    event.preventDefault();
    localStorage.clear();
    location.reload();
  })

  $('.modal').modal();
})
