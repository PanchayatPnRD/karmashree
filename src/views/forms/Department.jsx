import React, { useEffect, useState, useMemo, useRef } from "react";
import { Table } from "flowbite-react";
import { SortIcon } from "../../components/SortIcon";
import { devApi } from "../../WebApi/WebApi";
import { Icon } from "@iconify/react";
import { fetch } from "../../functions/Fetchfunctions";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ToastContainer, toast } from "react-toastify";
import { Pagination } from "../../components/Pagination";
import classNames from "classnames";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import BreadCrumb from "../../components/BreadCrumb";

const Department = () => {
  const [mutationId, setMutationId] = useState(null);

  const { data: departmentList } = useQuery({
    queryKey: ["departmentList"],
    queryFn: async () => {
      const data = await fetch.get("/api/mastertable/DepartmentList");
      // console.log(Array.isArray(data.data.result));
      return data.data.result;
    },
  });

  const deptNameRef = useRef(null);
  const shortFormRef = useRef(null);
  const queryClient = useQueryClient();

  const { mutate: add, isPending: addPending } = useMutation({
    mutationFn: (newTodo) => {
      return fetch.post(newTodo, "/api/mastertable/createDepartment");
    },
    onSuccess: () => {
      queryClient.invalidateQueries("designationList");
      deptNameRef.current.value = "";
      shortFormRef.current.value = "";
    },
    mutationKey: ["addDepartment"],
  });

  const { mutate: update, isPending: updatePending } = useMutation({
    mutationFn: (newTodo) => {
      return fetch.post(
        newTodo,
        "/api/mastertable/UpdateDepartment/" + mutationId
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries("departmentList");
      deptNameRef.current.value = "";
      shortFormRef.current.value = "";
      setMutationId(null);
    },
    mutationKey: ["updateDepartment"],
  });

  function perfromMutation() {
    if (deptNameRef.current.value === "") {
      toast.error("Please Select Department");
    } else if (shortFormRef.current.value === "") {
      toast.error("Please Type Pedestal name");
    } else {
      if (mutationId === null)
        add({
          departmentName: deptNameRef.current.value,
          labourConverge: "Y",
          deptshort: shortFormRef.current.value,
          organization: "S",
        });
      else
        update({
          departmentName: deptNameRef.current.value,
          deptshort: shortFormRef.current.value,
        });
    }
  }

  const ListOptions = [5, 10, 15, "all"];
  const [items, setItems] = useState(ListOptions[0]);

  const data = useMemo(() => {
    const sortedList = [...(departmentList ?? [])];
    sortedList.sort((a, b) => b.departmentNo - a.departmentNo);
    return sortedList;
  }, [departmentList]);

  const list = [
    {
      header: "#",
      accessorKey: "departmentNo",
      className: "font-bold text-zinc-600 text-center cursor-pointer w-12",
      cell: ({ row }) => row.index + 1,
      headclass: "cursor-pointer w-32",
      // sortingFn: "id",
    },
    {
      header: "Department",
      accessorKey: "departmentName",
      headclass: "cursor-pointer",
    },
    {
      header: "Department Short name",
      accessorKey: "deptshort",
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

  useEffect(() => {
    const preventScroll = () => {
      document.body.style.overflow = "hidden";
    };

    const allowScroll = () => {
      document.body.style.overflow = "auto";
    };

    if (addPending || updatePending) {
      preventScroll();
    } else {
      allowScroll();
    }

    return () => {
      allowScroll();
    };
  }, [addPending, updatePending]);

  return (
    <>
      <ToastContainer />
      {(addPending || updatePending) && <Loading />}
      <BreadCrumb page={"Department Master"} className="px-12"/>
      <div className="overflow-hidden bg-white rounded-lg p-12 pt-0 flex flex-col flex-grow">
        
        <div className="px-36 flex flex-col space-y-6 py-4 pt-1">
          <div>
            <label htmlFor="" className="capitalize text-black">
              department name
              <span className="text-red-500 "> * </span>
            </label>
            <input
              required
              placeholder="Enter Department Name  ..."
              type="text"
              ref={deptNameRef}
              HeadData
              className="mt-1 p-2 px-4 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="capitalize text-black">
              Short form
              <span className="text-red-500 "> * </span>
            </label>
            <input
              required
              placeholder="Enter Short Form ..."
              type="text"
              ref={shortFormRef}
              HeadData
              className="mt-1 p-2 px-4 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-center items-center space-x-4">
            <button
              type="button"
              className={classNames(
                "w-1/3 py-2 px-4 border border-transparent rounded-md shadow-sm text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all",
                mutationId
                  ? "bg-green-400 hover:bg-green-500"
                  : "bg-indigo-600 hover:bg-indigo-700"
              )}
              onClick={perfromMutation}
            >
              {!mutationId ? "Submit" : "Update"}
            </button>
            {mutationId && (
              <button
                onClick={() => {
                  setMutationId(null);
                  shortFormRef.current.value = "";
                  deptNameRef.current.value = "";
                }}
                className="w-1/8 py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                reset
              </button>
            )}
          </div>
        </div>
        <div className=" flex justify-between px-0 items-center h-12">
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
        <div className="px-0 flex flex-col space-y-6 pb-8">
          <Table className="drop-shadow-none shadow-md rounded-lg">
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Head key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.HeadCell
                    key={header.id}
                    className={classNames(
                      header.column.columnDef.headclass,
                      "bg-cyan-400/90 theader-style transition-all"
                    )}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center justify-between">
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

                  <Table.Cell className="flex items-center justify-center space-x-8">
                    <button
                      onClick={() => {
                        deptNameRef.current.value = row.original.departmentName;
                        shortFormRef.current.value = row.original.deptshort;
                        setMutationId(row.original.departmentNo);
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }}
                    >
                      <Icon
                        icon={"mingcute:edit-line"}
                        className="font-medium text-cyan-600 hover:underline text-2xl cursor-pointer"
                      />
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          {data.length < 1 && (
            <div className="text-md font-semibold opacity-40 text-center">
              No data available
            </div>
          )}
          <Pagination data={data} table={table} />
        </div>
      </div>
    </>
  );
};

export default Department;

export const Loading = () => {
  return (
    <div className="flex overflow-hidden flex-grow backdrop-blur-sm bg-transparent absolute w-4/5 h-remaining z-20 justify-center items-center text-6xl text-blue-600">
      <Icon icon={"svg-spinners:ring-resize"} />
    </div>
  );
};
