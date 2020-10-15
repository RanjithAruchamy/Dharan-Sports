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
    dummyA:{type:String},
    dummyB:{type:String},
    dummyC:{type:String},
    dummyD:{type:String},
    dummyE:{type:String},
    saltSecret: String,
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updated_at" },
  }
);

const UserMaster = mongoose.model("UserMaster", userSchema);
module.exports = UserMaster;