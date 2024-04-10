import { Table, Pagination } from "flowbite-react";
import { useState } from "react";
import { Icon } from "@iconify/react";

export const DataTable = ({Headdata,Data}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page) => setCurrentPage(page);

  return (
    <div>
      <Table>
        <Table.Head>
          {Headdata.map((e) => (
            <Table.HeadCell className="capitalize">{ e}</Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          {Data.map(({ tier, desg }, index) => {
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
      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination
          layout="table"
          currentPage={currentPage}
          totalPages={Data.length}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};
