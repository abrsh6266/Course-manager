import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import errorMsg from "./Alerts/ErrorMsg";
import { RootState } from "../redux/store";

const ProtectedRoute = ({ children }: any) => {
  const { token } = useSelector((state: RootState) => state?.user);
  const location = useLocation();
  if (!token) {
    if (location.pathname === "/my-playlists"||location.pathname === "/add-music") {
      errorMsg("You have to login");
    }
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default ProtectedRoute;
