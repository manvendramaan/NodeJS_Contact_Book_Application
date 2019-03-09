var express = require('express');
var router = express.Router();
var contactBookAPIs = require("../services/contactBookAPIs.js");

router.post('/_contact/storeContacts', contactBookAPIs.storeContacts);
router.post('/_contact/updateContacts', contactBookAPIs.updateContacts);
router.delete('/_contact/deleteContacts/:id', contactBookAPIs.deleteContacts);
router.post('/_contact/searchContacts',contactBookAPIs.searchContacts);

module.exports = router;