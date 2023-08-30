if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

var reqTot=0;
var reqQua= parseInt(0);


function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked(e) {
    
    e.preventDefault();

    var b = reqTot;
    var c = reqQua
    // console.log(b)
    // console.log(c)

//    url = './form.html?ctp=' + encodeURIComponent(b) +'?%name='+encodeURIComponent(c);
//    url_for('./form.html')
//    document.location.href = url;
// cell1.innerHTML = '<a href={{ url_for('static', filename='') }}' + id + '.txt>' + id + '</a>';

//    $(function()).load(
//        "{{ url_for('static', share = '$url') }}"
//    );
//    $(function(){
//   yourfunction();
//});
    var a = encodeURIComponent(b)
    var b = encodeURIComponent(c)
    const dict_value = {a,b}
    const s = JSON.stringify(dict_value);
    console.log(s)

    $.ajax({
    url : "/settingValue",
    type : "POST",
    contentType : "application/json",
    data : JSON.stringify(s),
    success: function(response) {
            if(response == "Transaction checked continue payment"){
            $('#rsp').empty().append(response).css("color", "green");
            }
            else{
            $('#rsp').empty().append(response).css("color", "red");
            }



        }}
//    success: function (data) {
// success: function(response){
//            $("#rsp").append(response);
//    });
    );

    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    reqQua=0
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('Rs.', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
        var x = parseInt(quantity)
        reqQua += x
        
        
    }
    total = Math.round(total * 100) / 100
    
    reqTot = total;
    document.getElementsByClassName('ctp')[0].innerText = 'Rs.' + total
}

//const conW  = document.getElementById('conWallet');
//conW.addEventListener('click',(e)=>{
//    e.preventDefault();
////    location.href = 'http://connect.chityanj.ml';
//    window.onload('http://connect.chityanj.ml')
//})