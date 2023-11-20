import { useDispatch, useSelector } from "react-redux";
import { cancelOpening } from "@/redux/authCareers/careerSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const OpeningsTable = ({ openings, closeModalFunction }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [candidatesData, setCandidatesData] = useState([]);
  const [department, setDepartment] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState([]);
  const [jobDescription, setJobDescription] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [editingOpening, setEditingOpening] = useState(null);
  const [formData, setFormData] = useState({
    department: "",
    specialization: "",
    jobTitle: "",
    location: [],
    jobDescription: "",
  });

  const dispatch = useDispatch();

  const openViewModal = () => {
    setIsModalOpen(true);
  };

  const closeViewModal = () => {
    setIsModalOpen(false);
    setEditingOpening(null);
  };

  const openingsData = [...openings].reverse();

  const viewCandidates = async (
    openingId,
    department,
    specialization,
    jobTitle,
    location,
    jobDescription,
    createdAt
  ) => {
    const response = await axios.get(
      `http://localhost:3000/api/candidates/getCandidate/${openingId}`
    );
    setCandidatesData(response.data);
    setDepartment(department);
    setSpecialization(specialization);
    setJobTitle(jobTitle);
    setLocation(location);
    setJobDescription(jobDescription);
    setCreatedAt(createdAt);
    openViewModal();
  };

  const departmentOptions = [
    "Engineering",
    "Human Resources",
    "Marketing",
    "Security & Compliance",
  ];
  const specializationOptions = {
    Engineering: [
      "Nodejs",
      "DOTNET",
      "Quality Assurance",
      "Android",
      "IOS",
      "DevOps",
      "Web Designing",
    ],
    "Human Resources": [
      "Talent Acquisition",
      "Talent Management",
      "Human Resource",
    ],
    Marketing: ["SEO", "Social Media", "Advertising"],
    "Security & Compliance": ["Security Analyst", "Security Administrator"],
  };

  const admin = useSelector((state) => state.auth.admin._id);

  const editOpening = (opening) => {
    setIsModalOpen(true);
    setEditingOpening(opening);
    setFormData({
      department: opening.department,
      specialization: opening.specialization,
      jobTitle: opening.jobTitle,
      location: opening.location,
      jobDescription: opening.jobDescription,
      admin: admin,
    });
  };

  const deleteOpening = (openingId) => {
    console.log(openingId);
    if (confirm("Are you sure?")) {
      const deleteData = { openingId, admin };
      dispatch(cancelOpening(openingId));
    }
  };

  const saveEditedOpening = async () => {
    try {
      if (formData.location.length === 0) {
        return toast.error("Please select a location");
      }
      if (editingOpening) {
        const response = await axios.put(
          `http://localhost:3000/api/careers/editOpening/${editingOpening._id}`,
          formData
        );

        if (response.status === 200) {
          toast.success("Opening updated successfully");
          setIsModalOpen(false);
          setEditingOpening(null);
          setFormData({
            department: "",
            specialization: "",
            jobTitle: "",
            location: [],
            jobDescription: "",
          });
        } else {
          toast.error("Failed to update opening");
        }
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error;
        toast.error(errorMessage);
      }
      console.error("An error occurred while updating the opening", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await saveEditedOpening();
  };

  const handleLocationChange = (e) => {
    const selectedLocation = e.target.value;
    if (formData.location.includes(selectedLocation)) {
      setFormData({
        ...formData,
        location: formData.location.filter((loc) => loc !== selectedLocation),
      });
    } else {
      setFormData({
        ...formData,
        location: [...formData.location, selectedLocation],
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { data, isError, isSuccuss, isLoading, message } = useSelector(
    (state) => state.authCareer
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccuss || data) {
      //   dispatch(reset());
    }
  }, [data, isError, isSuccuss, message, dispatch]);

  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMilliseconds = now - date;
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
      return `${diffInDays} days ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hours ago`;
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes} minutes ago`;
    } else {
      return `${diffInSeconds} seconds ago`;
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-x-hidden bg-black bg-opacity-50">
      <div className="relative p-8 mx-20 bg-white rounded-lg shadow-lg w-screen h-5/6  overflow-y-auto">
        <button
          className="absolute top-2 right-4 text-gray-600 text-3xl hover:text-red-500 hover:text-4xl "
          onClick={() => closeModalFunction()}
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Available Job Openings
        </h2>

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Department
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Specialization
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Job-Title
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Location
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                View Candidates
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Edit Opening
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Delete Opening
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {openingsData &&
              openingsData.map((opening) => (
                <tr key={opening._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {opening.department}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {opening.specialization}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {opening.jobTitle ? opening.jobTitle : ""}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap ">
                    <div className="text-sm text-gray-900 flex items-center">
                      <img
                        className=" h-9 pb-2"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNgi1PMbIfNiHoviphwqr2N6D88c8bzq2NsWcGSeE&s"
                      ></img>
                      {Array.isArray(opening.location)
                        ? opening.location.join(", ")
                        : opening.location}
                    </div> 
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <button
                        className="inline-flex items-center px-4 py-2 bg-gray-400 hover:bg-green-700 text-white text-sm font-medium rounded-md"
                        onClick={() =>
                          viewCandidates(
                            opening._id,
                            opening.department,
                            opening.specialization,
                            opening.jobTitle,
                            opening.location,
                            opening.jobDescription,
                            opening.createdAt
                          )
                        }
                      >
                        View appliers
                      </button>
                    </div>
                    {isModalOpen && (
                      <div className="fixed inset-0 flex items-center justify-center z-50 overflow-x-visible bg-black bg-opacity-50 compact">
                        <div className="relative p-8 mx-20 bg-white rounded-lg shadow-lg w-2/3 h-5/6 overflow-y-auto flex flex-col items-center">
                          <span
                            className="absolute top-4 right-4 text-gray-500 cursor-pointer hover:text-red-500 hover:text-2xl"
                            onClick={closeViewModal}
                          >
                            &#10006;
                          </span>
                          <p className="text-gray-600 absolute bottom-10 right-5">
                            {timeAgo(createdAt)}
                          </p>
                          <h2 className="text-2xl font-semibold text-blue-600">
                            {department}
                          </h2>
                          <h3 className="text-lg font-medium mb-2">
                            {specialization}
                          </h3>
                          <h3 className="text-lg font-medium mb-2">
                            {jobTitle}
                          </h3>
                          <p className="text-gray-600">
                            Location:{" "}
                            {Array.isArray(location)
                              ? location.join(", ")
                              : location}
                          </p>

                          <div className=" break-words">
                            <p className="mt-2">{jobDescription}</p>
                          </div>

                          <br></br>
                          <div className="flex flex-col items-center overflow-y-auto">
                            <h3 className="text-lg font-medium mb-2 text-center">
                              {candidatesData.length} Candidates Applied
                            </h3>
                            <div className="max-h-96 overflow-y-auto w-full">
                              {candidatesData.map((candidate) => (
                                <div
                                  key={candidate._id}
                                  className="bg-white rounded-lg overflow-hidden shadow-md w-full mb-4"
                                >
                                  <div className="p-4">
                                    <h2 className="text-xl font-semibold text-blue-600">
                                      Name: {candidate.name}
                                    </h2>
                                    <h3 className="text-lg font-medium mb-2">
                                      Email: {candidate.email}
                                    </h3>
                                    <h3 className="text-lg font-medium mb-2">
                                      Phone Number: {candidate.phoneNumber}
                                    </h3>
                                    <p className="mt-2"> </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <button
                        className="inline-flex items-center px-4 py-2 bg-gray-400 hover:bg-blue-700 text-white text-sm font-medium rounded-md"
                        onClick={() => editOpening(opening)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 3a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2h8zm2 6a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v4z"
                          />
                        </svg>
                        Edit
                      </button>
                      {isModalOpen && editingOpening && (
                        <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto bg-black bg-opacity-50">
                          <div className="relative p-8 mx-auto my-0 bg-white rounded-lg shadow-lg w-1/2">
                            <button
                              className="absolute top-2 right-4 text-gray-600 text-2xl  hover:text-red-500 hover:text-4xl"
                              onClick={() => closeViewModal()}
                            >
                              &times;
                            </button>
                            <h2 className="text-2xl font-semibold mb-6 text-center">
                              Edit Job Opening
                            </h2>

                            <form>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-gray-600">
                                    Department
                                    <span className="text-red-600">*</span>
                                  </label>
                                  <select
                                    className="border border-gray-300 rounded w-full py-2 px-3"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                  >
                                    <option value="">Select Department</option>
                                    {departmentOptions.map((option) => (
                                      <option key={option} value={option}>
                                        {option}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                <div className={`form-select`}>
                                  <label className="block text-gray-600">
                                    Specialization
                                    <span className="text-red-600">*</span>
                                  </label>
                                  <select
                                    className="border border-gray-300 rounded w-full py-2 px-3"
                                    name="specialization"
                                    value={formData.specialization}
                                    onChange={handleChange}
                                  >
                                    <option value="">
                                      Select Specialization
                                    </option>
                                    {specializationOptions[
                                      formData.department
                                    ] &&
                                      specializationOptions[
                                        formData.department
                                      ].map((option) => (
                                        <option key={option} value={option}>
                                          {option}
                                        </option>
                                      ))}
                                  </select>
                                </div>

                                <div className="  py-5 w-full">
                                  <label
                                    htmlFor="jobTitle"
                                    className="block text-gray-600"
                                  >
                                    Job Title
                                    <span className="text-red-600">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    id="jobTitle"
                                    name="jobTitle"
                                    value={formData.jobTitle}
                                    maxLength={50}
                                    onChange={handleChange}
                                    placeholder="Enter your Job Title"
                                    className="border border-gray-300 rounded w-full py-2 px-3"
                                  />
                                  <span className="text-red-500"></span>
                                </div>

                                <div>
                                  <label className="block text-gray-600">
                                    Location
                                    <span className="text-red-600">*</span>
                                  </label>

                                  <div className="space-y-2 p-5">
                                    <label className="block">
                                      <input
                                        type="checkbox"
                                        name="location"
                                        value="Chennai"
                                        checked={formData.location.includes(
                                          "Chennai"
                                        )}
                                        onChange={handleLocationChange}
                                        className="form-checkbox text-blue-500 h-5 w-5 cursor-pointer"
                                      />
                                      <span className="ml-2 text-gray-700 cursor-pointer">
                                        Chennai
                                      </span>
                                    </label>
                                    <label className="block">
                                      <input
                                        type="checkbox"
                                        name="location"
                                        value="Coimbatore"
                                        checked={formData.location.includes(
                                          "Coimbatore"
                                        )}
                                        onChange={handleLocationChange}
                                        className="form-checkbox text-blue-500 h-5 w-5 cursor-pointer"
                                      />
                                      <span className="ml-2 text-gray-700 cursor-pointer">
                                        Coimbatore
                                      </span>
                                    </label>
                                    <label className="block">
                                      <input
                                        type="checkbox"
                                        name="location"
                                        value="Erode"
                                        checked={formData.location.includes(
                                          "Erode"
                                        )}
                                        onChange={handleLocationChange}
                                        className="form-checkbox text-blue-500 h-5 w-5 cursor-pointer"
                                      />
                                      <span className="ml-2 text-gray-700 cursor-pointer">
                                        Erode
                                      </span>
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <label className="block text-gray-600">
                                  Job Description
                                  <span className="text-red-600">*</span>
                                </label>
                                <textarea
                                  className="border border-gray-300 rounded w-full py-2 px-3"
                                  name="jobDescription"
                                  value={formData.jobDescription}
                                  onChange={handleChange}
                                  placeholder="Enter Job Description EX : 0-2 years"
                                />
                              </div>

                              <div className="flex justify-center mt-4">
                                <button
                                  className="bg-blue-500 hover-bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                                  type="submit"
                                  onClick={handleSubmit}
                                >
                                  Update Opening
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <button
                        className="inline-flex items-center px-4 py-2 bg-gray-400 hover:bg-red-700 text-white text-sm font-medium rounded-md"
                        onClick={() => deleteOpening(opening._id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OpeningsTable;
