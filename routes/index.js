var express = require('express');
var router = express.Router();
var contactBookAPIs = require("../services/contactBookAPIs.js");

//request list
router.post('/storeContacts', contactBookAPIs.storeContacts);
router.post('/updateContacts', contactBookAPIs.updateContacts);
router.delete('/deleteContacts/:id', contactBookAPIs.deleteContacts);
router.post('/searchContacts',contactBookAPIs.searchContacts);

module.exports = router;