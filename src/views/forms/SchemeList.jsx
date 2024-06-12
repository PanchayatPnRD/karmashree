import { useState, useEffect, useMemo } from "react";
import { Table } from "flowbite-react";
import { useQuery } from "@tanstack/react-query";
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
import { getAllContractorList } from "../../Service/Scheme/SchemeService";
import { Link } from "react-router-dom";
const formatNumberToINR = (number, withDecimal) => {
    return new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: withDecimal ? 2 : 0,
      maximumFractionDigits: withDecimal ? 2 : 0,
    }).format(number);
  };
const SchemeList = () => {
  const { userIndex } = JSON.parse(localStorage.getItem("karmashree_User"));
  const [allContractorList, setAllContractorList] = useState([]);

  useEffect(() => {
    getAllContractorList().then(function (result) {
      const response = result?.data?.result;
      setAllContractorList(response);
    });
  }, []);
  // console.log(allContractorList,"allContractorList")
  console.log(
    allContractorList.find((c) => c.cont_sl === 1)?.contractorNameGst
  );
  const { data: schemeList } = useQuery({
    queryKey: ["schemeList"],
    queryFn: async () => {
      const data = await fetch.get("/api/schememaster/schemelist/" + userIndex);
      // console.log(Array.isArray(data.data.result));
      return data.data.result;
    },
  });

  const ListOptions = [5, 10, 15, "all"];
  const [items, setItems] = useState(ListOptions[0]);

  const data = useMemo(() => schemeList ?? [], [schemeList]);

  const list = [
    {
      header: "Sl no",
      accessorKey: "scheme_sl",
      className: "font-bold text-black text-center cursor-pointer normal-case",
      cell: ({ row }) => row.index + 1,
      headClass: "cursor-pointer normal-case",
    },
    {
      header: "Financial Year",
      accessorKey: "finYear",
      headClass: "cursor-pointer normal-case",
    },
    {
      header: "Scheme Id",
      accessorKey: "schemeId",
      headClass: "cursor-pointer normal-case",
    },
    {
      header: "Scheme Name",
      accessorKey: "schemeName",
      headClass: "cursor-pointer normal-case",
      // sortingFn: "id",
    },
    {
      header: "Funding Department",
      accessorKey: "FundingDeptname",
      headClass: "cursor-pointer normal-case",
      // cell: ({ row }) => row.index + 1,
      // sortingFn: "id",
    },
    {
      header: "District",
      accessorKey: "districtName",
      headClass: "cursor-pointer normal-case",
      // sortingFn: "id",
    },
    {
      header: "Block/Municipality",
      accessorKey: "blockName",
      headClass: "cursor-pointer normal-case",

      cell: ({ row }) =>
        row.original.blockName == ""
          ? row.original.muniName
          : row.original.blockName,
      // sortingFn: "id",
    },
    {
      header: "GP",
      accessorKey: "gpName",
      headClass: "cursor-pointer normal-case",
      cell: ({ row }) =>
        row.original.gpName == "" ? "-" : row.original.gpName,
      // sortingFn: "id",
    },
    {
      header: "Contractor Name",
      accessorKey: "ControctorID",
      headClass: "cursor-pointer normal-case",
      cell: ({ row }) =>
        allContractorList.find((c) => c.cont_sl === row.original.ControctorID)
          ?.contractorNameGst,
      // sortingFn: "id",
    },
    {
      header: "Project Cost",
      accessorKey: "totalprojectCost",
      headClass: "cursor-pointer normal-case",
      cell: ({ row }) =>
        formatNumberToINR(row.original.totalprojectCost,true)
    },
    // {
    //   header: "Total Unskilled workers",
    //   // accessorKey: "totalprojectCost",
    //   headClass: "cursor-pointer normal-case",
    //   // cell: ({ row }) => row.index + 1,
    //   // sortingFn: "id",
    // },
    {
      header: "Estimated No of Workers",
      accessorKey: "totalUnskilledWorkers",
      headClass: "cursor-pointer normal-case",
      // cell: ({ row }) => row.index + 1,
      // sortingFn: "id",
    },
    {
      header: "Estimated No of Mandays",
      accessorKey: "personDaysGenerated",
      headClass: "cursor-pointer normal-case",
      cell: ({ row }) =>
        formatNumberToINR(row.original.personDaysGenerated,false)
    },
    {
      header: "Estimated Wage Cost",
      accessorKey: "totalwagescostinvoled",
      headClass: "cursor-pointer normal-case",
      cell: ({ row }) =>
        formatNumberToINR(row.original.totalwagescostinvoled,true)
    },
    {
      header: "No of Workers Engaged",
      accessorKey: "totalLabourprovided",
      headClass: "cursor-pointer normal-case",
      className: "text-center",
      // cell: ({ row }) => row.index + 1,
      // sortingFn: "id",
      cell: ({ row }) =>
        row.original.totalLabourprovided == "" ||
        row.original.totalLabourprovided == null
          ? "-"
          : formatNumberToINR(row.original.totalLabourprovided,false),
    },
    {
      header: "No of Mandays Provided",
      accessorKey: "personDaysGeneratedprovided",
      headClass: "cursor-pointer normal-case",
      // cell: ({ row }) => row.index + 1,

      className: "text-center",
      // cell: ({ row }) => row.index + 1,
      // sortingFn: "id",
      cell: ({ row }) =>
        row.original.personDaysGeneratedprovided == "" ||
        row.original.personDaysGeneratedprovided == null
          ? "-"
          : formatNumberToINR(row.original.personDaysGeneratedprovided,false),
    },
    {
      header: "Total Wages Paid till date",
      accessorKey: "totalCostprovided",
      headClass: "cursor-pointer normal-case",
      // cell: ({ row }) => row.index + 1,

      className: "text-center",
      // cell: ({ row }) => row.index + 1,
      // sortingFn: "id",
      cell: ({ row }) =>
        row.original.totalCostprovided == "" ||
        row.original.totalCostprovided == null
          ? "-"
          : formatNumberToINR(row.original.totalCostprovided,true),
    },

    {
      header: "Avg. Mandays provided per household",
      headClass: "cursor-pointer capitalize",
      className: "text-center",
      cell: ({ row }) => "-",
      // sortingFn: "id",
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

  function rowToArray() {
    let array = [];
    table.getFilteredRowModel().rows.forEach((row) => {
      const cells = row.getVisibleCells();
      const values = cells.map((cell) => cell.getValue());
      array.push(values);
    });

    return array;
  }

  return (
    <>
      <div className="bg-white rounded-lg p-12">
        <div id="breadcrumb-starts-here" className="shadow-md -mb-4 ">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <nav aria-label="Breadcrumb">
                <ol className="flex items-center space-x-4 px-4 py-2">
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
          <div className="h-full py-1">
            <input
              type="text"
              value={filtering}
              placeholder="search..."
              className="border-2 rounded-lg border-zinc-400"
              onChange={(e) => setFiltering(e.target.value)}
            />
            <button
              className="border px-4 h-[42px] bg-green-600/90 text-white rounded"
              onClick={() => exportToExcel(rowToArray(), table, "schemeList")}
              // onClick={rowToArray}
            >
              XLSX
            </button>
            <button
              className="border px-4 h-[42px] text-black rounded border-black"
              onClick={() => exportToCSV(table, "schemeList")}
              // onClick={()=>exportExcel(table.getFilteredRowModel().rows)}
            >
              CSV
            </button>
          </div>
        </div>
        <div className="overflow-x-auto overflow-y-hidden h-fit w-full show-scrollbar">
          <Table>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Head key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.HeadCell
                    key={header.id}
                    className={classNames(
                      header.column.columnDef.headClass,
                      "bg-cyan-400/90 btn-blue transition-all whitespace-nowrap"
                    )}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center space-x-2">
                        <span className="">
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
                <Table.HeadCell className="bg-cyan-400/90 btm-blue normal-case">
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
                        "whitespace-nowrap py-1 px-3"
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Table.Cell>
                  ))}
                  <Table.Cell className="px-3 py-1 flex justify-between">
                    <Link
                      to={`/dashboard/scheme-view/${row.original.scheme_sl}`}
                    >
                      <button className="text-3xl text-cyan-600">
                        <Icon icon={"icon-park-solid:preview-open"} />
                      </button>
                    </Link>
                    <Link
                      to={`/dashboard/scheme-edit/${row.original.scheme_sl}`}
                    >
                      <button className="text-3xl text-cyan-600">
                        <Icon icon={"basil:edit-outline"} />
                      </button>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
        <Pagination data={data} table={table} />
      </div>
    </>
  );
};

export default SchemeList;
