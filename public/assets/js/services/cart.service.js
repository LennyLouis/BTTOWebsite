App.factory('Cart', function($log){

	var current_cart = Cart.getCart();

	var Cart = { 
		addProduct: function(product){
			product.quantity = 1;
			current_cart.push(product);
			localStorage.setItem('cart', JSON.stringify(current_cart));
		},
		getCart: function(){
			if(localStorage.getItem('cart')!=null){
				return JSON.parse(localStorage.getItem('cart'));
			}
			else{
				return [];
			}
		},
		emptyCart: function(){
			localStorage.removeItem('cart');
		}
	};

	return Cart;
});