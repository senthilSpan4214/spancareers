import axios from "axios";
import { toast } from "react-toastify";

const register = async (adminData) => {
  try {
    const response = await axios.post(
      "https://spancareers.vercel.app/api/register",
      adminData
    );
    if (response.data) {
      // localStorage.setItem("admin", JSON.stringify(response.data));      
    }
    return response.data;
  } catch (error) {
    console.error(error);
    if (error.response && error.response.data && error.response.data.error) {
      const errorMessage = error.response.data.error;
      toast.error(errorMessage);
    }
  }
};

const login = async (adminData) => {
  try {
    const response = await axios.post("https://spancareers.vercel.app/api/login", adminData);
    if (response.data) {
      // localStorage.setItem("admin", JSON.stringify(response.data));
     
    }
    return response.data;
  } catch (error) {
    console.error(error);
    if (error.response && error.response.data && error.response.data.error) {
      const errorMessage = error.response.data.error;
      toast.error(errorMessage);
    }
  }
};

const logout = () => {
  localStorage.clear();
};


const authService = {
  register,
  logout,
  login,
};

export default authService;
