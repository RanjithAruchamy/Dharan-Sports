const mongoose = require('mongoose');
const sportsMaster = require('../models/sportsMaster');
const SportsMaster = require('../models/sportsMaster');
const moment = require('moment');

//Create a Sport
module.exports.registerSportsMaster = (req, res, next) => {
    var sname = req.body.sportName;
    sname = sname.trim();
    var fname = sname.charAt(0);
    var lname = sname.charAt(1);
    fname = fname.toUpperCase();
    lname = lname.toUpperCase();
    SportsMaster.countDocuments( {}, function (err, count) {
    //Update in Sports Master
        const sports = new sportsMaster(
        {
            'sportId': "OXF-D-S-" + fname + lname +"-" +count,
            'sportName':req.body.sportName,
            'sportType':req.body.sportType
        });
        sports.save((err, doc) =>{
            if(!err) res.status(201).send(doc)
            else res.status(500).send(err)
        })
    })
    
}

// Get All Sports
module.exports.getAllSport = (req, res, next) => {
    sportsMaster.find()
    .then(sports => res.status(200).send(sports))
    .catch(err => res.status(404).send(err))
}

//Get a Sport
module.exports.getSport = (req, res, next) => {
    sportsMaster.findOne({sportId:req.params.sportId})
    .then(sports => res.status(200).send(sports))
    .catch(err => res.status(404).send(err))
}

//Update a User
module.exports.updateSport = (req, res, next) => {
    SportsMaster.findOneAndUpdate({sportId:req.params.sportId}, {$set:req.body}, {new:true})
    .then(sports => res.status(200).send(sports))
    .catch(err => res.status(404).send(err))
}

//Delete a User
module.exports.deleteSport = (req, res, next) => {
    SportsMaster.findOneAndUpdate({sportId:req.params.sportId}, {$set:{status:"INACTIVE", deletedAt: moment().format()}}, {new:true})
    .then(sports => res.status(200).send(sports))
    .catch(err => res.status(404).send(err))
}