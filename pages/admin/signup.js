import Link from "next/link";
import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "@/redux/Auth/authSlice";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";

const Signup = () => {
  const adminData = useSelector((state) => state.auth.admin);

  useEffect(() => {
    const admin = adminData ? adminData._id : "";
    if (admin) {
      router.push(`/admin/${admin}`);
    }
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    employeeId: "",
    password: "",
    confirmPassword: "",
  });
  
  const [check, setCheck] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState({
    lengthError: true,
    uppercaseError: true,
    lowercaseError: true,
    numberError: true,
    specialCharError: true,
  });
  const [passwordErrorMsg, setPasswordErrorMsg] = useState({
    lengthError: true,
    uppercaseError: true,
    lowercaseError: true,
    numberError: true,
    specialCharError: true,
  });
  const { name, email, employeeId, password, confirmPassword } = formData;

  const [showPassword, setShowPassword] = useState(false);

  // const adminId = useSelector((state) => state.auth.admin);

  // if (adminId!=null){
  //   useEffect(() => {
  //     router.push(`/admin/${adminId._id}`);
  //   }, []);
  // }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const dispatch = useDispatch();
  const { admin, isError, isSuccuss, isLoading, message } = useSelector(
    (state) => state.auth
  );

  const validatePassword = (password) => {
    const errors = {
      lengthError: password.length < 8 || password.length > 20,
      uppercaseError: !/(?=.*[A-Z])/.test(password),
      lowercaseError: !/(?=.*[a-z])/.test(password),
      numberError: !/(?=.*\d)/.test(password),
      specialCharError: !/(?=.*[!@#$%^&*])/.test(password),
    };

    setPasswordErrors(errors);
    setPasswordErrorMsg(errors);

    const isPasswordValid = !Object.values(errors).some((error) => error);

    if (!password) {
      return "Password is Required...";
    }

    if (!isPasswordValid) {
      return "Password does not meet the criteria";
    }
    // if(isPasswordValid){
    //    return setPasswordErrorMsg(false)
    // }

    return null;
  };

  const validateInput = (field, value) => {
    if (field === "name") {
      const nameRegex = /^[A-Za-z_# ]{3,20}$/;
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
    } else if (field === "employeeId") {
      const employeeIdRegex = /^STS-\d{3}$/;
      if (!value) {
        return "EmployeeId cannot be Empty";
      }
      return employeeIdRegex.test(value.trim())
        ? ""
        : "ID Must begin with STS- followed by 3 digit numbers";
    } else if (field === "password") {
      if (!value) {
        return "Password cannot be Empty";
      }
      return validatePassword(value);
    } else if (field === "confirmPassword") {
      if (!value) {
        return "ConfirmPassword cannot be Empty";
      }
      return value === password ? "" : "Passwords do not match";
    } else {
      return "";
    }
  };
  const handleBlur = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    const { id, value } = e.target;
    let error = validateInput(id, value);
    const field = document.getElementById(`${id}`);
    const errorField = field.nextSibling;
    errorField.innerText = error;
  };

  const router = useRouter();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccuss && admin) {
      if (admin) {
        router.push(`/admin/${admin._id}`);
        toast.success("Registered Successfully");
      }
    }
    dispatch(reset());
  }, [admin, isError, isSuccuss, message, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFocus = (e) => {
    const field = document.getElementById(`${e.target.id}`);
    const errorField = field.nextSibling;
    errorField.innerText = "";
  };

  const handleSubmit = async (e) => {
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
    if (!isErrors) {
      const adminData = {
        name,
        email,
        employeeId,
        password,
      };
      dispatch(register(adminData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {!adminData && (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="max-w-md w-full p-6 space-y-6 bg-white rounded-lg shadow-lg">
            <div className="text-center">
              <h1 className="text-3xl font-semibold">
                <FaUser className="inline text-4xl mr-2" />
                Register
              </h1>
              <p>Please register to create an account</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="relative">
                  <div htmlFor="name" className="block font-semibold">
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
                    className="w-full px-4 py-2 mt-2 border rounded-lg "
                    placeholder="Enter your name"
                  />
                  <span className="error text-red-500"></span>
                </div>

                <div className="relative">
                  <div htmlFor="email" className="block font-semibold">
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
                    className="w-full px-4 py-2 mt-2 border rounded-lg"
                    placeholder="Enter your email"
                  />
                  <span className="error text-red-500"></span>
                </div>

                <div className="relative">
                  <div htmlFor="employeeId" className="block font-semibold">
                    Employee ID<span className="text-red-600">*</span>
                  </div>
                  <input
                    type="text"
                    id="employeeId"
                    name="employeeId"
                    value={employeeId}
                    maxLength={7}
                    onChange={onChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className="w-full px-4 py-2 mt-2 border rounded-lg "
                    placeholder="Enter your Employee ID"
                  />
                  <span className="error text-red-500"></span>
                </div>

                <div className="relative">
                  <div htmlFor="password" className="block font-semibold">
                    Password<span className="text-red-600">*</span>
                  </div>
                  <div className="password-input-container">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={password}
                      maxLength={20}
                      onChange={handleBlur}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      className="w-full px-4 py-2 mt-2 border rounded-lg  "
                      placeholder="Enter password"
                    />
                    <span className="error text-red-500"></span>
                    {password ? (
                      <div className={" password-validation mt-2 text-sm"}>
                        <div id="passwordNone">
                          <p
                            className={`${
                              passwordErrors.lengthError
                                ? "text-red-500"
                                : "text-green-500"
                            }`}
                          >
                            {passwordErrorMsg.lengthError
                              ? "Password must be 8 to 20 characters long"
                              : ""}
                          </p>
                          <p
                            className={`${
                              passwordErrors.uppercaseError
                                ? "text-red-500"
                                : "text-green-500"
                            }`}
                          >
                            {passwordErrorMsg.uppercaseError
                              ? " Password must contain at least one uppercase letter"
                              : ""}
                          </p>
                          <p
                            className={`${
                              passwordErrors.lowercaseError
                                ? "text-red-500"
                                : "text-green-500"
                            }`}
                          >
                            {passwordErrorMsg.lowercaseError
                              ? "Password must contain at least one lowercase letter"
                              : ""}
                          </p>
                          <p
                            className={`${
                              passwordErrors.numberError
                                ? "text-red-500"
                                : "text-green-500"
                            }`}
                          >
                            {passwordErrorMsg.numberError
                              ? " Password must contain at least one number"
                              : ""}
                          </p>
                          <p
                            className={`${
                              passwordErrors.specialCharError
                                ? "text-red-500"
                                : "text-green-500"
                            }`}
                          >
                            {passwordErrorMsg.specialCharError
                              ? "Password must contain at least one special character"
                              : ""}
                          </p>
                        </div>
                      </div>
                    ) : null}
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className={`absolute right-2   top-10 text-sm cursor-pointer ${
                        showPassword ? "text-blue-500" : "text-gray-500"
                      }`}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <div
                    htmlFor="confirmPassword"
                    className="block font-semibold"
                  >
                    Confirm Password<span className="text-red-600">*</span>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={onChange}
                    onFocus={handleFocus}
                    maxLength={20}
                    onBlur={handleBlur}
                    className="w-full px-4 py-2 mt-2 border rounded-lg "
                    placeholder="Confirm password"
                  />
                  <span className="error text-red-500"></span>
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className={`absolute right-2  hidden top-10 text-sm cursor-pointer ${
                      showPassword ? "text-blue-500" : "text-gray-500"
                    }`}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <button
                  type="submit"
                  className="w-full py-2  text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring focus:ring-indigo-400"
                >
                  Register
                </button>
              </div>
            </form>
            <p className="text-center">
              Already a Admin? Please{" "}
              <Link href="/admin/login" className=" text-blue-500 ">
                Login
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
