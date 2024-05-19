import { useState, useEffect, useMemo } from "react";
import { devApi } from "../../WebApi/WebApi";
import { fetch } from "../../functions/Fetchfunctions";
import { Icon } from "@iconify/react/dist/iconify.js";
import DatePicker from "react-datepicker";
import { Table, TableHead } from "flowbite-react";
import axios from "axios";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Employment = () => {
  const { userIndex, category } = JSON.parse(
    localStorage.getItem("karmashree_User")
  );

  const { data: allocationList } = useQuery({
    queryKey: ["allocationList"],
    queryFn: async () => {
      const data = await fetch.get(
        `/api/allocation/getallocationListforemp/${userIndex}`
      );
      return data.data.result;
    },
  });

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
            <div className="flex pb-8 flex-col space-y-4">
              <div className="flex flex-col space-y-8">
                <div className="overflow-x-auto overflow-y-hidden h-fit w-full show-scrollbar">
                  <Table>
                    <Table.Head>
                      <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md">
                        #
                      </Table.HeadCell>
                      <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md">
                        work allocation id
                      </Table.HeadCell>
                      <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md">
                        District
                      </Table.HeadCell>
                      <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md">
                        Block
                      </Table.HeadCell>
                      <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md">
                        Scheme Id
                      </Table.HeadCell>

                      <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md">
                        Contrator Id
                      </Table.HeadCell>
                      <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md">
                        Funding Department
                      </Table.HeadCell>
                      <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md">
                        work order no
                      </Table.HeadCell>
                      <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md">
                        tentative start date
                      </Table.HeadCell>

                      <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md">
                        total no of work days allcoated
                      </Table.HeadCell>
                      <Table.HeadCell className="capitalize bg-cyan-400/40 text-blue-900 text-md">
                        total no of work days demanded
                      </Table.HeadCell>

                      <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md">
                        Action
                      </Table.HeadCell>
                    </Table.Head>
                    <Table.Body>
                      {allocationList?.map(
                        (
                          {
                            workAllocationID,
                            districtcode,
                            blockcode,
                            schemeId,
                            ControctorID,
                            FundingDeptname,
                            workorderNo,
                            tentativeStartDate,
                            noOfDaysWorkAlloted,
                            noOfDaysWorkDemanded,
                          },
                          index
                        ) => (
                          <Table.Row>
                            <Table.Cell>{index + 1}</Table.Cell>
                            <Table.Cell>{workAllocationID}</Table.Cell>
                            <Table.Cell>{districtcode}</Table.Cell>
                            <Table.Cell>{blockcode}</Table.Cell>
                            <Table.Cell>{schemeId}</Table.Cell>
                            <Table.Cell>{ControctorID}</Table.Cell>
                            <Table.Cell>{FundingDeptname}</Table.Cell>
                            <Table.Cell>{workorderNo}</Table.Cell>
                            <Table.Cell>
                              {new Date(tentativeStartDate).toLocaleDateString(
                                "en-IN",
                                {
                                  year: "numeric",
                                  day: "numeric",
                                  month: "2-digit",
                                }
                              )}
                            </Table.Cell>
                            <Table.Cell>{noOfDaysWorkAlloted}</Table.Cell>
                            <Table.Cell>{noOfDaysWorkDemanded}</Table.Cell>
                            <Table.Cell className="font-medium  text-teal-500 hover:underline text-2xl">
                              <button className="flex justify-center items-center">
                                <Icon
                                  icon={"iconoir:open-in-window"}
                                  className="cursor-pointer"
                                />
                              </button>
                            </Table.Cell>
                          </Table.Row>
                        )
                      )}
                    </Table.Body>
                  </Table>
                </div>
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
    </div>
  );
};

export default Employment;
