import { Suspense, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import useCookie, { removeCookie } from "react-use-cookie";
import useUserStore from "../../../stores/useUserStore";
import Header from "./Header";
import PageLoading from "../../../components/PageLoading";
import { checkProfile } from "../../../services/profile";

const DashboardLayout = () => {
  const [token] = useCookie("my_token");
  const [userCookie] = useCookie("user");
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();

  // const isAuthenticated = async () => {
  //   const res = await checkProfile();
  //   if (!res.ok) {
  //     removeCookie("my_token");
  //     removeCookie("user");
  //     navigate("/login");
  //     toast.error("You are not logged in.");
  //   }
  // };

  useEffect(() => {
    setUser(JSON.parse(userCookie));
    // isAuthenticated();
  }, []);

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <main className=" flex flex-col min-h-screen px-5">
      <Suspense fallback={<PageLoading />}>
        <Outlet />
      </Suspense>
      <Toaster position="top-right" />
    </main>
  );
};

export default DashboardLayout;
