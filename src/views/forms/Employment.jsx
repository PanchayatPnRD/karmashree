import { useState, useEffect, useMemo } from "react";
import { getCurrentFinancialYear } from "../../functions/dateCalc";
import { fetch } from "../../functions/Fetchfunctions";

import { Icon } from "@iconify/react/dist/iconify.js";
import SuccessModal from "../../components/SuccessModal";
import { updateVal } from "../../functions/updateVal";
import DatePicker from "react-datepicker";
import { Table } from "flowbite-react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Employment = () => {
  const [openModal, setOpenModal] = useState();
  const queryClient = useQueryClient();

  const temp = {
    empProvidedFrom: "",
    empProvidedTo: "",
    totalWagePaid: "",
    FundingDepttID: undefined,
    FundingDeptname: "",
    ExecutingDepttID: undefined,
    ExecutingDeptName: "",
    ImplementingAgencyID: undefined,
    ImplementingAgencyName: "",
  };

  const [initialData, setInitialData] = useState(temp);
  const [empData, setEmpData] = useState([]);

  const dateDifference = useMemo(() => {
    return empData.map(({ empProvidedFrom, empProvidedTo }) => {
      const timeDiff = Math.abs(
        new Date(empProvidedTo).getTime() - new Date(empProvidedFrom).getTime()
      ); // Absolute difference in milliseconds
      const daysDifference = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert to days

      return isNaN(daysDifference) ? 0 : daysDifference;
    });
  }, [empData]);

  const [workAllocationId, setWorkAllocationId] = useState("");

  const { userIndex } = JSON.parse(localStorage.getItem("karmashree_User"));

  const { data: allocationList } = useQuery({
    queryKey: ["allocationList"],
    queryFn: async () => {
      const data = await fetch.get(
        `/api/allocation/getallocationListforemp/${userIndex}`
      );
      return data.data.result;
    },
  });

  const { data: empList } = useQuery({
    queryKey: ["empList"],
    queryFn: async () => {
      const data = await fetch.get(
        `/api/allocation/allocationempfinallist/${workAllocationId}`
      );
      return data.data.result;
    },
    enabled: workAllocationId.length > 0,
    staleTime: 0,
  });

  useEffect(() => {
    if (workAllocationId.length > 0)
      queryClient.invalidateQueries({ queryKey: ["empList"] });
  }, [workAllocationId]);

  useEffect(() => {
    let filledArray = [];
    if (empList?.length > 0)
      filledArray = Array(empList?.length).fill(initialData);
    setEmpData(filledArray);
  }, [empList]);

  const empDataList = useMemo(() => {
    const array = empData.map((e, idx) => {
      const { totalWagePaid, ...emp } = e;
      const {
        workallocationsl,
        schemeName,
        contractorID,
        dateOfApplicationForWork,
        noOfDaysWorkDemanded,
        finYear,
        ex1,
        ex2,
        ex3,
        ex4,
        ex5,
        userIndex,
        submitTime,
        UpdateTime,
        ...rest
      } = empList[idx];
      if (totalWagePaid.length > 0)
        return {
          ...rest,
          ...emp,
          schemeSector: 23,
          userIndex: userIndex,
          dateOfPayment: new Date().toLocaleDateString("fr-CA"),
          finYear: getCurrentFinancialYear().financialYear,
          totalWagePaid: +totalWagePaid,
        };
    });
    if (array === undefined) return [];
    return array?.filter((value) => value !== undefined);
  }, [empData]);

  const { mutate, isSuccess: submitStatus } = useMutation({
    mutationFn: () => {
      return fetch.post(
        { CreateEmploymentDtos: empDataList },
        "/api/employment/allocation"
      );
    },
    mutationKey: ["empSubmit"],
    onSuccess: () => {
      setOpenModal(true);
    },
  });

  return (
    <>
      <SuccessModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        message={"Employment Generated Successfully"}
        to="employment-list"
        // resetData={resetData}
        isSuccess={submitStatus}
      />
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
                      <li
                        className="text-gray-500 font-bold"
                        aria-current="page"
                      >
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
                  {workAllocationId.length == 0 && (
                    <div className="overflow-x-auto overflow-y-hidden h-fit w-full show-scrollbar">
                      <Table>
                        <Table.Head>
                          <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md whitespace-nowrap">
                            #
                          </Table.HeadCell>
                          <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md whitespace-nowrap">
                            work allocation id
                          </Table.HeadCell>
                          <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md whitespace-nowrap">
                            District
                          </Table.HeadCell>
                          <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md whitespace-nowrap">
                            Block
                          </Table.HeadCell>
                          <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md whitespace-nowrap">
                            Scheme Id
                          </Table.HeadCell>

                          <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md whitespace-nowrap">
                            Contrator Id
                          </Table.HeadCell>
                          <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md whitespace-nowrap">
                            {/* <div className="whitespace-nowrap"> */}
                            Funding Department
                            {/* </div> */}
                          </Table.HeadCell>
                          <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md whitespace-nowrap">
                            work order no
                          </Table.HeadCell>
                          <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md whitespace-nowrap">
                            tentative start date
                          </Table.HeadCell>
                          <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md whitespace-nowrap">
                            expected completion date
                          </Table.HeadCell>

                          <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md whitespace-nowrap">
                            total no of work days allcoated
                          </Table.HeadCell>
                          <Table.HeadCell className="capitalize bg-cyan-400/40 text-blue-900 text-md whitespace-nowrap">
                            total no of work days demanded
                          </Table.HeadCell>

                          <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md whitespace-nowrap text-center">
                            Action
                          </Table.HeadCell>
                        </Table.Head>
                        <Table.Body>
                          {allocationList?.map(
                            (
                              {
                                workAllocationID,
                                districtName,
                                blockName,
                                schemeName,
                                ControctorID,
                                FundingDeptname,
                                workorderNo,
                                tentativeStartDate,
                                noOfDaysWorkAlloted,
                                noOfDaysWorkDemanded,
                                ExpectedCompletionDate,
                                FundingDepttID,
                                ExecutingDepttID,
                                ImplementingAgencyID,
                                ExecutingDeptName,
                                ImplementingAgencyName,
                              },
                              index
                            ) => (
                              <Table.Row>
                                <Table.Cell className="whitespace-nowrap py-2">{index + 1}</Table.Cell>
                                <Table.Cell className="whitespace-nowrap py-2">{workAllocationID}</Table.Cell>
                                <Table.Cell className="whitespace-nowrap py-2">{districtName}</Table.Cell>
                                <Table.Cell className="whitespace-nowrap py-2">{blockName}</Table.Cell>
                                <Table.Cell className="whitespace-nowrap py-2">{schemeName}</Table.Cell>
                                <Table.Cell className="whitespace-nowrap py-2">{ControctorID}</Table.Cell>
                                <Table.Cell className="whitespace-nowrap py-2">{FundingDeptname}</Table.Cell>
                                <Table.Cell className="whitespace-nowrap py-2">{workorderNo}</Table.Cell>
                                <Table.Cell className="whitespace-nowrap py-2">
                                  {new Date(
                                    tentativeStartDate
                                  ).toLocaleDateString("en-IN", {
                                    year: "numeric",
                                    day: "numeric",
                                    month: "2-digit",
                                  })}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap py-2">
                                  {new Date(
                                    ExpectedCompletionDate
                                  ).toLocaleDateString("en-IN", {
                                    year: "numeric",
                                    day: "numeric",
                                    month: "2-digit",
                                  })}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap py-2">{noOfDaysWorkAlloted}</Table.Cell>
                                <Table.Cell className="whitespace-nowrap py-2">{noOfDaysWorkDemanded}</Table.Cell>
                                <Table.Cell className="font-medium  text-white text-sm ">
                                  <div className="w-[200px]">
                                    <button
                                      className="flex justify-center items-center capitalize bg-teal-500 hover:bg-teal-500/90 hover:shadow-md rounded-lg px-2 pr-3 py-1 "
                                      onClick={() => {
                                        setWorkAllocationId(workAllocationID);
                                        setInitialData({
                                          totalWagePaid: "",
                                          FundingDepttID: FundingDepttID,
                                          FundingDeptname: FundingDeptname,
                                          ExecutingDepttID: ExecutingDepttID,
                                          ExecutingDeptName: ExecutingDeptName,
                                          ImplementingAgencyID:
                                            ImplementingAgencyID,
                                          ImplementingAgencyName:
                                            ImplementingAgencyName,
                                        });
                                      }}
                                    >
                                      <Icon
                                        icon={"mdi:rupee"}
                                        className="text-xl"
                                      />
                                      <span>employment generate</span>
                                    </button>
                                  </div>
                                </Table.Cell>
                              </Table.Row>
                            )
                          )}
                        </Table.Body>
                      </Table>
                    </div>
                  )}
                  {workAllocationId.length > 0 && (
                    <>
                      <div className="overflow-x-auto overflow-y-hidden h-fit w-full show-scrollbar">
                        <Table>
                          <Table.Head>
                            <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md whitespace-nowrap">
                              #
                            </Table.HeadCell>
                            <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md whitespace-nowrap">
                              Work Jobcard No
                            </Table.HeadCell>
                            <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md whitespace-nowrap">
                              Job Card Holder Name
                            </Table.HeadCell>
                            <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md whitespace-nowrap">
                              Allocation Date From
                            </Table.HeadCell>
                            <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md whitespace-nowrap">
                              Allocation Date To
                            </Table.HeadCell>
                            <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md whitespace-nowrap">
                              Total Days work Allocated
                            </Table.HeadCell>
                            <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md whitespace-nowrap">
                              Employment Provided Date
                            </Table.HeadCell>

                            <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md whitespace-nowrap">
                              Total days provided
                            </Table.HeadCell>
                            <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md whitespace-nowrap">
                              Total Wage Paid (Cost in Rs.)
                            </Table.HeadCell>
                          </Table.Head>
                          <Table.Body>
                            {empData?.map(
                              (
                                {
                                  empProvidedFrom,
                                  empProvidedTo,
                                  totalWagePaid,
                                  // workerJobCardNo,
                                  // workerName,
                                  // workAllocationFromDate,
                                  // workAllocationToDate,
                                  // noOfDaysWorkAlloted,
                                },
                                index
                              ) => (
                                <Table.Row>
                                  <Table.Cell>{index + 1}</Table.Cell>
                                  <Table.Cell className="whitespace-nowrap">
                                    {empList[index].workerJobCardNo}
                                  </Table.Cell>
                                  <Table.Cell>
                                    {empList[index].workerName}
                                  </Table.Cell>
                                  <Table.Cell>
                                    {new Date(
                                      empList[index].workAllocationFromDate
                                    ).toLocaleDateString("en-IN", {
                                      month: "2-digit",
                                      day: "numeric",
                                      year: "numeric",
                                    })}
                                  </Table.Cell>
                                  <Table.Cell>
                                    {new Date(
                                      empList[index].workAllocationToDate
                                    ).toLocaleDateString("en-IN", {
                                      month: "2-digit",
                                      day: "numeric",
                                      year: "numeric",
                                    })}
                                  </Table.Cell>
                                  <Table.Cell>
                                    {empList[index].noOfDaysWorkAlloted}
                                  </Table.Cell>
                                  <Table.Cell>
                                    <div className="flex items-center space-x-2">
                                      <DatePicker
                                        selectsStart
                                        minDate={
                                          new Date(
                                            empList[
                                              index
                                            ].workAllocationFromDate
                                          )
                                        }
                                        dateFormat="dd/MM/yyyy"
                                        selected={empProvidedFrom}
                                        onChange={(e) => {
                                          updateVal(
                                            {
                                              target: {
                                                name: "empProvidedFrom",
                                                value: e.toString(),
                                              },
                                            },
                                            index,
                                            empData,
                                            setEmpData
                                          );
                                        }}
                                        startDate={empProvidedFrom}
                                        endDate={empProvidedTo}
                                        portalId="root-portal"
                                        placeholderText="dd/mm/yyyy"
                                        className="w-32 cursor-pointer border-gray-300 rounded-md"
                                      />
                                      <DatePicker
                                        placeholderText="dd/mm/yyyy"
                                        selectsStart
                                        minDate={empProvidedFrom}
                                        selectsEnd
                                        dateFormat="dd/MM/yyyy"
                                        selected={empProvidedTo}
                                        onChange={(e) => {
                                          updateVal(
                                            {
                                              target: {
                                                name: "empProvidedTo",
                                                value: e.toString(),
                                              },
                                            },
                                            index,
                                            empData,
                                            setEmpData
                                          );
                                        }}
                                        maxDate={
                                          new Date(empProvidedFrom).getTime() +
                                          empList[index]?.noOfDaysWorkAlloted *
                                            24 *
                                            60 *
                                            60 *
                                            1000
                                        }
                                        startDate={empProvidedFrom}
                                        endDate={empProvidedTo}
                                        portalId="root-portal"
                                        className="w-32 cursor-pointer border-gray-300 rounded-md"
                                      />
                                    </div>
                                  </Table.Cell>
                                  <Table.Cell>
                                    {dateDifference[index]}
                                  </Table.Cell>
                                  <Table.Cell>
                                    <input
                                      name="totalWagePaid"
                                      type="text"
                                      className="rounded-lg border-zinc-300"
                                      onChange={(e) =>
                                        updateVal(e, index, empData, setEmpData)
                                      }
                                    />
                                  </Table.Cell>
                                </Table.Row>
                              )
                            )}
                          </Table.Body>
                        </Table>
                      </div>
                      <div className="flex space-x-4 justify-center items-center">
                        <button
                          type="button"
                          className="w-28 py-2 px-4 border mt-10 border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          onClick={() => {
                            setWorkAllocationId("");
                            setEmpData([]);
                          }}
                        >
                          back
                        </button>
                        <button
                          type="button"
                          className="w-1/5 py-2 px-4 border mt-10 border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={() => {
                            if (empDataList.length > 0) mutate();
                          }}
                        >
                          Submit
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Employment;
