var assert  = require('assert');
var chai = require('chai');
var server = require("../app.js");
var fs = require("fs");
var	chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Contact Assignment testing', function() {
  let postData = {"name":"Manvendra","emailId":"manvendra2215@gmail.com"};
  let searchPostData = {"keyword":"Manvendra"};
  it('Successfully testing stored a contact', function(done) {
    chai.request(server).post('/_contact/storeContacts').send(postData).set('access-token', '<access_token>').end(function(err, res) {
	  if(res.body.status === 'failure')
	  {
		  console.log(res.body.message);
	  }
      assert.equal(res.body.status, 'success');
	  
      done();
    });
  });
  it('Successfully testing update a contact', function(done) {
    chai.request(server).post('/_contact/updateContacts').send(postData).set('access-token', '<access_token>').end(function(err, res) {
	  if(res.body.status === 'failure')
	  {
		  console.log(res.body.message);
	  }
      assert.equal(res.body.status, 'success');
	  
      done();
    });
  });
  it('Successfully testing searching any contact', function(done) {
    chai.request(server).post('/_contact/searchContacts').send(searchPostData).set('access-token', '<access_token>').end(function(err, res) {
	  if(res.body.status === 'failure')
	  {
		  console.log(res.body.message);
	  }
      assert.equal(res.body.status, 'success');
	  
      done();
    });
  });
  
});


