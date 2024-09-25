import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { selectAccessToken } from "../redux/authSlice";

export default function PrivateRoutes() {
  const token = useAppSelector(selectAccessToken);

  return token ? <Outlet /> : <Navigate to="/login" />;
}
