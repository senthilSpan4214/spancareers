import axios from "axios";
import { toast } from "react-toastify";

const addOpening = async (openingData) => {
  try {
    const response = await axios.post(
      "https://spancareers.vercel.app/api/careers/addOpening",
      openingData
    );

    if (response.data) {
      toast.success("Opening Added Successfully");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(error.response.data.error);
    } else {
      toast.error("Failed to add opening");
    }
  }
};

const cancelOpening = async (openingId) => {
  try {
    const response = await axios.delete(
      `https://spancareers.vercel.app/api/careers/cancelOpening/${openingId}`
    );

    if (response.data) {
      toast.success("Deleted successfully");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(error.response.data.error);
    } else {
      toast.error("Failed to cancel opening");
    }
    throw error;
  }
};

const getOpening = async () => {
  try {
    const response = await axios.get("https://spancareers.vercel.app/careers/getOpening");
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to get openings");
    throw error;
  }
};

const careerService = {
  addOpening,
  cancelOpening,
  getOpening,
};

export default careerService;


