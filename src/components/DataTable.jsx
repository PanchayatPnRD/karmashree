import { Table, Pagination } from "flowbite-react";
import { useState } from "react";
import { Icon } from "@iconify/react";
import UserList from "../views/forms/UserList";

export const DataTable = ({ Headdata, Data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page) => setCurrentPage(page);

  return (
    <div>
      <Table>
        <Table.Head>
          {Headdata.map((e) => (
            <Table.HeadCell className="capitalize">{e}</Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          {Data?.map(({ tier, desg }, index) => {
            return (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </Table.Cell>
                <Table.Cell className=" className">{tier}</Table.Cell>
                <Table.Cell>{desg}</Table.Cell>

                <Table.Cell className="flex space-x-8">
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline text-2xl"
                  >
                    <Icon icon={"mingcute:edit-line"} />
                  </a>
                </Table.Cell>
                <Table.Cell>
                  <a
                    href="#"
                    className="font-medium text-red-600 hover:underline text-2xl"
                  >
                    <Icon icon={"ic:round-delete"} />
                  </a>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <div className="flex overflow-x-auto sm:justify-center"></div>
    </div>
  );
};

export const TablePagination = ({
  data,
  setCurrentPage,
  startIndex,
  endIndex,
}) => {
  return (
    <>
      <div className="flex overflow-x-auto sm:justify-center">
        <nav className="">
          <div className="text-sm text-gray-700 dark:text-gray-400">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {startIndex + 1}
            </span>{" "}
            to&nbsp;
            <span className="font-semibold text-gray-900 dark:text-white">
              {endIndex >= data?.length ? data?.length : endIndex}
            </span>{" "}
            of&nbsp;
            <span className="font-semibold text-gray-900 dark:text-white">
              {data?.length}
            </span>{" "}
            Entries
          </div>
          <ul className="xs:mt-0 mt-2 inline-flex items-center -space-x-px">
            <li>
              <button
                type="button"
                className="disabled:cursor-not-allowed disabled:text-opacity-40 rounded-l-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white"
                onClick={() => setCurrentPage((e) => e - 1)}
                disabled={startIndex == 0 ? true : false}
              >
                Previous
              </button>
            </li>
            <li>
              <button
                type="button"
                className="disabled:cursor-not-allowed disabled:text-opacity-40 rounded-r-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white"
                onClick={() => setCurrentPage((e) => e + 1)}
                disabled={endIndex >= data?.length ? true : false}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
