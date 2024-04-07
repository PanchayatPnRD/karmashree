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

          {sideBarList.map(({ route, Component }) => {
            return (
              <Route
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
        </Routes>
      </div>
    </>
  );
}

export default App;
