// product-item.js

class ProductItem extends HTMLElement {
  constructor(i){
     super();
     this.attachShadow({mode: 'open'});
     var title = i['title'];
     var itemId = i['id'];
     var imageURL = i['image'];
     var imageAlt = i['title'];
     var price = i['price'];
     var productJson = JSON.parse(window.localStorage.getItem('products'));
     var cartCount = document.getElementById('cart-count');
     var cartProducts = JSON.parse(window.localStorage.getItem('cartProducts'));
   
     var li = document.createElement('li');
     this.shadowRoot.appendChild(li);
     li.setAttribute('class', 'product');
   
     var img = document.createElement('img');
     li.appendChild(img);
     img.setAttribute('src', imageURL);
     img.setAttribute('alt', imageAlt);
     img.setAttribute('width', 200);
   
     var p1 = document.createElement('p');
     li.appendChild(p1);
     p1.setAttribute('class', 'title');
     p1.textContent = title;
   
     var p2 = document.createElement('p');
     li.appendChild(p2);
     p2.setAttribute('class', 'price');
     p2.textContent = '$' + price;
   
     var button = document.createElement('button');
     li.appendChild(button);
     if (cartProducts.includes(itemId)){
       button.textContent = "Remove from Cart";
     }else{
       button.textContent = "Add to Cart";
     }
     button.addEventListener('click', function(){
       if (button.textContent == "Add to Cart"){
     cartProducts = JSON.parse(window.localStorage.getItem('cartProducts'));
     button.textContent = "Remove from Cart";
     cartCount.textContent = parseInt(cartCount.textContent) + 1;
     cartProducts.push(itemId);
     window.localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
     console.log('added ' + title);
    }else{
     cartProducts = JSON.parse(window.localStorage.getItem('cartProducts'));
     button.textContent = "Add to Cart";
     cartCount.textContent = parseInt(cartCount.textContent) - 1;
     cartProducts.splice(cartProducts.indexOf(itemId), 1);
     window.localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
     console.log('removed ' + title);
    }
     }); 
     var stylesheet = document.createElement('style');
     this.shadowRoot.appendChild(stylesheet);
   stylesheet.textContent = `
 .price {
  color: green;
  font-size: 1.8em;
  font-weight: bold;
  margin: 0;
 }
 .product {
  align-items: center;
  background-color: white;
  border-radius: 5px;
  display: grid;
  grid-template-areas: 
  'image'
  'title'
  'price'
  'add';
  grid-template-rows: 67% 11% 11% 11%;
  height: 450px;
  filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
  margin: 0 30px 30px 0;
  padding: 10px 20px;
  width: 200px;
 }
 .product > button {
  background-color: rgb(255, 208, 0);
  border: none;
  border-radius: 5px;
  color: black;
  justify-self: center;
  max-height: 35px;
  padding: 8px 20px;
  transition: 0.1s ease all;
 }
 .product > button:hover {
  background-color: rgb(255, 166, 0);
  cursor: pointer;
  transition: 0.1s ease all;
 }
 .product > img {
  align-self: center;
  justify-self: center;
  width: 100%;
 }
 .title {
  font-size: 1.1em;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
 }
 .title:hover {
  font-size: 1.1em;
  margin: 0;
  white-space: wrap;
  overflow: auto;
  text-overflow: unset;
 }`;
   
  }
 }
 customElements.define('product-item', ProductItem);