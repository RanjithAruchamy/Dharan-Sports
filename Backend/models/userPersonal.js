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
    fatherName:{type:String, default:" "},
    motherName:{type:String, default:" "},
    permanentAddress:{type:String, default:" "},
    temporaryAddress:{type:String, default:" "},
    bloodGroup:{type:String, default:" "},
    age:{type:Number, default:0},
    dob:{type:Date, default:Date.now},
    height:{type:String, default:" "},
    profession:{type:String, default:" "},
    organization:{type:String, default:" "},
    deletedAt: { type: Date },
    createdBy:{type:String},
    updatedBy:{type:String},
    deletedBy:{type:String}
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updated_at" },
  }
);

const UserPersonal = mongoose.model("UserPersonal", userSchema);
module.exports = UserPersonal;