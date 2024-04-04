
import Breadcrumb from '../../../components/Breadcrumb';
import { Pagination } from "@mui/material";
import {
  Button, Input, Option, Select,
} from "@material-tailwind/react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ExportAsExcel from '../../../common/excel';
import { APP_LINK, COLOR_THEME, DEFAULT_PAGINATION, colorMapping, getArrayValueSum, getColorNameByCode } from '../../../config';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


import { toast } from 'react-toastify';



import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import Approvedpurchase from './ApprovedPurchaseList';
import { hcfSelector } from '../../../rdxsga/redux/slices/hcfSlice';
import { useBagPurchaseApi } from '../../../rdxsga/hooks/actions/bagPurchase/bagPurchaseApiHook';
import { purchaseListSelector } from '../../../rdxsga/redux/slices/bagPurchaseSlice';
import { userDetailsSelector } from '../../../rdxsga/redux/slices/userSlice';
import moment from 'moment';
import EditPurchaseModal from '../../../components/modals/EditPurchaseModal';





const Purchaselist = () => {
  const bagPurchaseApi = useBagPurchaseApi();
  const { user: { id: hospitalId } } = useSelector(userDetailsSelector)

  const darkMode = localStorage.getItem(COLOR_THEME) === 'dark'
  const { firstList } = useSelector(purchaseListSelector);

  const [editModal, setEditModal] = useState(null);

  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGINATION.PAGE_NUMBER);
  const [perPage, setPerPage] = useState(DEFAULT_PAGINATION.PER_PAGE_DATA);

  const [fromDate, setFromDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [showUpdate, setShowUpdate] = useState(null)
  const [fetchSecondList, setFetchSecondList] = useState("")


  const updateStatus = () => {
    if (showUpdate) {
      bagPurchaseApi.callUpdateBagReceived({ batch: showUpdate?.purchaseRepository_batchno }, (message, resp) => {
        toast.success(message)
        setShowUpdate(null)
        fetchFirstList();
        setFetchSecondList(new Date())
      }, (message, resp) => {
        toast.error(message)
      })
    }
  }


  const fetchFirstList = () => {
    bagPurchaseApi.callFetchFirstList({
      page: currentPage,
      limit: perPage,
      sortBy: DEFAULT_PAGINATION.SORT_BY,
      sortOrder: DEFAULT_PAGINATION.SORT_ORDER.ASCENDING,
      hospitalId,
      status,
      fromDate,
      endDate
    }, (message, resp) => {
      // console.log(message, resp)
    }, (message, resp) => {
      // console.log(message, resp)
      toast.error(message);
    })
  }

  useEffect(() => {
    fetchFirstList()
  }, [status, fromDate, endDate]);


  return (
    <>

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-between items-center">
          <h5 className="mb-5 text-2xl font-bold text-black dark:text-white sm:text-title-lg-2">
            Purchase List
          </h5>
          <ExportAsExcel
            getSheetData={() => {
              const sheetData = [];

              // Check if there is data
              if (firstList?.data && firstList.data.length > 0) {
                // Add column names as the first row
                sheetData.push({
                  'Sl. No.': '',
                  'Bag Color': '',
                  'Qty.': '',
                  'HFC': '',
                  'Requested Date': ''
                });

                // Add an empty row to separate column names from data
                sheetData.push({});

                // Add data rows
                firstList.data.forEach((item, i) => {
                  sheetData.push({
                    'Sl. No.': ((currentPage - 1) * perPage) + i + 1,
                    'Bag Color': item['hospital_id'],
                    'Qty.': item['route_name_id'],
                    'HFC': '',
                    'Requested Date': ''
                  });
                });
              } else {
                // If there is no data, add a message row
                sheetData.push({
                  'Sl. No.': 'No data available',
                  'Bag Color': 'No data available',
                  'Qty.': 'No data available',
                  'HFC': 'No data available',
                  'Requested Date': 'No data available'
                });
              }
              return sheetData;
            }}
            sheetName="Purchase Request"
            fileName="Purchase_Request_Report.xlsx"
            heading="Purchase Request Report"
          />
        </div>



        <div className='w-full flex justify-evenly items-center my-10 p-10'>

          <Select
            placeholder="Select"
            label='Status'
            color="blue"
            onChange={e => setStatus(e)}>
            <Option value=''>All</Option>
            <Option value='approve'>Not Approved</Option>
            <Option value='recived'>Approved</Option>
          </Select>
          <div className='mx-4'></div>
          <Input
            type='date'
            label='Start Date'
            onChange={e => setFromDate(e.target.value)}
          />
          <div className='mx-4'></div>
          <Input
            type='date'
            setShowEditlabel='End Date'
            onChange={e => setEndDate(e.target.value)}
          />
          <div className='mx-4'></div>
          <Button
            color='blue'
            className='text-sm w-1/4 mx-4'>
            Search
          </Button>
        </div>

        <div className={`flex flex-row items-center`}>
          {
            <div className="w-full overflow-x-hidden ">
              <div className="max-h-[70vh] overflow-y-auto"> {/* Set a fixed height and make it scrollable */}
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-blue-50 text-left dark:bg-meta-4 ">
                      {["Sl. No.", "Bag Colour", "Qty.", "Req. Date", "Appv. Date", "Status", "Actions"].map((el) => (
                        <th
                          key={el}
                          className="py-5 px-1 font-medium text-black dark:text-white xl:pl-11 md:w-[200px]">
                          {el}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {firstList?.data?.map((item, key) => {
                      const className = `flex justify-start items-center gap-3 ml-5 p-2.5 xl:p-5 font-bold`;
                      return (
                        <tr key={key}>
                          <td>
                            <div className={`${className} w-[100px]`}>
                              {((currentPage - 1) * perPage) + key + 1}
                            </div>
                          </td>
                          <td>
                            <div className={`${className} w-[400px]`}>
                              {item?.all_color_ids?.map((d, i) =>
                                <span
                                  className='px-2 py-1 border rounded text-black'
                                  style={{ backgroundColor: colorMapping[d] || "gray" }}>
                                  {getColorNameByCode(d)}
                                </span>)}
                            </div>
                          </td>
                          <td>
                            <div className={`${className}`}>
                              {getArrayValueSum(item?.all_bag_qty)}
                            </div>
                          </td>
                          <td>
                            <div className={`${className} w-[150px]`}>
                              {item?.all_created_dates ? moment(item?.all_created_dates).format("DD-MMM-YYYY") : "NA"}
                            </div>
                          </td>
                          <td>
                            <div className={`${className} w-[150px]`}>
                              {item?.approve_dates ? moment(item?.approve_dates).format("DD-MMM-YYYY") : "NA"}
                            </div>
                          </td>
                          <td>
                            <div className={className}>
                              <span className={`w-[170px] text-center px-3 py-1 rounded ${item?.all_reqavailable_status == 1 ? "bg-warning" : item?.all_statuses == 0 ? "bg-danger" : "bg-success"} text-white`}>
                                {item?.all_reqavailable_status == 1 ? "Partially Approved" : item?.all_statuses == 0 ? "Not Approved" : "Approved"}</span>
                            </div>
                          </td>
                          <td>
                            <div className={className}>
                              <Button
                                disabled={item?.all_reqavailable_status == "null" && item?.all_statuses == 0}
                                onClick={() => setShowUpdate(item)}
                                className='bg-success px-3 py-2'>
                                <FaEdit size={16} />
                              </Button>
                            </div>
                          </td>

                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <Pagination
                className='float-end'
                color="primary"
                count={Math.ceil(firstList?.pagination?.total / perPage)}
                page={currentPage}
                onChange={(event, page) => setCurrentPage(page)}
              />
            </div>
          }
        </div>

      </div >
      <div className="my-8" />
      <Approvedpurchase fetchSecondList={fetchSecondList} />
      <EditPurchaseModal open={showUpdate !== null} cancelAction={() => setShowUpdate(null)} confirmAction={updateStatus} data={showUpdate} />

    </>
  );
};

export default Purchaselist;
