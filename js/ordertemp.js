$(function() {
	var vegpies = $('.vegpies');
	var meatpies = $('.meatpies');

	$.each(com.dawgpizza.menu.pizzas, function() {
		var smallpizza = $(document.createElement('button'));
		smallpizza.attr('type', 'button');
		smallpizza.attr('class', 'btn btn-default addcart');
		smallpizza.attr({
			'data-type': this.type,
			'data-name': this.name,
			'data-size': 'small',
			'data-price': this.prices[0]
		});
		smallpizza.html("Small $" + this.prices[0]);

		var medpizza = $(document.createElement('button'));
		medpizza.attr('type', 'button');
		medpizza.attr('class', 'btn btn-default addcart');
		medpizza.attr({
			'data-type': this.type,
			'data-name': this.name,
			'data-size': 'medium',
			'data-price': this.prices[1]
		});
		medpizza.html("Medium $" + this.prices[1]);

		var largepizza = $(document.createElement('button'));
		largepizza.attr('type', 'button');
		largepizza.attr('class', 'btn btn-default addcart');
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
}); // document is ready