var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ContactSchema   = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    company: String,
    primary_phone: String
});

module.exports = mongoose.model('Contact', ContactSchema);
