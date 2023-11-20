const Candidates = require("../../../../models/candidateModel");
import connectDB from "@/utils/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await connectDB();
    try {
      const { id } = req.query;

      const candidatesData = await Candidates.find({ jobOpeningId: id });

      if (!candidatesData) {
        return res.status(404).json({ error: "Data not found" });
      }

      res.status(200).json(candidatesData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error - Please try again" });
    }
  }
}
