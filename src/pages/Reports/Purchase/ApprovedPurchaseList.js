import {
  Button, Input, Option, Select,
} from "@material-tailwind/react";
import ExportAsExcel from '../../../common/excel';
import { COLOR_THEME, DEFAULT_PAGINATION, colorMapping, getArrayValueSum, getColorNameByCode, } from '../../../config';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


import { toast } from 'react-toastify';
import { purchaseListSelector } from '../../../rdxsga/redux/slices/bagPurchaseSlice';
import { userDetailsSelector } from '../../../rdxsga/redux/slices/userSlice';
import { useBagPurchaseApi } from "../../../rdxsga/hooks/actions/bagPurchase/bagPurchaseApiHook";
import { Pagination } from "@mui/material";
import { FaEye } from "react-icons/fa";
import moment from "moment";
import ShowColorDetails from "../../../components/modals/purchaseRequestModalComp/ShowColorDetails";





const Approvedpurchase = ({ fetchSecondList }) => {
  const bagPurchaseApi = useBagPurchaseApi()
  const { secondList: acceptedList } = useSelector(purchaseListSelector);
  const { user: { id: hospitalId } } = useSelector(userDetailsSelector);

  const darkMode = localStorage.getItem(COLOR_THEME) === 'dark'

  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGINATION.PAGE_NUMBER);
  const [perPage, setPerPage] = useState(DEFAULT_PAGINATION.PER_PAGE_DATA);

  const [fromDate, setFromDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [keyword, setKeyword] = useState("");

  const [showColor, setShowColor] = useState(null);



  // const getAcceptedPurchaseList = (a = "", startDate = "", endDate = "") => {
  //  acceptedBagPurchaseApi.getAcceptedBagPurchaseList({
  //     page: currentPage,
  //     limit: perPage,
  //     sortBy: DEFAULT_PAGINATION.SORT_BY,
  //     sortOrder: DEFAULT_PAGINATION.SORT_ORDER.ASCENDING,
  //     startDate,
  //     endDate
  //   }, (message, resp) => {
  //     //toast.info(message)
  //   }, (message, resp) => {
  //     toast.error(message ?? "please try again")
  //   })
  // }

  // //console.log(hospital);
  // useEffect(() => {
  //   getAcceptedPurchaseList();
  // }, [currentPage])


  useEffect(() => {
    bagPurchaseApi.callFetchSecondList({
      page: currentPage,
      limit: perPage,
      sortBy: DEFAULT_PAGINATION.SORT_BY,
      sortOrder: DEFAULT_PAGINATION.SORT_ORDER.ASCENDING,
      hospitalId,
      keyword,
      fromDate,
      endDate
    }, (message, resp) => {
      // console.log(message, resp)
    }, (message, resp) => {
      // console.log(message, resp)
      toast.error(message);
    })
  }, [keyword, fromDate, endDate, fetchSecondList]);




  return (
    <>

      <div className="rounded-sm border border-stroke bg-white px-10 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex justify-between items-center">
          <h5 className="text-2xl font-bold text-black dark:text-white sm:text-title-lg-2">
            Bag Request Approved
          </h5>
          <ExportAsExcel
            getSheetData={() => {
              const sheetData = [];

              // Check if there is data
              if (acceptedList?.data && acceptedList.data.length > 0) {
                // Add column names as the first row
                sheetData.push({
                  'SlNo': '',
                  'HCF Name': '',
                  'Facility': '',

                });

                // Add an empty row to separate column names from data
                sheetData.push({});

                // Add data rows
                acceptedList.data.forEach((item, i) => {
                  sheetData.push({
                    'SlNo': ((currentPage - 1) * perPage) + i + 1,
                    'HCF Name': item['hospital_id'],
                    'Facility': item['route_name_id'],

                  });
                });
              } else {
                // If there is no data, add a message row
                sheetData.push({
                  'SlNo': 'No data available',
                  'HCF Name': 'No data available',
                  'Facility': 'No data available',

                });
              }

              return sheetData;
            }}
            sheetName="Route_Map_Report"
            fileName="Route_Map_report.xlsx"
            heading="Route Map Report"
          />
        </div>



        <div className='w-full flex justify-evenly items-center my-10 '>

          <Select
            placeholder="Select"
            label='Status'
            color="blue"
            onChange={e => setKeyword(e)}>
            <Option value=''>All</Option>
            <Option value='week'>last week</Option>
            <Option value='month'>last month</Option>
            <Option value='6month'>last 6 month</Option>
            <Option value='year'>last year</Option>
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
            label='End Date'
            onChange={e => setEndDate(e.target.value)}
          />
          <div className='mx-4'></div>
          <Button
            color='blue'
            className='text-sm w-1/4 mx-4'
            onClick={() => { }}
          >
            Search
          </Button>
        </div>

        <div className={`w-full flex flex-row items-center`}>
          {
            <div className="w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-blue-50 text-left dark:bg-meta-4 ">
                    {
                      ["Sl. No.", "Bag Colour", "Qty.", "Req. Date", "Appv. Date", "Received Date"].map((el) => (
                        <th
                          key={el}
                          className="py-5 px-1 font-medium text-black dark:text-white xl:pl-11 md:w-[200px]">
                          {el}
                        </th>
                      ))
                    }
                  </tr>
                </thead>
                <tbody>
                  {acceptedList?.data?.map((item, key) => {
                    const className = `flex justify-start items-center gap-3 ml-5 p-2.5 xl:p-5 font-bold`;
                    // const className = ""
                    return (
                      <tr >
                        <td>
                          <div className={className}>
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
                          <div
                            onClick={() => setShowColor(item)}
                            className={`${className} hover:bg-[#0001] cursor-pointer`}>
                            {getArrayValueSum(item?.all_bag_qty)}
                          </div>
                        </td> <td>
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
                          <div className={`${className} w-[150px]`}>
                            {item?.recived_date ? moment(item?.recived_date).format("DD-MMM-YYYY") : "NA"}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <Pagination
                className='float-end'
                color="primary"
                count={Math.ceil(acceptedList?.pagination?.total / perPage)}
                page={currentPage}
                onChange={(event, page) => setCurrentPage(page)}
              />
            </div>
          }
        </div>
      </div >

      <ShowColorDetails
        open={showColor !== null}
        handleOpen={() => setShowColor(null)}
        data={showColor}

      />
    </>
  );
};

export default Approvedpurchase;
