var mysql = require('mysql');

var con;

function handleDisconnect() {
	con = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "root",
	  database: "contacts_app"
	});

	con.connect(function(err) {
	  if (err) throw err;
	  console.log("Connected!");
	});

	var createContactTable = "CREATE TABLE IF NOT EXISTS contact_list (`id` int(20) NOT NULL AUTO_INCREMENT, `name` varchar(128) DEFAULT NULL, `email_id` varchar(128) DEFAULT NULL, PRIMARY KEY (`id`), UNIQUE KEY `no_duplicate` (`email_id`)) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1";

	con.query(createContactTable, function(err, rows, fields)
	{
		if(err)  throw err;
		console.log("Table created!");
	});

	con.on('error', function(err) {
		console.log('db error', err);
		if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
		  handleDisconnect();                         // lost due to either server restart, or a
		} else {                                      // connnection idle timeout (the wait_timeout
		  throw err;                                  // server variable configures this)
		}
	});
}

handleDisconnect();  

module.exports.con = con;
