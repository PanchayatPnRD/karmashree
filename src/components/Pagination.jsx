export const Pagination = ({ table, data }) => {
  const { pageIndex, pageSize } = table.getState().pagination;

  const startIndex = pageIndex * pageSize + 1;
  const endIndex = Math.min((pageIndex + 1) * pageSize, data?.length);

  return (
    <>
      <div className="flex overflow-x-auto justify-center">
        <nav className="">
          <div className="text-sm text-gray-700 dark:text-gray-400 flex space-x-1">
            <span>Showing</span>

            <span className="font-semibold text-gray-900 dark:text-white">
              {startIndex}
            </span>

            <span>to</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {endIndex}
            </span>
            <span>of</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {data?.length}
            </span>
            <span>Entries</span>
          </div>
          <ul className="xs:mt-0 mt-2 inline-flex items-center -space-x-px">
            <li>
              <button
                type="button"
                className="disabled:cursor-not-allowed disabled:text-opacity-40 rounded-l-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </button>
            </li>
            <li>
              <button
                type="button"
                className="disabled:cursor-not-allowed disabled:text-opacity-40 rounded-r-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
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
