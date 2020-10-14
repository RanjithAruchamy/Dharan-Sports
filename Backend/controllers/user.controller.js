const mongoose = require('mongoose');
const User = require('../models/user')
//const User = mongoose.model('UserMaster');

module.exports.register = (req, res, next) => {
    var user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.phoneNumber = req.body.phoneNumber;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, doc) => {
        if(!err)
        res.send(doc);
    })
}