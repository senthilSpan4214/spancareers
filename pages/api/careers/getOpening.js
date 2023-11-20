const careersOpening = require("../../../models/careersModel");
import connectDB from "@/utils/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await connectDB();
    try {
      const openings = await careersOpening.find({});
      res.status(200).json(openings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error - Please try again" });
    }
  }
}
