import { useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllUserList } from "../../Service/NewUserService/";

const UserList = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [allUserList, setAllUserList] = useState([]);
  const data = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
    { id: 3, name: 'Jane Doe' },
    { id: 4, name: 'Jane Doe' },
    { id: 2, name: 'Jane Doe' },
    { id: 2, name: 'Jane Doe' },
    { id: 2, name: 'Jane Doe4' },
    { id: 2, name: 'Jane Doer' },
    { id: 2, name: 'Jane Doey' },
    { id: 2, name: 'Jane Doey' },
    { id: 2, name: 'Jane Doett' },
    { id: 2, name: 'Jane Doett' },
    { id: 2, name: 'Jane Doerr' },
    { id: 2, name: 'Jane Doeee' },
    { id: 2, name: 'Jane Doeww' },
    { id: 2, name: 'Jane Doess' },
    // Add more data as needed
  ];


  useEffect(() => {

    getAllUserList(1).then(function (result) {
      const response = result?.data?.result;
      setAllUserList(response?.data);
    });
  }, []);

  console.log(allUserList,"allUserList")

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1) {
      setCurrentPage(totalPages);
    } else if (pageNumber > totalPages) {
      setCurrentPage(1);
    } else {
      setCurrentPage(pageNumber);
    }
  };

  const itemsPerPage = 5;
  const totalItems = 20;

  // const totalPages = Math.ceil(data.length / itemsPerPage);

  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  const paginatedData = allUserList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      onPageChange(pageNumber);
    }
  };

  const goToPreviousPage = () => {
    goToPage(currentPage - 1);
  };

  const goToNextPage = () => {
    goToPage(currentPage + 1);
  };
  return (


    //     <div className="flex-grow">
    //       <ToastContainer />
    //       <div className="mx-auto mt-2">
    //         <div className="bg-white rounded-lg p-12">
    //           <div className="shadow-md" style={{ marginBottom: '-1rem' }}>
    //             <div className="flex justify-between items-center">
    //               <div className="flex items-center space-x-4">
    //                 <nav aria-label="Breadcrumb">
    //                   <ol className="flex items-center space-x-4 px-4 py-2">
    //                   <svg
    //     viewBox="0 0 1024 1024"
    //     fill="currentColor"
    //     height="1em"
    //     width="1em"

    //   >
    //     <path d="M946.5 505L534.6 93.4a31.93 31.93 0 00-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3 0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8 24.9-25 24.9-65.5-.1-90.5z" />
    //   </svg>
    //                     <li>
    //                       <a href="#" className="text-indigo-600 hover:text-indigo-800">Home</a>/
    //                     </li>
    //                     <li className="text-gray-500 font-bold" aria-current="page">User List</li>
    //                   </ol>
    //                 </nav>
    //               </div>
    //             </div>
    //             <br />
    //           </div>
    // <br></br>
    //           {/* User List Table */}
    //           <div className="mt-4">
    //             <h2 className="text-lg font-bold mb-2">User List</h2>
    //             <table className="w-full">
    //               <thead>
    //                 <tr className="bg-gray-200">
    //                   <th className="px-4 py-2">ID</th>
    //                   <th className="px-4 py-2">Name</th>
    //                   <th className="px-4 py-2">Username</th>
    //                   <th className="px-4 py-2">Email</th>
    //                   <th className="px-4 py-2">Phone</th>
    //                 </tr>
    //               </thead>
    //               <tbody>
    //                <td>1</td> 
    //                <td>sibam</td> {/* You can dynamically render rows here based on data from the API */}
    //                <td>kaka</td> {/* You can dynamically render rows here based on data from the API */}
    //                <td>sibam@97</td> {/* You can dynamically render rows here based on data from the API */}
    //                <td>kaka</td> {/* You can dynamically render rows here based on data from the API */}
    //                {/* You can dynamically render rows here based on data from the API */}
    //               </tbody>
    //             </table>
    //           </div>

    //           {/* Pagination */}
    //           <div className="flex justify-center mt-4">
    //             <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l">
    //               Prev
    //             </button>
    //             <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">
    //               1
    //             </button>
    //             <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">
    //               2
    //             </button>
    //             <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">
    //               3
    //             </button>
    //             <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r">
    //               Next
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    <>
      <div className="container mx-auto">
        <div className='min-h-screen h-full m-10'>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">User type</th>
                <th className="px-4 py-2">User name</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">User address</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item) => (
                <tr key={item.id}>
                  <td className="border px-4 py-2">{item.userType}</td>
                  <td className="border px-4 py-2">{item.userId}</td>
                  <td className="border px-4 py-2">{item.category}</td>
                  <td className="border px-4 py-2">{item.UserAddress}</td>
                </tr>
              ))}
            </tbody>
          </table><br></br>
          {/* <div className="flex justify-center mt-4">
          <ul className="flex">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <button
                  className={`mx-1 px-3 py-1 rounded ${
                    currentPage === index + 1
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200'
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div> */}
          <div className="flex justify-center">
            <button
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-l"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>&nbsp;
            <button
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-r"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};



export default UserList