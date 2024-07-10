import { useState, useEffect, useMemo } from "react";
import { Table } from "flowbite-react";
import { useQuery } from "@tanstack/react-query";
import { fetch } from "../../functions/Fetchfunctions";
import { Icon } from "@iconify/react/dist/iconify.js";
import { SortIcon } from "../../components/SortIcon";
import { exportToCSV, exportToExcel } from "../../functions/exportData";
import classNames from "classnames";
import { Link } from "react-router-dom";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Pagination } from "../../components/Pagination";

const UserList = () => {
  const { userIndex } = JSON.parse(sessionStorage.getItem("karmashree_User"));

  const { data: userDetails, isSuccess } = useQuery({
    queryKey: ["userDetails"],
    queryFn: async () => {
      const data = await fetch.get("/api/user/viewuser/", userIndex);

      return data.data.result;
    },
  });
  // Queries

  const UserListQuery = useMemo(() => {
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

  // UserListQuery();

  const { data: userlist } = useQuery({
    queryKey: ["userlist"],
    queryFn: async () => {
      const data = await fetch.get(
        `/api/user/User_list-by-category?${UserListQuery}`
      );

      return data.data.result.userDetails;
    },
    enabled: userDetails?.category != undefined
  });

  const ListOptions = [5, 10, 15, "all"];
  const [items, setItems] = useState(ListOptions[0]);

  const data = useMemo(() => {
    const sortedUserList = [...(userlist ?? [])];
    sortedUserList.sort((a, b) => b.userIndex - a.userIndex);
    return sortedUserList;
  }, [userlist]);

  const list = [
    {
      header: "Sl no",
      accessorKey: "userIndex",
      className: "font-bold text-zinc-600 text-center cursor-pointer",
      cell: ({ row }) => row.index + 1,
      headclass: "cursor-pointer",
      // sortingFn: "id",
    },
    {
      header: "Department",
      accessorKey: "deptName",
      headclass: "cursor-pointer",
    },
    {
      header: "User name",
      accessorKey: "userName",
      headclass: "cursor-pointer",
    },
    {
      header: "User ID",
      accessorKey: "userId",
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
      header: "Sub Division",
      accessorKey: "subDivisionName",
      headclass: "cursor-pointer",
      className: "text-center",
      cell: ({ row }) =>
        row.original.subDivisionName == "" ? "-" : row.original.subDivisionName,
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
                    /
                  </li>
                  <li className="text-gray-500 font-bold" aria-current="page">
                    User List
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
              onClick={() => exportToExcel(rowToArray(), table, "user_list")}
              // onClick={rowToArray}
            >
              XLSX
            </button>
            <button
              className="border px-4 h-full text-black rounded border-black"
              onClick={() => exportToCSV(table, "user_list")}
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
                <Table.HeadCell className="normal-case bg-cyan-400/90 transition-all theader-style whitespace-nowrap">
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
                        "whitespace-nowrap px-2 py-1"
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Table.Cell>
                  ))}

                  <Table.Cell className="flex items-center justify-center space-x-8 px-2 py-1">
                    <Link
                      to={"/dashboard/edit/" + row.original.userIndex}
                      state={"dept-userlist"}
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
      </div>
      <Pagination data={data} table={table} />
    </>
  );
};

export default UserList;
