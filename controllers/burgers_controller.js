
var Burger = require('./../models/burger.js');
var path = require('path')


var staticRoutes = function(app) {

	//match /css/burger_style.css  path with public/assets/css/burger_style.css
	app.get('/css/burger_style.css', function(req, res) {
    	res.sendFile(path.join(__dirname + '/../public/assets/css/burger_style.css'));
	});

	app.get('/img/burger.jpg', function(req, res){
		res.sendFile(path.join(__dirname + '/../public/assets/img/burger.jpg'));

	});

}

var burger = new Burger();


//returns burgers classified as devored or not
function classifyBurgers(burgers) {
	var result = {
		devoured:[],
		notDevoured:[]
	}
	//for each burger classify either as devored on not.
	for(var i = 0;i < burgers.length;i++) {
		var burger = burgers[i];
		if(burger.devoured) {
			result.devoured.push(burger);
		} else {
			result.notDevoured.push(burger);
		}
	}					
	return result;
}

var apiRoutes = function(app) {


	//returns list of burgers, classifed as devored and not devored
	app.get('/api/burgers', function(req, res) {
	
		//on selecting all burgers split them into devored and not devored
		burger.selectAll(function(burgers) {
			//response object
			var response = classifyBurgers(burgers);
			res.json(response)
		});
	})


	//put modifies devored column on burger
	app.put('/api/burgers', function(req, res) {

		//get id of devoured burger
		var id = req.body.id;
		//create new burger with id
		var burger = new Burger(id);
		//set devoured flag
		burger.devoured = true;
		//update database
		burger.updateOne();

		//select all burgers
		burger.selectAll(function(burgers) {
			//response object
			var response = classifyBurgers(burgers);
			res.json(response)
		});
	});


	//post add new burger on burger
	app.post('/api/burgers', function(req, res) {

		//get id of devoured burger
		var name = req.body.name;
		//create new burger with id
		var burger = new Burger(0, name, false);
		//update database
		burger.insertOne();

		//select all burgers
		burger.selectAll(function(burgers) {
			//response object
			var response = classifyBurgers(burgers);
			res.json(response)
		});
	});
}

var router = function(app) {
	staticRoutes(app);
	apiRoutes(app)

	app.get('/', function (req, res) {
		burger.selectAll(function(burgers) {
			res.render('index', {
				burgers: classifyBurgers(burgers)
			});
		});
});


}

module.exports = router;