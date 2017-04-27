var express = require('express');
var router = express.Router();
var Contact = require('../models/contact'); //create a contact model
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
})

.post(function (req, res) {
    var contact = new Contact();
    contact.first_name = req.first_name;
    contact.last_name = req.last_name;
    contact.email = req.email;
    contact.company = req.company;
    contact.primary_phone = req.primary_phone;

    contact.save(function (err) {
        if (err)
            res.send(err);
        res.json({message: 'Contact Created!'});
    });
});

module.exports = router;