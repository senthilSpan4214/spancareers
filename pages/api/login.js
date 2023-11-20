const Admin = require("../../models/adminModel");
import connectDB from "@/utils/db";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  const generateToken = (id) => {
    return jwt.sign({ id }, secret123, {
      expiresIn: "30d",
    });
  };

  if (req.method === "POST") {
    await connectDB();
    const { employeeId, email, password } = req.body;

    if (!employeeId) {
      res.status(400).json({ error: "EmployeeId cannot be empty" });
      return;
    }

    if (!password) {
      res.status(400).json({ error: "Password cannot be empty" });
      return;
    }

    const admin = await Admin.findOne({ employeeId, email });

    if (admin && (await bcrypt.compare(password, admin.password))) {
      res.status(200).json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        employeeId: admin.employeeId,
        token: generateToken(admin._id),
      });
      // res.redirect(`/admin/${admin._id}`)
      // res.redirect(`/`)
    } else {
      res.status(401).json({ error: "Invalid Email or Password" });
    }
  }
}
