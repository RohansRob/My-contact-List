const mongoose = require('mongoose');
//having the same instances of mongoose library
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        //validation js
        type: String,
        required: true
    }
    // email:{
    //     type: String,
    //     required : true
    // }
});
//importing when C will better capital
const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;