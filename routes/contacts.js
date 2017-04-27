var express = require('express');
var router = express.Router();
var Contact = require('../models/contact'); //create a contact model
/* GET home page. */
router.get('/', function (req, res, next) {
    Contact.find(function (err, contacts) {
        if (err)
            res.send(err);

        res.json(contacts);
    });
});

router.post('/', function (req, res) {
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

router.route('/:contact_id')
// get the contact with that id (accessed at GET http://localhost:3000/contacts/:contact_id)
    .get(function (req, res) {
        Contact.findById(req.params.contact_id, function (err, contact) {
            if (err)
                res.send(err);
            res.json(contact);
        });
    })
    .put(function (req, res) {
        Contact.findById(req.params.contact_id, function (err, contact) {

            if (err)
                res.send(err);

            contact.first_name = req.body.first_name;  // update the bears info

            // save the bear
            contact.save(function (err) {
                if (err)
                    res.send(err);

                res.json({message: 'Contact updated!'});
            });

        });
    })
    .delete(function (req, res) {
        Contact.remove({
            _id: req.params.contact_id
        }, function (err, contact) {
            if (err)
                res.send(err);

            res.json({message: 'Successfully deleted'});
        });
    });

module.exports = router;