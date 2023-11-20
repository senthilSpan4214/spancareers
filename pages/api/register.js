const Admin = require("../../models/adminModel");
import connectDB from "@/utils/db";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  if (req.method === "POST") {
    await connectDB();
    const generateToken = (id) => {
      return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
    };

    const { name, email, employeeId, password } = req.body;

    if (!name || !email || !employeeId || !password) {
      res.status(400).json({ error: "Please include all fields" });
      return;
    }

    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      res.status(400).json({ error: "Admin Email already exists" });
      return;
    }
    const adminExists1 = await Admin.findOne({ employeeId });
    if (adminExists1) {
      res.status(400).json({ error: "Admin Employee_ID already exists" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = await Admin.create({
      name,
      email,
      employeeId,
      password: hashedPassword,
    });

    if (admin) {
      res.status(201).json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        employeeId: admin.employeeId,
        token: generateToken(admin._id),
      });
    } else {
      res.status(400).json({ error: "Invalid Admin data" });
    }
  }
}
