const Candidates = require("../../../models/candidateModel");
import connectDB from "@/utils/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await connectDB();
    try {
      const candidates = await Candidates.find({});
      res.status(200).json(candidates);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
}
