import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { devApi } from "../../WebApi/WebApi";

const Contractor = () => {
  const [area, setArea] = useState();
  const [district, setDistrict] = useState();

  const { data: districtList } = useQuery({
    queryKey: ["districtList"],
    queryFn: async () => {
      const data = await axios.get(
        devApi + "/api/mastertable/getAllDistrictsaction"
      );
      // console.log(Array.isArray(data.data.result));
      return data.data.result;
    },
  });

  
    const { data: municipalityList } = useQuery({
      queryKey: ["municipalityList"],
      queryFn: async () => {
        const data = await axios.get(
          devApi + "/api/mastertable/getMunicapility/" + district
        );
        // console.log(Array.isArray(data.data.result));
        return data.data.result;
      },
    });
  

  useEffect(() => {
    district && console.log(municipalityList)
  }, [district])

  return (
    <div className="flex flex-grow flex-col space-y-16 p-6 px-12">
      <div className="p-4 px-8 shadow-md rounded">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4 px-4 py-2">
            <svg
              viewBox="0 0 1024 1024"
              fill="currentColor"
              height="1em"
              width="1em"
            >
              <path d="M946.5 505L534.6 93.4a31.93 31.93 0 00-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3 0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8 24.9-25 24.9-65.5-.1-90.5z" />
            </svg>
            <li>
              <Link
                to="/dashboard"
                className="text-indigo-600 hover:text-indigo-800"
              >
                Home
              </Link>
              /
            </li>
            <li className="text-gray-500 font-bold" aria-current="page">
              Contractor Master
            </li>
          </ol>
        </nav>
      </div>
      <div className="bg-white p-6 px-12 shadow-md rounded border-t flex flex-col space-y-8">
        <div className="px-4">
          <label className="block text-sm font-medium text-gray-700">
            Area
            <span className="text-red-500 "> * </span>
          </label>
          <select
            onChange={(e) => setArea(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            // onChange={onSchemeArea}
          >
            <option selected hidden>
              Select Scheme area
            </option>
            <option value="R">Rural</option>
            <option value="U">Urban</option>
          </select>
        </div>
        {area && (
          <div className="px-4">
            <label className="block text-sm font-medium text-gray-700">
              District
              <span className="text-red-500 "> * </span>
            </label>
            <select
              defaultValue={"Select District"}
              onChange={(e) => setDistrict(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              // onChange={onSchemeArea}
            >
              <option selected hidden>
                Select District
              </option>
              {districtList?.map(({ districtName, districtCode }) => {
                return (
                  <option key={districtCode} value={districtCode}>
                    {districtName}
                  </option>
                );
              })}
            </select>
          </div>
        )}
        {district && area == "U" && {
          
        }}
      </div>
    </div>
  );
};

export default Contractor;
