import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import "./App.css";
import { sideBarList } from "./components/Sidebar";
import Home from "./views/Home";
import Login from "./views/Login";
import Contact from "./views/Contact";
import Dashboard from "./views/Dashboard";
import Profile from "./views/forms/Profile";
import OTPConfirm from "./views/OtpConfirm";
import Deno from "./views/forms/Deno";
import { ConfirmUser, ResetPassword } from "./views/ResetPassword";

function App() {
  const homeRoutes = [
    { path: "/", Element: Home },
    { path: "/login", Element: Login },
    { path: "/contact", Element: Contact },
    // { path: "/dashboard", Element: Dashboard },
    { path: "/otp", Element: OTPConfirm },
    { path: "/verify", Element: ConfirmUser },
    { path: "/reset", Element: ResetPassword },
  ];

  return(
    <>
      <Routes>
        {
          homeRoutes.map(({path,Element}, index) => {
            return (
              <Route
                key={index}
                path={path}
                element={
                  <div className="flex flex-col min-h-screen">
                    <Navbar />
                    <Element />
                  </div>
                }
              />
            );
          })
        }
        

        {sideBarList.map(({ route, Component, text }) => {
          return (
            <Route
              key={text}
              path={route}
              element={
                <>
                  <Dashboard>
                    <Component />
                  </Dashboard>
                </>
              }
            />
          );
        })}
        <Route
          path={"/dashboard/profile"}
          element={
            <>
              <Dashboard>
                <Profile />
              </Dashboard>
            </>
          }
        />
        <Route
          path={"/dashboard/deno"}
          element={
            <>
              <Dashboard>
                <Deno />
              </Dashboard>
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
