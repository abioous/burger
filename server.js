
var methodOverride = require('method-override')
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var controller = require('./controllers/burgers_controller.js');


var express = require('express');
var app = express();
 

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json 
app.use(bodyParser.json())
app.use(methodOverride('_method'))

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
controller(app);




app.listen(3000);