import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { Footer, Header } from "./Components/Layout/Index";
import { lazy, useEffect } from "react";
import { LazyPageWrapper } from "./Components/Common/Index";
import { useAuth } from "./Context/UserDataProvider/UserDataProvider";
import { ProtectedRoute } from "./Utils/ProtectedRoute/ProtectedRoute";
// Students
const Login = lazy(() => import("./Pages/Feutures/Student/Auth/Login/Index"));
const Register = lazy(() =>
  import("./Pages/Feutures/Student/Auth/Register/Index")
);
// Profile
const Profile = lazy(() =>
  import("./Pages/Feutures/Student/AuthenticatedRoutes/Profile/Index")
);
const ProfileDashbaord = lazy(() =>
  import(
    "./Pages/Feutures/Student/AuthenticatedRoutes/Profile/__Nested/Dashbaord"
  )
);
const ProfileNotifications = lazy(() =>
  import(
    "./Pages/Feutures/Student/AuthenticatedRoutes/Profile/__Nested/Notifications"
  )
);
const ProfileAssignments = lazy(() =>
  import(
    "./Pages/Feutures/Student/AuthenticatedRoutes/Profile/__Nested/Assignments"
  )
);

const Certificates = lazy(() =>
  import(
    "./Pages/Feutures/Student/AuthenticatedRoutes/Profile/__Nested/Certificates"
  )
);

const Reviews = lazy(() =>
  import(
    "./Pages/Feutures/Student/AuthenticatedRoutes/Profile/__Nested/Reviews"
  )
);

const Courses = lazy(() => import("./Pages/Feutures/Common/Courses/Index"));
const Course_Id = lazy(() => import("./Pages/Feutures/Common/Course_Id/Index"));
const Landing = lazy(() => import("./Pages/Landing/Index"));

function App() {
  const { user } = useAuth();
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <LazyPageWrapper>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="profile" element={<Profile />}>
            <Route index element={<ProfileDashbaord />} />
            <Route path="dashboard" element={<ProfileDashbaord />} />
            <Route path="notifications" element={<ProfileNotifications />} />
            <Route path="assignments" element={<ProfileAssignments />} />
            <Route path="certificates" element={<Certificates />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="*" />
            <Route />
          </Route>
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
            path="register"
            element={
              <ProtectedRoute
                navigate={{
                  to: "/",
                }}
                condition={!user.data}
              >
                <Register />
              </ProtectedRoute>
            }
          />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:id" element={<Course_Id />} />
        </Routes>
      </LazyPageWrapper>
    </>
  );
}

export default App;
