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
import { SortIcon } from "../../components/SortIcon";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Pagination } from "../../components/Pagination";
import classNames from "classnames";
import { renderToStaticMarkup } from "react-dom/server";

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
    dateOfPayment: "",
    attandance: "Present",
  };

  const [initialData, setInitialData] = useState(temp);
  const [empData, setEmpData] = useState([]);

  const dateDifference = useMemo(() => {
    return empData.map(({ empProvidedFrom, empProvidedTo }) => {
      const timeDiff = Math.abs(
        new Date(empProvidedTo).getTime() - new Date(empProvidedFrom).getTime()
      ); // Absolute difference in milliseconds
      const daysDifference = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert to days

      return isNaN(daysDifference) ? 0 : daysDifference+1;
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
  const data = useMemo(() => allocationList ?? [], [allocationList]);
  const filteredData = useMemo(() => {
    const arr = data.filter((e) => e.workAllocationID == workAllocationId);
    if (arr) return arr[0];
  }, [workAllocationId]);

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
        demanduniqueID,
        ...rest
      } = empList[idx];
      if (totalWagePaid.length > 0)
        return {
          ...rest,
          ...emp,
          schemeSector: 23,
          userIndex: userIndex,
          demandid: demanduniqueID,
          // dateOfPayment: new Date().toLocaleDateString("fr-CA"),
          finYear: getCurrentFinancialYear().financialYear,
          totalWagePaid: +totalWagePaid,
        };
    });
    if (array === undefined) return [];
    return array?.filter((value) => value !== undefined);
  }, [empData]);

  const {
    data: employment,
    mutate,
    isSuccess: submitStatus,
  } = useMutation({
    mutationFn: async () => {
      const { data } = await fetch.post(
        { CreateEmploymentDtos: empDataList },
        "/api/employment/allocation"
      );
      return data.employment;
    },
    mutationKey: ["empSubmit"],
    onSuccess: () => {
      setOpenModal(true);
    },
  });

  const {
    workAllocationID,
    workerreqID,
    submitTimereq,
    districtName,
    blockName,
    schemeName,
    ControctorID,
    deptName,
    FundingDeptname,
    workorderNo,
    tentativeStartDate,
    noOfDaysWorkAlloted,
    noOfDaysWorkDemanded,
    ExpectedCompletionDate,
    demanduniqueID,
    totalprojectCost,
    submitTime,
  } = filteredData ?? {};

  const ListOptions = [5, 10, 15, "all"];
  const [items, setItems] = useState(ListOptions[0]);

  const tableData = useMemo(() => allocationList ?? [], [allocationList]);

  const list = [
    {
      header: "#",
      accessorKey: "",
      headclass: "cursor-pointer",
      cell: ({ row }) => row.index + 1,
    },
    {
      header: "District",
      accessorKey: "districtName",
      cell: ({ row }) =>
        row.original.districtName ? row.original.districtName : "-",
    },
    {
      header: "Block",
      accessorKey: "blockName",
      cell: ({ row }) =>
        row.original.blockName ? row.original.blockName : "-",
    },
    {
      header: "Scheme Name/Id",
      accessorKey: "schemeName",
      cell: ({ row }) =>
        row.original.schemeName ? row.original.schemeName : "-",
    },
    {
      header: "Requistion Id",
      accessorKey: "workerreqID",
      cell: ({ row }) =>
        row.original.workerreqID ? row.original.workerreqID : "-",
    },
    {
      header: "Requisition Date",
      accessorKey: "submitTimereq",
      cell: ({ row }) => {
        const submitTimereq = row.original.submitTimereq;
        return submitTimereq
          ? new Date(submitTimereq).toLocaleDateString("en-IN", {
              month: "2-digit",
              day: "2-digit",
              year: "numeric",
            })
          : "--";
      },
    },
    
      
    
    {
      header: "Allocation Id",
      accessorKey: "workAllocationID",
    },
    {
      header: "Allocation Date",
      accessorKey: "submitTime",
      cell: ({ row }) =>
        new Date(row.original.submitTime).toLocaleDateString("en-IN", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        }),
    },
    // {
    //   header: "Contractor ID",
    //   accessorKey: "ControctorID",
    //   cell: ({ row }) =>
    //     row.original.ControctorID ? row.original.ControctorID : "-",
    // },
    {
      header: "Funding Department",
      accessorKey: "FundingDeptname",
    },
    {
      header: "Work Order No",
      accessorKey: "workorderNo",
    },
    {
      header: "tentative start date",
      accessorKey: "tentativeStartDate",
      cell: ({ row }) =>
        new Date(row.original.tentativeStartDate).toLocaleDateString("en-IN", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        }),
    },
    {
      header: "no of days as per requisition ",
      accessorKey: "noOfDaysWorkDemanded",
    },
    {
      header: "no of days as per allocation",
      accessorKey: "noOfDaysWorkAlloted",
    },

    // {
    //   header: "expected completion date",
    //   accessorKey: "ExpectedCompletionDate",
    //   cell: ({ row }) =>
    //     new Date(row.original.ExpectedCompletionDate).toLocaleDateString(
    //       "en-IN",
    //       {
    //         month: "2-digit",
    //         day: "2-digit",
    //         year: "numeric",
    //       }
    //     ),
    // },

    // {
    //   header: "execution department",
    //   accessorKey: "ExecutingDeptName",
    // },
    // {
    //   header: "implementing agency",
    //   accessorKey: "ImplementingAgencyName",
    // },
  ];

  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data,
    columns: list,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    initialState: {
      pagination: {
        pageSize: parseInt(items),
      },
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  useEffect(() => {
    if (items == "all") table.setPageSize(9999);
    else table.setPageSize(parseInt(items));
  }, [items]);

  return (
    <>
      <SuccessModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        message={`Employment Id ${employment} Generated Successfully`}
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
            <div className="bg-white shadow-md rounded-lg pb-12">
              <div className="flex pb-8 flex-col space-y-4">
                <div className="flex flex-col">
                  {workAllocationId.length == 0 && (
                    <>
                      <div className=" flex justify-between px-2 items-center h-12">
                        <select
                          className="rounded-lg"
                          name=""
                          id=""
                          value={items}
                          onChange={(e) => setItems(e.target.value)}
                        >
                          {ListOptions.map((e) => (
                            <option key={e} value={e}>
                              {e}
                            </option>
                          ))}
                        </select>

                        <input
                          type="text"
                          value={filtering}
                          placeholder="search..."
                          className="border-2 rounded-lg border-zinc-400"
                          onChange={(e) => setFiltering(e.target.value)}
                        />
                      </div>
                      <div className="overflow-x-auto overflow-y-hidden h-fit w-full show-scrollbar">
                        <Table>
                          {table.getHeaderGroups().map((headerGroup) => (
                            <Table.Head key={headerGroup.id}>
                              {headerGroup.headers.map((header) => (
                                <Table.HeadCell
                                  key={header.id}
                                  className={classNames(
                                    "bg-cyan-400/90 btn-blue whitespace-nowrap",
                                    header.column.columnDef.headclass,
                                    " transition-all"
                                  )}
                                  onClick={header.column.getToggleSortingHandler()}
                                >
                                  {header.isPlaceholder ? null : (
                                    <div className="flex items-center space-x-2 justify-between">
                                      <span className="capitalize">
                                        {flexRender(
                                          header.column.columnDef.header,
                                          header.getContext()
                                        )}
                                      </span>
                                      <SortIcon
                                        sort={header.column.getIsSorted()}
                                      />
                                    </div>
                                  )}
                                </Table.HeadCell>
                              ))}
                              <Table.HeadCell className="capitalize bg-cyan-400/90 btn-blue">
                                Actions
                              </Table.HeadCell>
                            </Table.Head>
                          ))}

                          <Table.Body className="divide-y">
                            {table.getRowModel().rows.map((row) => (
                              <Table.Row key={row.id} className="divide-x">
                                {row.getVisibleCells().map((cell) => (
                                  <Table.Cell
                                    key={cell.id}
                                    className="py-1 px-2 text-center"
                                  >
                                    <div
                                      className={classNames(
                                        cell.column.columnDef.className,
                                        "whitespace-nowrap "
                                      )}
                                    >
                                      {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                      )}
                                    </div>
                                  </Table.Cell>
                                ))}

                                <Table.Cell className="font-medium  text-white text-sm py-1 px-4  whitespace-nowrap">
                                  <button
                                    className="flex justify-center items-center capitalize bg-teal-500 hover:bg-teal-500/90 hover:shadow-md rounded-lg px-2 pr-3 py-1"
                                    onClick={() => {
                                      setWorkAllocationId(
                                        row.original.workAllocationID
                                      );
                                      // setInitialData({
                                      //   totalWagePaid: "",
                                      //   FundingDepttID:
                                      //     row.original.FundingDepttID,
                                      //   FundingDeptname:
                                      //     row.original.FundingDeptname,
                                      //   ExecutingDepttID:
                                      //     row.original.ExecutingDepttID,
                                      //   ExecutingDeptName:
                                      //     row.original.ExecutingDeptName,
                                      //   ImplementingAgencyID:
                                      //     row.original.ImplementingAgencyID,
                                      //   ImplementingAgencyName:
                                      //     row.original.ImplementingAgencyName,
                                      // });
                                      setInitialData((e) => {
                                        const {
                                          FundingDepttID,
                                          FundingDeptname,
                                          ExecutingDepttID,
                                          ExecutingDeptName,
                                          ImplementingAgencyID,
                                          ImplementingAgencyName,
                                          ...rest
                                        } = e;

                                        return {
                                          FundingDepttID:
                                            row.original.FundingDepttID,
                                          FundingDeptname:
                                            row.original.FundingDeptname,
                                          ExecutingDepttID:
                                            row.original.ExecutingDepttID,
                                          ExecutingDeptName:
                                            row.original.ExecutingDeptName,
                                          ImplementingAgencyID:
                                            row.original.ImplementingAgencyID,
                                          ImplementingAgencyName:
                                            row.original.ImplementingAgencyName,
                                          ...rest,
                                        };
                                      });
                                    }}
                                  >
                                    <Icon
                                      icon={"mdi:rupee"}
                                      className="text-xl"
                                    />
                                    <span>employment generate</span>
                                  </button>
                                </Table.Cell>
                              </Table.Row>
                            ))}
                          </Table.Body>
                        </Table>
                      </div>
                      <Pagination data={data} table={table} />
                    </>
                  )}
                  {workAllocationId.length > 0 && (
                    <>
                      <div className="">
                        <div className=" mb-12 mx-2 flex-col rounded-xl shadow-md">
                          <div>
                            <div className="div-even ">
                              <div className="label-style w-[30%]">
                                Scheme Id and Name
                              </div>
                              [schemeCode]-{schemeName}
                            </div>
                          </div>
                          <div className="flex w-full">
                            <div className="w-1/2 flex flex-col rounded-l-xl">
                              <div className="div-odd">
                                <div className="label-style">allocation id</div>
                                <div>{workAllocationID}</div>
                              </div>
                              <div className="div-even">
                                <div className="label-style">Project Cost</div>
                                {totalprojectCost}
                              </div>
                              <div className="div-odd">
                                <div className="label-style">
                                  Allocation Date
                                </div>
                                {new Date(submitTime).toLocaleDateString(
                                  "en-IN",
                                  {
                                    month: "2-digit",
                                    day: "2-digit",
                                    year: "numeric",
                                  }
                                )}
                              </div>
                              <div className="div-even">
                                <div className="label-style">Requistion Id</div>
                                {workerreqID}
                              </div>
                              <div className="div-odd">
                                <div className="label-style">
                                  Requisition Date
                                </div>
                                {new Date(
                                  submitTimereq
                                ).toLocaleDateString("en-IN", {
                                  month: "2-digit",
                                  year: "numeric",
                                  day: "2-digit",
                                })}
                              
                              </div>
                              <div className="div-even">
                                <div className="label-style">District</div>
                                {districtName}
                              </div>
                              <div className="div-odd">
                                <div className="label-style">Block</div>
                                {blockName}
                              </div>
                            </div>

                            <div className="w-1/2 flex flex-col rounded-r-xl">
                              <div className="div-odd">
                                <div className="label-style">work order no</div>
                                {workorderNo}
                              </div>
                              <div className="div-even">
                                <div className="label-style">
                                  tentative start date
                                </div>
                                {new Date(
                                  tentativeStartDate
                                ).toLocaleDateString("en-IN", {
                                  month: "2-digit",
                                  year: "numeric",
                                  day: "2-digit",
                                })}
                              </div>
                              <div className="div-odd">
                                <div className="label-style">
                                  expected completion date
                                </div>
                                {new Date(
                                  ExpectedCompletionDate
                                ).toLocaleDateString("en-IN", {
                                  month: "2-digit",
                                  year: "numeric",
                                  day: "2-digit",
                                })}
                              </div>
                              <div className="div-even">
                                <div className="label-style">
                                  total no of work days allcoated
                                </div>
                                {noOfDaysWorkAlloted}
                              </div>
                              <div className="div-odd">
                                <div className="label-style">
                                  total no of work days demanded
                                </div>
                                {noOfDaysWorkDemanded}
                              </div>
                              <div className="div-even text-xs">
                                <div className="label-style text-sm">
                                  Department
                                </div>
                                {deptName}
                              </div>
                              <div className="div-odd text-xs">
                                <div className="label-style text-sm">
                                  Funding Department
                                </div>
                                {FundingDeptname}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="overflow-x-auto overflow-y-hidden h-fit w-full show-scrollbar">
                        <Table>
                          <Table.Head>
                            <Table.HeadCell className="normal-case  bg-cyan-400/90 btn-blue  whitespace-nowrap">
                              #
                            </Table.HeadCell>
                            <Table.HeadCell className="normal-case  bg-cyan-400/90 btn-blue  whitespace-nowrap">
                              Work Jobcard No
                            </Table.HeadCell>
                            <Table.HeadCell className="normal-case  bg-cyan-400/90 btn-blue  whitespace-nowrap">
                              Job Card Holder Name
                            </Table.HeadCell>
                            <Table.HeadCell className="normal-case  bg-cyan-400/90 btn-blue  whitespace-nowrap">
                              Allocation Date From
                            </Table.HeadCell>
                            <Table.HeadCell className="normal-case  bg-cyan-400/90 btn-blue  whitespace-nowrap">
                              Allocation Date To
                            </Table.HeadCell>
                            <Table.HeadCell className="normal-case  bg-cyan-400/90 btn-blue  whitespace-nowrap">
                              Total Days Work Allocated
                            </Table.HeadCell>
                            <Table.HeadCell className="normal-case  bg-cyan-400/90 btn-blue  whitespace-nowrap">
                              Worker Attendence
                            </Table.HeadCell>
                            <Table.HeadCell className="normal-case  bg-cyan-400/90 btn-blue  whitespace-nowrap">
                              Employment Provided Date
                              <span className="text-red-600"> *</span>
                            </Table.HeadCell>
                            <Table.HeadCell className="normal-case  bg-cyan-400/90 btn-blue  whitespace-nowrap">
                              Total Days Provided
                              <span className="text-red-600"> *</span>
                            </Table.HeadCell>
                            <Table.HeadCell className="normal-case  bg-cyan-400/90 btn-blue  whitespace-nowrap">
                              Paymemt Date
                              <span className="text-red-600"> *</span>
                            </Table.HeadCell>
                            <Table.HeadCell className="normal-case  bg-cyan-400/90 btn-blue  whitespace-nowrap">
                              Total Wage Paid (Cost in Rs.)
                              <span className="text-red-600"> *</span>
                            </Table.HeadCell>
                          </Table.Head>
                          <Table.Body>
                            {empData?.map(
                              (
                                {
                                  empProvidedFrom,
                                  empProvidedTo,
                                  dateOfPayment,
                                  totalWagePaid,
                                  attandance,
                                },
                                index
                              ) => (
                                <Table.Row>
                                  <Table.Cell className="py-1">
                                    {index + 1}
                                  </Table.Cell>
                                  <Table.Cell className="whitespace-nowrap">
                                    {empList[index].workerJobCardNo}
                                  </Table.Cell>
                                  <Table.Cell className="py-1">
                                    {empList[index].workerName}
                                  </Table.Cell>
                                  <Table.Cell className="py-1">
                                    {new Date(
                                      empList[index].workAllocationFromDate
                                    ).toLocaleDateString("en-IN", {
                                      month: "2-digit",
                                      day: "numeric",
                                      year: "numeric",
                                    })}
                                  </Table.Cell>
                                  <Table.Cell className="py-1">
                                    {new Date(
                                      empList[index].workAllocationToDate
                                    ).toLocaleDateString("en-IN", {
                                      month: "2-digit",
                                      day: "numeric",
                                      year: "numeric",
                                    })}
                                  </Table.Cell>
                                  <Table.Cell className="py-1">
                                    {empList[index].noOfDaysWorkAlloted}
                                  </Table.Cell>
                                  <Table.Cell className="py-1">
                                    <select
                                      id="scheme_name"
                                      value={attandance}
                                      name="attandance"
                                      autoComplete="off"
                                      className="rounded-lg border-zinc-300"
                                      onChange={(e) =>
                                        updateVal(e, index, empData, setEmpData)
                                      }
                                    >
                                      <option value="Present" selected>
                                        Present
                                      </option>
                                      <option value="Absent">Absent</option>
                                    </select>
                                  </Table.Cell>
                                  <Table.Cell className="py-1">
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
                                                value:
                                                  e.toLocaleDateString("fr-CA"),
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
                                                value:
                                                  e.toLocaleDateString("fr-CA"),
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
                                  <Table.Cell className="py-1">
                                    {dateDifference[index]}
                                  </Table.Cell>
                                  <Table.Cell className="py-1">
                                    <div className="flex items-center space-x-2">
                                      <DatePicker
                                        minDate={new Date()}
                                        dateFormat="dd/MM/yyyy"
                                        selected={dateOfPayment}
                                        onChange={(e) => {
                                          updateVal(
                                            {
                                              target: {
                                                name: "dateOfPayment",
                                                value:
                                                  e.toLocaleDateString("fr-CA"),
                                              },
                                            },
                                            index,
                                            empData,
                                            setEmpData
                                          );
                                        }}
                                        portalId="root-portal"
                                        placeholderText="dd/mm/yyyy"
                                        className="w-32 cursor-pointer border-gray-300 rounded-md"
                                      />
                                    </div>
                                  </Table.Cell>
                                  <Table.Cell className="py-1">
                                    <input
                                      disabled={
                                        attandance === "Absent" ?? false
                                      }
                                      name="totalWagePaid"
                                      type="text"
                                      className="rounded-lg border-zinc-300 disabled:bg-red-100 disabled:cursor-not-allowed"
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
                          Back
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
