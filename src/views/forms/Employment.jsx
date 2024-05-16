import { useState, useEffect } from "react";
import { devApi } from "../../WebApi/WebApi";
import { Table, TableHead } from "flowbite-react";
import axios from "axios";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Employment = () => {
  const lastTenYears = Array.from({ length: 10 }, (_, index) => {
    const startYear = new Date().getFullYear() - index;
    return `${startYear}-${startYear + 1}`;
  });

  const [dropdownData, setDropdownData] = useState(["", "", ""]);
  function updateDropdown(index, value) {
    const newData = [...dropdownData];

    const old_val = newData[index];
    if (old_val != value) {
      newData[index] = value;
      for (let i = index + 1; i < newData.length; i++) {
        newData[i] = "";
      }
    }

    setDropdownData(newData);
  }

  const queryClient = useQueryClient();

  const { data: districtList } = useQuery({
    queryKey: ["districtList"],
    queryFn: async () => {
      const data = await axios.get(
        devApi + "/api/mastertable/getAllDistrictsaction"
      );
      return data.data.result;
    },
  });

  const { data: blockList, isLoading: blockLoading } = useQuery({
    queryKey: ["blockList"],
    queryFn: async () => {
      const data = await axios.get(
        devApi + "/api/mastertable/getBlockaction/" + dropdownData[0]
      );

      return data.data.result;
    },
    enabled: dropdownData[0].length > 0,
  });

  const { data: gpList, isLoading: gpLoading } = useQuery({
    queryKey: ["gpList"],
    queryFn: async () => {
      const data = await axios.get(
        devApi +
          "/api/mastertable/getGpaction/" +
          dropdownData[0] +
          "/" +
          dropdownData[1]
      );

      return data.data.result;
    },
    enabled: dropdownData[1].length > 0,
  });

  useEffect(() => {
    if (dropdownData[0].length > 0)
      queryClient.invalidateQueries({ queryKey: ["blockList"] });
    if (dropdownData[1].length > 0)
      queryClient.invalidateQueries({ queryKey: ["gpList"] });
    if (dropdownData[2].length > 0)
      queryClient.invalidateQueries({ queryKey: ["demandData"] });
    if (dropdownData[2].length == "")
      queryClient.resetQueries({ queryKey: ["demandData"] });
  }, [dropdownData]);

  return (
    <div className="flex-grow">
      <ToastContainer />
      <div className="mx-auto mt-2">
        <div className="bg-white rounded-lg p-12">
          <div className="shadow-md" style={{ marginBottom: "-1rem" }}>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <nav aria-label="Breadcrumb">
                  <ol className="flex items-center space-x-4 px-4 py-2">
                    {" "}
                    {/* Added padding */}{" "}
                    <svg
                      viewBox="0 0 1024 1024"
                      fill="currentColor"
                      height="1em"
                      width="1em"
                    >
                      <path d="M946.5 505L534.6 93.4a31.93 31.93 0 00-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3 0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8 24.9-25 24.9-65.5-.1-90.5z" />
                    </svg>
                    <li>
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        Home
                      </a>
                      /
                    </li>
                    <li className="text-gray-500 font-bold" aria-current="page">
                      Employment Entry
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
            <br />
          </div>

          <br></br>
          <div className="bg-white shadow-md rounded-lg p-12">
            <div className="flex pb-8">
              <div className="px-4">
                <label
                  htmlFor="scheme_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Financial year
                  <span className="text-red-500 "> * </span>
                </label>
                <select
                  // value={dropdownData[0]}
                  id="scheme_name"
                  name="scheme_name"
                  autoComplete="off"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  // onChange={(e) => updateDropdown(0, e.target.value)}
                  // onChange={onDistrict}
                >
                  <option defaultValue="" selected hidden>
                    2024-2025
                  </option>
                  {lastTenYears.map((yearRange) => (
                    <option key={yearRange} value={yearRange}>
                      {yearRange}
                    </option>
                  ))}
                </select>
              </div>
              <div className="px-4">
                <label
                  htmlFor="scheme_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  District
                  <span className="text-red-500 "> * </span>
                </label>
                <select
                  value={dropdownData[0]}
                  id="scheme_name"
                  name="scheme_name"
                  autoComplete="off"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  onChange={(e) => updateDropdown(0, e.target.value)}
                  // onChange={onDistrict}
                >
                  <option defaultValue="" selected hidden>
                    Select District List
                  </option>
                  {districtList?.map((e) => (
                    <option key={e.districtCode} value={e.districtCode}>
                      {e.districtName}
                    </option>
                  ))}
                </select>
              </div>
              {dropdownData[0].length > 0 && (
                <div className="px-4">
                  <label
                    htmlFor="scheme_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Block
                    <span className="text-red-500 "> * </span>
                  </label>
                  <select
                    value={dropdownData[1]}
                    id="scheme_name"
                    name="scheme_name"
                    autoComplete="off"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    onChange={(e) => updateDropdown(1, e.target.value)}
                    // onChange={onDistrict}
                  >
                    <option value="" selected hidden>
                      Select Block List
                    </option>
                    {blockList?.map((e) => (
                      <option value={e.blockCode}>{e.blockName}</option>
                    ))}
                    {blockLoading && <option>Loading...</option>}
                  </select>
                </div>
              )}
              {dropdownData[1].length > 0 && (
                <div className="px-4">
                  <label
                    htmlFor="scheme_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    GP
                    <span className="text-red-500 "> * </span>
                  </label>
                  <select
                    value={dropdownData[2]}
                    id="scheme_name"
                    name="scheme_name"
                    autoComplete="off"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    onChange={(e) => updateDropdown(2, e.target.value)}
                    // onChange={onDistrict}
                  >
                    <option value="" selected hidden>
                      Select Gp List
                    </option>
                    {gpList?.map((e) => (
                      <option value={e.gpCode}>{e.gpName}</option>
                    ))}
                    {gpLoading && <option>Loading...</option>}
                  </select>
                </div>
              )}
            </div>
            <div className="flex flex-col space-y-8">
              <Table>
                <Table.Head>
                  <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md">
                    Funding Dept
                  </Table.HeadCell>
                  <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md">
                    Executing Dept
                  </Table.HeadCell>
                  <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md">
                    Implementing Agency
                  </Table.HeadCell>
                  <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md">
                    Work Order No
                  </Table.HeadCell>
                  <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md">
                    Contractor Details
                  </Table.HeadCell>
                  <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md">
                    Contact person
                  </Table.HeadCell>
                  <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md">
                    Contact Person{" "}
                  </Table.HeadCell>
                </Table.Head>
              </Table>
              <Table>
                <Table.Head>
                  <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md">
                    #
                  </Table.HeadCell>
                  <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md">
                    Work Jobcard No
                  </Table.HeadCell>
                  <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md">
                    Job Card Holder Name
                  </Table.HeadCell>
                  <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md">
                    Allocation Date From
                  </Table.HeadCell>
                  <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md">
                    Allocation Date To
                  </Table.HeadCell>
                  <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md">
                    Total Days work Provided
                  </Table.HeadCell>
                  <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md">
                    Total Wage Paid
                  </Table.HeadCell>
                </Table.Head>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employment;
