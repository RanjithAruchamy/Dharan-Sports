const mongoose = require('mongoose');
const User = require('../models/user')
const bcrypt = require('bcryptjs');
//const User = mongoose.model('UserMaster');

module.exports.register = async (req, res, next) => {
    var fName = req.body.firstName;
    fName = fName.charAt(0);
    var lName = req.body.lastName;
    lName = lName.charAt(0);
    const salt = await bcrypt.genSalt()
    const hashPwd = await bcrypt.hash(req.body.password, salt);

    User.countDocuments({}, function (err, count) { 
        if (err){ 
            res.status(500).send(err);
        }else{ 
            (new User(
                {'userId': "OXF-D-" + fName + lName +"-"+ count,
                    'firstName': req.body.firstName,
                    'lastName': req.body.lastName,
                    'email': req.body.email,
                    'phoneNumber': req.body.phoneNumber,
                    'password': hashPwd,
                    'createdBy': req.body.firstName + " " + req.body.lastName
                }))
                .save()
                .then(users => res.status(201).send(users))
                .catch(error => res.status(500).send(error) )
            
        } 
    });
}

module.exports.updateUser = async (req, res, next) => {
/*     if(req.body.status == 'INACTIVE'){
        var deletedby = req.body.firstName + " " + req.body.lastName;
    } */

    /* User.findOneAndUpdate({userId:req.params.userId}, {$set:req.body})
    .then(function(){
        User.findById({'userId': req.params.userId}).then(function(users){
            res.status(200).send(users)}) 
    })
    .catch(error => res.status(500).send(error)) */
    
 /*    User.findOne({userId:req.params.userId})
    .then(users => res.send(users))
    User.updateOne({userId:req.params.userId},{$set:req.body})
    .then(users => res.send(users))
    User.findOne({userId:req.params.userId})
    .then(users => res.send(users)) */
}