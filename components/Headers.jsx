import Link from "next/link";
import { FaUser, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/Auth/authSlice";
import { useRouter } from "next/router";

const Headers = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  let admin = useSelector((state) => state.auth.admin);

  const isRootPath = router.pathname === "/";
  const isPath = router.pathname === "/about";

  const onLogOut = async () => {
    if (confirm("Are you sure?")) {
      await setTimeout(() => {
        dispatch(logout());
      }, 1500);
      router.push("/admin/login");
    }
  };

  return (
    <>
      <header className="bg-blue-500 text-white p-3 flex justify-between items-center">
        <div className="logo">
          <Link href="/">
            <img
              src="https://careers.spantechnologyservices.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.46df665b.png&w=256&q=75"
              alt="Dashboard"
              className="w-25 bg-white h-auto"
            />
          </Link>
        </div>
        <h1 className="text-2xl font-bold">Careers@SpanTechnology</h1>
        {!isRootPath && !isPath && (
          <ul className="flex space-x-4">
            {admin ? (
              <li>
                <button
                  className="btn bg-blue-500 hover:bg-red-800 border-black hover:border-0 hover:text-white"
                  onClick={onLogOut}
                >
                  <FaSignOutAlt className="mr-1" />
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li
                  className={`mr-1 ${
                    router.pathname === "/admin/signup" ? "text-gray-400" : ""
                  }`}
                >
                  <Link href="/admin/signup">
                    <FaUser className="mr-1" />
                    Register
                  </Link>
                </li>
                <li
                  className={`mr-1 ${
                    router.pathname === "/admin/login" ? "text-gray-400" : ""
                  }`}
                >
                  <Link href="/admin/login">
                    <FaSignInAlt />
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        )}
        {isRootPath ? (
          <Link
            href={`/about`}
            className={`text-white text-xl font-bold hover:text-gray-200 ${
              router.pathname === "/admin/login" ? "text-gray-400" : ""
            }`}
          >
            About Us
          </Link>
        ) : (
          ""
        )}
        {isPath ? (
          <Link
            href={`/`}
            className={`text-white text-lg font-bold hover:text-gray-200 ${
              router.pathname === "/admin/login" ? "text-gray-400" : ""
            }`}
          >
            {" "}
            Back to Home
          </Link>
        ) : (
          ""
        )}
      </header>
    </>
  );
};

export default Headers;
