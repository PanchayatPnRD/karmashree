import { useState, useEffect, useMemo } from "react";
import { Table } from "flowbite-react";
import { useQuery } from "@tanstack/react-query";
import { fetch } from "../../functions/Fetchfunctions";
import { Pagination } from "../../components/Pagination";
import { SortIcon } from "../../components/SortIcon";
import classNames from "classnames";
import { exportToCSV, exportToExcel } from "../../functions/exportData";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import BreadCrumb from "../../components/BreadCrumb";

const ActionPlanList = () => {
  const { userIndex } = JSON.parse(sessionStorage.getItem("karmashree_User"));
  const { data: actionPlanList } = useQuery({
    queryKey: ["actionPlanList"],
    queryFn: async () => {
      const data = await fetch.get("/api/actionplan/getActionList/", userIndex);

      return data.data.result;
    },
  });

  const ListOptions = [5, 10, 15, "all"];
  const ListOptions2 = [5, 10, 15, "all"];
  const [items, setItems] = useState(ListOptions[0]);
  const [items2, setItems2] = useState(ListOptions2[0]);

  const data = useMemo(() => actionPlanList ?? [], [actionPlanList]);
  const data2 = useMemo(() => actionPlanList ?? [], [actionPlanList]);

  const list = [
    {
      header: "Sl no",
      accessorKey: "actionSL",
      className: "font-bold text-black text-center cursor-pointer",
      cell: ({ row }) => row.index + 1,
      // sortingFn: "id",
    },
    {
      header: "Scheme Area",
      accessorKey: "schemeArea",
      headClass: "cursor-pointer",
      cell: ({ row }) => (row.original.schemeArea == "R" ? "Rural" : "Urban"),
    },
    {
      header: "Department",
      accessorKey: "deptName",
      headClass: "cursor-pointer",
      cell: ({
        row: {
          original: { deptName },
        },
      }) => (deptName == "Unknown" ? "Karmashree Admin" : deptName),
    },
    {
      header: "Financial Year",
      accessorKey: "finYear",
      headClass: "cursor-pointer",
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
      header: "Block",
      accessorKey: "blockname",
      headClass: "cursor-pointer",
      className: "text-center",
      cell: ({ row }) =>
        row.original.blockname == "" ? "-" : row.original.blockname,
    },
    {
      header: "GP",
      accessorKey: "gpName",
      headClass: "cursor-pointer",
      className: "text-center",
      cell: ({ row }) =>
        row.original.gpName == "" ? "-" : row.original.gpName,
    },
    {
      header: "Type of Schemes",
      accessorKey: "sectorName",
      headClass: "cursor-pointer w-[120px]",
    },
    {
      header: "No of Schemes Proposed",
      accessorKey: "schemeProposed",
      headClass: "cursor-pointer",
    },
    {
      header: "Tentative Total Cost of Schemes",
      accessorKey: "tentativeCostOfScheme",
      headClass: "cursor-pointer",
    },
    {
      header: "Tentative Total Wage to be paid in the Schemes",
      accessorKey: "totWagesPaid",
      headClass: "cursor-pointer",
    },
    {
      header: "Total Person days to be Generated",
      accessorKey: "totPersonDays",
      headClass: "cursor-pointer",
    },
    {
      header: "Total no. of Job Card Holder to be Engaged",
      accessorKey: "totJobCard",
      headClass: "cursor-pointer",
    },
    {
      header: "Average Days of Employmengt to be Provided per Family",
      accessorKey: "averageDays",
      headClass: "cursor-pointer",
    },
  ];

  const list2 = [
    {
      header: "Sl no",
      accessorKey: "actionSL",
      className: "font-bold text-black text-center cursor-pointer",
      cell: ({ row }) => row.index + 1,
      // sortingFn: "id",
    },
    {
      header: "Scheme Area",
      accessorKey: "schemeArea",
      headClass: "cursor-pointer",
      cell: ({ row }) => (row.original.schemeArea == "R" ? "Rural" : "Urban"),
    },
    {
      header: "Department",
      accessorKey: "deptName",
      headClass: "cursor-pointer",
      cell: ({
        row: {
          original: { deptName },
        },
      }) => (deptName == "Unknown" ? "Karmashree Admin" : deptName),
    },
    {
      header: "Financial Year",
      accessorKey: "finYear",
      headClass: "cursor-pointer",
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
      header: "Block",
      accessorKey: "blockname",
      headClass: "cursor-pointer",
      className: "text-center",
      cell: ({ row }) =>
        row.original.blockname == "" ? "-" : row.original.blockname,
    },
    {
      header: "GP",
      accessorKey: "gpName",
      headClass: "cursor-pointer",
      className: "text-center",
      cell: ({ row }) =>
        row.original.gpName == "" ? "-" : row.original.gpName,
    },
    {
      header: "Type of Schemes",
      accessorKey: "sectorName",
      headClass: "cursor-pointer w-[120px]",
    },
    {
      header: "No of Schemes Proposed",
      accessorKey: "schemeProposed",
      headClass: "cursor-pointer",
    },
    {
      header: "Tentative Total Cost of Schemes",
      accessorKey: "tentativeCostOfScheme",
      headClass: "cursor-pointer",
    },
    {
      header: "Tentative Total Wage to be paid in the Schemes",
      accessorKey: "totWagesPaid",
      headClass: "cursor-pointer",
    },
    {
      header: "Total Person days to be Generated",
      accessorKey: "totPersonDays",
      headClass: "cursor-pointer",
    },
    {
      header: "Total no. of Job Card Holder to be Engaged",
      accessorKey: "totJobCard",
      headClass: "cursor-pointer",
    },
    {
      header: "Average Days of Employmengt to be Provided per Family",
      accessorKey: "averageDays",
      headClass: "cursor-pointer",
    },
  ];

  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [sorting2, setSorting2] = useState([]);
  const [filtering2, setFiltering2] = useState("");

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

  const table2 = useReactTable({
    data,
    columns: list2,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting2,
      globalFilter: filtering2,
    },
    initialState: {
      pagination: {
        pageSize: parseInt(items2),
      },
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  useEffect(() => {
    if (items == "all") table.setPageSize(9999);
    else table.setPageSize(parseInt(items));
  }, [items]);

  useEffect(() => {
    if (items2 == "all") table2.setPageSize(9999);
    else table2.setPageSize(parseInt(items2));
  }, [items2]);

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
    <div className="flex flex-col flex-grow">
      <BreadCrumb page={"Action Plan List"} className={"px-12"} />
      <div className="bg-transparent flex flex-col items-center px-12">
        <div className="flex justify-between items-center px-4 w-full">
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
              onClick={() => exportToExcel(rowToArray(), table, "actionPlan")}
              // onClick={rowToArray}
            >
              XLSX
            </button>
            <button
              className="border px-4 h-[42px] text-black rounded border-black"
              onClick={() => exportToCSV(table, "actionPlan")}
              // onClick={()=>exportExcel(table.getFilteredRowModel().rows)}
            >
              CSV
            </button>
          </div>
        </div>
        <div className="overflow-x-auto overflow-y-hidden h-fit w-full show-scrollbar">
          <Table className="drop-shadow-none">
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Head key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.HeadCell
                    key={header.id}
                    className={classNames(
                      header.column.columnDef.headClass,
                      "bg-cyan-400/90 theader-style transition-all whitespace-nowrap"
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
              </Table.Head>
            ))}

            <Table.Body className="divide-y">
              {table.getRowModel().rows.map((row) => (
                <Table.Row key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Table.Cell
                      key={cell.id}
                      className={classNames(
                        cell.column.columnDef.className,
                        "whitespace-nowrap text-xs"
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
        <Pagination data={data} table={table} />
      </div>
      <div className="bg-pink-100 flex flex-col items-center px-12 mt-10">
        <div className="flex justify-between items-center px-4 w-full">
          <select
            className="rounded-lg"
            name=""
            id=""
            value={items2}
            onChange={(e) => setItems2(e.target.value)}
          >
            {ListOptions2.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>

          <div className="h-full py-1">
            <input
              type="text"
              value={filtering2}
              placeholder="search..."
              className="border-2 rounded-lg border-zinc-400"
              onChange={(e) => setFiltering2(e.target.value)}
            />
            <button
              className="border px-4 h-[42px] bg-green-600/90 text-white rounded"
              onClick={() => exportToExcel(rowToArray(), table2, "actionPlan")}
              // onClick={rowToArray}
            >
              XLSX
            </button>
            <button
              className="border px-4 h-[42px] text-black rounded border-black"
              onClick={() => exportToCSV(table2, "actionPlan")}
              // onClick={()=>exportExcel(table.getFilteredRowModel().rows)}
            >
              CSV
            </button>
          </div>
        </div>
        <div className="overflow-x-auto overflow-y-hidden h-fit w-full show-scrollbar">
          <Table className="drop-shadow-none">
            {table2.getHeaderGroups().map((headerGroup) => (
              <Table.Head key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.HeadCell
                    key={header.id}
                    className={classNames(
                      header.column.columnDef.headClass,
                      "bg-cyan-400/90 theader-style transition-all whitespace-nowrap"
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
              </Table.Head>
            ))}

            <Table.Body className="divide-y">
              {table2.getRowModel().rows.map((row) => (
                <Table.Row key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Table.Cell
                      key={cell.id}
                      className={classNames(
                        cell.column.columnDef.className,
                        "whitespace-nowrap text-xs"
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
        <Pagination data={data} table={table2} />
      </div>
    </div>
  );
};

export default ActionPlanList;
