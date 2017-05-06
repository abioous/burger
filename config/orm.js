var connection = require('./connection.js')


function selectAll(onReady) {
        connection.query('SELECT * from burgers', 
                function(err, rows, fields) {
                if(err) throw err;
                var burgersRecords = [];
                for(var i = 0 ;i<rows.length;i++) {
                        var row = rows[i];
                        //map db column into burger field names.
                        var burger = {
                                id:row.id,
                                name:row.burger_name,
                                devoured:row.devoured,
                                date:row.date,
                        };
                        burgersRecords.push(burger);
                }
                onReady(burgersRecords);
        })
}


function insertOne(burger){
connection.query('INSERT INTO burgers(burger_name, devoured,date)  VALUES (?, ?, current_timestamp()) ',
	[burger.name, burger.devoured],  function(err, rows, fields) {
        	if(err) throw err;
        }
	);
}

function updateOne(burger){
    
    connection.query('UPDATE burgers SET devoured = ? WHERE id=?',
	[burger.devoured, burger.id],  function(err, rows, fields) {
        	if(err) throw err;
        });

}


module.exports = {
        'selectAll':selectAll,
        'insertOne':insertOne,
        'updateOne':updateOne,       
}

