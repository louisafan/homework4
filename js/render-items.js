$(function() {
	var current = new Date();
	var title = $('.time-specific-message');
	var message = $('.btn-lg')

	if (current.getDay() == 6) {
		title.append("Closed on Sundays")
		message.append("See Our Menu")
	}
	if (current.getHours() < 10 || current.getHours() > 22) {
		title.append("Closed for the night")
		message.append("See Our Menu")
	}
	else {
		title.append("Dawg Pizza is OPEN NOW!")
		message.append("Place Order!")
	}

	var veg = $('.veg');
	var meat = $('.meat');

	$.each(com.dawgpizza.menu.pizzas, function() {
		if (this.vegetarian) {
			veg.append($(document.createElement('dt')).html(this.name));
			veg.append($(document.createElement('dd')).html(this.description));
			var price = "$" + this.prices[0];
			for (var i = 1; i < this.prices.length; i++) {
				price += "/$" + this.prices[i];
			}
			veg.append(price);
		} else {
			meat.append($(document.createElement('dt')).html(this.name));
			meat.append($(document.createElement('dd')).html(this.description));
			var price = "$" + this.prices[0];
			for (var i = 1; i < this.prices.length; i++) {
				price += "/$" + this.prices[i];
			}
			meat.append(price);
		}
	});

	$.each(com.dawgpizza.menu.drinks, function() {
		var drink = $('.drink');
		drink.append($(document.createElement('li')).html(this.name + " ($" + this.price + ")"));
	});

	$.each(com.dawgpizza.menu.desserts, function() {
		var dessert = $('.dessert')
		dessert.append($(document.createElement('li')).html(this.name + " ($" + this.price + ")"));
	});

}); // document is ready