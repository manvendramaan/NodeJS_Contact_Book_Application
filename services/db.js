var mysql = require('mysql');

const con = mysql.createPool({
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

module.exports.con = con;
