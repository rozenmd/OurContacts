var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ContactSchema   = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    company: String,
    userId: String

});

var Contact = mongoose.model('Contact', ContactSchema);
module.exports = Contact;