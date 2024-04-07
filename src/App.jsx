import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import "./App.css";
import { sideBarList } from "./components/Sidebar";
import Home from "./views/Home";
import Login from "./views/Login";
import Contact from "./views/Contact";
import Dashboard from "./views/Dashboard";
import Profile from "./views/forms/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route
          path=""
          element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <Home />
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <Login />
            </div>
          }
        />
        <Route
          path="/contact"
          element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <Contact />
            </div>
          }
        />

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
      </Routes>
    </>
  );
}

export default App;
