import axios from "axios";
import { useState, useEffect } from "react";
import JobOpeningDetailsModal from "@/components/JobOpeningDetailsModal";
import { env } from "@/next.config";

export async function getServerSideProps() {
  try {
    const response = await axios.get(`https://spancareers.vercel.app/api/careers/getOpening`);
    const openingsData = await response.data;

    return {
      props: {
        Apiopenings: openingsData,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        Apiopenings: [],
      },
    };
  }
}

const UserPage = ({ Apiopenings }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [openings, setOpenings] = useState(Apiopenings);
  const [selectedOpening, setSelectedOpening] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openJobDetailsModal = (opening) => {
    setSelectedOpening(opening);
    setIsModalOpen(true);
  };

  const closeJobDetailsModal = () => {
    setSelectedOpening(null);
    setIsModalOpen(false);
  };
  // const domain = process.env.DOMAIN_URL
  // console.log('domain', domain);
  const apiFetch = async () => {
    try {
      const response = await axios.get(`https://spancareers.vercel.app/api/careers/getOpening`);
      
      const openingsData = await response.data;
      setOpenings(openingsData);
    } catch (error) {
      console.error(error);
    }
  };

  const departmentChange = (e) => {
    if (selectedSpecialization) {
      setSelectedSpecialization("");
      setSelectedDepartment(e.target.value);
    } else {
      setSelectedDepartment(e.target.value);
    }
  };

  useEffect(() => {
    apiFetch();
  }, [openings, apiFetch]);

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

  const openingsdata = [...openings].reverse();

  const filteredOpenings = openingsdata.filter((opening) => {
    const searchTermLC = searchTerm.toLowerCase();
    const department = opening.department.toLowerCase();
    const specialization = opening.specialization.toLowerCase();
    const jobTitle = opening.jobTitle.toLowerCase();
    const jobDescription = opening.jobDescription.toLowerCase();

    const searchLocation = () => {
      if (typeof opening.location === "object") {
        return opening.location.some((item) =>
          item.toLowerCase().includes(searchTermLC)
        );
      } else {
        return opening.location.toLowerCase().includes(searchTermLC);
      }
    };

    const selectLocation = () => {
      if (typeof opening.location === "object") {
        return opening.location.some((item) => item.includes(selectedLocation));
      } else {
        return opening.location.includes(selectedLocation);
      }
    };

    const matchesSearch =
      department.includes(searchTermLC) ||
      specialization.includes(searchTermLC) ||
      jobTitle.includes(searchTermLC) ||
      jobDescription.includes(searchTermLC) ||
      searchLocation();

    const matchesDepartment = opening.department.includes(selectedDepartment);
    const matchesSpecialization = opening.specialization.includes(
      selectedSpecialization
    );
    const matchesLocation = selectLocation();

    return (
      matchesSearch &&
      matchesDepartment &&
      matchesSpecialization &&
      matchesLocation
    );
  });

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

  return (
    <>
      <div className="p-8 min-h-screen  bg-gradient-to-b from-gray-100 to-gray-400">
        <h1 className="text-4xl font-bold text-center mb-8">
          Looking for exciting opportunities and a great career? We are Hiring.
          <p className="text-blue-600 p-2">Apply Now</p>
        </h1>

        <div className="mb-4 relative">
          <span className="absolute inset-y-0 left-3 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6M3 8c0-5 5-5 5-5s5 0 5 5 0 5-5 5a5 5 0 010-10z"
              />
            </svg>
          </span>
          <input
            type="text"
            name="search"
            className="border border-gray-300 rounded w-full py-2 pl-10 px-3"
            placeholder="Search a job Opening"
            maxLength={50}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex space-x-4 mb-4 justify-center items-center">
          <select
            value={selectedDepartment}
            onChange={departmentChange}
            className="border border-gray-300 rounded py-2 px-3 cursor-pointer"
          >
            <option value="">Choose Department</option>

            <option value="Engineering">Engineering</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Marketing">Marketing</option>
            <option value="Security & Compliance">Security & Compliance</option>
          </select>

          <select
            value={selectedSpecialization}
            onChange={(e) => setSelectedSpecialization(e.target.value)}
            className="border border-gray-300 rounded py-2 px-3 cursor-pointer"
          >
            <option value="">Choose Specialization</option>
            {specializationOptions[selectedDepartment] &&
              specializationOptions[selectedDepartment].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>

          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="border border-gray-300 rounded py-2 px-3 cursor-pointer"
          >
            <option value="">Choose Location</option>
            <option value="Chennai">Chennai</option>
            <option value="Coimbatore">Coimbatore</option>
            <option value="Erode">Erode</option>
          </select>
        </div>

        {filteredOpenings.length === 0 ? (
          <>
            <div className=" flex items-center justify-center text-5xl p-3">
              <br></br>
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                className="text-gray-500"
                viewBox="0 0 16 16"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.146 8.146a.5.5 0 0 1 .708 0L8 9.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 10l1.147 1.146a.5.5 0 0 1-.708.708L8 10.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 10 6.146 8.854a.5.5 0 0 1 0-.708z"
                ></path>
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"></path>
              </svg>
            </div>

            <p className="text-center text-lg text-gray-500">No jobs found</p>
            <p className="text-center text-lg text-gray-500">
              Oops, you have no jobs that match the filter conditions.
            </p>
            <br></br>
            <p className="text-center text-lg text-gray-500">
              Try refining your search.
            </p>
          </>
        ) : (
          <>
            <h3 className="text-lg font-medium mb-2 text-center">
              {filteredOpenings.length} Job Openings Available
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOpenings.map((opening) => (
                <li
                  key={opening._id}
                  onClick={() => openJobDetailsModal(opening)}
                  className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer hover:bg-gray-100"
                >
                  <div className=" p-3">
                    <h2 className="text-xl font-semibold text-blue-600">
                      {opening.department}
                    </h2>
                    <h3 className="text-lg font-medium mb-2">
                      {opening.specialization}
                    </h3>
                    <h3 className="text-lg font-medium mb-2">
                      {opening.jobTitle}
                    </h3>
                    <div className=" flex justify-between">
                      <p className="text-gray-600 flex">
                        <img
                          className=" h-9 pb-2"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNgi1PMbIfNiHoviphwqr2N6D88c8bzq2NsWcGSeE&s"
                        ></img>{" "}
                        {Array.isArray(opening.location)
                          ? opening.location.join(", ")
                          : opening.location}
                      </p>
                      <p className=" text-end text-gray-400">
                        {timeAgo(opening.createdAt)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
        {selectedOpening && isModalOpen && (
          <JobOpeningDetailsModal
            opening={selectedOpening}
            onClose={closeJobDetailsModal}
          />
        )}
      </div>
    </>
  );
};

export default UserPage;
