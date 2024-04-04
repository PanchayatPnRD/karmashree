import React, { useEffect, useRef, useState } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import VVIPL from '../../assets/images/logo/VVIPL.svg'
import SidebarLinkGroup from './sidebar/SidebarLinkGroup';

import { FiUser, FiLogOut } from 'react-icons/fi';
import { PiGearLight } from 'react-icons/pi'
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { BsPencil } from 'react-icons/bs';
import { LuLayoutDashboard } from 'react-icons/lu';
import { GiWaterDrop } from 'react-icons/gi';
import { AiOutlineDown } from 'react-icons/ai';
import { API_LINK, APP_LINK } from '../../config';
import { useUserAction } from '../../rdxsga/hooks/actions/user/useUserActionHook';





const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {




  const location = useLocation();
  const userAction = useUserAction();

  const { pathname } = location;

  const [hospitalName, setHospitalName] = useState("");

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });


  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);


  const handleLogout = () => {
    userAction.doLogoutUser();
  };

  useEffect(() => {
    console.log("path", pathname);
  }, [pathname])





  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-center gap-0 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
          <img src={VVIPL} alt="Logo" className='h-20' />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >

        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-0 px-4 lg:mt-0 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 text-center text-lg font-semibold text-bodydark2">
              {hospitalName}
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}
              <li>
                <Link to={APP_LINK.DASHBOARD}
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4  && 'bg-graydark dark:bg-meta-4'}`}
                >
                  <div>
                    <LuLayoutDashboard />
                  </div>
                  Dashboard
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link to={APP_URLS.ADMIN.PS_REGISTRATION} className={props.className} >
                  <img src={ownerListIcon} alt="" /> <b>Register New PS </b>&nbsp;&nbsp;
                </Link>
              
              </li> */}

              {/* <li className="nav-item">
                <Link onClick={doLogout} to={'/login'} className={props.className}>
                  <img src={logOutIcon} alt="" /> <b>LOGOUT</b>
                </Link>
              </li> */}
              {/* <!-- Menu Item Dashboard --> */}

              {/* <!-- Menu Item Device --> */}
              {/*<li>
                <NavLink
                  to="/addDevice"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('addDevice') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <div>
                    <GiWaterDrop />
                  </div>
                  Add Device
                </NavLink>
                </li>*/}
              {/* <!-- Menu Item Device --> */}

              {/* <!-- Menu Item Device --> */}
              <li>
                <Link to={APP_LINK.DATA_ENTRY.HAND_OVER}
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('Handover') && 'bg-graydark dark:bg-meta-4'
                    }`}
                >
                  <div>
                    <GiWaterDrop />
                  </div>
                  Handover
                </Link>
              </li>
              <li>
                <Link to={APP_LINK.DATA_ENTRY.BAG_PURCHASE}
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4  && 'bg-graydark dark:bg-meta-4`}
                >
                  <div>
                    <BsPencil size={15} />
                  </div>
                  Bag Purchase
                </Link>
              </li>
              <li>
                <Link
                  to={APP_LINK.DATA_ENTRY.ADD_MEETING}
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4  ${pathname === APP_LINK.DATA_ENTRY.ADD_MEETING && 'bg-graydark dark:bg-meta-4'}`}
                >
                  <div>
                    <BsPencil size={15} />
                  </div>
                  Meeting
                </Link>
              </li>
              <li>
                <Link
                  to={APP_LINK.DATA_ENTRY.ADD_ACCIDENT}
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4  ${pathname === APP_LINK.DATA_ENTRY.ADD_ACCIDENT && 'bg-graydark dark:bg-meta-4'}`}
                >
                  <div>
                    <BsPencil size={15} />
                  </div>
                  Accident
                </Link>
              </li>
              <li>
                <Link
                  to={APP_LINK.DATA_ENTRY.ADD_TRAINING}
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4  ${pathname === APP_LINK.DATA_ENTRY.ADD_TRAINING && 'bg-graydark dark:bg-meta-4'}`}
                >
                  <div>
                    <BsPencil size={15} />
                  </div>
                  Training
                </Link>
              </li>
              <li>
                <Link
                  to={APP_LINK.DATA_ENTRY.ADD_VACCINE}
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4  ${pathname === APP_LINK.DATA_ENTRY.ADD_VACCINE && 'bg-graydark dark:bg-meta-4'}`}
                >
                  <div>
                    <BsPencil size={15} />
                  </div>
                  Vaccine
                </Link>
              </li>
              {/* <!-- Menu Item Device --> */}

              {/* <!-- Menu Item Forms --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === '/dataentry' || pathname.includes('data entry')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      {/* <Link
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === '/dataentry' ||
                          pathname.includes('data entry')) &&
                          'bg-graydark dark:bg-meta-4'
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <BsPencil size={20} />
                        Data Entry
                        <span
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current duration-300 ${open && 'rotate-180'
                            }`}
                        ><AiOutlineDown />
                        </span>
                      </Link> */}
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${!open && 'hidden'
                          }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          {/* <li>
                            <Link
                              to={""}
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Generation Entry
                            </Link>
                          </li> */}
                          {/* <li>
                            <Link
                              to={""}
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Download QR Code Sticker
                            </Link>
                          </li> */}

                          {/* <li>
                            <Link
                              to={""}
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Accident Input
                            </Link>
                          </li> */}
                          {/*<li>
                            <NavLink
                              to="/dataentry/training"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Training
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/dataentry/meetings"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Meetings
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/forms/form-layout"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Payement
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/forms/form-layout"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Complaint
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/forms/form-layout"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Staff change
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/forms/form-layout"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Immunisation & Health Checkup
                            </NavLink>
                          </li>*/}
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Forms --> */}

              {/* <!-- Menu Item Forms --> */}
              <SidebarLinkGroup
                activeCondition={
                  [
                    APP_LINK.REPORTS.HAND_OVER_REPORT,
                    APP_LINK.REPORTS.PURCHASE_LIST,
                    APP_LINK.REPORTS.ANNUAL_REPORT

                  ].includes(pathname)
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === '/forms' ||
                          pathname.includes('forms')) &&
                          'bg-graydark dark:bg-meta-4'
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <HiOutlineDocumentReport size={20} />
                        Reports
                        <span
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current duration-300 ${open && 'rotate-180'}`}
                        ><AiOutlineDown />
                        </span>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${!open && 'hidden'
                          }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">

                          <li>
                            <Link
                              to={APP_LINK.REPORTS.HAND_OVER_REPORT}

                              className={`group relative flex  rounded-md duration-300 ease-in-out   p-2 text-lg ${pathname === APP_LINK.REPORTS.HAND_OVER_REPORT && "bg-[#57C2DA] text-[#000]"} font-medium`}

                            >
                              Handover Report
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={APP_LINK.REPORTS.ANNUAL_REPORT}
                              className={`group relative flex  rounded-md duration-300 ease-in-out   p-2 text-lg ${pathname === APP_LINK.REPORTS.ANNUAL_REPORT && "bg-[#57C2DA] text-[#000]"} font-medium`}

                            >
                              Annual Report
                            </Link>
                          </li>


                          {/* not needed */}
                          {/* <li>
                            <Link
                              to={APP_LINK.REPORTS.PURCHASE_LIST}
                             
                                 className={`group relative flex  rounded-md duration-300 ease-in-out   p-2 text-lg ${pathname === APP_LINK.REPORTS.PURCHASE_LIST && "bg-[#57C2DA] text-[#000]"} font-medium`}
                            
                            >
                              Purchase List
                            </Link>
                          </li> */}
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Forms --> */}

              {/* <!-- Menu Item Profile --> */}
              {/*<li>
                <NavLink
                  to="/profile"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('profile') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <div>
                    <FiUser />
                  </div>
                  Profile
                </NavLink>
                </li>*/}
              {/* <!-- Menu Item Profile --> */}


              {/* <!-- Menu Item Tables --> */}
              {/*<li>
                <NavLink
                  to="/tables"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('tables') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_130_9756)">
                      <path
                        d="M15.7501 0.55835H2.2501C1.29385 0.55835 0.506348 1.34585 0.506348 2.3021V15.8021C0.506348 16.7584 1.29385 17.574 2.27822 17.574H15.7782C16.7345 17.574 17.5501 16.7865 17.5501 15.8021V2.3021C17.522 1.34585 16.7063 0.55835 15.7501 0.55835ZM6.69385 10.599V6.4646H11.3063V10.5709H6.69385V10.599ZM11.3063 11.8646V16.3083H6.69385V11.8646H11.3063ZM1.77197 6.4646H5.45635V10.5709H1.77197V6.4646ZM12.572 6.4646H16.2563V10.5709H12.572V6.4646ZM2.2501 1.82397H15.7501C16.0313 1.82397 16.2563 2.04897 16.2563 2.33022V5.2271H1.77197V2.3021C1.77197 2.02085 1.96885 1.82397 2.2501 1.82397ZM1.77197 15.8021V11.8646H5.45635V16.3083H2.2501C1.96885 16.3083 1.77197 16.0834 1.77197 15.8021ZM15.7501 16.3083H12.572V11.8646H16.2563V15.8021C16.2563 16.0834 16.0313 16.3083 15.7501 16.3083Z"
                        fill=""
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_130_9756">
                        <rect
                          width="18"
                          height="18"
                          fill="white"
                          transform="translate(0 0.052124)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  Tables
                </NavLink>
                </li>*/}
              {/* <!-- Menu Item Tables --> */}

              {/* <!-- Menu Item Settings --> */}
              {/*
              <li>
                <NavLink
                  to="/settings"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('settings') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <PiGearLight  size={20}/>
                  Settings
                </NavLink>
              </li>
                */}
              {/* <!-- Menu Item Settings --> */}

              {/* <!-- Menu Item Settings --> */}
              <li>
                <Link
                  to="/"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('Log Out') &&
                    'bg-graydark dark:bg-meta-4'
                    }`}
                  onClick={handleLogout}
                >
                  <FiLogOut size={20} />
                  Log Out
                </Link>
              </li>
              {/* <!-- Menu Item Settings --> */}
            </ul>
          </div>


        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
