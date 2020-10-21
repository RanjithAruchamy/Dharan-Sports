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
    deletedAt: { type: Date, default:null},
    createdBy:{type:String},
    updatedBy:{type:String},
    deletedBy:{type:String},
    saltSecret: String,
    personal:{
      fatherName:{type:String, default:" "},
      motherName:{type:String, default:" "},
      permanentAddress:{type:String, default:" "},
      temporaryAddress:{type:String, default:" "},
      bloodGroup:{type:String, default:" "},
      age:{type:Number, default:0},
      dob:{type:Date, default:Date.now},
      height:{type:String, default:" "},
      profession:{type:String, default:" "},
      organization:{type:String, default:" "}
    },
    sports:{
      sportId:{type:String},
      playerLevel: { type: String ,default:" "},
      playerSkill: { type: String , default:" "},
      previousTeam: { type: String , default:" "},
      TNCA: { type: String , default:" "},
      KDCA: { type: String , default:" "},
      hobbies: { type: String ,default:" "},
      goal: { type: String , default:" "},
      roleModel:{type:String , default:" "},
      strength:{type:String , default:" "},
      weakness:{type:String , default:" "}
    },
},
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updated_at"},
  }
);

const UserMaster = mongoose.model("UserMaster", userSchema);
module.exports = UserMaster;