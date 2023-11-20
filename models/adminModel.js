const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
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
    employeeId: {
      type: String,
      required: [true, "Please add an EmployeeId"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
  },
  {
    timestamps: true,
  }
);
let Admin;
try {
  Admin = mongoose.model("Span Admin");
} catch (error) {
  Admin = mongoose.model("Span Admin", adminSchema);
}

module.exports = Admin;
