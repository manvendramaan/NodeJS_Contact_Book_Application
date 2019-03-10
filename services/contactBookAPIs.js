var mysql = require('mysql');
var db = require("./db");
var helper = require("./helper");
var _u = require("underscore");
var config = require('../config');
var jwt = require('jsonwebtoken');
var connect = db.con;

var storeContacts = function(req, res) {

	let name = '';
	let emailId = '';
	let token = req.headers['access-token'];
	
	validateToken(token, function(tokenResp){
		
		if(tokenResp === false)
		{		
			return res.send(helper.formatResponse(false, "Invalid Token!"));
		}else
		{ 
			if(!_u.isUndefined(req.body.name) && req.body.name.toString().trim() !="") {
				name = req.body.name.toString().trim();	 
			}
			if(!_u.isUndefined(req.body.emailId) && req.body.emailId.toString().trim() !="") {
				emailId = req.body.emailId.toString().trim();	 
			}
			
			if(name === '' || emailId === '')
			{
				return res.send(helper.formatResponse(false, "At least one of the following param is missing or invalid: name, emailId"));
			}

			checkIfEmailExists(emailId, function(resp){
				if(resp === true)
				{		
					return res.send(helper.formatResponse(false, "Email Id already exists!"));
				}else
				{
					let insertQry = "INSERT INTO `contact_list`(`name`, `email_id`) VALUES ("+mysql.escape(name)+","+mysql.escape(emailId)+")";
					
					connect.query(insertQry, function(err, rows, fields)
					{
							if(err) {console.error(err); return res.send(helper.formatResponse(false, "Some Issue. Try Again"));}
							return res.send(helper.formatResponse(true, "Contact Stored"));
					});
				}
			});
		}
	});

}

var updateContacts = function(req, res) {

	let name = '';
	let emailId = '';
	let token = req.headers['access-token'];
	
	validateToken(token, function(tokenResp){
		
		if(tokenResp === false)
		{		
			return res.send(helper.formatResponse(false, "Invalid Token!"));
		}else
		{ 
			if(!_u.isUndefined(req.body.name) && req.body.name.toString().trim() !="") {
				name = req.body.name.toString().trim();	 
			}
			if(!_u.isUndefined(req.body.emailId) && req.body.emailId.toString().trim() !="") {
				emailId = req.body.emailId.toString().trim();	 
			}
			
			if(name === '' || emailId === '')
			{
				return res.send(helper.formatResponse(false, "At least one of the following param is missing or invalid: name, emailId"));
			}
			
			checkIfEmailExists(emailId, function(resp){
				if(resp === false)
				{		
					return res.send(helper.formatResponse(false, "Email Id doesn't exists!"));
				}else
				{
					let updateQry = "UPDATE `contact_list` set `name` ="+mysql.escape(name)+" , `email_id` ="+mysql.escape(emailId)+" where `email_id` ="+mysql.escape(emailId);

					connect.query(updateQry, function(err, rows, fields)
					{
							if(err) {console.error(err); return res.send(helper.formatResponse(false, "Some Issue. Try Again"));}
							return res.send(helper.formatResponse(true, "Contact Updated"));
					});
				}
			})
		}
	})

}

var deleteContacts = function(req, res) {

	let _id = '';
	let token = req.headers['access-token'];
	
	validateToken(token, function(tokenResp){
		
		if(tokenResp === false)
		{		
			return res.send(helper.formatResponse(false, "Invalid Token!"));
		}else
		{ 
			if(!_u.isUndefined(req.params.id) && req.params.id.toString().trim() !="") {
				_id = req.params.id.toString().trim();	 
			}
			
			if(_id === '')
			{
				return res.send(helper.formatResponse(false, "At least one of the following param is missing or invalid: id"));
			}
			
			checkIfIdExists(_id, function(resp){
				if(resp === false)
				{		
					return res.send(helper.formatResponse(false, "Contact doesn't exists!"));
				}else
				{
					let deleteQry = "DELETE from `contact_list` where `id` ="+mysql.escape(_id);

					connect.query(deleteQry, function(err, rows, fields)
					{
							if(err) {console.error(err); return res.send(helper.formatResponse(false, "Some Issue. Try Again"));}
							return res.send(helper.formatResponse(true, "Contact Deleted"));
					});
				}
			});
		}
	})

}

var searchContacts = function(req, res) {

	let limit = 10;
	let offset = 0;
	let keyword = '';
	let token = req.headers['access-token'];
	
	validateToken(token, function(tokenResp){
		
		if(tokenResp === false)
		{		
			return res.send(helper.formatResponse(false, "Invalid Token!"));
		}else
		{ 
			if(!_u.isUndefined(req.body.limit) && req.body.limit.toString().trim() !="") {
				limit = req.body.limit.toString().trim();
				limit = parseInt(limit);		
			}
			if(!_u.isUndefined(req.body.offset) && req.body.offset.toString().trim() !="") {
				offset = req.body.offset.toString().trim();	 
				offset = parseInt(offset);	
			}
			if(!_u.isUndefined(req.body.keyword) && req.body.keyword.toString().trim() !="") {
				keyword = req.body.keyword.toString().trim();	 
			}
			
			if(keyword === '')
			{
				return res.send(helper.formatResponse(false, "At least one of the following param is missing or invalid: keyword"));
			}
			
			let selQry = "SELECT * from `contact_list` where `name` like '%"+keyword+"%' OR `email_id` like '%"+keyword+"%' limit "+mysql.escape(limit)+" offset "+mysql.escape(offset);
			connect.query(selQry, function(err, rows, fields)
			{
				if(err) {console.error(err); return res.send(helper.formatResponse(false, "Some Issue. Try Again"));}
				
				if(rows.length <= 0)
				{
					return res.send(helper.formatResponse(false, "No Contact found with given keyword!"));
				}else
				{
					return res.send(helper.formatResponse(true, rows));
				}
			})
		}
	})

}

function checkIfIdExists(_id, callback)
{
	let selQry = "SELECT * from `contact_list` where `id`="+mysql.escape(_id);
	connect.query(selQry, function(err, rows, fields)
	{
		if(err) {console.error(err); callback(true); }
		
		if(rows.length > 0)
		{
			callback(true);
		}else
		{
			callback(false);
		}	
	})
}

function checkIfEmailExists(emailId, callback)
{
	let selQry = "SELECT * from `contact_list` where `email_id`="+mysql.escape(emailId);
	connect.query(selQry, function(err, rows, fields)
	{
		if(err) {console.error(err); callback(true); }
		
		if(rows.length > 0)
		{
			callback(true);
		}else
		{
			callback(false);
		}	
	})
}

function validateToken(token, callback)
{
    // decode token
    if (token) {

      // verifies secret and checks if the token is expired
      jwt.verify(token, config.secret, (err, decoded) =>{      
        if (err) {
			//console.log('err',err);
			callback(false);		  
        } else {
          // if everything is good, save to request for use in other routes
          callback(true);
        }
      });

    } else {
      // if there is no token  
	  callback(false);
    }
}

module.exports.storeContacts = storeContacts;
module.exports.updateContacts = updateContacts;
module.exports.deleteContacts = deleteContacts;
module.exports.searchContacts = searchContacts;
