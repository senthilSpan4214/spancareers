import React from "react";
import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "@/redux/Auth/authSlice";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const adminData = useSelector((state) => state.auth.admin);
  const router = useRouter();
  // if (adminData) {
  //   router.push(`/admin/${adminData.token}`);
  // }

  const [formData, setFormData] = useState({
    employeeId: "",
    email: "",
    password: "",
  });
  const { employeeId, email, password } = formData;

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

  const dispatch = useDispatch();
  const { admin, isError, isSuccuss, isLoading, message } = useSelector(
    (state) => state.auth
  );

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccuss && admin) {
      if (admin) {
        router.push(`/admin/${admin._id}`);
        toast.success("loggedIn Successfully");
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

    return null;
  };

  const validateInput = (field, value) => {
    if (field === "email") {
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
    } else {
      return "";
    }
  };

  const handleFocus = (e) => {
    const field = document.getElementById(`${e.target.id}`);
    const errorField = field.nextSibling;
    errorField.innerText = "";
  };

  const handleBlur = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    const { id, value } = e.target;
    const error = validateInput(id, value);
    const field = document.getElementById(`${id}`);
    const errorField = field.nextSibling;
    errorField.innerText = error;
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

    if (!isErrors) {
      const adminData = {
        employeeId,
        email,
        password,
      };
      dispatch(login(adminData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="max-w-md w-full p-6 space-y-6 bg-white rounded-lg shadow-lg">
            <div className="text-center">
              <h1 className="text-3xl font-semibold">
                <FaSignInAlt className="inline text-4xl mr-2" />
                Login
              </h1>
              <p>Please Login to further</p>
            </div>

            <form onSubmit={onSubmit}>
              <div className="mb-4">
                <div htmlFor="employeeId" className="block font-semibold">
                  Employee Id<span className="text-red-600">*</span>
                </div>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                  id="employeeId"
                  name="employeeId"
                  value={employeeId}
                  maxLength={7}
                  onChange={onChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder="Enter your EmployeeId"
                />
                <span className="text-red-500"></span>
              </div>
              <div className="mb-4">
                <div htmlFor="email" className="block font-semibold">
                  Email<span className="text-red-600">*</span>
                </div>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  maxLength={50}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder="Enter your email"
                />
                <span className="text-red-500"></span>
              </div>
              <div className="mb-4 relative">
                <div htmlFor="password" className="block font-semibold">
                  Password<span className="text-red-600">*</span>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-3 py-2 border rounded"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleBlur}
                  maxLength={20}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder="Enter password"
                />
                <span className="text-red-500"></span>
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
                  className={`absolute right-3 top-8 text-sm cursor-pointer ${
                    showPassword ? "text-blue-500" : "text-gray-500"
                  }`}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <div className="mb-4">
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
                  Login
                </button>
              </div>
            </form>
            <p>
              New admin? Please{" "}
              <Link href="/admin/signup">
                <button className="text-blue-500">Register</button>
              </Link>
            </p>
          </div>
        </div>
      }
    </>
  );
};

export default Login;
