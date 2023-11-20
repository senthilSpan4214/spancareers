const careersOpening = require("../../../../models/careersModel");
import connectDB from "@/utils/db";

export default async function handler(req, res) {
  if (req.method == "DELETE") {
    await connectDB();
    try {
      const { id } = req.query;

      const deleteOpening = await careersOpening.findByIdAndDelete(id);

      if (!deleteOpening) {
        return res.status(404).json({ error: "Opening not found" });
      }

      res.status(200).json({ message: "Opening cancelled successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error - Please try again" });
    }
  }
}
