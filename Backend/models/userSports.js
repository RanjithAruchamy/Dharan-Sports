const mongoose = require("mongoose");


var userSchema = new mongoose.Schema(
  {
    userId: { type: String, unique: true },
    sportId: { type: String },
    status: { type: String, default: "ACTIVE" },
    role: { type: String, default: "USER" },
    playerLevel: { type: String ,default:" "},
    playerSkill: { type: String , default:" "},
    previousTeam: { type: String , default:" "},
    TNCA: { type: String , default:" "},
    KDCA: { type: String , default:" "},
    hobbies: { type: String ,default:" "},
    goal: { type: String , default:" "},
    roleModel:{type:String , default:" "},
    strength:{type:String , default:" "},
    weakness:{type:String , default:" "},
    deletedAt: { type: Date },
    createdBy:{type:String},
    updatedBy:{type:String},
    deletedBy:{type:String}
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updated_at" },
  }
);

const UserSports = mongoose.model("UserSports", userSchema);
module.exports = UserSports;