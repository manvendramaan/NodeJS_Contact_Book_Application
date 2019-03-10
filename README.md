## NodeJS Contact Book Application

It is a CRUD NodeJS APIs for a typical contact book app. It support adding/editing/deleting contacts from a primary storage (MySQL) and allow searching by name and email address. 

Deployed on <a href="https://glacial-meadow-35240.herokuapp.com/"><img width="100" src="https://cdn-images-1.medium.com/max/1200/1*qgcaFqBSgNhsQQNpepIagA.png"/></a>

# How to run :

1. Go to the project path (.../NodeJS_Contact_Book_Application) in cmd and run this command : node app
2. Open browser and browse this url : http://localhost:4000/

#API List :

API : http://localhost:4000/_contact/storeContacts

Method : POST

Input : 

{"name":"Manvendra","emailId":"manvendra2215@gmail.com"}

************************************************************

API : http://localhost:4000/_contact/updateContacts

Method : POST

Input : 

{"name":"Manvendra","emailId":"manvendra2215@gmail.com"}

************************************************************

API : http://localhost:4000/_contact/deleteContacts/11

Method : DELETE

************************************************************

API : http://localhost:4000/_contact/searchContacts

Method : POST

Input : 

{"keyword":"manvendra","limit":"10","offset":"0"}

Note : By Default limit is 10 and offset is 0

************************************************************


# For Test Case :

1. Go to the project path (.../NodeJS_Contact_Book_Application/test) in cmd and run this command : npm test
