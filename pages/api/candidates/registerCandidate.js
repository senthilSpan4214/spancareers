const Candidates = require("../../../models/candidateModel");
import connectDB from "@/utils/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await connectDB();
    const { name, email, phoneNumber, jobOpeningId } = req.body;

    if (!name || !email || !phoneNumber || !jobOpeningId) {
      res.status(400);
      throw new Error("Please include all fields");
    }

    const candidate = await Candidates.create({
      name,
      email,
      phoneNumber,
      jobOpeningId,
    });

    if (candidate) {
      res.status(201).json({
        _id: candidate._id,
        name: candidate.name,
        email: candidate.email,
        phoneNumber: candidate.phoneNumber,
      });
    } else {
      res.status(400);
      throw new Error("Invalid candidate data");
    }
  }
}
