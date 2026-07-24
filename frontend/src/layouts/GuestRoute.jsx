import { Navigate } from "react-router-dom";

function GuestRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    switch (user.role) {
      case "admin":
        return <Navigate to="/admin" replace />;

      case "seller":
        return <Navigate to="/seller" replace />;

      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
}

export default GuestRoute;