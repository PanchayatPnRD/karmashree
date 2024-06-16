import { useState, useEffect, useMemo } from "react";
import { Table } from "flowbite-react";
import { useQuery } from "@tanstack/react-query";
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
import { exportToCSV, exportToExcel } from "../../functions/exportData";
import classNames from "classnames";

const WorkRequirementList = () => {
  const jsonString = localStorage.getItem("karmashree_User");
  const karmashree_data = JSON.parse(jsonString);
  const { userIndex } = JSON.parse(localStorage.getItem("karmashree_User"));

  const { data: workRequirementList } = useQuery({
    queryKey: ["workRequirementList"],
    queryFn: async () => {
      const data = await fetch.get(
        `/api/workerrequisition/getallrequztion?userIndex=${karmashree_data?.userIndex}`
      );
      //
      return data.data.result;
    },
  });

  const ListOptions = [5, 10, 15, "all"];
  const [items, setItems] = useState(ListOptions[0]);

  const data = useMemo(() => workRequirementList ?? [], [workRequirementList]);

  const list = [
    {
      header: "Sl no",
      accessorKey: "workersl",
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
      headClass: "cursor-pointer",
      className: "text-center",
      cell: ({ row }) =>
        row.original.districtName == "" ? "-" : row.original.districtName,
    },
    {
      header: "Municapility",
      accessorKey: "muniName",
      headclass: "cursor-pointer",
      className: "text-center",
      cell: ({ row }) =>
        row.original.muniName == "" ? "-" : row.original.muniName,
    },
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
      header: "Scheme Name",
      accessorKey: "schName",
      headclass: "cursor-pointer",
    },
    {
      header: "Contractor",
      accessorKey: "conName",
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
      className: "text-center",
      headclass: "cursor-pointer",
      cell: ({ row }) =>
        new Date(row.original.fromDate).toLocaleDateString("en-IN", {
          month: "2-digit",
          day: "2-digit",
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
      className: "text-center",
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
                    Worker Requirement List
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
              onClick={() =>
                exportToExcel(rowToArray(), table, "worker_requisitionList")
              }
              // onClick={rowToArray}
            >
              XLSX
            </button>
            <button
              className="border px-4 h-[42px] text-black rounded border-black"
              onClick={() => exportToCSV(table, "worker_requisitionList")}
              // onClick={()=>exportExcel(table.getFilteredRowModel().rows)}
            >
              CSV
            </button>
          </div>
        </div>
        <div className="overflow-x-auto overflow-y-hidden h-fit w-full show-scrollbar">
          <Table className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Head key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.HeadCell
                    key={header.id}
                    className={classNames(
                      header.column.columnDef.headclass,
                      // "normal-case bg-cyan-400/90 hover:bg-cyan-400/60 text-blue-900 text-md",
                      "bg-cyan-400/90 btn-blue",
                      " transition-all whitespace-nowrap"
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
                {/* <Table.HeadCell className="normal-case">Actions</Table.HeadCell> */}
              </Table.Head>
            ))}

            <Table.Body className="divide-y divide-zinc-400">
              {table.getRowModel().rows.map((row) => (
                <Table.Row
                  key={row.id}
                  className={classNames(
                    "divide-x divide-zinc-400",
                    row.original.allocationID == "" ||
                      row.original.allocationID === null
                      ? "bg-green-200"
                      : "bg-red-200"
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <Table.Cell key={cell.id} className="py-1 px-1">
                      <div
                        className={classNames(
                          cell.column.columnDef.className,
                          "whitespace-nowrap"
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
                    </Table.Cell>
                  ))}

                  {/* <Table.Cell className="flex items-center justify-center space-x-8">
                    <Icon
                      icon={"mingcute:edit-line"}
                      className="font-medium text-cyan-600 hover:underline text-2xl"
                    />
                  </Table.Cell> */}
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

export default WorkRequirementList;
