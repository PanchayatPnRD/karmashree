import { useState, useEffect, useMemo } from "react";
import { Table } from "flowbite-react";
import { useQuery } from "@tanstack/react-query";
import { fetch } from "../../functions/Fetchfunctions";
import { SortIcon } from "../../components/SortIcon";
import { Icon } from "@iconify/react/dist/iconify.js";
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
import { exportToCSV, exportToExcel } from "../../functions/exportData";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import BreadCrumb from "../../components/BreadCrumb";

const DemandList = () => {
  const jsonString = sessionStorage.getItem("karmashree_User");
  const karmashree_data = JSON.parse(jsonString);
  const { userIndex } = JSON.parse(sessionStorage.getItem("karmashree_User"));
  const { data: demandList, isLoading: loading } = useQuery({
    queryKey: ["demandList"],
    queryFn: async () => {
      const data = await fetch.get(
        `/api/demand/getdemandList/${karmashree_data?.userIndex}`
      );
      //);
      return data.data.result;
    },
  });

  const ListOptions = [5, 10, 15, "all"];
  const [items, setItems] = useState(ListOptions[0]);

  const data = useMemo(() => demandList ?? [], [demandList]);

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
      //demanduniqueID
    },
    {
      header: "Demand Id",
      accessorKey: "demanduniqueID",
      headclass: "cursor-pointer",
      //demanduniqueID
    },
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
      header: "Mobile No",
      accessorKey: "mobileNo",
      headclass: "cursor-pointer",
    },
    {
      header: "Age",
      accessorKey: "age",
      headclass: "cursor-pointer",
    },

    {
      header: "Date of Application for Work",
      accessorKey: "dateOfApplicationForWork",
      headclass: "cursor-pointer",
      cell: ({ row }) =>
        new Date(row.original.dateOfApplicationForWork).toLocaleDateString(
          "en-IN",
          { year: "numeric", month: "2-digit", day: "2-digit" }
        ),
    },
    {
      header: "No of Days Demanded",
      accessorKey: "noOfDaysWorkDemanded",
      headclass: "cursor-pointer",
    },
    {
      header: "Remarks",
      accessorKey: "remark",
      headclass: "cursor-pointer",
      cell: ({ row }) =>
        row.original.remark == "" || row.original.remark === null
          ? "-"
          : row.original.remark,
    },
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
      <div className="flex flex-col flex-grow p-1 px-12">
        <BreadCrumb page={"Demand List"} />
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
              onClick={() => exportToExcel(rowToArray(), table, "demandList")}
              // onClick={rowToArray}
            >
              XLSX
            </button>
            <button
              className="border px-4 h-[42px] text-black rounded border-black"
              onClick={() => exportToCSV(table, "demandList")}
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
                {/* <Table.HeadCell className="normal-case">Actions</Table.HeadCell> */}
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

                  {/* <Table.Cell className="flex items-center justify-center space-x-8">
                    <Skeleton/>
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

export default DemandList;
