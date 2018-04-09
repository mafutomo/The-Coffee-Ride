var itemName = "";
var itemPrice = 0;
var subtotal = JSON.parse(localStorage.getItem('subtotal')) || 0;
var tax = 1.03;
var total = 0;
var cart = JSON.parse(localStorage.getItem('cart')) || {};

//Function to update totals
function updateTotalVal(itemPrice, tax) {
  subtotal += itemPrice;
  total = subtotal * tax;
  localStorage.setItem('subtotal', JSON.stringify(subtotal));
  $("#subtotal").empty().text(`Subtotal :  $${subtotal}`);
  return (total > subtotal);
}

//Function to Update Modal
function updateModal() {
  $('#shopping-cart').empty();
  for (let key in cart) {
    $('#shopping-cart').append(
      `<tr>
      <td>
      ${key}
      </td>
      <td>
      ${cart[key][1]}
      </td>
      <td>
      $
      ${cart[key][0].toFixed(2)}
      </td>
      </tr>`
    );
  }
}

//Begin doc ready
$(document).ready(function() {
  $('#shopping-cart').load(function() {
    updateModal()
  })

  $('.card-content a').click(function(event) {
    event.preventDefault();
    //Gathering selected content Coffee Name and the Price
    var $target = $(event.target);
    var $itemName = $target.siblings()[0].innerText;
    itemName = $itemName.slice(0, -12);
    var $itemPrice = $target.siblings()[2].innerText;
    itemPrice = Number($itemPrice.replace(/[^0-9\.]+/g, ""));

    updateTotalVal(itemPrice, tax)

    //If the item already exists, then add the quantity. If not create a new key value pair
    if (cart.hasOwnProperty(itemName) === false) {
      cart[itemName] = [itemPrice, 1];
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      cart[itemName][1]++
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    updateModal();
  });

  $('.card-reveal a').click(function(event) {

    event.preventDefault();

    var $target = $(event.target);
    console.log("TARGET from card-reveal", $target);
    var $itemName = $target.parentsUntil('.card').siblings()[2].innerText;
    itemName = $itemName.slice(0, -5);
    var $itemPrice = $target.parents('.card').children().children()[3].innerText;
    itemPrice = Number($itemPrice.replace(/[^0-9\.]+/g, ""));
    updateTotalVal(itemPrice, tax)
    if (cart.hasOwnProperty(itemName) === false) {
      cart[itemName] = [itemPrice, 1];
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      cart[itemName][1]++
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    updateModal();
  });

  $('.modal').modal();
});
