var mysql = require('mysql')
var connection = mysql.createConnection({
	host	:'localhost',
	user	:'root',
	password:'dev',
	database:'burgers_db'

});

module.exports = connection