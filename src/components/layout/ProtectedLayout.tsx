import { Outlet } from "react-router-dom";
import { selectIsAuthenticated } from "../../app/authSlice";
import { useAppSelector } from "../../app/store";
import TableList from "../table-choose/TableList";

const ProtectedRoute = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  if (!isAuthenticated) {
    return <TableList />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
