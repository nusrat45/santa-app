const express = require('express'),
router = express.Router(),
path = require('path')

// Show alert msg on form submit
router.get('/alert-msg', (request, response) => {
    response.render(path.join(__dirname, '../views/alert.html'), {alert: request.query.alert});
});

module.exports = router;