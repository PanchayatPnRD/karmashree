import { Icon } from "@iconify/react";

const Dashboard = () => {
  return (
    <>
      <div className="h-screen flex justify-center items-center text-6xl font-semibold text-zinc-800">
        Dashboard
        <button>
          <Icon icon="mdi-light:home" className="text-blue-500" />
        </button>
      </div>
    </>
  );
};

export default Dashboard;
