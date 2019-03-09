var express = require('express');
var app = express();
var cors = require('cors');
var path = require('path');
var bodyParser = require("body-parser");
var routes = require("./routes/index");

	app.use(cors());
	app.use('/static', express.static(path.join(__dirname, 'views')))

	app.use(bodyParser.urlencoded({
		extended: true,
		limit: '204800kb'
	}));
	
	app.use(bodyParser.json({limit: '204800kb', extended: true}));

  
	const PORT = process.env.PORT || 4000;
	app.listen(PORT, () => {
	  console.log(`Server is running on port ${PORT}...`);
	});

app.use("/",routes); 
module.exports = app;

