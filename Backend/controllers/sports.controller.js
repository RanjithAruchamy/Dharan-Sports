const mongoose = require('mongoose');
const sportsMaster = require('../models/sportsMaster');
const SportsMaster = require('../models/sportsMaster');

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