const AddOpeningModel = ({
  closeModalFunction,
  handleAddOpening,
  department,
  setDepartment,
  specialization,
  setSpecialization,
  jobTitle,
  setJobTitle,
  location,
  setLocation,
  jobDescription,
  setJobDescription,
  specializationOptions
}) => {
  const handleLocationChange = (e) => {
    const selectedLocation = e.target.value;
    if (location.includes(selectedLocation)) {
      setLocation(location.filter((loc) => loc !== selectedLocation));
    } else {
      setLocation([...location, selectedLocation]);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto bg-black bg-opacity-50">
      <div className="relative p-8 mx-auto my-0 bg-white rounded-lg shadow-lg w-1/2">
        <button
          className="absolute top-2 right-4 text-gray-600 text-2xl  hover:text-red-500 hover:text-4xl"
          onClick={() => closeModalFunction()}
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Add a New Job Opening
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600">
              Department<span className="text-red-600">*</span>
            </label>
            <select
              className="border border-gray-300 rounded w-full py-2 px-3"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="">Select Department</option>
              <option value="Engineering">Engineering</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Marketing">Marketing</option>
              <option value="Security & Compliance">
                Security & Compliance
              </option>
            </select>
          </div>

          <div>
            <label className="block text-gray-600">
              Specialization<span className="text-red-600">*</span>
            </label>
            <select
              className="border border-gray-300 rounded w-full py-2 px-3"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
            >
              <option value="">Select Specialization</option>

              {specializationOptions[department] &&
                specializationOptions[department].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="space-y-2 p-5 grid grid-cols-2 gap-4">
          <div className=" py-5 w-full">
            <label htmlFor="jobTitle" className="block text-gray-600">
              Job Title<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              maxLength={50}
              placeholder="Enter your Job Title"
              className="border border-gray-300 rounded w-full py-2 px-3"
            />
            <span className="text-red-500"></span>
          </div>

          <div>
            <label className="block text-gray-600">
              Location<span className="text-red-600">*</span>
            </label>
            <div>
              <label className="block">
                <input
                  type="checkbox"
                  value="Chennai"
                  checked={location.includes("Chennai")}
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
                  value="Coimbatore"
                  checked={location.includes("Coimbatore")}
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
                  value="Erode"
                  checked={location.includes("Erode")}
                  onChange={handleLocationChange}
                  className="form-checkbox text-blue-500 h-5 w-5 cursor-pointer"
                />
                <span className="ml-2 text-gray-700 cursor-pointer">Erode</span>
              </label>
            </div>
          </div>
        </div>
        <div className=" ">
            <label className="block text-gray-600">Job Description<span className="text-red-600">*</span></label>
            <textarea
              className="border border-gray-300 rounded w-full py-2 px-8 h-14"
              value={jobDescription}       
              maxLength={200}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Enter Job Description (e.g., 0-2 years)"
            />
              <span className="text-red-500"></span>
          </div>        

        <div className="flex justify-center mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            onClick={() => handleAddOpening()}
          >
            Add Opening
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddOpeningModel;
