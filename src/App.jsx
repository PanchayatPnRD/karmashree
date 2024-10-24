import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Karmashree_logo } from "./components/Logo";
import "./App.css";
import React, { useState, useEffect, Suspense, lazy } from "react";
import { sideBarList } from "./components/Sidebar";
import { ConfirmUser, ResetPassword } from "./views/ResetPassword";
import { ToastContainer, toast } from "react-toastify";
import Home from "./views/Home";
import Auth from "./auth/Auth";
import Login from "./views/Login";
import Contact from "./views/Contact";
import OTPConfirm from "./views/OtpConfirm";
const Dashboard = lazy(() => import("./views/Dashboard"));
const Profile = lazy(() => import("./views/forms/Profile"));
const ViewProfile = lazy(() => import("./views/forms/ViewProfile"));
const Edit = lazy(() => import("./components/Edit"));
const Dno = lazy(() => import("./views/forms/Dno"));
const Error404 = lazy(() => import("./views/Error404"));
const ActionPlanReport1 = lazy(() =>
  import("./views/reports/ActionPlanReport1")
);
const ActionPlanReport3 = lazy(() =>
  import("./views/reports/ActionPlanReport3")
);
const ActionPlanReport2 = lazy(() =>
  import("./views/reports/ActionPlanReport2")
);
const WorkAllocationView = lazy(() =>
  import("./views/forms/WorkAllocationView")
);
const UserManual = lazy(() => import("./views/UserManual"))
const ManualEdit = lazy(() => import("./views/UsermanualEdit"));
const SchemeEdit = lazy(() => import("./views/forms/SchemeEdit"));
const SchemeView = lazy(() => import("./views/forms/SchemeView"));
import "react-toastify/dist/ReactToastify.css";
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
        {homeRoutes.map(({ path, Element }, index) => {
          return (
            <Route
              key={index}
              path={path}
              element={
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  {/* <Suspense> */}
                  <Element />
                  {/* </Suspense> */}
                </div>
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
                    <Suspense
                      fallback={
                        <div className="flex items-center justify-center flex-grow p-8 px-12">
                          <Karmashree_logo className="fill-blue-400 h-[10rem] animate-pulse w-fit" />
                        </div>
                      }
                    >
                      <Component />
                    </Suspense>
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
                <Suspense>
                  <ViewProfile />
                </Suspense>
              </Dashboard>
            </Auth>
          }
        />
        <Route
          path={"/dashboard/profile-edit"}
          element={
            <Auth>
              <Dashboard>
                <Suspense>
                  <Profile />
                </Suspense>
              </Dashboard>
            </Auth>
          }
        />
        <Route
          path={"/dashboard/edit/:userId"}
          element={
            <Auth>
              <Dashboard>
                <Suspense>
                  <Edit />
                </Suspense>
              </Dashboard>
            </Auth>
          }
        />
        <Route
          path="/dashboard/workallocationview/:allocationID"
          element={
            <Auth>
              <Dashboard>
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center flex-grow p-8 px-12">
                      <Karmashree_logo className="fill-blue-400 h-[10rem] animate-pulse w-fit" />
                    </div>
                  }
                >
                  <WorkAllocationView />
                </Suspense>
              </Dashboard>
            </Auth>
          }
        />
        <Route
          path="/dashboard/actionplan-report1"
          element={
            <Auth>
              <Dashboard>
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center flex-grow p-8 px-12">
                      <Karmashree_logo className="fill-blue-400 h-[10rem] animate-pulse w-fit" />
                    </div>
                  }
                >
                  <ActionPlanReport1 />
                </Suspense>
              </Dashboard>
            </Auth>
          }
        />
        <Route
          path="/dashboard/actionplan-report2"
          element={
            <Auth>
              <Dashboard>
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center flex-grow p-8 px-12">
                      <Karmashree_logo className="fill-blue-400 h-[10rem] animate-pulse w-fit" />
                    </div>
                  }
                >
                  <ActionPlanReport2 />
                </Suspense>
              </Dashboard>
            </Auth>
          }
        />

        <Route
          path="/dashboard/actionplan-report3"
          element={
            <Auth>
              <Dashboard>
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center flex-grow p-8 px-12">
                      <Karmashree_logo className="fill-blue-400 h-[10rem] animate-pulse w-fit" />
                    </div>
                  }
                >
                  <ActionPlanReport3 />
                </Suspense>
              </Dashboard>
            </Auth>
          }
        />
        <Route
          path="/dashboard/scheme-edit/:schemeID"
          element={
            <Auth>
              <Dashboard>
                <Suspense>
                  <SchemeEdit />
                </Suspense>
              </Dashboard>
            </Auth>
          }
        />

        <Route
          path="/dashboard/scheme-view/:schemeID"
          element={
            <Auth>
              <Dashboard>
                <Suspense>
                  <SchemeView />
                </Suspense>
              </Dashboard>
            </Auth>
          }
        />
        <Route
          path="/dashboard/manual"
          element={
            <Auth>
              <Dashboard>
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center flex-grow p-8 px-12">
                      <Karmashree_logo className="fill-blue-400 h-[10rem] animate-pulse w-fit" />
                    </div>
                  }
                >
                  <UserManual />
                </Suspense>
              </Dashboard>
            </Auth>
          }
        />
        <Route
          path="/dashboard/manual-add"
          element={
            <Auth>
              <Dashboard>
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center flex-grow p-8 px-12">
                      <Karmashree_logo className="fill-blue-400 h-[10rem] animate-pulse w-fit" />
                    </div>
                  }
                >
                  <ManualEdit />
                </Suspense>
              </Dashboard>
            </Auth>
          }
        />
        <Route
          path="*"
          element={
            <Suspense>
              <Error404 />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}

export default App;
