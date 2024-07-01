import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { devApi } from "../../WebApi/WebApi";
import { Icon } from "@iconify/react/dist/iconify.js";
import { fetch } from "../../functions/Fetchfunctions";
const ViewProfile = () => {
  const { userIndex, category } = JSON.parse(
    sessionStorage.getItem("karmashree_User")
  );

  const { data: userDetails } = useQuery({
    queryKey: ["userDetails"],
    queryFn: async () => {
      const data = await fetch.get("/api/user/viewuser/" + userIndex);

      return data.data.result;
    },
  });

  console.log(userDetails, "userDetails");

  const { data: designationList } = useQuery({
    queryKey: ["designationList"],
    queryFn: async () => {
      const data = await fetch.get("/api/mastertable/DesignationList");
      console.log(data);
      return data.data.result;
    },
  });

  return (
    <div className="flex flex-col space-y-8 flex-grow justify-center items-center">
      <div class="bg-white min-w-[64rem] shadow-lg border overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            User Profile Details
          </h3>
        </div>
        <div class="border-t border-gray-200">
          <dl>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Nodal office name
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userDetails?.userName}
              </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Designation</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userDetails?.designationID === 1
                  ? "Karmashree Admin"
                  : designationList?.[
                      designationList?.findIndex(
                        (obj) => obj.designationId == userDetails.designationID
                      )
                    ]?.designation}
              </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Email address</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userDetails?.email}
              </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Phone</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userDetails?.contactNo}
              </dd>
            </div>
            {/* <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">About</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                To get social media testimonials like these, keep your customers
                engaged with your social media accounts by posting regularly
                yourself
              </dd>
            </div> */}
          </dl>
        </div>
      </div>
      <Link to={"/dashboard/profile-edit"}>
        <button className="flex space-x-2 bg-blue-500 rounded justify-center items-center text-white p-2 px-4 hover:bg-blue-600/90 transition-all hover:shadow-md duration-200        ">
          <Icon icon={"material-symbols:edit"} />
          <span>Edit</span>
        </button>
      </Link>
    </div>
  );
};

export default ViewProfile;
