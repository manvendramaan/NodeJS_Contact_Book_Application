var assert  = require('assert');
var chai = require('chai');
var server = require("../app.js");
var fs = require("fs");
var	chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Plivo Assignment testing', function() {
  let postData = {"name":"Manvendra","emailId":"manvendra2215@gmail.com"};
  let searchPostData = {"keyword":"Manvendra"};
  it('Successfully testing stored a contact', function(done) {
    chai.request(server).post('/_contact/storeContacts').send(postData).end(function(err, res) {
	  if(res.body.status === 'failure')
	  {
		  console.log(res.body.message);
	  }
      assert.equal(res.body.status, 'success');
	  
      done();
    });
  });
  it('Successfully testing update a contact', function(done) {
    chai.request(server).post('/_contact/updateContacts').send(postData).end(function(err, res) {
	  if(res.body.status === 'failure')
	  {
		  console.log(res.body.message);
	  }
      assert.equal(res.body.status, 'success');
	  
      done();
    });
  });
  it('Successfully testing searching any contact', function(done) {
    chai.request(server).post('/_contact/searchContacts').send(searchPostData).end(function(err, res) {
	  if(res.body.status === 'failure')
	  {
		  console.log(res.body.message);
	  }
      assert.equal(res.body.status, 'success');
	  
      done();
    });
  });
  
});


