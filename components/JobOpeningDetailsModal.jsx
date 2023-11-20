import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const JobOpeningDetailsModal = ({ opening, onClose }) => {
  const [isApplying, setIsApplying] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });
  const { name, email, phoneNumber } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleApplyClick = () => {
    setIsApplying(true);
  };

  const validateInput = (field, value) => {
    if (field === "name") {
      const nameRegex = /^[A-Za-z_# ]{5,20}$/;
      if (!value) {
        return "Name cannot be Empty";
      }
      return nameRegex.test(value.trim()) ? "" : "Please enter a valid name";
    } else if (field === "email") {
      let emailRegex =
        /^(?=.*[a-zA-Z])[a-zA-Z0-9]+(\+[a-zA-Z0-9]+)?(\.[a-zA-Z0-9]+(\+[a-zA-Z0-9]+)?)*@(?=.*[a-zA-Z])[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/;
      if (!value) {
        return "Email cannot be Empty";
      }
      return emailRegex.test(value.trim())
        ? ""
        : "Please enter a valid email address";
    } else if (field === "phoneNumber") {
      const phoneNumberRegex = /^(\+?91)?[6-9]\d{9}$/;
      if (!value) {
        return "PhoneNumber cannot be Empty";
      }
      return phoneNumberRegex.test(value.trim())
        ? ""
        : "Please enter a valid Phone Number";
    } else {
      return "";
    }
  };

  const handleBlur = (e) => {
    const { id, value } = e.target;
    const error = validateInput(id, value);
    const field = document.getElementById(`${id}`);
    const errorField = field.nextSibling;
    errorField.innerText = error;
  };

  const handleFocus = (e) => {
    const field = document.getElementById(`${e.target.id}`);
    const errorField = field.nextSibling;
    errorField.innerText = "";
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let isErrors = false;
    for (const field in formData) {
      const error = validateInput(field, formData[field]);
      const fieldEl = document.getElementById(`${field}`);
      if (error) {
        const errorField = fieldEl.nextSibling;
        errorField.innerText = error;
        isErrors = true;
      }
    }
    const jobOpeningId = opening._id;
    console.log(jobOpeningId);
    if (!isErrors) {
      const candidateData = {
        name,
        email,
        phoneNumber,
        jobOpeningId,
      };
      axios
        .post(
          "https://spancareers.vercel.app/api/candidates/registerCandidate",
          candidateData
        )
        .then(() => {
          toast.success("Application registed successfully");
          setIsApplying(false);
          setFormData(() => ({
            [e.target.name]: (e.target.value = ""),
          }));
          setMessage("Thank You for the registration, We will reach you soon");
        })
        .catch((error) => {
          console.log(error);
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            const errorMessage = error.response.data.error;
            toast.error(errorMessage);
          }
          toast.error("Email or Phone Number is already registered");
        });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-x-hidden bg-black bg-opacity-50">
      <div className="relative p-8 mx-20 bg-white rounded-lg shadow-lg w-2/3 h-5/6 overflow-y-auto flex flex-col items-center">
        <span
          className="absolute top-4 right-4 text-gray-500 cursor-pointer  hover:text-red-500 hover:text-2xl"
          onClick={onClose}
        >
          &#10006;
        </span>
        <h2 className="text-2xl font-semibold text-blue-600">
          {opening.department}
        </h2>
        <h3 className="text-lg font-medium mb-2">{opening.specialization}</h3>
        <h3 className="text-lg font-medium mb-2">{opening.jobTitle}</h3>
        <p className="text-gray-600">
          Location:{" "}
          {Array.isArray(opening.location)
            ? opening.location.join(", ")
            : opening.location}
        </p>
        <p className="mt-2">{opening.jobDescription}</p>

        {!isApplying && !message && (
          <button
            onClick={handleApplyClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
          >
            Apply Now
          </button>
        )}

        {isApplying && (
          <div className="mt-4 w-96 shadow-xl p-10">
            <div className=" pl-72">
              <span
                className="text-gray-500 cursor-pointer  hover:text-red-500 hover:text-xl"
                onClick={() => setIsApplying(false)}
              >
                &#10006;
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-blue-600 text-center p-5">
              Fill this Form to Apply
            </h2>

            <form onSubmit={onSubmit}>
              <div className="mb-4">
                <div htmlFor="name" className="block text-gray-600">
                  Name<span className="text-red-600">*</span>
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  maxLength={20}
                  onChange={onChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder="Enter your Name"
                  className="w-full px-3 py-2 border rounded "
                />
                <span className="text-red-500"></span>
              </div>
              <div className="mb-4">
                <div htmlFor="email" className="block text-gray-600">
                  Email<span className="text-red-600">*</span>
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  maxLength={50}
                  onChange={onChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border rounded "
                />
                <span className="text-red-500"></span>
              </div>
              <div className="mb-4 relative">
                <div htmlFor="phoneNumber" className="block text-gray-600">
                  Phone Number<span className="text-red-600">*</span>
                </div>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={phoneNumber}
                  maxLength={13}
                  onChange={onChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder="Enter your phoneNumber"
                  className="w-full px-3 py-2 border rounded"
                />
                <span className="text-red-500"></span>
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}

        <h2 className="text-2xl font-semibold text-blue-600 p-24">
          {message ? message : ""}
        </h2>
      </div>
    </div>
  );
};

export default JobOpeningDetailsModal;
