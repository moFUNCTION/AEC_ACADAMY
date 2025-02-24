import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { Footer, Header } from "./Components/Layout/Index";
import { lazy, useEffect } from "react";
import { LazyPageWrapper } from "./Components/Common/Index";
import { ProtectedRoute } from "./Utils/ProtectedRoute/ProtectedRoute";
import { useAuth } from "./Context/UserDataProvider/UserDataProvider";
const Register = lazy(() =>
  import("./Pages/Feutures/Instructor/Auth/Register2/Index")
);
const Main = lazy(() =>
  import("./Pages/Feutures/Instructor/AuthenticatedRoutes/Index")
);
const UserProfile = lazy(() =>
  import("./Pages/Feutures/Instructor/AuthenticatedRoutes/UserProfile/Index")
);

function App() {
  const { user } = useAuth();
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      <LazyPageWrapper>
        <Routes>
          <Route path="register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute
                navigate={{
                  to: "/register",
                }}
                condition={user.data}
              >
                <Main />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<UserProfile />} />
          </Route>
        </Routes>
        <Footer />
      </LazyPageWrapper>
    </>
  );
}

export default App;
