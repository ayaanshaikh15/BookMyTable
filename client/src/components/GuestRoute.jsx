import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export function GuestRoute({ children }) {
  const {user} = useContext(AuthContext);

  if (user) {
    if(user.role=="admin")
    return <Navigate to="/admin/dashboard" replace />;
    else if(user.role=="owner")
    return <Navigate to="/owner/dashboard" replace />;
    else
    return <Navigate to="/" replace />;
  }

  return children;
}