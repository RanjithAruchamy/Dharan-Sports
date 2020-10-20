const mongoose = require('mongoose');
const User = require('../models/userMaster')
const UserPersonal = require('../models/userPersonal');
const UserSports = require('../models/userSports');
const SportsMaster = require('../models/sportsMaster');
const bcrypt = require('bcryptjs');
const { json } = require('body-parser');
//const User = mongoose.model('UserMaster');

// Create a User
module.exports.registerUserMaster = async (req, res, next) => {
    var fName = req.body.firstName;
    fName = fName.trim();
    fName = fName.charAt(0);
    fName = fName.toUpperCase();
    var lName = req.body.lastName;
    lName= lName.trim();
    lName = lName.toUpperCase();
    lName = lName.charAt(0);
    const salt = await bcrypt.genSalt()
    const hashPwd = await bcrypt.hash(req.body.password, salt);

    User.countDocuments({}, function (err, count) { 
        if (err){ 
            res.status(500).send(err);
        }else{ 
            // Create user in User Master
            const user = new User(
                {
                    'userId': "OXF-D-U-" + fName + lName +"-"+ count,
                    'firstName': req.body.firstName,
                    'lastName': req.body.lastName,
                    'email': req.body.email,
                    'phoneNumber': req.body.phoneNumber,
                    'password': hashPwd,
                    'createdBy': req.body.firstName + " " + req.body.lastName,
                    'personal':{},
                    'sports':{'sportId': req.body.sportId}
                    
                });
                user.save( function() {
                   // Create user in User Personal
                    const userPersonal = new UserPersonal(
                        {
                            '_id': user._id,
                            'userId': user.userId,
                            'firstName': req.body.firstName,
                            'lastName': req.body.lastName,
                            'email': req.body.email,
                            'phoneNumber': req.body.phoneNumber
                        })
                        userPersonal.save((err, doc) => {
                        if(!err) res.status(201).send(doc)
                        else res.status(500).send(err)
                        })
                        // Create user in User Sports
                        const userSports = new UserSports(
                            {
                                '_id': user._id,
                                'userId': user.userId,
                                'sportId': req.body.sportId
                            })
                            userSports.save()
                })
                //Update userid in Sports Master
                SportsMaster.findOneAndUpdate({'sportId':req.body.sportId}, {$push:{ players:{userId:user.userId, _id:user._id}}}, null, function(){})           
        } 
         
    });
}

//Get all users
module.exports.getAllUser = (req, res, next) => {
    User.find()
    .then(users => res.status(200).send(users))
    .catch(err => res.status(404).send(err))
}

// Get a user
module.exports.getUser = (req, res, next) => {
    User.findOne({userId:req.params.userId})
    .then(users => res.status(200).send(users))
    .catch(err => res.status(404).send(err))
}

//Update a User
module.exports.updateUserMaster = (req, res, next) => {
    User.findOneAndUpdate({userId:req.params.userId}, {$set:req.body}, {new:true})
    .then(users => res.status(200).send(users))
    .catch(err => res.status(404).send(err))
    UserPersonal.findOneAndUpdate({userId:req.params.userId}, {$set:req.body.personal}, {new:true})
    UserSports.findOneAndUpdate({userId:req.params.userId},{$set:req.body.sports}, {new:true})
}

