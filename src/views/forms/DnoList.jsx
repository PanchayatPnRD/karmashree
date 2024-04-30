import { useState, useEffect, useMemo } from "react";
import { Table } from "flowbite-react";
import { Pagination } from "../../components/Pagination";
import { useQuery } from "@tanstack/react-query";
import { fetch } from "../../functions/Fetchfunctions";
import { Icon } from "@iconify/react/dist/iconify.js";
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

const DnoList = () => {
  const { userIndex } = JSON.parse(localStorage.getItem("karmashree_User"));

  const { data: dnoUserList } = useQuery({
    queryKey: ["dnoUserList"],
    queryFn: async () => {
      const { data } = await fetch.get(
        "/api/user/getDnolist?created_by=",
        userIndex
      );

      return data.result.data;
    },
  });

  const ListOptions = [5, 10, 15, "all"];
  const [items, setItems] = useState(ListOptions[0]);

  const data = useMemo(() => dnoUserList ?? [], [dnoUserList]);

  const list = [
    {
      header: "Sl no",
      accessorKey: "userIndex",
      className: "font-bold text-zinc-600 text-center cursor-pointer",
      cell: ({ row }) => row.index + 1,
      // sortingFn: "id",
    },
    {
      header: "District",
      accessorKey: "districtName",
      headclass: "cursor-pointer",
    },
    {
      header: "Sub Division",
      accessorKey: "subDivisionName",
      headclass: "cursor-pointer",
    },
    {
      header: "Block",
      accessorKey: "blockname",
      headclass: "cursor-pointer",
    },

    {
      header: "Designation",
      accessorKey: "designationName",
      headclass: "cursor-pointer",
    },
    {
      header: "Phone",
      accessorKey: "tech_mobile",
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
                  {" "}
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
                    Dno List
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <br />
        </div>
      </div>
      <div className="flex flex-col flex-grow p-8 px-12">
        <div className="flex justify-between items-center px-4">
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
              className="border px-4 h-full bg-green-600/90 text-white rounded"
              onClick={() => exportToExcel(rowToArray(), table, "dno_list")}
              // onClick={rowToArray}
            >
              XLSX
            </button>
            <button
              className="border px-4 h-full text-black rounded border-black"
              onClick={() => exportToCSV(table, "dno_list")}
              // onClick={()=>exportExcel(table.getFilteredRowModel().rows)}
            >
              CSV
            </button>
          </div>
        </div>

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
                    <div className="flex items-center space-x-2">
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
              <Table.HeadCell className="normal-case">Actions</Table.HeadCell>
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
                <Table.Cell className="flex items-center justify-center space-x-8">
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline text-2xl"
                  >
                    <Icon icon={"mingcute:edit-line"} />
                  </a>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Pagination data={data} table={table} />
      </div>
    </>
  );
};

export default DnoList;
