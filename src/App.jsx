import { Route,Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import "./App.css";
import Home from "./views/Home";
import Login from "./views/Login";
import Contact from "./views/Contact";

function App() {
  return (
    <>
      <div className="overflow-y-hidde">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
