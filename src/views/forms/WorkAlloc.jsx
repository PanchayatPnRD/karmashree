import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Table } from "flowbite-react";
import { devApi } from "../../WebApi/WebApi";
import { updateVal } from "../../functions/updateVal";
import SuccessModal from "../../components/SuccessModal";
import { useState, useEffect, useMemo } from "react";
import {
  useQuery,
  useQueryClient,
  useMutation,
  QueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import DatePicker from "react-datepicker";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetch } from "../../functions/Fetchfunctions";
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
import { addAllocation } from "../../Service/workAllocation/workAllocationService";
import { getSchemeList } from "../../Service/Scheme/SchemeService";
const WorkAlloc = () => {
  const queryClient = useQueryClient();
  const [isDemand, setIsDemand] = useState(false);
  const [workersl, setWorkersl] = useState();
  const [scheme_sl, setScheme_Sl] = useState();
  const [reqId, setReqId] = useState();
  const [reqDate, setReqDate] = useState();
  const [contractorId, setContractorId] = useState();
  const [allocData, setAllocData] = useState([]);

  const { userIndex } = JSON.parse(sessionStorage.getItem("karmashree_User"));

  const { data: userDetails } = useQuery({
    queryKey: ["userDetails"],
    queryFn: async () => {
      const data = await fetch.get("/api/user/viewuser/", userIndex);

      return data.data.result;
    },
  });

  const [schemeAllList, setAllSchemeAllList] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    getSchemeList().then(function (result) {
      const response = result?.data?.result;
      setAllSchemeAllList(response);
    });
  }, []);

  //Scheme list

  let schemeListDropdown = <option>Loading...</option>;
  if (schemeAllList && schemeAllList.length > 0) {
    schemeListDropdown = schemeAllList.map((SchemeRow, index) => (
      <option value={SchemeRow.scheme_sl}>{SchemeRow.schemename}</option>
    ));
  }

  const schemeName = schemeAllList.find(
    (c) => c.scheme_sl == scheme_sl
  )?.schemename;

  const schemeDataId = scheme_sl;
  console.log(schemeName, "schemeName");

  const dateDifference = useMemo(() => {
    return allocData.map(({ dateFrom, dateTo }) => {
      const timeDiff = Math.abs(
        new Date(dateTo).getTime() - new Date(dateFrom).getTime()
      ); // Absolute difference in milliseconds
      const daysDifference = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert to days

      return isNaN(daysDifference) ? 0 : daysDifference + 1;
    });
  }, [allocData]);

  const { data: demandData } = useQuery({
    queryKey: ["demandData"],
    queryFn: async () => {
      const data = await fetch.get(
        "/api/demand/getDemandsforallocation_and_direct_emp?userIndex=" +
          userDetails?.userIndex +
          "&districtcode=" +
          userDetails?.districtcode
      );
      // console.log(Array.isArray(data.data.result), "array");
      return data.data.result;
    },
    staleTime: 0,
    enabled: !(scheme_sl === undefined),
  });

  console.log(demandData, "demandData");

  // const { data: schemeList } = useQuery({
  //   queryKey: ["schemeList"],
  //   queryFn: async () => {
  //     const data = await axios.get(
  //       devApi +
  //       "/api/schememaster/getschmeforallocation?" +
  //       `blockcode=${dropdownData[1]}&gpCode=${dropdownData[2]}`
  //     );

  //     return data?.data?.result;
  //   },
  //   enabled: dropdownData[1].length > 0 && dropdownData[2].length > 0,
  //   staleTime: 0,
  // });

  // console.log(schemeList,"schemeList")

  const { data: workRequirementList } = useQuery({
    queryKey: ["workRequirementList"],
    queryFn: async () => {
      const data = await fetch.get(
        `/api/workerrequisition/getallrequztion?userIndex=${userIndex}`
      );
      // console.log(Array.isArray(data.data.result));
      return data.data.result;
    },
  });

  const initialData = {
    dateFrom: "",
    dateTo: "",
    schemeArea: "R",
  };

  useEffect(() => {
    let filledArray = [];
    if (demandData?.length > 0)
      filledArray = Array(demandData?.length).fill(initialData);
    setAllocData(filledArray);
  }, [demandData]);

  const ListOptions = [5, 10, 15, "all"];
  const [items, setItems] = useState(ListOptions[0]);

  const data = useMemo(() => workRequirementList ?? [], [workRequirementList]);

  const filteredData = useMemo(() => {
    const arr = data?.filter((e) => e.workersl == workersl);
    if (arr) return arr[0];
  }, [reqId]);

  const is_demand = useMemo(() => {
    if (scheme_sl == undefined) return false;
    // console.log(filteredData?.totalUnskilledWorkers,demandData?.length,"is_demand");
    if (demandData != null || demandData != undefined)
      return filteredData?.totalUnskilledWorkers > demandData?.length;
  }, [filteredData, scheme_sl, demandData]);

  useEffect(() => {
    setIsDemand(is_demand);
  }, [is_demand]);

  const AllocAPIData = useMemo(() => {
    const array = allocData.map((e, index) => {
      const { dateFrom, dateTo, ...rest } = e;
      const {
        demandsl,
        schemeArea,
        schemeId,
        ex1,
        ex2,
        ex3,
        ex4,
        ex5,
        submitTime,
        UpdateTime,
        gender,
        caste,
        whetherMinority,
        whetherMigrantWorker,
        dateOfApplicationForWork,
        dateoflastallocation,
        typeOfWorkers,
        ...rest2
      } = demandData[index];

      if (dateFrom.length > 0 && dateTo.length > 0)
        return {
          schemeId: scheme_sl,
          schemeName: "asdfdsf",

          // schemeName: schemeList.filter((e) => e.scheme_sl == schemeId)[0]
          //   .schemeName,
          // contractorID: schemeList.filter((e) => e.scheme_sl == schemeId)[0]
          //   .ControctorID,
          contractorID: contractorId,
          dateOfApplicationForWork: new Date(
            dateOfApplicationForWork
          ).toLocaleDateString("fr-CA", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }),
          ...rest,
          workAllocationFromDate:
            dateFrom.length > 5
              ? new Date(dateFrom).toLocaleDateString("fr-CA", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })
              : "",
          workAllocationToDate:
            dateTo.length > 5
              ? new Date(dateTo).toLocaleDateString("fr-CA", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })
              : "",
          ...rest2,
          noOfDaysWorkAlloted: dateDifference[index],
          requzitionuserIndex: filteredData.userIndex,
        };
    });

    return array.filter((value) => value !== undefined);
  }, [allocData]);
  console.log(AllocAPIData, "AllocAPIData");

  const list = [
    {
      header: "Sl no",
      accessorKey: "cont_sl",
      className: "font-bold text-zinc-600 text-center cursor-pointer",
      cell: ({ row }) => row.index + 1,
      headclass: "cursor-pointer",
      // sortingFn: "id",
    },
    {
      header: "Status",
      cell: ({ row }) => (
        <span
          className={classNames(
            "rounded-full px-2 py-[2px]  animate-pulse font-bold text-sm",
            row.original.allocationID
              ? "text-green-700 bg-green-200/80"
              : "text-red-700 bg-red-200/80"
          )}
        >
          {row.original.allocationID ? "Allocated" : "Not Allocated"}
        </span>
      ),
    },
    {
      header: "Financial Year",
      accessorKey: "finYear",
      headclass: "cursor-pointer",
    },
    {
      header: "Req ID",
      accessorKey: "workerreqID",
      headclass: "cursor-pointer",
    },
    {
      header: "Req Date",
      accessorKey: "SubmitTime",
      headclass: "cursor-pointer",
      cell: ({ row }) =>
        new Date(row.original.SubmitTime).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
    },
    {
      header: "PIA",
      accessorKey: "deptName",
      headclass: "cursor-pointer",
    },

    {
      header: "Funding Department",
      accessorKey: "FundingDeptname",
      headclass: "cursor-pointer",
    },
    {
      header: "Scheme Id",
      accessorKey: "scheme_Id",
      headclass: "cursor-pointer",
    },
    {
      header: "Scheme Name",
      accessorKey: "schName",
      headclass: "cursor-pointer",
    },

    {
      header: "District",
      accessorKey: "districtName",
      headclass: "cursor-pointer",
    },
    {
      header: "Block/Municipality",
      accessorKey: "blockName",
      headclass: "cursor-pointer",
    },
    {
      header: "GP",
      accessorKey: "gpName",
      headclass: "cursor-pointer",
    },
    // {
    //   header: "Scheme Sector",
    //   accessorKey: "",
    //   headclass: "cursor-pointer",
    //   cell: () => "API tey nai 1",
    // },

    {
      header: "Contact Person",
      accessorKey: "contactPersonName",
      headclass: "cursor-pointer",
    },
    {
      header: "Contact Person Number",
      accessorKey: "contactPersonPhoneNumber",
      headclass: "cursor-pointer",
    },
    {
      header: "Reporting Place",
      accessorKey: "reportingPlace",
      headclass: "cursor-pointer",
    },
    {
      header: "Start Date",
      accessorKey: "fromDate",
      headclass: "cursor-pointer",
      cell: ({ row }) =>
        new Date(row.original.fromDate).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
    },
    {
      header: "Total No of Days",
      accessorKey: "noOfDays",
      headclass: "cursor-pointer",
    },
    {
      header: "Total Unskilled Workers",
      accessorKey: "totalUnskilledWorkers",
      headclass: "cursor-pointer",
    },
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

  const daysSum = useMemo(() => {
    const arr = AllocAPIData.map((e) => e.noOfDaysWorkAlloted);
    return arr.reduce((a, b) => a + b, 0);
  }, [AllocAPIData]);

  const {
    data: allocationId,
    mutate,
    isSuccess,
  } = useMutation({
    mutationFn: async () => {
      const { data } = await fetch.post(
        {
          workAllocations: AllocAPIData,
          reqDate: reqDate,
          reqId: reqId,
        },
        "/api/allocation/allocation"
      );
      return data.allocation;
    },
    mutationKey: ["allocationCreate"],
    onSuccess: () => {
      setOpenModal(true);
    },
  });

  const {
    workerreqID,
    finYear,
    schName,
    conName,
    contactPersonPhoneNumber,
    dateofwork,
    scheme_Id,
    noOfDays,
    totalUnskilledWorkers,
    districtName,
    blockName,
    gpName,
    personDaysGenerated,
    FundingDeptname,
    SubmitTime,
    // userIndex
  } = filteredData ?? {};

  return (
    <>
      <SuccessModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        message={`Allocation ${allocationId} Created Successfully`}
        to="work-allocation-list"
        // resetData={resetData}
        isSuccess={isSuccess}
      />
      <div className="flex flex-grow flex-col space-y-4 p-1 px-12">
        <ToastContainer />
        <div className="p-4 shadow-md rounded">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4 px-4 py-1">
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
                Worker Allocation
              </li>
            </ol>
          </nav>
        </div>

        <div className="bg-white shadow-md rounded-lg pb-8">
          {scheme_sl === undefined && (
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
              <div className="flex flex-col overflow-x-auto overflow-y-hidden h-fit w-full show-scrollbar">
                <Table className="drop-shadow-none">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <Table.Head key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <Table.HeadCell
                          key={header.id}
                          className={classNames(
                            header.column.columnDef.headclass,
                            "bg-cyan-400/90 theader-style transition-all whitespace-nowrap"
                          )}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {header.isPlaceholder ? null : (
                            <div className="flex items-center space-x-2 justify-between">
                              <span className="normal-case">
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                              </span>
                              <SortIcon sort={header.column.getIsSorted()} />
                            </div>
                          )}
                        </Table.HeadCell>
                      ))}

                      <Table.HeadCell className="normal-case bg-cyan-400/90 theader-style">
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
                            className={classNames(
                              cell.column.columnDef.className,
                              "whitespace-nowrap py-1 px-1"
                            )}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </Table.Cell>
                        ))}

                        <Table.Cell className="font-medium  text-white text-sm py-1">
                          <button
                            className="disabled:cursor-not-allowed disabled:bg-slate-400 flex justify-center items-center bg-teal-500 px-2 py-1 rounded-lg hover:bg-teal-500/90 transition-all hover:shadow-md"
                            onClick={() => {
                              setScheme_Sl(row.original.workCodeSchemeID);
                              setContractorId(row.original.ContractorID);
                              setReqId(row.original.workerreqID);
                              setReqDate(
                                new Date(
                                  row.original.SubmitTime
                                ).toLocaleDateString("fr-CA", {
                                  year: "numeric",
                                  month: "numeric",
                                  day: "numeric",
                                })
                              );
                              setWorkersl(row.original.workersl);
                            }}
                            disabled={row.original.allocationID}
                          >
                            Allocate
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
          {scheme_sl !== undefined && (
            <>
              <SuccessModal
                openModal={isDemand}
                setOpenModal={setIsDemand}
                message={`Not Enough Required Unskilled workers`}
                error={"message"}
                // resetData={resetData}
                isSuccess={false}
              />
              <div className="flex flex-col space-y-8 px-4">
                <div className="px-24">
                  <div className="flex flex-col border-2 rounded-xl overflow-hidden shadow-md">
                    <div className="div-odd">
                      <div className="label-style">Worker Requisition Id</div>
                      <div>{workerreqID}</div>
                    </div>
                    <div className="div-even">
                      <div className="label-style">Financial Year</div>
                      {finYear}
                    </div>
                    <div className="div-odd">
                      <div className="label-style">Scheme Id/Name</div>
                      {scheme_Id}-{schName}
                    </div>
                    {/* <div className="div-even">
                      <div className="label-style">Scheme Sector</div>
                      {"! Not Available"}
                    </div> */}
                    <div className="div-odd">
                      <div className="label-style">Funding Department</div>
                      {FundingDeptname}
                    </div>
                    <div className="div-even">
                      <div className="label-style">Contractor Name</div>
                      {conName}
                    </div>
                    <div className="div-odd">
                      <div className="label-style">Contact Person Number</div>
                      {contactPersonPhoneNumber}
                    </div>
                    <div className="div-even">
                      <div className="label-style">Scheme Location</div>
                      {districtName.length > 0 && districtName}
                      {districtName.length > 0 && blockName.length > 0 && "/"}
                      {blockName.length > 0 && blockName}
                      {blockName.length > 0 && gpName.length > 0 && "/"}
                      {gpName.length > 0 && gpName}
                    </div>
                    <div className="div-odd">
                      <div className="label-style">
                        Total Unskilled Workers Demandad
                      </div>
                      {totalUnskilledWorkers}
                      <span className="w-fit mx-32 mr-6">
                        Total Unskilled Workers Provided
                      </span>
                      {AllocAPIData.length}
                    </div>
                    <div className="div-even">
                      <div className="label-style">
                        Total No of Days Demandad
                      </div>
                      {noOfDays}
                      <span className="w-fit mx-32 mr-6">
                        Total No of Days Provided
                      </span>
                      {daysSum}
                    </div>
                    <div className="div-odd">
                      <div className="label-style">
                        Expected Total Persandays
                      </div>
                      {personDaysGenerated}
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto overflow-y-auto max-h-[300px] w-full show-scrollbar shadow-md">
                  <Table className="">
                    <Table.Head className="sticky top-0 z-10">
                      <Table.HeadCell className="bg-cyan-400/90 theader-style normal-case whitespace-nowrap">
                        #
                      </Table.HeadCell>
                      <Table.HeadCell className="bg-cyan-400/90 theader-style normal-case whitespace-nowrap">
                        Worker Job Card No
                      </Table.HeadCell>
                      {/* <Table.HeadCell className="bg-cyan-400/90 theader-style whitespace-nowrap capitalize">
                        Work Code/Scheme name
                      </Table.HeadCell> */}
                      <Table.HeadCell className="bg-cyan-400/90 theader-style normal-case whitespace-nowrap">
                        Worker Name
                      </Table.HeadCell>
                      <Table.HeadCell className="bg-cyan-400/90 theader-style normal-case whitespace-nowrap">
                        District
                      </Table.HeadCell>
                      <Table.HeadCell className="bg-cyan-400/90 theader-style normal-case whitespace-nowrap">
                        Block
                      </Table.HeadCell>
                      <Table.HeadCell className="bg-cyan-400/90 theader-style normal-case whitespace-nowrap">
                        GP
                      </Table.HeadCell>

                      <Table.HeadCell className="bg-cyan-400/90 theader-style normal-case whitespace-nowrap ">
                        Work Application Date
                      </Table.HeadCell>

                      <Table.HeadCell className="bg-cyan-400/90 theader-style normal-case whitespace-nowrap ">
                        No of Days (Work Demanded)
                      </Table.HeadCell>

                      <Table.HeadCell className="bg-cyan-400/90 theader-style normal-case whitespace-nowrap ">
                        Work Allocation Date
                      </Table.HeadCell>
                      <Table.HeadCell className="bg-cyan-400/90 theader-style normal-case whitespace-nowrap ">
                        No of Days (Work Allocated)
                      </Table.HeadCell>
                    </Table.Head>

                    <Table.Body className="divide-y ">
                      {allocData?.map(
                        (
                          {
                            schemeId,
                            dateFrom,
                            dateTo,
                            noOfDays,
                            districtcode,
                            blockcode,
                            gpCode,
                          },
                          index
                        ) => (
                          <Table.Row key={index}>
                            <Table.Cell className=" whitespace-nowrap text-xs py-1 ">
                              {index + 1}
                            </Table.Cell>

                            <Table.Cell className=" whitespace-nowrap text-xs py-1 ">
                              <div className="w-44">
                                {demandData[index]?.workerJobCardNo}
                              </div>
                            </Table.Cell>
                            {/* <Table.Cell className=" whitespace-nowrap text-xs py-1 ">
                              {schemeName}
                            </Table.Cell> */}
                            <Table.Cell className=" whitespace-nowrap text-xs py-1 ">
                              {demandData[index]?.workerName}
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap text-xs">
                              {demandData[index]?.districtName}
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap text-xs">
                              {demandData[index]?.blockName}
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap text-xs">
                              {demandData[index]?.gpName}
                            </Table.Cell>
                            <Table.Cell className=" whitespace-nowrap text-xs py-1 ">
                              {new Date(
                                demandData[index]?.dateOfApplicationForWork
                              ).toLocaleDateString("en-IN", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                              })}
                            </Table.Cell>
                            <Table.Cell className=" whitespace-nowrap text-xs py-1 ">
                              {demandData[index]?.noOfDaysWorkDemanded}
                            </Table.Cell>

                            <Table.Cell className=" whitespace-nowrap text-xs py-1 ">
                              <div className="flex items-center space-x-2">
                                <DatePicker
                                  minDate={
                                    new Date(
                                      demandData[
                                        index
                                      ]?.dateOfApplicationForWork
                                    )
                                  }
                                  dateFormat="dd/MM/yyyy"
                                  selected={dateFrom}
                                  onChange={(date) =>
                                    updateVal(
                                      {
                                        target: {
                                          name: "dateFrom",
                                          value: date.toString(),
                                        },
                                      },
                                      index,
                                      allocData,
                                      setAllocData
                                    )
                                  }
                                  placeholderText="dd/mm/yyyy"
                                  selectsStart
                                  startDate={dateFrom}
                                  endDate={dateTo}
                                  portalId="root-portal"
                                  className="w-32 cursor-pointer border-gray-300 rounded-md text-sm z-20"
                                />
                                <DatePicker
                                  placeholderText="dd/mm/yyyy"
                                  selected={dateTo}
                                  onChange={(date) =>
                                    updateVal(
                                      {
                                        target: {
                                          name: "dateTo",
                                          value: date.toString(),
                                        },
                                      },
                                      index,
                                      allocData,
                                      setAllocData
                                    )
                                  }
                                  selectsEnd
                                  startDate={dateFrom}
                                  endDate={dateTo}
                                  minDate={dateFrom}
                                  maxDate={
                                    new Date(dateFrom).getTime() +
                                    (demandData[index]?.noOfDaysWorkDemanded -
                                      1) *
                                      24 *
                                      60 *
                                      60 *
                                      1000
                                  }
                                  // minDate={new Date()}
                                  dateFormat="dd/MM/yyyy"
                                  // selected={dateOfApplicationForWork}
                                  portalId="root-portal"
                                  className="w-32 cursor-pointer border-gray-300 rounded-md text-sm"
                                />
                              </div>
                            </Table.Cell>
                            <Table.Cell className=" whitespace-nowrap text-xs py-1 ">
                              <div className="w-36">
                                {isNaN(dateDifference[index])
                                  ? 0
                                  : dateDifference[index]}
                              </div>
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
                      setScheme_Sl(undefined);
                      setReqId(undefined);
                      setWorkersl(undefined);
                      setReqDate(undefined);
                      queryClient.resetQueries({ queryKey: ["demandData"] });
                    }}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="w-1/5 py-2 px-4 border mt-10 border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                    onClick={mutate}
                    //disabled={is_demand}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default WorkAlloc;
