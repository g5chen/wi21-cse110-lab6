// Script.js
stored = window.localStorage;
var productList = document.getElementById('product-list');
window.addEventListener('DOMContentLoaded', () => {
  var cartCount = document.getElementById('cart-count');
 if (stored.getItem('products') == null) {
  fetch('https://fakestoreapi.com/products')
   .then(response => response.json())
   .then(data => {
        stored.setItem('products', JSON.stringify(data));
        var parsed = JSON.parse(stored.getItem('products'));
        for (var i = 0; i < parsed.length; i++){
          var current = new ProductItem(parsed[i]);
          productList.appendChild(current);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
 }else{
    var parsed = JSON.parse(stored.getItem('products'));
    for (var i = 0; i < parsed.length; i++){
      var current = new ProductItem(parsed[i]);
      productList.appendChild(current);
    }
  }
  if (stored.getItem('cartProducts') == null){
		stored.setItem('cartProducts', JSON.stringify([]))
  }
});