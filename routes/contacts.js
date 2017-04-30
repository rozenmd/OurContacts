var express = require('express');
var router = express.Router();
var Contact = require('../models/contact');
var authController = require('../routes/auth');

// Create endpoint /api/contacts for POSTS
router.post('/', authController.isAuthenticated, function (req, res) {

    // Create a new instance of the Contact model
    console.log(req);
    var contact = new Contact({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        company: req.body.company,
        email: req.body.email,
        userId: req.user._id
    });


    // Save the contact and check for errors
    contact.save(function (err) {
        if (err)
            res.send(err);

        res.json({message: 'Contact added to the db!', data: contact});
    });
});

// Create endpoint /api/contacts for GET
router.get('/', authController.isAuthenticated, function (req, res) {
    // Use the Contact model to find all contact
    Contact.find({userId: req.user._id}, function (err, contacts) {
        if (err)
            res.send(err);

        res.json(contacts);
    });
});
router.route('/:contact_id')
// get the contact with that id (accessed at GET http://localhost:3000/contacts/:contact_id)
    .get(function (req, res) {
        Contact.findById({userId: req.user._id, _id: req.params.contact_id}, function (err, contact) {
            if (err)
                res.send(err);
            res.json(contact);
        });
    })
    .put(function (req, res) {
        Contact.findById({userId: req.user._id, _id: req.params.contact_id}, function (err, contact) {
            if (err)
                res.send(err);

            // Update the existing contact quantity
            contact.first_name = req.body.first_name;
            contact.last_name = req.body.last_name;
            contact.company = req.body.company;
            contact.email = req.body.email;

            // Save the contact and check for errors
            contact.save(function (err) {
                if (err)
                    res.send(err);

                res.json(contact);
            });
        });
    })
    .delete(function (req, res) {
        Contact.findByIdAndRemove({userId: req.user._id, _id: req.params.contact_id}, function (err) {
            if (err)
                res.send(err);

            res.json({message: 'Contact removed from the db!'});
        });
    });
module.exports = router;