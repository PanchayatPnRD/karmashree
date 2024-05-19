import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Table } from "flowbite-react";
import { devApi } from "../../WebApi/WebApi";
import { updateVal } from "../../functions/updateVal";
import SuccessModal from "../../components/SuccessModal";
import { useState, useEffect, useMemo } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
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
  const [schemeId, setSchemeId] = useState();
  const [contractorId, setContractorId] = useState();
  const [allocData, setAllocData] = useState([]);

  const { userIndex } = JSON.parse(localStorage.getItem("karmashree_User"));

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
    (c) => c.scheme_sl == schemeId
  )?.schemename;

  const schemeDataId = schemeId;
  console.log(schemeName, "schemeName");
  const dateDifference = useMemo(() => {
    return allocData.map(({ dateFrom, dateTo }) => {
      const timeDiff = Math.abs(
        new Date(dateTo).getTime() - new Date(dateFrom).getTime()
      ); // Absolute difference in milliseconds
      const daysDifference = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert to days

      return isNaN(daysDifference) ? 0 : daysDifference;
    });
  }, [allocData]);

  const { data: demandData } = useQuery({
    queryKey: ["demandData"],
    queryFn: async () => {
      const data = await fetch.get(
        "/api/allocation/demandslistforallocation/" + schemeId
      );
      console.log(Array.isArray(data.data.result), "array");
      return data.data.result;
    },
    staleTime: 0,
    enabled: !(schemeId === undefined),
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
    schemeId: "",
    dateFrom: "",
    dateTo: "",
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

  const AllocAPIData = useMemo(() => {
    const array = allocData.map((e, index) => {
      const { schemeId, dateFrom, dateTo, ...rest } = e;
      const {
        demandsl,
        demanduniqueID,
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
        typeOfWorkers,
        ...rest2
      } = demandData[index];

      if (dateFrom.length > 0 && dateTo.length > 0)
        return {
          schemeId: schemeDataId,
          schemeName: schemeName,
          // schemeName: schemeList.filter((e) => e.scheme_sl == schemeId)[0]
          //   .schemeName,
          // contractorID: schemeList.filter((e) => e.scheme_sl == schemeId)[0]
          //   .ControctorID,
          contractorID: contractorId,
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
      header: "Scheme ID",
      accessorKey: "workCodeSchemeID",
      headclass: "cursor-pointer",
    },
    {
      header: "Contractor",
      accessorKey: "ContractorID",
      headclass: "cursor-pointer",
    },
    {
      header: "Contact No",
      accessorKey: "contactPersonPhoneNumber",
      headclass: "cursor-pointer",
    },
    {
      header: "Start Date",
      accessorKey: "fromDate",
      headclass: "cursor-pointer",
    },
    {
      header: "No of Days",
      accessorKey: "noOfDays",
      headclass: "cursor-pointer",
    },
    // {
    //   header: "Funding Department",
    //   headclass: "cursor-pointer",
    //   // cell: ({ row }) => row.index + 1,
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

  const onSubmit = () => {
    addAllocation(AllocAPIData, (r) => {
      console.log(r, "response");
      if (r.errorCode == 0) {
        setOpenModal(true);
      } else {
        toast.error(r.message);
      }
    });
  };

  return (
    <>
      <SuccessModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        message={"Allocation Created Successfully"}
        to="work-allocation-list"
        // resetData={resetData}
        isSuccess={true}
      />
      <div className="flex flex-grow flex-col space-y-16 p-1 px-12">
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
                Allocation
              </li>
            </ol>
          </nav>
        </div>

        <div className="bg-white shadow-md rounded-lg px-12 pb-12">
          <div className="flex flex-col pb-8 overflow-x-auto overflow-y-hidden h-fit w-full show-scrollbar">
            <Table>
              {table.getHeaderGroups().map((headerGroup) => (
                <Table.Head key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <Table.HeadCell
                      key={header.id}
                      className={classNames(
                        header.column.columnDef.headclass,
                        "hover:bg-zinc-200/70 transition-all"
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
                  <Table.HeadCell className="normal-case">
                    Status
                  </Table.HeadCell>
                  <Table.HeadCell className="normal-case">
                    Actions
                  </Table.HeadCell>
                </Table.Head>
              ))}

              <Table.Body className="divide-y">
                {table.getRowModel().rows.map((row) => (
                  <Table.Row key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <Table.Cell
                        key={cell.id}
                        className={cell.column.columnDef.className}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Table.Cell>
                    ))}
                    <Table.Cell className="">Status</Table.Cell>
                    <Table.Cell className="font-medium  text-teal-500 hover:underline text-2xl">
                      <button
                        className="flex justify-center items-center"
                        onClick={() => {
                          setSchemeId(row.original.workCodeSchemeID);
                          setContractorId(row.original.ContractorID);
                        }}
                      >
                        <Icon
                          icon={"iconoir:open-in-window"}
                          className="cursor-pointer"
                        />
                      </button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
          <Pagination data={data} table={table} />
          {schemeId !== undefined && (
            <div className="overflow-x-auto overflow-y-hidden h-fit w-full show-scrollbar">
              <Table className="w-full">
                <Table.Head>
                  <Table.HeadCell className="bg-cyan-400/40 text-blue-900 text-md normal-case w-8">
                    #
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-cyan-400/40 text-blue-900 text-md normal-case">
                    Worker Job Card No
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-cyan-400/40 text-blue-900 text-md normal-case">
                    Worker Name
                  </Table.HeadCell>

                  <Table.HeadCell className="bg-cyan-400/40 text-blue-900 text-md normal-case ">
                    Work Application Date
                  </Table.HeadCell>

                  <Table.HeadCell className="bg-cyan-400/40 text-blue-900 text-md normal-case ">
                    No of Days (Work Demanded)
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-cyan-400/40 text-blue-900 text-md normal-case ">
                    Work Code/SchemeID
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-cyan-400/40 text-blue-900 text-md normal-case ">
                    Work Allocation Date
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-cyan-400/40 text-blue-900 text-md normal-case ">
                    No of Days (Work Allocated)
                  </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {allocData?.map(
                    ({ schemeId, dateFrom, dateTo, noOfDays }, index) => (
                      <Table.Row key={index}>
                        <Table.Cell>{index + 1}</Table.Cell>

                        <Table.Cell>
                          {" "}
                          <div className="w-44">
                            {demandData[index]?.workerJobCardNo}
                          </div>
                        </Table.Cell>

                        <Table.Cell>{demandData[index]?.workerName}</Table.Cell>
                        <Table.Cell>
                          {new Date(
                            demandData[index]?.dateOfApplicationForWork
                          ).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          })}
                        </Table.Cell>
                        <Table.Cell>
                          {demandData[index]?.noOfDaysWorkDemanded}
                        </Table.Cell>
                        <Table.Cell>{schemeName}</Table.Cell>
                        <Table.Cell>
                          <div className="flex items-center space-x-2">
                            <DatePicker
                              minDate={
                                new Date(
                                  demandData[index]?.dateOfApplicationForWork
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
                              className="w-32 cursor-pointer border-gray-300 rounded-md"
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
                                demandData[index]?.noOfDaysWorkDemanded *
                                  24 *
                                  60 *
                                  60 *
                                  1000
                              }
                              // minDate={new Date()}
                              dateFormat="dd/MM/yyyy"
                              // selected={dateOfApplicationForWork}
                              portalId="root-portal"
                              className="w-32 cursor-pointer border-gray-300 rounded-md"
                            />
                          </div>
                        </Table.Cell>
                        <Table.Cell>
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
          )}

          <div className="flex justify-center items-center">
            <button
              type="button"
              className="w-1/5 py-2 px-4 border mt-10 border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={onSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkAlloc;
