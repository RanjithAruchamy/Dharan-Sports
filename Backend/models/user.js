const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    /* userId:{
        type:String,    
        unique:true
    }, */
    status:{
        type: String,
        default: "ACTIVE"
    },
    role:{
        type: String,
        default:"USER"
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: Number,
        required:true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    saltSecret:String


});

const UserMaster = mongoose.model('UserMaster', userSchema);
module.exports = UserMaster;