import { useState, useEffect, useMemo } from "react";
import { Table } from "flowbite-react";
import { useQuery } from "@tanstack/react-query";
import { fetch } from "../../functions/Fetchfunctions";

import { getAllSchemeList } from "../../Service/Scheme/SchemeService";

const SchemeList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { userIndex } = JSON.parse(localStorage.getItem("karmashree_User"));
  const [startIndex, endIndex] = useMemo(() => {
    const start = (currentPage - 1) * 5;
    const end = currentPage * 5;

    return [start, end];
  }, [currentPage]);

  // const [schemeList, setSchemeList] = useState([]);

  const HeadData = [
    "Financial Year",
    "Block/Municipality",
    "GP",
    "Scheme Name",
    "Project Cost",
    "Total Wages Paid till date",
    "No of labours",
    "Engaged for no. of Days(MGNREGA WORKERS)",
    "Funding Department",
    "Action",
  ];
  const { data: schemeList } = useQuery({
    queryKey: ["schemeList"],
    queryFn: async () => {
      const data = await fetch.get("/api/schememaster/schemelist/" + userIndex);
      // console.log(Array.isArray(data.data.result));
      return data.data.result;
    },
  });

  // useEffect(() => {
  //   getAllSchemeList(userIndex).then(function (result) {
  //     const response = result?.data?.result;
  //     console.log(response, "res-->")
  //     setSchemeList(response);
  //   });

  // }, [])

  console.log(schemeList, "scehemeList");

  return (
    <>
      <div className="bg-white rounded-lg p-12">
        <div id="breadcrumb-starts-here" className="shadow-md -mb-4 ">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <nav aria-label="Breadcrumb">
                <ol className="flex items-center space-x-4 px-4 py-2">
                  {" "}
                  <svg
                    viewBox="0 0 1024 1024"
                    fill="currentColor"
                    height="1em"
                    width="1.5em"
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
                    &nbsp;/
                  </li>
                  <li className="text-gray-500 font-bold" aria-current="page">
                    Scheme List
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <br />
        </div>
      </div>
      <div className="flex flex-col flex-grow p-8 px-12">
        <div className="overflow-x-auto overflow-y-hidden h-fit w-full show-scrollbar">
          <Table className="">
            <Table.Head>
              <Table.HeadCell className="capitalize">sl no</Table.HeadCell>
              {HeadData?.map((e) => (
                <Table.HeadCell key={e} className="capitalize">
                  {e}
                </Table.HeadCell>
              ))}
            </Table.Head>
            <Table.Body className="divide-y">
              {schemeList?.map((d, index) => (
                <Table.Row
                  key={userIndex}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {index + 1}
                  </Table.Cell>

                  <Table.Cell>{d?.finYear}</Table.Cell>
                  <Table.Cell>
                    {d?.blockcode ? d?.blockcode : d?.municipalityCode}
                  </Table.Cell>
                  <Table.Cell>{d?.gpCode}</Table.Cell>
                  <Table.Cell>{d?.schemeName}</Table.Cell>
                  <Table.Cell>{d?.totalprojectCost}</Table.Cell>

                  <Table.Cell>{d?.totalWageCost}</Table.Cell>
                  <Table.Cell>{d?.totalLabour}</Table.Cell>
                  <Table.Cell>----</Table.Cell>
                  <Table.Cell>{d?.departmentNo}</Table.Cell>
                  <Table.Cell>*</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </>
  );
};

export default SchemeList;
