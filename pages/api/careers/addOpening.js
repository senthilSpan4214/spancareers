const careersOpening = require("../../../models/careersModel");
const Admin = require("../../../models/adminModel");
import connectDB from "@/utils/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await connectDB();
    try {
      const {
        department,
        specialization,
        jobTitle,
        location,
        jobDescription,
        admin,
      } = req.body;

      if (
        !department ||
        !specialization ||
        !jobTitle ||
        !location ||
        !jobDescription ||
        !admin
      ) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const isAdmin = await Admin.findById(admin);

      if (!isAdmin) {
        return res.status(403).json({ error: "Not authorized as admin" });
      }

      const existingOpening = await careersOpening.findOne({
        department: department,
        specialization: specialization,
      });

      if (existingOpening) {
        const existingLocations = new Set(existingOpening.location);
        const newLocations = new Set(
          Array.isArray(location) ? location : [location]
        );
        const intersection = new Set(
          [...existingLocations].filter((x) => newLocations.has(x))
        );
        if (intersection.size > 0) {
          return res.status(400).json({
            error: `An opening with the same department, specialization already exists in the  ${[
              ...intersection,
            ]} location`,
          });
        }
      }

      const newOpening = new careersOpening({
        department,
        specialization,
        jobTitle,
        location,
        jobDescription,
        admin,
      });
      await newOpening.save();
      res.status(200).json({ newOpening });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error - Please try again" });
    }
  }
}
