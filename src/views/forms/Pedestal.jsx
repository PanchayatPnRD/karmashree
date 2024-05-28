import React, { useEffect, useState, useMemo, useRef } from "react";
import { Table } from "flowbite-react";
import { SortIcon } from "../../components/SortIcon";
import { devApi } from "../../WebApi/WebApi";
import { Icon } from "@iconify/react";
import axios from "axios";
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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addCreatePedestal } from "../../Service/Pedestal/PedestalService";
import { Loading } from "./Department";

export const Pedestal = () => {
  const [mutationId, setMutationId] = useState(null);
  const [department, setDepartment] = useState("");
  const [pedestal, setPedestal] = useState("");
  const { data: departmentList } = useQuery({
    queryKey: ["departmentList"],
    queryFn: async () => {
      const data = await axios.get(devApi + "/api/mastertable/DepartmentList");
      return data.data.result;
    },
  });

  // console.log(departmentList, "departmentList");

  const { data: pedestalList } = useQuery({
    queryKey: ["pedestalList"],
    queryFn: async () => {
      const data = await axios.get(devApi + "/api/mastertable/PedestalList");
      return data.data.result;
    },
  });

  const deptNameRef = useRef(null);
  const pedalstalRef = useRef(null);
  const queryClient = useQueryClient();

  const { mutate: add, isPending:addpending } = useMutation({
    mutationFn: (newTodo) => {
      return axios.post(devApi + "/api/mastertable/createPedestal", newTodo);
    },
    mutationKey: ["padesAdd"],
    onSuccess: () => {
      queryClient.invalidateQueries("pedestalList");
      deptNameRef.current.value = "";
      pedalstalRef.current.value = "";
    },
  });

  const { mutate: update, isPending:updatepending } = useMutation({
    mutationFn: (newTodo) => {
      return axios.post(devApi + "/api/mastertable/updatePedestal/"+mutationId, newTodo);
    },
    mutationKey: ["padesUpdate"],
    onSuccess: () => {
      queryClient.invalidateQueries("pedestalList");
      deptNameRef.current.value = "";
      pedalstalRef.current.value = "";
      setMutationId(null);
    },
  });

  const ListOptions = [5, 10, 15, "all"];
  const [items, setItems] = useState(ListOptions[0]);

  const data = useMemo(() => pedestalList ?? [], [pedestalList]);
  const jsonString = localStorage.getItem("karmashree_User");
  const dataUser = JSON.parse(jsonString);
  const list = [
    {
      header: "#",
      accessorKey: "departmentNo",
      className: "font-bold text-zinc-600 text-center cursor-pointer",
      cell: ({ row }) => row.index + 1,
      headclass: "cursor-pointer w-fit",
      // sortingFn: "id",
    },
    {
      header: "Department",
      accessorKey: "departmentName",
      headclass: "cursor-pointer",
    },
    {
      header: "Parastatals Name",
      accessorKey: "pedestalName",
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

    if (addpending || updatepending) {
      preventScroll();
    } else {
      allowScroll();
    }

    return () => {
      allowScroll();
    };
  }, [addpending, updatepending]);

  const onDepartment = (e) => {
    console.log(e.target.value, "dept");
    setDepartment(e.target.value);
  };

  const onPedestal = (e) => {
    setPedestal(e.target.value);
  };

  function performPost() {
    if (department === "") {
      toast.error("Please Select Department");
    } else if (pedestal === "") {
      toast.error("Please Type Parastatals name");
    } else {
      if (mutationId === null)
        mutate({
          departmentNo: department,
          departmentName: departmentList.find(
            (c) => c.departmentNo == department
          )?.departmentName,
          pedestalName: pedestal,
          userIndex: dataUser?.userIndex,
        });
      else
        update({
          departmentName: departmentList.find(
            (c) => c.departmentNo == deptNameRef.current.value
          )?.departmentName,
          pedestalName: pedestal,
        });
    }
  }

  

  return (
    <>
      <ToastContainer />
      {addpending || (updatepending && <Loading />)}
      <div className="overflow-hidden bg-white rounded-lg p-12 flex flex-col flex-grow">
        <div className="shadow-md">
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
                  <li className="text-gray-500 font-bold" aria-current="page">
                    Parastatals Master
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <br />
        </div>
        <div className="px-36 flex flex-col space-y-6 py-8">
          <div className="flex flex-col space-y-1">
            <label htmlFor="" className="capitalize text-black">
              department name
              <span className="text-red-500 "> * </span>
            </label>
            <select
              name=""
              id=""
              className="rounded-md border border-zinc-300"
              required={true}
              onChange={onDepartment}
              ref={deptNameRef}
            >
              <option value="">-Select Department-</option>
              {departmentList?.map((e) => (
                <option value={e.departmentNo}>{e.departmentName}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="capitalize text-black">
              Parastatals Name
              <span className="text-red-500 "> * </span>
            </label>
            <input
              required
              placeholder="Enter Parastatals name ..."
              type="text"
              ref={pedalstalRef}
              HeadData
              className="mt-1 p-2 px-4 block w-full border border-gray-300 rounded-md capitalize"
              onChange={onPedestal}
            />
          </div>
          <div className="flex space-x-4 justify-center items-center">
            <button
              type="button"
              className={classNames(
                "w-1/3 py-2 px-4 border border-transparent rounded-md shadow-sm text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all",
                mutationId
                  ? "bg-green-400 hover:bg-green-500"
                  : "bg-indigo-600 hover:bg-indigo-700"
              )}
              onClick={performPost}
            >
              {!mutationId ? "Submit" : "Update"}
            </button>
            {mutationId && (
              <button
                onClick={() => {
                  setMutationId(null);
                  designation.current.value = "";
                  designationTier.current.value = "";
                }}
                className="w-1/8 py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                reset
              </button>
            )}
          </div>
        </div>
        <div className=" flex justify-between px-12 items-center h-12">
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
        <div className="px-12 flex flex-col space-y-6 pb-8">
          <Table>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Head key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.HeadCell
                    key={header.id}
                    className={classNames(
                      header.column.columnDef.headclass,
                      "bg-cyan-400/90 btn-blue transition-all"
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
                <Table.HeadCell className="normal-case bg-cyan-400/90 btn-blue">
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
                        deptNameRef.current.value = row.original.departmentNo;
                        pedalstalRef.current.value = row.original.pedestalName;
                        setDepartment(deptNameRef.current.value);
                        setPedestal(pedalstalRef.current.value);
                        setMutationId(row.original.id);
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
