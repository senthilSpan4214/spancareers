import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const adminIndex = () => {
  const router = useRouter();

  const adminData = useSelector((state) => state.auth.admin);

  useEffect(() => {
    const adminId = adminData ? adminData._id : "";
    if (adminId) {
      router.push(`/admin/${adminId}`);
    }
  }, []);
  
  return (
    <>
      {!adminData && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-center mb-8">
              Please{" "}
              <Link href="/admin/signup" className="text-blue-500">
                Register
              </Link>{" "}
              or{" "}
              <Link href="/admin/login" className="text-blue-500">
                Login
              </Link> 
            </h1>
          </div>
        </div>
      )}
    </>
  );
};
export default adminIndex;
