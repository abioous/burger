var orm =  require('./../config/orm.js')


function Burger(id, name, devoured, date) {
	if( !(this instanceof Burger)) {
		return new Burger(id, name, devoured, date);
	} 

	var self = this;
	this.id = id;
	this.name = name;
	this.devoured = devoured;
	this.date = date;

//insertOne adds this.burger to database
	this.insertOne = function(){
		orm.insertOne(self); 
	}
//updateOne modyfies this burger in the database 
	this.updateOne = function(){
		orm.updateOne(self);
	}

}
//selectAll retrives records from database and created a barger object that is provided to callback
Burger.prototype.selectAll = function(onReady) {
			
	//for each burger record çreate a new instance to 
	//pass it to onBurgerFetched callback
	var onReadyCallback = function(records) {
			var burgers = [];
			for(var i = 0;i<records.length;i++) {
				var record = records[i];
				//create a new isntance of a burger
				var burger = new Burger(record.id, record.name, record.devoured > 0, record.date);
				burgers.push(burger);
			}

			//pass burgers instance to the callback
			onReady(burgers)
	}

	//orm select all retrieves record from database 
	//for each record burgerCallback is called.
	orm.selectAll(onReadyCallback)
	
};


module.exports = Burger


