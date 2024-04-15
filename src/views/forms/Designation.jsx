import { useState, useEffect, useMemo } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { TablePagination } from "../../components/DataTable";
import { Table } from "flowbite-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Designation = () => {
  const HeadData = ["designation tier", "designation", "edit", "delete"];

  const [currentPage, setCurrentPage] = useState(1);

  const [startIndex, endIndex] = useMemo(() => {
    const start = (currentPage - 1) * 5;
    const end = currentPage * 5;

    return [start, end];
  }, [currentPage]);

  const { data: designationList } = useQuery({
    queryKey: ["designationList"],
    queryFn: async () => {
      const data = await axios.get(
        "http://43.239.110.159:8094/api/mastertable/DesignationList"
      );
      // console.log(Array.isArray(data.data.result));
      return data.data.result;
    },
  });

  return (
    <div className="bg-white rounded-lg p-12 flex flex-col flex-grow">
      <div className="shadow-md">
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
                  <a href="#" className="text-indigo-600 hover:text-indigo-800">
                    Home
                  </a>
                  /
                </li>
                <li className="text-gray-500 font-bold" aria-current="page">
                  Designation Master
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <br />
      </div>
      <div className="px-36 flex flex-col space-y-6 py-8">
        <div>
          <label htmlFor="">
            Designation Tier<span className="text-red-500 "> * </span>
          </label>
          <select
            name=""
            id=""
            className="mt-1 p-2 px-4 block w-full border border-gray-300 rounded-md"
          >
            <option value="">Select Designation Tier</option>
            <option value="HQ">Headquater</option>
            <option value="DIST">District</option>
            <option value="BLOCK">Block</option>
          </select>
        </div>
        <div>
          <label htmlFor="" className="capitalize text-black">
            designation
            <span className="text-red-500 "> * </span>
          </label>
          <input
            required
            placeholder="Enter designation ..."
            type="text"
            className="mt-1 p-2 px-4 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex justify-center items-center">
          <button
            type="button"
            className="w-1/3 py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            // onClick={onRegister}
          >
            Submit
          </button>
        </div>
      </div>
      <div className="px-12 flex flex-col space-y-6 py-8">
        <Table className="">
          <Table.Head>
            <Table.HeadCell className="capitalize">sl no</Table.HeadCell>
            {HeadData.map((e) => (
              <Table.HeadCell key={e} className="capitalize">
                {e}
              </Table.HeadCell>
            ))}
          </Table.Head>
          <Table.Body className="divide-y">
            {designationList
              ?.slice(
                startIndex,
                designationList.length > endIndex
                  ? endIndex
                  : designationList.length
              )
              .map(
                ({ designationId, designationLevel, designation }, index) => (
                  <Table.Row
                    key={designationId}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {index + 1 + startIndex}
                    </Table.Cell>
                    <Table.Cell>{designationLevel}</Table.Cell>
                    <Table.Cell className="min-w-[560px]">{designation}</Table.Cell>

                    <Table.Cell>
                      <a
                        href="#"
                        className="font-medium text-cyan-600 hover:underline text-2xl"
                      >
                        <Icon icon={"mingcute:edit-line"} />
                      </a>
                    </Table.Cell>
                    <Table.Cell>
                      <a
                        href="#"
                        className="font-medium text-red-600 hover:underline text-2xl"
                      >
                        <Icon icon={"ic:round-delete"} />
                      </a>
                    </Table.Cell>
                  </Table.Row>
                )
              )}
          </Table.Body>
        </Table>
        <div className="flex overflow-x-auto sm:justify-center">
          <TablePagination
            data={designationList}
            setCurrentPage={setCurrentPage}
            startIndex={startIndex}
            endIndex={endIndex}
          />
        </div>
      </div>
    </div>
  );
};

export default Designation;
