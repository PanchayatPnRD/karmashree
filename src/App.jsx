import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import "./App.css";
import { sideBarList } from "./components/Sidebar";
import Home from "./views/Home";
import Login from "./views/Login";
import Contact from "./views/Contact";
import Dashboard from "./views/Dashboard";

function App() {
  return (
    <>
      <div className="">
        <Routes>
          <Route
            path=""
            element={
              <>
                <Navbar />
                <Home />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Navbar />
                <Login />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Navbar />
                <Contact />
              </>
            }
          />
          <Route
            path="/dashboard"
            element={<Dashboard text={"Dashboard Body"}></Dashboard>}
          />
          {sideBarList.map((e) => {
            return (
              <Route
                key={e.text}
                path={e.route}
                element={
                  <>
                    <Dashboard text={e.text}></Dashboard>
                  </>
                }
              />
            );
          })}
        </Routes>
      </div>
    </>
  );
}

export default App;
