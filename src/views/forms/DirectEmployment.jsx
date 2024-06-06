import { useState, useEffect, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import { updateVal } from "../../functions/updateVal";
import {
  getAllDistrictActionList,
  getAllBlockList,
  getAllMunicipalityList,
  getAllGramPanchayatList,
} from "../../Service/ActionPlan/ActionPlanService";
import { Table } from "flowbite-react";
import {
  useQuery,
  useQueryClient,
  useMutation,
  QueryObserver,
} from "@tanstack/react-query";

import { fetch } from "../../functions/Fetchfunctions";
import { SortIcon } from "../../components/SortIcon";
import { Pagination } from "../../components/Pagination";
import classNames from "classnames";
import { Icon } from "@iconify/react/dist/iconify.js";
import { exportToCSV, exportToExcel } from "../../functions/exportData";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Modal, Button } from "flowbite-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import DatePicker from "react-datepicker";

const DirectEmployment = () => {
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const jsonString = localStorage.getItem("karmashree_User");
    const data = JSON.parse(jsonString);
    // setUserData(data);

    getAllDistrictActionList(data?.districtcode).then(function (result) {
      const response = result?.data?.result;
      setAllDistrictList(response);
    });
  }, []);

  const [area, setArea] = useState("");
  const [allDistrictList, setAllDistrictList] = useState([]);
  const [allMunicipalityList, setAllMunicipalityList] = useState([]);
  const [municipality, setMunicipality] = useState();
  const [allBlockList, setAllBlockList] = useState([]);
  const [gp, setGP] = useState();
  const [block, setBlock] = useState();
  const [district, setDistrict] = useState();
  const [allGpList, setAllGpList] = useState([]);
  const [schemeSl, setSchemeSl] = useState();
  const [directAlloc, setDirectAlloc] = useState([]);

  const onArea = (e) => {
    setArea(e.target.value);
  };

  const onDistrict = (e) => {
    setDistrict(e.target.value);
    getAllBlockList(e.target.value).then(function (result) {
      const response = result?.data?.result;
      setAllBlockList(response);
    });

    getAllMunicipalityList(e.target.value, 0).then(function (result) {
      const response = result?.data?.result;
      setAllMunicipalityList(response);
    });
  };
  const onBlock = (e) => {
    setBlock(e.target.value);
    getAllGramPanchayatList(district, e.target.value).then(function (result) {
      const response = result?.data?.result;
      setAllGpList(response);
    });
  };

  const onGP = (e) => {
    setGP(e.target.value);
  };

  const onMunicipality = (e) => {
    console.log(e.target.value, "municipality");
    setMunicipality(e.target.value);
  };
  const onScheme = (e) => {
    setSchemeSl(e.target.value);
  };

  let districtListDropdown = <option>Loading...</option>;
  if (allDistrictList && allDistrictList.length > 0) {
    districtListDropdown = allDistrictList.map((distRow, index) => (
      <option value={distRow.districtCode}>{distRow.districtName}</option>
    ));
  }
  let blockListDropdown = <option>Loading...</option>;
  if (allBlockList && allBlockList.length > 0) {
    blockListDropdown = allBlockList.map((blockRow, index) => (
      <option value={blockRow.blockCode}>{blockRow.blockName}</option>
    ));
  }

  let municipalityListDropdown = <option>Loading...</option>;
  if (allMunicipalityList && allMunicipalityList.length > 0) {
    municipalityListDropdown = allMunicipalityList.map((munRow, index) => (
      <option value={munRow.urbanCode}>{munRow.urbanName}</option>
    ));
  }
  let GpListDropdown = <option>Loading...</option>;
  if (allGpList && allGpList.length > 0) {
    GpListDropdown = allGpList.map((gpRow, index) => (
      <option value={gpRow.gpCode}>{gpRow.gpName}</option>
    ));
  }

  const queryclient = useQueryClient();
  const { userIndex } = JSON.parse(localStorage.getItem("karmashree_User"));

  const { data: schemeAll_List } = useQuery({
    queryKey: ["schemeAll_List"],
    queryFn: async () => {
      const data = await fetch.get(
        `/api/schememaster/getAllScheme/${userIndex}`
      );
      // console.log(Array.isArray(data.data.result));
      return data.data.result;
    },
  });
  const { data: demandList, isLoading: loading } = useQuery({
    queryKey: ["demandList"],
    queryFn: async () => {
      const data = await fetch.get(`/api/demand/getdemandList/${userIndex}`);
      // console.log(Array.isArray(data.data.result));
      return data.data.result;
    },
  });

  const ListOptions = [5, 10, 15, "all"];
  const [items, setItems] = useState(ListOptions[0]);

  const data = useMemo(
    () =>
      demandList?.filter(
        ({ demanduniqueID }) => !directAlloc.includes(demanduniqueID)
      ) ?? [],
    [demandList, directAlloc]
  );

  const list = [
    {
      header: "Sl no",
      accessorKey: "cont_sl",
      className: "font-bold text-zinc-600 text-center cursor-pointer",
      cell: ({ row }) => row.index + 1,
      headclass: "cursor-pointer",
      // sortingFn: "id",
    },
    // {
    //   header: "Financial Year",
    //   accessorKey: "finYear",
    //   headclass: "cursor-pointer",
    //   //demanduniqueID
    // },
    // {
    //   header: "Demand Id",
    //   accessorKey: "demanduniqueID",
    //   headclass: "cursor-pointer",
    //   //demanduniqueID
    // },
    {
      header: "Worker Job-Card No",
      accessorKey: "workerJobCardNo",
      headclass: "cursor-pointer",
    },
    {
      header: "Worker Name",
      accessorKey: "workerName",
      headclass: "cursor-pointer",
    },
    {
      header: "District",
      accessorKey: "districtName",
      headClass: "cursor-pointer",
      className: "text-center",
      cell: ({ row }) =>
        row.original.districtName == "" ? "-" : row.original.districtName,
    },
    // {
    //   header: "Municapility",
    //   accessorKey: "muniName",
    //   headclass: "cursor-pointer",
    //   className: "text-center",
    //   cell: ({ row }) =>
    //     row.original.muniName == "" ? "-" : row.original.muniName,
    // },
    {
      header: "Block",
      accessorKey: "blockName",
      headClass: "cursor-pointer",
      className: "text-center",
      cell: ({ row }) =>
        row.original.blockName == "" ? "-" : row.original.blockName,
    },
    {
      header: "GP",
      accessorKey: "gpName",
      headclass: "cursor-pointer",
      className: "text-center",
      cell: ({ row }) =>
        row.original.gpName == "" ? "-" : row.original.gpName,
    },

    {
      header: "Mobile No",
      accessorKey: "mobileNo",
      headclass: "cursor-pointer",
    },
    {
      header: "Age",
      accessorKey: "age",
      headclass: "cursor-pointer",
    },

    // {
    //   header: "Date of Application for Work",
    //   accessorKey: "dateOfApplicationForWork",
    //   headclass: "cursor-pointer",
    //   cell: ({ row }) =>
    //     new Date(row.original.dateOfApplicationForWork).toLocaleDateString(
    //       "en-IN",
    //       { year: "numeric", month: "2-digit", day: "2-digit" }
    //     ),
    // },
    // {
    //   header: "No of Days Demanded",
    //   accessorKey: "noOfDaysWorkDemanded",
    //   headclass: "cursor-pointer",
    // },
    // {
    //   header: "Remarks",
    //   accessorKey: "remark",
    //   headclass: "cursor-pointer",
    //   cell: ({ row }) =>
    //     row.original.remark == "" || row.original.remark === null
    //       ? "-"
    //       : row.original.remark,
    // },
  ];

  const loadingData = useMemo(
    () => (loading ? Array(30).fill({}) : data),
    [loading, data]
  );

  const loadingColumns = useMemo(
    () =>
      loading
        ? list.map((e) => {
            const { cell, ...rest } = e;
            return {
              ...rest,
              cell: <Skeleton />,
            };
          })
        : list,
    [loading, list]
  );

  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data: loadingData,
    columns: loadingColumns,
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

  const allocTableData = useMemo(
    () =>
      demandList?.filter(({ demanduniqueID }) =>
        directAlloc.includes(demanduniqueID)
      ) ?? [],
    [directAlloc, demandList]
  );
  const [allocInputData, setAllocInputData] = useState([]);

  const initialData = {
    workAllocationDateFrom: "",
    workAllocationDateTo: "",
    workProvidedDateFrom: "",
    workProvidedDateTo: "",
    totalWagePaid: "",
    paymentDate: "",
  };

  useEffect(() => {
    let filledArray = [];
    if (directAlloc?.length > 0)
      filledArray = Array(directAlloc?.length).fill(initialData);
    setAllocInputData(filledArray);
  }, [directAlloc]);

  const dateDifference = useMemo(() => {
    return allocInputData.map(
      ({
        workAllocationDateFrom,
        workAllocationDateTo,
        workProvidedDateFrom,
        workProvidedDateTo,
      }) => {
        const allocDiff = Math.abs(
          new Date(workAllocationDateTo).getTime() -
            new Date(workAllocationDateFrom).getTime()
        );
        const provDiff = Math.abs(
          new Date(workProvidedDateFrom).getTime() -
            new Date(workProvidedDateTo).getTime()
        ); // Absolute difference in milliseconds
        const allocDifference = Math.ceil(allocDiff / (1000 * 3600 * 24)); // Convert to days
        const provDifference = Math.ceil(provDiff / (1000 * 3600 * 24));

        return {
          allocDateDiff: isNaN(allocDifference) ? 0 : allocDifference + 1,
          providedDateDiff: isNaN(provDifference) ? 0 : provDifference + 1,
        };
      }
    );
  }, [allocInputData]);

  const allocDisplayData = useMemo(() => {
    const arr = allocInputData.map((e, idx) => {
      return {
        ...e,
        ...dateDifference[idx],
        ...allocTableData[idx],
      };
    });
    return arr;
  }, [allocInputData]);

  const handleChange = (index, key, value) => {
    const newData = [...allocInputData];
    const obj = newData[index];

    const date1 = new Date(value);
    const date2 = new Date(obj.workProvidedDateFrom);
    // If key 'a' is not empty and key 'b' is empty, replace the value of 'b' with the value of 'a'
    if (
      key == "workAllocationDateFrom" &&
      value.length > 0 &&
      obj.workProvidedDateFrom.length == 0
    ) {
      obj.workProvidedDateFrom = value;
    }

    if (
      key == "workAllocationDateFrom" &&
      value.length > 0 &&
      obj.workProvidedDateFrom.length > 0 &&
      date1 > date2
    ) {
      obj.workProvidedDateFrom = value;
    }

    // If the user types a value, update the corresponding key
    newData[index] = {
      ...newData[index],
      [key]: value,
    };

    setAllocInputData(newData);
  };

  return (
    <>
      <Modal size={"7xl"} show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header className="px-8">
          Worker Details from Demand List
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col flex-grow p-8 px-12">
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
            <div className="overflow-x-auto overflow-y-auto max-h-[400px] w-full show-scrollbar shadow-md">
              <Table>
                {table.getHeaderGroups().map((headerGroup) => (
                  <Table.Head key={headerGroup.id} className="sticky top-0 z-10">
                    {headerGroup.headers.map((header) => (
                      <Table.HeadCell
                        key={header.id}
                        className={classNames(
                          header.column.columnDef.headclass,
                          "bg-cyan-400/90 btn-blue transition-all whitespace-nowrap"
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
                    <Table.HeadCell className="normal-case bg-cyan-400/90 btn-blue cursor-pointer py-1">
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
                            "whitespace-nowrap py-1 px-2"
                          )}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Table.Cell>
                      ))}

                      <Table.Cell className="flex items-center justify-center space-x-8 px-2 py-1">
                        <button
                          className="flex space-x-2 items-center bg-green-500 text-white px-2 py-1 rounded-md transition-all hover:shadow-md hover:bg-opacity-90"
                          onClick={() =>
                            setDirectAlloc((e) => [
                              ...e,
                              row.original.demanduniqueID,
                            ])
                          }
                        >
                          <span>Add</span>
                          <Icon className="text-2xl" icon={"ic:round-add"} />
                        </button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
            <Pagination data={data} table={table} />
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-center">
          <Button onClick={() => setOpenModal(false)}>Confirm</Button>
        </Modal.Footer>
      </Modal>
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
                        Direct Employment
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
              <br />
            </div>

            <br></br>
            <div className="bg-white shadow-md rounded-lg p-12">
              <div className="flex w-full space-x-4 mb-6">
                <div className="px-4">
                  <label
                    htmlFor="scheme_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Area Type
                    <span className="text-red-500 "> * </span>
                  </label>
                  <select
                    id="scheme_name"
                    name="scheme_name"
                    autoComplete="off"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    required
                    onChange={onArea}
                  >
                    <option value="" selected hidden>
                      Select Area
                    </option>
                    <option value="R">Rural</option>
                    <option value="U">Urban</option>

                    {/* Add more options as needed */}
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
                    id="scheme_name"
                    name="scheme_name"
                    autoComplete="off"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    onChange={onDistrict}
                  >
                    <option value="" selected hidden>
                      Select District List
                    </option>
                    {districtListDropdown}

                    {/* Add more options as needed */}
                  </select>
                </div>
                {district?.length > 0 && area === "U" ? (
                  <div className="px-4">
                    <label
                      htmlFor="scheme_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Municipality
                    </label>
                    <select
                      id="scheme_name"
                      name="scheme_name"
                      autoComplete="off"
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                      onClick={onMunicipality}
                    >
                      <option value="" selected hidden>
                        Select Municipality List
                      </option>
                      {municipalityListDropdown}

                      {/* Add more options as needed */}
                    </select>
                  </div>
                ) : (
                  ""
                )}

                {district?.length > 0 && area === "R" ? (
                  <div className="px-4">
                    <label
                      htmlFor="scheme_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Block
                    </label>
                    <select
                      id="scheme_name"
                      name="scheme_name"
                      autoComplete="off"
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                      onChange={onBlock}
                    >
                      <option value="" selected hidden>
                        Select Block List
                      </option>
                      {blockListDropdown}

                      {/* Add more options as needed */}
                    </select>
                  </div>
                ) : (
                  ""
                )}

                {block?.length > 0 && area === "R" ? (
                  <div className="px-4">
                    <label
                      htmlFor="scheme_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Gram Panchayat
                    </label>
                    <select
                      id="scheme_name"
                      name="scheme_name"
                      autoComplete="off"
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                      onClick={onGP}
                    >
                      <option value="" selected hidden>
                        Select GP List
                      </option>
                      {GpListDropdown}

                      {/* Add more options as needed */}
                    </select>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="flex flex-col w-full mb-4 px-4 space-y-4">
                <div className="flex w-full">
                  <div className="w-full">
                    <label
                      htmlFor="scheme_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Scheme List
                      <span className="text-red-500 "> * </span>
                      {/* <span className="text-green-500 font-bold animate-pulse">
                        (List of Schemes for which Work Order details have been
                        provided)
                      </span> */}
                    </label>
                    <select
                      name=""
                      id=""
                      className="w-full rounded-md border-zinc-300"
                      onChange={onScheme}
                    >
                      <option value="" selected hidden>
                        -select scheme-
                      </option>
                      {schemeAll_List?.map((e) => (
                        <option value={e.scheme_sl}>{e.schemename}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex">
                  <button
                    className="flex space-x-2 items-center bg-green-500 text-white px-4 py-1 rounded-md transition-all hover:shadow-md hover:bg-opacity-90"
                    onClick={() => setOpenModal(true)}
                  >
                    <span>Add Worker</span>
                    <Icon className="text-2xl" icon={"ic:round-add"} />
                  </button>
                </div>
                <div className="overflow-x-auto overflow-y-auto max-h-[300px] w-full show-scrollbar shadow-md">
                  <Table className="">
                    <Table.Head className="sticky top-0">
                      <Table.HeadCell className="bg-cyan-400/90 btn-blue normal-case whitespace-nowrap">
                        Name of worker
                      </Table.HeadCell>
                      <Table.HeadCell className="bg-cyan-400/90 btn-blue normal-case whitespace-nowrap">
                        Date of Work Application
                      </Table.HeadCell>
                      <Table.HeadCell className="bg-cyan-400/90 btn-blue normal-case whitespace-nowrap">
                        Days Work Demanded
                      </Table.HeadCell>
                      <Table.HeadCell className="bg-cyan-400/90 btn-blue normal-case whitespace-nowrap">
                        Work Allocation Dates
                      </Table.HeadCell>
                      <Table.HeadCell className="bg-cyan-400/90 btn-blue normal-case whitespace-nowrap">
                        Days Work Allocated
                      </Table.HeadCell>
                      <Table.HeadCell className="bg-cyan-400/90 btn-blue normal-case whitespace-nowrap">
                        Work Provided Dates
                      </Table.HeadCell>
                      <Table.HeadCell className="bg-cyan-400/90 btn-blue normal-case whitespace-nowrap">
                        Days Work Provided
                      </Table.HeadCell>

                      <Table.HeadCell className="bg-cyan-400/90 btn-blue normal-case whitespace-nowrap ">
                        Total Wage Paid
                      </Table.HeadCell>

                      <Table.HeadCell className="bg-cyan-400/90 btn-blue normal-case whitespace-nowrap ">
                        Payment Date
                      </Table.HeadCell>
                      <Table.HeadCell className="bg-cyan-400/90 btn-blue normal-case whitespace-nowrap w-32" />
                    </Table.Head>

                    <Table.Body className="divide-y ">
                      {allocInputData?.map(
                        (
                          {
                            workAllocationDateFrom,
                            workAllocationDateTo,
                            workProvidedDateFrom,
                            workProvidedDateTo,
                            totalWagePaid,
                            paymentDate,
                          },
                          index
                        ) => (
                          <Table.Row key={index}>
                            <Table.Cell className=" whitespace-nowrap text-xs py-1 ">
                              {allocTableData[index]?.workerName}
                            </Table.Cell>

                            <Table.Cell className=" whitespace-nowrap text-xs py-1 ">
                              {new Date(
                                allocTableData[index]?.dateOfApplicationForWork
                              ).toLocaleDateString("en-IN", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                              })}
                            </Table.Cell>

                            <Table.Cell className=" whitespace-nowrap text-xs py-1 ">
                              {allocTableData[index]?.noOfDaysWorkDemanded}
                            </Table.Cell>
                            <Table.Cell className=" whitespace-nowrap text-xs py-1 ">
                              <div className="flex items-center space-x-2">
                                <DatePicker
                                  minDate={
                                    new Date(
                                      allocTableData[
                                        index
                                      ]?.dateOfApplicationForWork
                                    )
                                  }
                                  dateFormat="dd/MM/yyyy"
                                  selected={workAllocationDateFrom}
                                  onChange={(date) =>
                                    handleChange(
                                      index,
                                      "workAllocationDateFrom",
                                      date.toString()
                                    )
                                  }
                                  placeholderText="dd/mm/yyyy"
                                  selectsStart
                                  startDate={workAllocationDateFrom}
                                  endDate={workAllocationDateTo}
                                  portalId="root-portal"
                                  className="w-32 cursor-pointer border-gray-300 rounded-md text-sm"
                                />
                                <span className="text-lg -px-1">-</span>
                                <DatePicker
                                  placeholderText="dd/mm/yyyy"
                                  selected={workAllocationDateTo}
                                  onChange={(date) =>
                                    handleChange(
                                      index,
                                      "workAllocationDateTo",
                                      date.toString()
                                    )
                                  }
                                  selectsEnd
                                  startDate={workAllocationDateFrom}
                                  endDate={workAllocationDateTo}
                                  minDate={workAllocationDateFrom}
                                  maxDate={
                                    new Date(workAllocationDateFrom).getTime() +
                                    (allocTableData[index]
                                      ?.noOfDaysWorkDemanded -
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
                              {dateDifference[index].allocDateDiff}
                            </Table.Cell>
                            <Table.Cell className=" whitespace-nowrap text-xs py-1 ">
                              <div className="flex items-center space-x-2">
                                <DatePicker
                                  disabled={
                                    dateDifference[index].allocDateDiff === 0
                                  }
                                  minDate={new Date(workAllocationDateFrom)}
                                  dateFormat="dd/MM/yyyy"
                                  selected={workProvidedDateFrom}
                                  onChange={(date) => {
                                    handleChange(
                                      index,
                                      "workProvidedDateFrom",
                                      date.toString()
                                    );
                                  }}
                                  placeholderText="dd/mm/yyyy"
                                  selectsStart
                                  startDate={workProvidedDateFrom}
                                  endDate={workProvidedDateTo}
                                  portalId="root-portal"
                                  className="w-32 cursor-pointer border-gray-300 rounded-md text-sm disabled:bg-red-200 disabled:cursor-not-allowed"
                                />
                                <span className="text-lg -px-1">-</span>
                                <DatePicker
                                  disabled={
                                    dateDifference[index].allocDateDiff === 0
                                  }
                                  placeholderText="dd/mm/yyyy"
                                  selected={workProvidedDateTo}
                                  onChange={(date) =>
                                    handleChange(
                                      index,
                                      "workProvidedDateTo",
                                      date.toString()
                                    )
                                  }
                                  selectsEnd
                                  startDate={workProvidedDateFrom}
                                  endDate={workProvidedDateTo}
                                  minDate={workProvidedDateFrom}
                                  maxDate={
                                    new Date(workProvidedDateFrom).getTime() +
                                    (dateDifference[index].allocDateDiff - 1) *
                                      24 *
                                      60 *
                                      60 *
                                      1000
                                  }
                                  // minDate={new Date()}
                                  dateFormat="dd/MM/yyyy"
                                  // selected={dateOfApplicationForWork}
                                  portalId="root-portal"
                                  className="w-32 cursor-pointer border-gray-300 rounded-md text-sm disabled:bg-red-200 disabled:cursor-not-allowed"
                                />
                              </div>
                            </Table.Cell>
                            <Table.Cell className=" whitespace-nowrap text-xs py-1 ">
                              {dateDifference[index].providedDateDiff}
                            </Table.Cell>
                            <Table.Cell className=" whitespace-nowrap text-xs py-1 ">
                              <input
                                // disabled={attandance == "Absent" ? true : false}
                                name="totalWagePaid"
                                type="text"
                                className="rounded-lg border-zinc-300 disabled:bg-red-100 disabled:cursor-not-allowed"
                                onChange={(e) =>
                                  handleChange(
                                    index,
                                    "totalWagePaid",
                                    e.target.value
                                  )
                                }
                              />
                            </Table.Cell>
                            <Table.Cell className=" whitespace-nowrap text-xs py-1 ">
                              <div className="flex items-center space-x-2">
                                <DatePicker
                                  minDate={new Date()}
                                  dateFormat="dd/MM/yyyy"
                                  selected={paymentDate}
                                  onChange={(e) => {
                                    handleChange(
                                      index,
                                      "paymentDate",
                                      e.toString()
                                    );
                                  }}
                                  portalId="root-portal"
                                  placeholderText="dd/mm/yyyy"
                                  className="w-32 cursor-pointer border-gray-300 rounded-md"
                                />
                              </div>
                            </Table.Cell>
                            <Table.Cell className=" whitespace-nowrap text-xs py-1 ">
                              <button
                                className="flex space-x-2 items-center font-bold bg-red-500 text-white px-4 py-1 rounded-md transition-all hover:shadow-md hover:bg-opacity-90"
                                onClick={() =>
                                  setDirectAlloc((e) =>
                                    e.filter(
                                      (el) =>
                                        el !=
                                        allocTableData[index]?.demanduniqueID
                                    )
                                  )
                                }
                              >
                                <span>Delete</span>
                              </button>
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
                          // onClick={() => {
                          //   if (empDataList.length > 0) mutate();
                          // }}
                        >
                          Submit
                        </button>
                      </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DirectEmployment;
