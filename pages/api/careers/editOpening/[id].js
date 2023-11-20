const careersOpening = require("../../../../models/careersModel");
import connectDB from "@/utils/db";
const Admin = require("../../../../models/adminModel");

export default async function handler(req, res) {
  if (req.method === "PUT") {
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

      const { id } = req.query;

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

      const isAdmin = await Admin.findOne({ _id: admin });
      if (!isAdmin) {
        return res.status(400).json({ error: "Not authorized Admin" });
      }

      const existingOpening = await careersOpening.findOne({
        _id: { $ne: id },
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

      const opening = await careersOpening.findByIdAndUpdate(id, {
        department,
        specialization,
        jobTitle,
        location,
        jobDescription,
        admin,
      });

      if (!opening) {
        return res.status(404).json({ error: "Opening not found" });
      }

      res.status(200).json(opening);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error - Please try again" });
    }
  }
}
