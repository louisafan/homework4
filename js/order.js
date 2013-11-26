$(function() {
	var vegpies = $('.vegpies');
	var meatpies = $('.meatpies');

	$.each(com.dawgpizza.menu.pizzas, function() {
		var smallpizza = $(document.createElement('button'));
		smallpizza.attr('type', 'button');
		smallpizza.attr('class', 'btn btn-default add-to-cart');
		smallpizza.attr({
			'data-type': this.type,
			'data-name': this.name,
			'data-size': 'small',
			'data-price': this.prices[0]
		});
		smallpizza.html("Small $" + this.prices[0]);

		var medpizza = $(document.createElement('button'));
		medpizza.attr('type', 'button');
		medpizza.attr('class', 'btn btn-default add-to-cart');
		medpizza.attr({
			'data-type': this.type,
			'data-name': this.name,
			'data-size': 'medium',
			'data-price': this.prices[1]
		});
		medpizza.html("Medium $" + this.prices[1]);

		var largepizza = $(document.createElement('button'));
		largepizza.attr('type', 'button');
		largepizza.attr('class', 'btn btn-default add-to-cart');
		largepizza.attr({
			'data-type': this.type,
			'data-name': this.name,
			'data-size': 'large',
			'data-price': this.prices[2]
		});
		largepizza.html("Large $" + this.prices[2]);

		if (this.vegetarian) {
			vegpies.append($(document.createElement('dt')).html(this.name));
			vegpies.append($(document.createElement('dd')).html(this.description));
			vegpies.append(smallpizza);
			vegpies.append(medpizza);
			vegpies.append(largepizza);
		} else {
			meatpies.append($(document.createElement('dt')).html(this.name));
			meatpies.append($(document.createElement('dd')).html(this.description));
			meatpies.append(smallpizza);
			meatpies.append(medpizza);
			meatpies.append(largepizza);
		}
	});

	$.each(com.dawgpizza.menu.drinks, function() {
		var drinklist = $('.drinklist');
		var drinkitem = $(document.createElement('button'));
		drinkitem.attr('type', 'button');
		drinkitem.attr('class', 'btn btn-default add-to-cart');
		drinkitem.attr({
			'data-type': this.type,
			'data-name': this.name,
			'data-price': this.price
		});
		drinkitem.html(this.name + " $" + this.price);
		drinklist.append($(document.createElement('li')).append(drinkitem));
	});

	$.each(com.dawgpizza.menu.desserts, function() {
		var dessertlist = $('.dessertlist');
		var dessertitem = $(document.createElement('button'));
		dessertitem.attr('type', 'button');
		dessertitem.attr('class', 'btn btn-default add-to-cart');
		dessertitem.attr({
			'data-type': this.type,
			'data-name': this.name,
			'data-price': this.price
		});
		dessertitem.html(this.name + " $" + this.price);
		dessertlist.append($(document.createElement('li')).append(dessertitem));
	});

	//create a cart model as a simple object with
	//the properties we eventually need to post to
	//the server
	var cart = {
		name: null,
		address1: null,
		zip: null,
		phone: null,
		items: [] //empty array
	}; //cart data

	//click event handler for all buttons with the
	//style class 'add-to-cart'
	$('.add-to-cart').click(function(){
		//use the attributes on the button to construct
		//a new cart item object that we can add to the
		//cart's items array
		var newCartItem = {
			type: this.getAttribute('data-type'),
			name: this.getAttribute('data-name'),
			size: this.getAttribute('data-size'),
			price: this.getAttribute('data-price')
		};

		//push the new item on to the items array
		cart.items.push(newCartItem);
		renderCart(cart, $('.cart-container'));
	});

	$('.place-order').click(function(){
		var subtotaltemp = $('.subtotal-price');
		if (subtotaltemp < 20.00){
			alert("Orders must be at least $20!");
			return false;
		}

		var req = $('.personal');

		cart.name = input.find('input[name="first-name"]').val();
		cart.address = input.find('input[name="addr-1"]').val();
		cart.zip = input.find('input[name="zip"]').val();
		cart.phone = input.find('input[name="phone"]').val();


		if (cart.name == null || cart.address == null || cart.zip == null || cart.phone == null){
			alert("Please enter required field!");
			return false;
		} else {
			postCart(cart, $('.personal'));
		}
	});
}); // document is ready

// renderCart()
// renders the current cart information to the screen
// parameters are:
//  - cart (object) reference to the cart model
//  - container (jQuery object) reference to the container <div>
//
function renderCart(cart, container) {
	var item;
	var instance;

	//empty the container of whatever is there currently
	container.empty();

	var subtotal = 0;

	//for each item in the cart...
	for (var i = 0; i < cart.items.length; i++) {
		item = cart.items[i];
		instance = $('.templates').clone();
		instance.find('.templateTitle').html(item.name);
		instance.find('.templatePrice').html(item.price);

		subtotal += Number(item.price);
		instance.removeClass('templates');
		container.append(instance);
	}

	var tax = Math.round(subtotal * 9.5) / 100;
	var total = subtotal + tax;

	$('.subtotal-price').empty();
	$('.subtotal-price').append(subtotal);
	$('.tax-price').empty();
	$('.tax-price').append(tax);
	$('.total-price').empty();
	$('.total-price').append(total);

	//TODO: code to render sub-total price of the cart
	//the tax amount (see instructions), 
	//and the grand total

} //renderCart()

$('.remove-item').click(function(){
	var idxToRemove = this.getAttribute('data-index');
	cart.items.splice(idxToRemove, 1);
	renderCart(cart, $('.cart-container'));
}); 

// postCart()
// posts the cart model to the server using
// the supplied HTML form
// parameters are:
//  - cart (object) reference to the cart model
//  - cartForm (jQuery object) reference to the HTML form
//
function postCart(cart, cartForm) {
	//find the input in the form that has the name of 'cart'    
	//and set it's value to a JSON representation of the cart model
	cartForm.find('input[name="cart"]').val(JSON.stringify(cart));

	//submit the form--this will navigate to an order confirmation page
	cartForm.submit();

} //postCart()