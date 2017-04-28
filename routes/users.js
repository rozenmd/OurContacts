var express = require('express');
var router = express.Router();
var User = require('../models/user'); //create a contact model

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/setup', function(req, res) {

    // create a sample user
    var max = new User({
        name: 'Max Rozen',
        password: 'password',
        admin: true
    });

    // save the sample user
    max.save(function(err) {
        if (err) throw err;

        console.log('User saved successfully');
        res.json({ success: true });
    });
});
module.exports = router;
