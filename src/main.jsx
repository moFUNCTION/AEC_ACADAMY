import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import {
  ChakraProvider,
  CircularProgress,
  extendTheme,
} from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { UserDataProvider } from "./Context/UserDataProvider/UserDataProvider";
import { LazyPageWrapper, StyledLoader } from "./Components/Common/Index";
import { TabsMenuExpandProvider } from "./Context/TabsMenuExpandProvider/TabsMenuExpandProvider";
import { BaseNavigationHandler } from "./Utils/BaseNavigationHandler/BaseNavigationHandler";

const Student = lazy(() => import("./App.Student"));
const Admin = lazy(() => import("./App.Admin"));
const Instructor = lazy(() => import("./App.Instructor"));

const route = window.location.pathname.split("/")[1];

const MainRoutes = [
  { href: "admin", Component: Admin },
  {
    href: "student",
    Component: Student,
  },
  {
    href: "instructor",
    Component: Instructor,
  },
];
if (!route) {
  window.location.href = "/student";
}

const getUserRole = () => {
  const User = localStorage.getItem("User");
  if (User) {
    return JSON.parse(User).role || "Student";
  } else {
    return "Student";
  }
};

if (getUserRole() === "Instructor" && route !== "instructor") {
  BaseNavigationHandler("./instructor");
}
if (getUserRole() === "Admin" && route !== "admin") {
  BaseNavigationHandler("./admin");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LazyPageWrapper>
      {MainRoutes.map((Route) => {
        if (route === Route.href) {
          return (
            <ChakraProvider
              toastOptions={{
                defaultProps: {
                  position: "top-right",
                  duration: 3000,
                  isClosable: true,
                },
              }}
              key={Route.href}
            >
              <UserDataProvider>
                <BrowserRouter basename={`/${Route.href}`}>
                  <TabsMenuExpandProvider>
                    <Route.Component />
                  </TabsMenuExpandProvider>
                </BrowserRouter>
              </UserDataProvider>
            </ChakraProvider>
          );
        }
      })}
    </LazyPageWrapper>
  </StrictMode>
);
