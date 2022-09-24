const path = require('path');
const express = require('express');
const port = 7000;

//here the mongoose one
const db = require('./config/mongoose');
//what do we require here
const Contact = require('./models/contact');
const app = express(); 
//this app has all the functionalities 

app.set('view engine', 'ejs');
// the dir from which index.js file is started or run
app.set('views', path.join(__dirname, 'views'));
//needed to run a server
app.use(express.static('Assets'));
app.use(express.urlencoded());

//app.listen listning to req. responce call back 
app.listen(port, function(err) {
    if (err) {
        console.log("Error in running the server", err);
    } else {
        console.log("My Express server is running on port", port);
    }
});

//route hitting on , call back function
app.get('/', function(req, res) {
    //want everything here all the contacts here
    //no query given here

    Contact.find({}, function(err, contacts) {
        if (err) {
            console.log("Error in fetching the contacts from db");
        }
        // console.log(contacts);
        //from index.ejs
        res.render('index', {
            title: 'Contact List',
            contact_list: contacts
        });
    })

});

app.post('/create-contact', function(req, res) {
    console.log(req.body);
    Contact.create({
        //parameters taken , bcz defined in the schema mongoose
        
        name: req.body.name,
        phone: req.body.phone 
    }, 
    function(err, newContact) {
        if (err) {
            console.log('Error in creating a contact!')
            return;
        }
        // console.log('******', newContact);
        // soo response have been created returning form there
        return res.redirect('back');
    })


});

app.get('/delete-contact/', function(req, res) {
    //get the id from the url
    console.log(req.query);
    let id = req.query.id;
    //find the contact in the database using the id and delete 

    Contact.findByIdAndDelete(id, function(err) {
        if (err) {
            console.log("Error in deleting an object from DB");
            return;
        }
        return res.redirect('back');
    });

});
// sudo service mongod start
// on mongod version 5 maybe
