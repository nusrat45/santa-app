const express = require('express'),
router = express.Router(),
sendRequest = require('../controllers/userInfoCheck');

// send post reguest on form submit
router.post('/send', sendRequest.sendRequest);

module.exports = router;