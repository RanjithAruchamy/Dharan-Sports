const mongoose = require('mongoose');
const FormsMaster = require('../models/formMaster');
const SportsMaster = require('../models/sportsMaster');

module.exports.registerForm = (req, res, next) => {
    var Fname = req.body.formName;
    Fname = Fname.trim();
    var fname = Fname.charAt(0);
    var lname = Fname.charAt(1);
    fname = fname.toUpperCase();
    lname = lname.toUpperCase();
    FormsMaster.countDocuments( {}, function (err, count) {
    // Update in Forms Master
        const forms = new FormsMaster(
        {
            'formId': "OXF-D-F-" + fname + lname +"-" +count,
            'sportId': req.body.sportId,
            'formName': req.body.formName
        });
        forms.save((err, doc) =>{
            if(!err) res.status(201).send(doc)
            else res.status(500).send(err)
        })
        // Update in Sports Master
        SportsMaster.findOneAndUpdate({'sportId':req.body.sportId}, {$push:{ forms:{formId:forms.formId, _id:forms._id}}}, null, function(){})
    })

}