const express = require('express'),
router = express.Router();

const path = require('path')

// fetch index.html on load
router.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, '../views/index.html'));
});

module.exports = router;