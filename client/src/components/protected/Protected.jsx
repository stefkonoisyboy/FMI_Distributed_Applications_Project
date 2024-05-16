import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUser } from "../../store/slices/authUserSlice";
function Protected({ children }) {
  // Selectors
  const user = useSelector(selectUser);

  if (!Boolean(user)) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
}
export default Protected;
