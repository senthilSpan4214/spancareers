const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: [true, "Please add an Phone Number"],
      unique: true,
    },
    jobOpeningId: {
      type: ObjectId,
      required: [true, "Please add a jobOpeningId"],
    },
  },
  {
    timestamps: true,
  }
);
let Candidates;
try {
  Candidates = mongoose.model("candidates");
} catch (error) {
  Candidates = mongoose.model("candidates", candidateSchema);
}

module.exports = Candidates;
