import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { Footer, Header } from "./Components/Layout/Index";
import { lazy, useEffect } from "react";
import { LazyPageWrapper } from "./Components/Common/Index";
import { ProtectedRoute } from "./Utils/ProtectedRoute/ProtectedRoute";
import { useAuth } from "./Context/UserDataProvider/UserDataProvider";
const Login = lazy(() => import("./Pages/Feutures/Admin/Auth/Login/Index"));
const Main = lazy(() =>
  import("./Pages/Feutures/Admin/AuthenticatedRoutes/Index")
);
const Applications = lazy(() =>
  import("./Pages/Feutures/Admin/AuthenticatedRoutes/Applications/@View/Index")
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
          <Route
            path="login"
            element={
              <ProtectedRoute
                navigate={{
                  to: "/",
                }}
                condition={!user.data}
              >
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute
                condition={user.data}
                navigate={{
                  to: "/login",
                }}
              >
                <Main />
              </ProtectedRoute>
            }
          >
            <Route path="applications" element={<Applications />} />
          </Route>
        </Routes>
        <Footer />
      </LazyPageWrapper>
    </>
  );
}

export default App;
