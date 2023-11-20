const mongoose = require("mongoose");

const CareersSchema = new mongoose.Schema(
  {
    department: {
      type: String,
    },
    specialization: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
    location: {
      type: [String],
    },
    jobDescription: {
      type: String,
    },
    admin: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
let careersOpening;
try {
  careersOpening = mongoose.model("OpeningCareers");
} catch (error) {
  careersOpening = mongoose.model("OpeningCareers", CareersSchema);
}

module.exports = careersOpening;
