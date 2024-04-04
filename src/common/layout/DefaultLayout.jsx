import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
//import useAuthentication from '../hooks/useAuthentication';
import Header from './Header'
import Sidebar from './Sidebar'
import { globalLoaderState } from '../../rdxsga/redux/slices/globalSlice';
import { useSelector } from 'react-redux';
import Loader from '../Loader';

const DefaultLayout = (props) => {

  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const globalLoader = useSelector(globalLoaderState)

  useEffect(() => {
    // authentication.checkToken();
  }, [location])
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {props.children}
            </div>
            {
              globalLoader && <div className='w-full backdrop-blur text-white h-screen flex justify-center items-center z-99 bg-[#0001] absolute top-0 right-0 left-0'>
                <Loader />
              </div>
            }
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default DefaultLayout;
