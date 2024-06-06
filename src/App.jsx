import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import "./App.css";
import React, { useState, useEffect } from 'react';
import { sideBarList } from "./components/Sidebar";
import Home from "./views/Home";
import Auth from "./auth/Auth";
import Login from "./views/Login";
import Contact from "./views/Contact";
import Dashboard from "./views/Dashboard";
import Profile from "./views/forms/Profile";
import OTPConfirm from "./views/OtpConfirm";
import ViewProfile from "./views/forms/ViewProfile";
import Edit from "./components/Edit";
import Dno from "./views/forms/Dno";
import Error404 from "./views/Error404";
import { ConfirmUser, ResetPassword } from "./views/ResetPassword";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNetworkState } from "@uidotdev/usehooks";
import WorkAllocationView from "./views/forms/WorkAllocationView";
import SchemeEdit from "./views/forms/SchemeEdit";
function App() {
  // const network = useNetworkState();
  const homeRoutes = [
    { path: "/", Element: Home },
    { path: "/login", Element: Login },
    { path: "/contact", Element: Contact },
    { path: "/otp", Element: OTPConfirm },
    { path: "/verify", Element: ConfirmUser },
    { path: "/reset", Element: ResetPassword },
  ];



  return (
    <>
      <ToastContainer />
      <Routes>
        {homeRoutes.slice(0, 3).map(({ path, Element }, index) => {
          return (
            <Route
              key={index}
              path={path}
              element={
                <Auth>
                  <div className="flex flex-col min-h-screen">
                    <Navbar />
                    <Element />
                  </div>
                </Auth>
              }
            />
          );
        })}
        {homeRoutes
          .slice(3, homeRoutes.length)
          .map(({ path, Element }, index) => {
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Auth>
                    <div className="flex flex-col min-h-screen">
                      <Navbar />
                      <Element />
                    </div>
                  </Auth>
                }
              />
            );
          })}

        {sideBarList.map(({ route, Component, text }) => {
          return (
            <Route
              key={text}
              path={route}
              element={
                <Auth>
                  <Dashboard>
                    <Component />
                  </Dashboard>
                </Auth>
              }
            />
          );
        })}
        <Route
          path={"/dashboard/profile"}
          element={
            <Auth>
              <Dashboard>
                <ViewProfile />
              </Dashboard>
            </Auth>
          }
        />
        <Route
          path={"/dashboard/profile-edit"}
          element={
            <Auth>
              <Dashboard>
                <Profile />
              </Dashboard>
            </Auth>
          }
        />
        <Route
          path={"/dashboard/edit/:userId"}
          element={
            <Auth>
              <Dashboard>
                <Edit />
              </Dashboard>
            </Auth>
          }
        />

        <Route path="/dashboard/workallocationview/:allocationID"
          element={<Auth>
            <Dashboard>
              <WorkAllocationView />
            </Dashboard>
          </Auth>}
        />
        <Route path="/dashboard/scheme-edit/:schemeID"
          element={<Auth>
            <Dashboard>
              <SchemeEdit/>
            </Dashboard>
          </Auth>}
        />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
