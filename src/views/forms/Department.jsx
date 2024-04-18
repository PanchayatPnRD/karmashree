import React, { useState, useMemo, useRef } from "react";
import { Table, Pagination } from "flowbite-react";
import { TablePagination } from "../../components/DataTable";
import { devApi } from "../../WebApi/WebApi";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
const Department = () => {
  const options = [5, 10, 15, 20, 30];
  const [currentPage, setCurrentPage] = useState(1);
  const [results, setResults] = useState(5);
  const [startIndex, endIndex] = useMemo(() => {
    const start = (currentPage - 1) * results;
    const end = currentPage * results;

    return [start, end];
  }, [currentPage, results]);

  const { data: departmentList } = useQuery({
    queryKey: ["departmentList"],
    queryFn: async () => {
      const data = await axios.get(devApi + "/api/mastertable/DepartmentList");
      // console.log(Array.isArray(data.data.result));
      return data.data.result;
    },
  });

  const deptNameRef = useRef(null);
  const shortFormRef = useRef(null);
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: (newTodo) => {
      return axios.post("", newTodo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("departmentList");
    }
  });

  function addDepartment() {
    mutate({
      departmentName: deptNameRef.current.value,
      labourConverge: "Y",
      deptshort: shortFormRef.current.value,
      organization: "S",
    });
  }

  const HeadData = [
    "sl no",
    "department",
    "department short name",
    "edit",
    "delete",
  ];

  return (
    <>
      {true && <Loading />}
      <div className="overflow-hidden bg-white rounded-lg p-12 flex flex-col flex-grow">
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
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      Home
                    </a>
                    /
                  </li>
                  <li className="text-gray-500 font-bold" aria-current="page">
                    Department Master
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <br />
        </div>
        <div className="px-36 flex flex-col space-y-6 py-8">
          <div>
            <label htmlFor="" className="capitalize text-black">
              department name
              <span className="text-red-500 "> * </span>
            </label>
            <input
              required
              placeholder="Enter Department Name  ..."
              type="text"
              ref={deptNameRef}
              HeadData
              className="mt-1 p-2 px-4 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="capitalize text-black">
              Short form
              <span className="text-red-500 "> * </span>
            </label>
            <input
              required
              placeholder="Enter Short Form ..."
              type="text"
              ref={shortFormRef}
              HeadData
              className="mt-1 p-2 px-4 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-center items-center">
            <button
              type="button"
              className="w-1/3 py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={addDepartment}
            >
              Save
            </button>
          </div>
        </div>
        <div className=" flex justify-between px-12 items-center h-12">
          <select
            className="outline-none border-2 rounded-lg border-zinc-300"
            onChange={(e) => setResults(e.target.value)}
          >
            {options.map((e) => (
              <option value={e}>{e}</option>
            ))}
          </select>
          {/* <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="search"
          className="px-4 outline-none border-2 rounded-lg border-zinc-300"
        /> */}
        </div>
        <div className="px-12 flex flex-col space-y-6 py-8">
          <Table>
            <Table.Head>
              {HeadData.map((e) => (
                <Table.HeadCell className="capitalize">{e}</Table.HeadCell>
              ))}
            </Table.Head>
            <Table.Body className="divide-y">
              {departmentList
                ?.slice(
                  startIndex,
                  departmentList.length > endIndex
                    ? endIndex
                    : departmentList.length
                )
                .map((d, index) => {
                  return (
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {index + 1 + startIndex}
                      </Table.Cell>
                      <Table.Cell>{d?.departmentName}</Table.Cell>
                      <Table.Cell className=" className">
                        {d?.deptshort}
                      </Table.Cell>

                      <Table.Cell className="flex space-x-8">
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
                  );
                })}
            </Table.Body>
          </Table>
          <div className="flex overflow-x-auto sm:justify-center">
            <TablePagination
              data={departmentList}
              setCurrentPage={setCurrentPage}
              startIndex={startIndex}
              endIndex={endIndex}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Department;

export const Loading = () => {
  return (
    <div className="flex overflow-hidden flex-grow backdrop-blur-sm bg-transparent absolute w-4/5 h-remaining z-20 justify-center items-center text-6xl text-red-600">
      <Icon icon={"svg-spinners:wind-toy"} />
    </div>
  );
};
