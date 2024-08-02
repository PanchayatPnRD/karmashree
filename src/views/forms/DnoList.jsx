import { useState, useEffect, useMemo } from "react";
import { Table } from "flowbite-react";
import { Pagination } from "../../components/Pagination";
import { useQuery } from "@tanstack/react-query";
import { fetch } from "../../functions/Fetchfunctions";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
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

const DnoList = () => {
  const { userIndex } = JSON.parse(sessionStorage.getItem("karmashree_User"));

  const { data: userDetails, isSuccess } = useQuery({
    queryKey: ["userDetails"],
    queryFn: async () => {
      const data = await fetch.get("/api/user/viewuser");

      return data.data.result;
    },
  });

  const DnoListQuery = useMemo(() => {
    const query = [
      userDetails?.category ? `category=${userDetails?.category}` : "",
      userDetails?.dno_status ? `dno_status=${userDetails?.dno_status}` : "",
      userDetails?.role_type ? `role=${userDetails?.role_type}` : "",
      userDetails?.districtcode
        ? `districtCode=${userDetails?.districtcode}`
        : "",
      userDetails?.blockCode ? `blockcode=${userDetails?.blockCode}` : "",
      userDetails?.subDivision ? `subDivision=${userDetails?.subDivision}` : "",
      userDetails?.gpCode ? `gpCode=${userDetails?.gpCode}` : "",
      userDetails?.departmentNo
        ? `departmentNo=${userDetails?.departmentNo}`
        : "",
      userDetails?.deptWing ? `deptWing=${+userDetails?.deptWing}` : "",
      `userIndex=${userIndex}`,
    ];
    return query.filter(Boolean).join("&");
  }, [userDetails]);

  const { data: dnoUserList } = useQuery({
    queryKey: ["dnoUserList"],
    queryFn: async () => {
      const { data } = await fetch.get(
        "/api/user/DNO_list-by-category?",
        DnoListQuery
      );

      return data.result.userDetails;
    },
    enabled: userDetails?.category != undefined,
  });

  const ListOptions = [10, 15, "all"];
  const [items, setItems] = useState(ListOptions[0]);

  const data = useMemo(() => {
    const sortedDnoUserList = [...(dnoUserList ?? [])];
    sortedDnoUserList.sort((a, b) => b.userIndex - a.userIndex);
    return sortedDnoUserList;
  }, [dnoUserList]);

  const list = [
    {
      header: "Sl no",
      accessorKey: "userIndex",
      className: "font-bold text-zinc-600 text-center cursor-pointer",
      cell: ({ row }) => row.index + 1,
      headclass: "cursor-pointer",
      // sortingFn: "id",
    },
    // {
    //   header: "District",
    //   accessorKey: "districtName",
    //   headclass: "cursor-pointer",
    // },
    // {
    //   header: "Sub Division",
    //   accessorKey: "subDivisionName",
    //   headclass: "cursor-pointer",
    // },
    // {
    //   header: "Block",
    //   accessorKey: "blockname",
    //   headclass: "cursor-pointer",
    // },

    // {
    //   header: "Designation",
    //   accessorKey: "designationName",
    //   headclass: "cursor-pointer",
    // },
    // {
    //   header: "Phone",
    //   accessorKey: "tech_mobile",
    //   headclass: "cursor-pointer",
    // },
    // {
    //   header: "Department",
    //   accessorKey: "deptName",
    //   headclass: "cursor-pointer",
    //   className: "text-center",
    //   cell: ({ row }) =>
    //     row.original.deptName == "" ? "-" : row.original.deptName,
    // },
    {
      header: "Username",
      accessorKey: "userName",
      headclass: "cursor-pointer",
    },
    {
      header: "District",
      accessorKey: "districtName",
      headclass: "cursor-pointer",
      className: "text-center",
      cell: ({ row }) =>
        row.original.districtName == "" ? "-" : row.original.districtName,
    },
    {
      header: "User Id",
      accessorKey: "userId",
      headclass: "cursor-pointer",
      className: "text-center",
      // cell: ({ row }) =>
      //   row.original.subDivisionName == "" ? "-" : row.original.subDivisionName,
    },
    {
      header: "Block",
      accessorKey: "blockname",
      headclass: "cursor-pointer",
      className: "text-center",
      cell: ({ row }) =>
        row.original.blockname == "" ? "-" : row.original.blockname,
    },

    {
      header: "Designation",
      accessorKey: "designationName",
      headclass: "cursor-pointer",
    },
    {
      header: "Phone",
      accessorKey: "contactNo",
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
      <BreadCrumb page={"Dno Userlist"} className="px-12" />
      <div className="flex flex-col flex-grow p-8 pt-0 px-12">
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
        <div className="overflow-x-auto overflow-y-auto max-h-[550px] w-full">
          <Table className="drop-shadow-none">
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Head key={headerGroup.id} className="sticky top-0 z-10">
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
                <Table.HeadCell className="bg-cyan-400/90 theader-style transition-all whitespace-nowrap">
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
                      className={classNames(
                        cell.column.columnDef.className,
                        "whitespace-nowrap py-1"
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Table.Cell>
                  ))}
                  <Table.Cell className="flex items-center justify-center space-x-8 py-1">
                    <Link
                      to={"/dashboard/edit/" + row.original.userIndex}
                      state={"dno-userlist"}
                      className="font-medium text-cyan-600 hover:underline text-2xl"
                    >
                      <Icon icon={"mingcute:edit-line"} />
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

export default DnoList;
