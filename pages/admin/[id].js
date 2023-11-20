import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { addOpening } from "@/redux/authCareers/careerSlice";
import Spinner from "@/components/Spinner";
import AddOpeningModel from "@/components/AddOpeningModel";
import OpeningsTable from "@/components/OpeningsTable";
import axios from "axios";
import { useRouter } from "next/router";
import { logout } from "@/redux/Auth/authSlice";

export async function getServerSideProps(context) {
  try {
    const { id } = context.params;
    
    const response = await axios.get("http://localhost:3000/api/careers/getOpening");
    const openingsData = await response.data;

    const response1 = await axios.get("http://localhost:3000/api/candidates/getCandidates");
    const candidatesData = await response1.data;

    const response2 = await axios.get(`http://localhost:3000/api/me/${id}`);
    const myData = await response2.data;

    return {
      props: {
        Apiopenings: openingsData,
        Apicandidates: candidatesData,
        Apiadmin: myData,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        Apiopenings: [],
        Apicandidates: [],
        Apiadmin: null,
      },
    };
  }
}

const AdminPage = ({ Apiopenings, Apicandidates, Apiadmin }) => {
  // console.log('apiadmin', Apiadmin);
  const [department, setDepartment] = useState(""); 
  const [specialization, setSpecialization] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState([]);
  const [jobDescription, setJobDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTableOpen, setIsTableOpen] = useState(false);
  const [openings, setOpenings] = useState(Apiopenings);

  const dispatch = useDispatch();

  const router = useRouter();

  const admin = Apiadmin ? Apiadmin._id : "";

  const adminredux = useSelector((state) => state.auth.admin);

  useEffect(() => {
    if (!adminredux) {
      router.push("/admin/login");
    }
  }, [adminredux]);

  useEffect(() => {
    console.log("me", Apiadmin);
    if (!Apiadmin) {
      setTimeout(() => {
        dispatch(logout());
      }, 1000);
      localStorage.clear();
      toast.error("UnAuthorized Admin Please Login Again");
    }
  }, []);

  useEffect(() => {
    if (Apiadmin) {
      localStorage.setItem("admin", JSON.stringify(Apiadmin));
    }
  }, []);

  // useEffect(() => {
  //   const reduxdata = JSON.parse(localStorage.getItem("persist:auth"));
  //   const adminData = JSON.parse(reduxdata.admin);
  //   console.log("admin data", adminData._id);
  //   if (admin === adminData._id) {
  //     console.log("Admin not authorized");
  //   }
  // }, []);

  if (Apiadmin) {
    var [name, setName] = useState(Apiadmin.name);
  }
  if (Apiadmin) {
    useEffect(() => {
      if (!name) {
        setName("");
      }
    }, [name]);
  }

  const apiFetch = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/careers/getOpening");
      const openingsData = await response.data;
      setOpenings(openingsData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    apiFetch();
  }, [openings, apiFetch]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDepartment("");
    setSpecialization("");
    setJobTitle("");
    setLocation("");
    setJobDescription("");
  };

  const openTable = () => {
    setIsTableOpen(true);
  };

  const closeTable = () => {
    setIsTableOpen(false);
  };

  const handleBlur = (e) => {
    const { id, value } = e.target;
    if (!value) {
      var error = `${id} cannot be empty`;
    }
    const field = document.getElementById(`${id}`);
    const errorField = field.nextSibling;
    errorField.innerText = error ? error : "";
  };

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

  const openingData = {
    department,
    specialization,
    jobTitle,
    location,
    jobDescription,
    admin,
  };

  const { data, isError, isSuccuss, isLoading, message } = useSelector(
    (state) => state.authCareer
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [data, isError, isSuccuss, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  const handleAddOpening = async () => {
    if (
      !department ||
      !specialization ||
      !jobTitle ||
      !location ||
      !jobDescription ||
      !admin
    ) {
      return toast.error("Please fill all the fields");
    }
    if (location.length < 1) {
      return toast.error("Please select atleast one location");
    }
    dispatch(addOpening(openingData));
    setDepartment("");
    setSpecialization("");
    setJobTitle("");
    setLocation("");
    setJobDescription("");
    closeModal();
    openTable();
  };

  return (
    <>
      <div className="p-20 h-screen bg-gradient-to-b from-gray-50 to-gray-400">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to Admin Page of Careers@SpanTechnologies{" "}
          <span className="text-blue-600">{name}</span>
        </h1>

        <br></br>
        <div className=" shadow-2xl p-20 bg-gray-200 rounded-2xl">
          <div className="flex items-center justify-center">
            <button
              onClick={openModal}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded shadow-2xl"
            >
              Add Opening
            </button>

            {isModalOpen && (
              <AddOpeningModel
                closeModalFunction={closeModal}
                department={department}
                setDepartment={setDepartment}
                specialization={specialization}
                setSpecialization={setSpecialization}
                jobTitle={jobTitle}
                setJobTitle={setJobTitle}
                location={location}
                setLocation={setLocation}
                jobDescription={jobDescription}
                setJobDescription={setJobDescription}
                specializationOptions={specializationOptions}
                handleAddOpening={handleAddOpening}
                handleBlur={handleBlur}
              />
            )}
          </div>
          <br></br>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-3 rounded shadow-2xl"
              onClick={openTable}
            >
              View Openings
            </button>
            {isTableOpen && (
              <OpeningsTable
                openings={openings}
                closeModalFunction={closeTable}
                candidatesData={Apicandidates}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
