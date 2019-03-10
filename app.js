var express = require('express');
var app = express();
var cors = require('cors');
var path = require('path');
var bodyParser = require("body-parser");
var routes = require("./routes/index");
var morgan = require('morgan');
var jwt = require('jsonwebtoken');
var config = require('./config');
var helper = require("./services/helper");
var _u = require("underscore");

	app.use(cors());
	app.use('/static', express.static(path.join(__dirname, 'views')))

	app.use(bodyParser.urlencoded({
		extended: true,
		limit: '204800kb'
	}));
	
	app.use(bodyParser.json({limit: '204800kb', extended: true}));
	
	app.set('Secret', config.secret);

	// use morgan to log requests to the console
	app.use(morgan('dev'));
  
	const PORT = process.env.PORT || 4000;
	app.listen(PORT, () => {
	  console.log(`Server is running on port ${PORT}...`);
	});

app.post('/authenticate',(req,res)=>{

    if(!_u.isUndefined(req.body.username) && req.body.username.toString().trim() !="" && req.body.username.toString().trim() === "admin"){

        if(!_u.isUndefined(req.body.password) && req.body.password.toString().trim() !="" && req.body.password.toString().trim() === "admin"){

        const payload = {

            check:  true

          };

          var token = jwt.sign(payload, app.get('Secret'), {
                expiresIn: 86400 // expires in 24 hours

          });


          let toPass = {
            message: 'User Authenticated!',
            token: token
          };
		  return res.send(helper.formatResponse(true, toPass));

        }else{

			return res.send(helper.formatResponse(false, "Invalid password!"));
        }

    }else{

		return res.send(helper.formatResponse(false, "User not found!"));
    }

})

app.use("/_contact",routes); 

routes.use((req, res, next) =>{

    // check header for the token
    var token = req.headers['access-token'];

    // decode token
    if (token) {

      // verifies secret and checks if the token is expired
      jwt.verify(token, app.get('Secret'), (err, decoded) =>{      
        if (err) {
			return res.send(helper.formatResponse(false, "Invalid Token!"));		  
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;    
          next();
        }
      });

    } else {
      // if there is no token  
	  return res.send(helper.formatResponse(false, "No token provided!"));
    }
});

module.exports = app;

