## NodeJS Contact Book Application

It is a CRUD NodeJS APIs for a typical contact book app. It support adding/editing/deleting contacts from a primary storage (MySQL) and allow searching by name and email address. 

Deployed on <a href="https://glacial-meadow-35240.herokuapp.com/"><img width="100" src="https://cdn-images-1.medium.com/max/1200/1*qgcaFqBSgNhsQQNpepIagA.png"/></a>

# How to run :

1. In MySQL server create database named contacts_app => Syntax : CREATE DATABASE contacts_app;
2. Go to the project path (.../NodeJS_Contact_Book_Application) in cmd and run this command : node app
3. Open browser and browse this url : http://localhost:4000/

#API List :

<b>API URL on Localhost :</b> http://localhost:4000/_contact/storeContacts<br>
<b>API URL on Heroku :</b> https://glacial-meadow-35240.herokuapp.com/_contact/storeContacts

<b>Method :</b> POST

<b>Input : </b>

{"name":"Manvendra","emailId":"manvendra2215@gmail.com"}

************************************************************

<b>API URL on Localhost :</b> http://localhost:4000/_contact/updateContacts<br>
<b>API URL on Heroku :</b> https://glacial-meadow-35240.herokuapp.com/_contact/updateContacts

<b>Method :</b> POST

<b>Input :</b> 

{"name":"Manvendra","emailId":"manvendra2215@gmail.com"}

************************************************************

<b>API URL on Localhost :</b> http://localhost:4000/_contact/deleteContacts/11<br>
<b>API URL on Heroku :</b> https://glacial-meadow-35240.herokuapp.com/_contact/deleteContacts/11

<b>Method :</b> DELETE

************************************************************

<b>API URL on Localhost :</b> http://localhost:4000/_contact/searchContacts<br>
<b>API URL on Heroku :</b> https://glacial-meadow-35240.herokuapp.com/_contact/searchContacts

<b>Method :</b> POST

<b>Input :</b> 

{"keyword":"manvendra","limit":"10","offset":"0"}

<b>Note :</b> By Default limit is 10 and offset is 0

************************************************************


# For Test Case :

1. Go to the project path (.../NodeJS_Contact_Book_Application/test) in cmd and run this command : npm test
