const mongoose = require("mongoose");

var sportsSchema = new mongoose.Schema(
  {
    sportId: { type: String, unique: true },
    userId: { type: String },
    status: { type: String, default: "ACTIVE" },
    sportName:{type:string },
    sportType:{type:string},
    deletedAt: { type: Date },
    createdBy:{type:String},
    updatedBy:{type:String},
    deletedBy:{type:String}
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updated_at" },
  }
);

const sportsMaster = mongoose.model("SportsMaster", sportsSchema);
module.exports = sportsMaster;