const mongoose = require('mongoose');
const User = require('../models/userMaster')
const UserPersonal = require('../models/userPersonal');
const UserSports = require('../models/userSports');
const SportsMaster = require('../models/sportsMaster');
const bcrypt = require('bcryptjs');
const { json } = require('body-parser');
const moment = require('moment');
const passport = require('passport');
const lodash = require('lodash');
//const User = mongoose.model('UserMaster');

// Create a User
module.exports.registerUserMaster = async (req, res, next) => {
    console.log('Entered into api')
    var fName = req.body.firstName;
    fName = fName.trim();
    fName = fName.charAt(0);
    fName = fName.toUpperCase();
    var lName = req.body.lastName;
    lName= lName.trim();
    lName = lName.toUpperCase();
    lName = lName.charAt(0);
    var pwd = req.body.password;
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
                    'role': req.body.role,
                    'firstName': req.body.firstName,
                    'lastName': req.body.lastName,
                    'email': req.body.email,
                    'phoneNumber': req.body.phoneNumber,
                    'password': hashPwd,
                    'createdBy': req.body.firstName + " " + req.body.lastName,
                    'deletedAt': null,
                    'updatedBy':null,
                    'deletedBy':null,
                    'personal':{
                        'fatherName': null,
                        'motherName': null,
                        'permanentAddress': null,
                        'temporaryAddress': null,
                        'bloodGroup': null,
                        'age': null,
                        'dob': null,
                        'height': null,
                        'profession': null,
                        'organization': null
                    },
                    'sports':{
                        'sportId': req.body.sportId,
                        'playerLevel': null,
                        'playerSkill': null,
                        'previousTeam': null,
                        'TNCA': null,
                        'KDCA': null,
                        'hobbies': null,
                        'goal': null,
                        'roleModel':null,
                        'strength':null,
                        'weakness':null
                }
                    
                });
                //Password Validation
                if(pwd.length < 4){
                    res.status(422).json("Password must be 4 character long")
                }else{
                user.save( function(err, doc) {
                    if(err){
                        res.status(500).send(err)
                    }
                    else
                    res.status(200).send(doc)
                   // Create user in User Personal
                    const userPersonal = new UserPersonal(
                        {
                            '_id': user._id,
                            'userId': user.userId,
                            'role': req.body.role,
                            'firstName': req.body.firstName,
                            'lastName': req.body.lastName,
                            'email': user.email,
                            'phoneNumber': req.body.phoneNumber,
                            'fatherName':null,
                            'motherName':null,
                            'permanentAddress':null,
                            'temporaryAddress':null,
                            'bloodGroup':null,
                            'age':null,
                            'dob':null,
                            'height':null,
                            'profession':null,
                            'organization':null,
                            'deletedAt': null,
                            'createdBy':user.createdBy,
                            'updatedBy':null,
                            'deletedBy':null
                        })
                        userPersonal.save()
                        // Create user in User Sports
                        const userSports = new UserSports(
                            {
                                '_id': user._id,
                                'userId': user.userId,
                                'role': req.body.role,
                                'sportId': req.body.sportId,
                                'playerLevel': null,
                                'playerSkill': null,
                                'previousTeam': null,
                                'TNCA': null,
                                'KDCA': null,
                                'hobbies': null,
                                'goal': null,
                                'roleModel':null,
                                'strength':null,
                                'weakness':null,
                                'deletedAt': null,
                                'createdBy':user.createdBy,
                                'updatedBy':null,
                                'deletedBy':null
                            })
                            userSports.save()
                })}
                //Update userid in Sports Master
                SportsMaster.findOneAndUpdate({'sportId':req.body.sportId}, {$push:{ players:{userId:user.userId, _id:user._id}}}, null, function(){})           
        } 
         
    });
}

//Get all users
module.exports.getAllUser = (req, res, next) => {
    var role;
    User.findOne({userId: req.userId},
        (err, user) => {
            if(!user)
            return res.status(404).json({status:false, message: "User is not found"});
            else
            role = lodash.pick(user, 'role')
            
            if(role.role == 'ADMIN'){
                User.find()
                .then(users => res.status(200).send(users))
                .catch(err => res.status(404).send(err))
                }
                else{
                    res.json('Only Admin can access!')
                }
        });
        
}

// Get a user
module.exports.getUser = (req, res, next) => {
    var role;
    User.findOne({userId: req.userId},
        (err, user) => {
            if(!user)
            return res.status(404).json({status:false, message: "User is not found"});
            else
            role = lodash.pick(user, 'role')
            if(role.role == 'ADMIN'){
                if(req.query.userId == undefined){
                    User.findOne({userId:req.userId})
                    .then(users => res.status(200).send(users))
                    .catch(err => res.status(404).send(err))
                }
                else{
                    User.findOne({userId:req.query.userId})
                    .then(users => res.status(200).send(users))
                    .catch(err => res.status(404).send(err))
                }
            }
            else{
                User.findOne({userId:req.userId})
                .then(users => res.status(200).send(users))
                .catch(err => res.status(404).send(err))
            }
        });
}

//Update a User
module.exports.updateUserMaster = async (req, res, next) => {
    // To fetch logged in user details
    var fName, lName, name, role;
    User.findOne({userId: req.userId},
      async  (err, user) => {
            if(!user)
            return res.status(404).json({status:false, message: "User is not found"});
            else{
            role = lodash.pick(user, 'role')
            fName = lodash.pick(user, 'firstName')
            lName = lodash.pick(user, 'lastName')
            name = fName.firstName + " " + lName.lastName;
            }
            if(role.role == 'ADMIN'){
                if(req.query.userId == undefined)
                {
                    var user = {userId: req.userId}
                    update(user)
                }
                else{
                    var user = {userId: req.query.userId}
                    update(user)
                }
            }
            else{
                var user = {userId: req.userId}
                update(user)
            }
async function update(userId){    //Updating to User Master    
    await User.findOneAndUpdate(userId, {$set:req.body}, {new:true})
    await User.findOneAndUpdate(userId, {$set:{updatedBy: name}}, {new:true})
    .then(users => res.status(200).send(users))
    .catch(err => res.status(404).send(err))
    //Updating to User Personal
    await UserPersonal.findOneAndUpdate(userId, {$set:req.body.personal}, {new:true})
    await UserPersonal.findOneAndUpdate(userId, {$set:{updatedBy: name}}, {new:true})
    //Updating to User Sports
    await UserSports.findOneAndUpdate(userId,{$set:req.body.sports}, {new:true})
    await UserSports.findOneAndUpdate(userId, {$set:{updatedBy: name}}, {new:true})}
});
}

//Delete a User
module.exports.deleteUserMaster = async (req, res, next) => {
    var fName, lName, name, role;
    User.findOne({userId: req.userId},
        async  (err, user) => {
              if(!user)
              return res.status(404).json({status:false, message: "User is not found"});
              else{
              role = lodash.pick(user, 'role')
              fName = lodash.pick(user, 'firstName')
              lName = lodash.pick(user, 'lastName')
              name = fName.firstName + " " + lName.lastName;
              }
              if(role.role == 'ADMIN'){
                if(req.query.userId == undefined){
                    User.findOneAndUpdate({userId:req.userId}, {$set:{status:"INACTIVE", deletedBy: name, deletedAt: moment().format()}}, {new:true})
                    .then(users => res.status(200).send(users))
                    .catch(err => res.status(404).send(err))
                    await UserPersonal.findOneAndUpdate({userId:req.userId}, {$set:{status:"INACTIVE", deletedBy: name, deletedAt: moment().format()}}, {new:true})
                    await UserSports.findOneAndUpdate({userId:req.userId},{$set:{status:"INACTIVE", deletedBy: name, deletedAt:moment().format()}}, {new:true})
                }
                else{
                    User.findOneAndUpdate({userId:req.query.userId}, {$set:{status:"INACTIVE", deletedBy: name, deletedAt: moment().format()}}, {new:true})
                    .then(users => res.status(200).send(users))
                    .catch(err => res.status(404).send(err))
                    await UserPersonal.findOneAndUpdate({userId:req.userId}, {$set:{status:"INACTIVE", deletedBy: name, deletedAt: moment().format()}}, {new:true})
                    await UserSports.findOneAndUpdate({userId:req.userId},{$set:{status:"INACTIVE", deletedBy: name, deletedAt:moment().format()}}, {new:true})

                }
            }
            else{
                     User.findOneAndUpdate({userId:req.userId}, {$set:{status:"INACTIVE", deletedBy: name, deletedAt: moment().format()}}, {new:true})
                    .then(users => res.status(200).send(users))
                    .catch(err => res.status(404).send(err))
                    await UserPersonal.findOneAndUpdate({userId:req.userId}, {$set:{status:"INACTIVE", deletedBy: name, deletedAt: moment().format()}}, {new:true})
                    await UserSports.findOneAndUpdate({userId:req.userId},{$set:{status:"INACTIVE", deletedBy: name, deletedAt:moment().format()}}, {new:true})

            }
              
                    });
}

//Authentication
module.exports.authenticate = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err)
        return res.status(400).json(err);
        else if(user)
        return res.status(200).json({"token": user.generateJwt() })
        else
        return res.status(404).json(info)
    })(req, res)
}

//Logged in user
module.exports.userProfile = (req, res, next) => {
    var role;
    User.findOne({userId: req.userId},
        (err, user) => {
            if(!user)
            return res.status(404).json({status:false, message: "User is not found"});
            else
            role = lodash.pick(user, 'role')
            
            if(role.role == 'ADMIN'){
                if(req.query.userId == undefined){
                    User.findOne({userId: req.userId},
                        (err, user) => {
                            if(!user)
                            return res.status(404).json({status:false, message: "User is not found"});
                            else
                            return res.status(200).json({status:true, user: lodash.pick(user, ['userId', 'firstName', 'lastName', 'email'])});
                        });
                }
                else{
                    User.findOne({userId: req.query.userId},
                        (err, user) => {
                            if(!user)
                            return res.status(404).json({status:false, message: "User is not found"});
                            else
                            return res.status(200).json({status:true, user: lodash.pick(user, ['userId', 'firstName', 'lastName', 'email'])});
                        });
                }
                }
                else{
                    User.findOne({userId: req.userId},
                        (err, user) => {
                            if(!user)
                            return res.status(404).json({status:false, message: "User is not found"});
                            else
                            return res.status(200).json({status:true, user: lodash.pick(user, ['userId', 'firstName', 'lastName', 'email'])});
                        });
                }
        });
}
