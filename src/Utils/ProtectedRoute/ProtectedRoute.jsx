import { Navigate } from "react-router-dom";
import { StyledLoader } from "../../Components/Common/Index";

export const ProtectedRoute = ({
  condition,
  navigate: { to, message },
  children,
  isLoading,
}) => {
  if (isLoading) {
    return <StyledLoader />;
  } else {
    if (condition) {
      return children;
    } else {
      return <Navigate to={to} state={{ message }} />;
    }
  }
};
