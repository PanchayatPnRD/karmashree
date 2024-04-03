import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <div className="h-screen flex justify-center items-center text-6xl font-semibold text-zinc-800">
        Dashboard
        <button>
          <Link to={"/login"} >
            <Icon icon="mdi-light:home" className="text-blue-500" />
          </Link>
        </button>
      </div>
    </>
  );
};

export default Dashboard;
