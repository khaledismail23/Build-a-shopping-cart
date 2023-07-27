let products = []

class Product {
  constructor(name, price, quantity, productId, image){
    this.name = name
    this.price = price
    this.quantity = quantity
    this.productId = productId
    this.image = image
  }
}

// quantity will be 0 and if the product in the cart it will increase by 1
// if not the product will be pushed to the cart with the default quantity 1
const cherry = new Product('Carton of Cherries', 4, 1, 1, 'images/cherry.jpg')
const strawberry = new Product('Carton of Strawberries', 5, 1, 2, 'images/strawberry.jpg')
const orange = new Product('Carton of Oranges', 10, 1, 3, 'images/orange.jpg')


products.push(cherry, strawberry, orange)

let cart = []

const getProductById = function(productId, productsList){
  return productsList.find(product => product.productId === productId)
}

const addProductToCart = function(productId){
  // getting product from products using the helper function
  let product = getProductById(productId, products)
  // check if product exists in cart
  let cartItem = cart.find(cartItem => cartItem.productId === product.productId)
  if (cartItem){
    //if product in the cart increase quantity by 1
    cartItem.quantity++
  }else{
    //if product not in the cart add product to cart and quantity will be 1 for the first time
    cart.push(product)
  }
}


const increaseQuantity = function(productId){
  //getting the item from the cart using the helper function
  let cartItem = getProductById(productId, cart)
  //increase quantity by for the cartitem when the function triggerd
  cartItem.quantity++
}


const decreaseQuantity = function(productId){
  //getting the cart item from the cart
  let cartItem = getProductById(productId, cart)
  if (cartItem.quantity === 1){
    // if cart item quantity is 1 call removeProductFunction
    removeProductFromCart(cartItem.productId)
  }else if (cartItem.quantity > 1){
    // if  if cart item quantity is > 1 call decrease quantity by 1
    cartItem.quantity--
  }
}


const removeProductFromCart = function(productId){
  // get cart item index from cart array
  let cartItemIndex = cart.findIndex(cartItem => cartItem.productId === productId)
  // get cart item using the index
  let cartItem = cart[cartItemIndex]
  // set quantity to zero for cart item
  cartItem.quantity = 0
  // remove cart item from cart using index
  let removedItem = cart.splice(cartItemIndex, 1)
}


const cartTotal = function () {
  //creat a new array of total fot each item then total is calculated
  let total = cart.map(cartItem => cartItem.price * cartItem.quantity).reduce((acc, curr) => acc += curr ,0)
  return total
}


const emptyCart = function(){
  // remove all cart items from cart
  cart.splice(0, cart.length)
}


let totalPaid = 0
const pay = function (amount) {
  totalPaid += amount
  let remaining = totalPaid - cartTotal()
  if (remaining >= 0){
    totalPaid = 0
  }
  return remaining
}


module.exports = {
  products,
  cart,
  addProductToCart,
  increaseQuantity,
  decreaseQuantity,
  removeProductFromCart,
  cartTotal,
  pay, 
  emptyCart,
  /* Uncomment the following line if completing the currency converter bonus */
  // currency
}