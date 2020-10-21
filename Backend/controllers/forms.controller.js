const mongoose = require('mongoose');
const FormsMaster = require('../models/formMaster');
const SportsMaster = require('../models/sportsMaster');
const moment = require('moment');

//Create a Form
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

//Get All Forms
module.exports.getAllForm = (req, res, next) => {
    FormsMaster.find()
    .then(forms => res.status(200).send(forms))
    .catch(err => res.status(404).send(err))
}

//Get a Form
module.exports.getForm = (req, res, next) => {
    FormsMaster.findOne({formId:req.params.formId})
    .then(forms => res.status(200).send(forms))
    .catch(err => res.status(404).send(err))
}

//Update a Form
module.exports.updateForm = (req, res, next) => {
    FormsMaster.findOneAndUpdate({formId:req.params.formId}, {$set:req.body}, {new:true})
    .then(forms => res.status(200).send(forms))
    .catch(err => res.status(404).send(err))
}

//Delete a Form
module.exports.deleteForm = (req, res, next) => {
    FormsMaster.findOneAndUpdate({formId:req.params.formId}, {$set:{status:"INACTIVE"}, deletedAt: moment().format()}, {new:true})
    .then(forms => res.status(200).send(forms))
    .catch(err => res.status(404).send(err))
}