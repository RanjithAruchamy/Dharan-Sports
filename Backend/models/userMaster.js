const mongoose = require("mongoose");

var userSchema = new mongoose.Schema(
  {
    userId: { type: String, unique: true },
    status: { type: String, default: "ACTIVE" },
    role: { type: String, default: "USER" },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    deletedAt: { type: Date },
    createdBy:{type:String},
    updatedBy:{type:String},
    deletedBy:{type:String},
    saltSecret: String,
    personal:{
      fatherName:{type:String},
      motherName:{type:String},
      permanentAddress:{type:String},
      temporaryAddress:{type:String},
      bloodGroup:{type:String},
      age:{type:Number},
      dob:{type:Date},
      height:{type:String},
      profession:{type:String},
      organization:{type:String}
    },
    sports:{
      playerLevel: { type: String },
      playerSkill: { type: String },
      previousTeam: { type: String },
      TNCA: { type: String },
      KDCA: { type: String },
      hobbies: { type: String },
      goal: { type: String },
      roleModel:{type:String},
      strength:{type:String},
      weakness:{type:String}
    },
},
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updated_at" },
  }
);

const UserMaster = mongoose.model("UserMaster", userSchema);
module.exports = UserMaster;