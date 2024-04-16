import { Link } from "react-router-dom";

const ViewProfile = () => {
  return (
    <div className="flex flex-col space-y-8 flex-grow justify-center items-center">
      <span className="text-4xl ">Profile view mode</span>
      <Link to={"/dashboard/profile-edit"}>Edit</Link>
    </div>
  );
};

export default ViewProfile;
