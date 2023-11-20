import connectDB from "@/utils/db";
const Admin = require("../../../models/adminModel");
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  };

  if (req.method === "GET") {
    await connectDB();
    try {
      const { id } = req.query;

      const admin = await Admin.findById(id);

      if (admin) {
        res.status(200).json({
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          employeeId: admin.employeeId,
          token: generateToken(admin._id),
        });
      } else {
        res.status(401).json({ error: " Un-Authorized Admin " });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
