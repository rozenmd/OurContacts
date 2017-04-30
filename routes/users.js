var express = require('express');
var router = express.Router();
var User = require('../models/user'); //create a contact model
var authController = require('../routes/auth');
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/', function (req, res, next) {
    var user = new User({
        username: req.body.username,
        password: req.body.password
    });

    user.save(function (err) {
        if (err)
            res.send(err);

        res.json({message: 'New user added to the db!'});
    });
});

router.get('/setup', function (req, res) {

    // create a sample user
    var max = new User({
        username: 'rozenmd',
        password: 'password'

    });

    // save the sample user
    max.save(function (err) {
        if (err)
            res.send(err);

        res.json(max);

    });
});
module.exports = router;
