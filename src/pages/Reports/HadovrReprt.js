import Breadcrumb from '../../components/Breadcrumb';
import { Pagination } from "@mui/material";
import {
  Button, IconButton, Input,
} from "@material-tailwind/react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ExportAsExcel from '../../common/excel';
import { COLOR_THEME, DEFAULT_PAGINATION, getBorderColorById, getColorById, getColorNameByCode, getTextColorById } from '../../config';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { hcfSelector } from '../../rdxsga/redux/slices/hcfSlice';
import { useHcfApi } from '../../rdxsga/hooks/actions/hcf/useHcfApiHook';
import { toast } from 'react-toastify';
import { userDetailsSelector } from '../../rdxsga/redux/slices/userSlice';
import { BsEye, BsEyeFill } from 'react-icons/bs';
import ViewSignModal from '../../components/modals/handover/ViewSignModal';
import moment from 'moment';


const HandOverReport = () => {
  const hcfApi = useHcfApi();
  const { handOverList } = useSelector(hcfSelector);
  const { user: { id: hospitalId } } = useSelector(userDetailsSelector);

  const darkMode = localStorage.getItem(COLOR_THEME) === 'dark'
  const [viewSigns, setViewSigns] = useState(null);

  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGINATION.PAGE_NUMBER);
  const [perPage, setPerPage] = useState(DEFAULT_PAGINATION.PER_PAGE_DATA);

  const [fromDate, setFromDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [keyword, setKeyword] = useState("");

  const handleSearchHcf = () => {
    getHandOverList(keyword, fromDate, endDate);
  }

  const getDataById = (indx, id) => {
    let a = null;
    a = handOverList?.data[indx].data?.find(d => d?.handover_color_id == id)
    // console.log({ a });
    return a;
  }


  const getHandOverList = (a = "", startDate = "", endDate = "") => {
    hcfApi.callFetchHandOverList({
      page: currentPage,
      limit: perPage,
      sortBy: DEFAULT_PAGINATION.SORT_BY,
      sortOrder: DEFAULT_PAGINATION.SORT_ORDER.DESCENDING,
      hospital_id: hospitalId,
      startDate,
      endDate
    }, (message, resp) => {
      toast.info(message)
    }, (message, resp) => {
      toast.error(message ?? "please try again")
    })
  }


  useEffect(() => {
    getHandOverList();
  }, [currentPage, hospitalId])
  return (
    <>
      <Breadcrumb pageName="Bag Collection Report" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-10 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-20">

        <ExportAsExcel
          getSheetData={() => {
            const sheetData = [];

            // Check if there is data
            if (handOverList?.data && handOverList.data.length > 0) {
              // Add column names as the first row
              sheetData.push({
                'Sl. No.': '',
                'Bags': '',
                'Quantity': '',
                'Weight': ''
              });

              // Add an empty row to separate column names from data
              sheetData.push({});

              // Add data rows
              handOverList.data.forEach((item, i) => {
                sheetData.push({
                  'Sl. No.': ((currentPage - 1) * perPage) + i + 1,
                  'Bags': item['hospital_id'],
                  'Quantity': item['quantity'],
                  'Weight': `${item?.weight ?? ""}`,

                });
              });
            } else {
              // If there is no data, add a message row
              sheetData.push({
                'Sl. No.': 'No data available',
                'Bags': 'No data available',
                'Quantity': 'No data available',
                'Weight': 'No data available'

              });
            }

            return sheetData;
          }}
          sheetName="HandOver_Report"
          fileName="HandOver_report.xlsx"
          heading="HandOver Report"
        />


        <div className='w-full flex justify-evenly items-center my-2 px-10'>

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
            onClick={handleSearchHcf}
          >
            Search
          </Button>
        </div>

        <div className='w-full overflow-x-auto mt-10 pb-6'>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-blue-50 text-left dark:bg-meta-4 ">
                <th
                  className=" font-medium text-black dark:text-white min-w-[70px] border text-center">
                  Sl No.
                </th>
                <th
                  className=" font-medium text-black dark:text-white min-w-[200px] border text-center">
                  Date
                </th>

                <th
                  className={`min-w-[250px] text-black dark:text-white border border-[1px] `}>
                  <div className='w-full text-center border-b'>Yellow</div>
                  <div className='flex justify-between items-center'>
                    <div className='w-full text-center border-r'>Quantity (bags)</div>
                    <div className='w-full text-center'>Weight (Kgs.)</div>
                  </div>
                </th>

                <th
                  className={`min-w-[250px] text-black dark:text-white border border-[1px] `}>
                  <div className='w-full text-center border-b'>Blue</div>
                  <div className='flex justify-between items-center'>
                    <div className='w-full text-center border-r'>Quantity (bags)</div>
                    <div className='w-full text-center'>Weight (Kgs.)</div>
                  </div>
                </th>

                <th
                  className={`min-w-[250px] text-black dark:text-white border border-[1px] `}>
                  <div className='w-full text-center border-b'>Red</div>
                  <div className='flex justify-between items-center'>
                    <div className='w-full text-center border-r'>Quantity (bags)</div>
                    <div className='w-full text-center'>Weight (Kgs.)</div>
                  </div>
                </th>


                <th
                  className={`min-w-[250px] text-black dark:text-white border border-[1px] `}>
                  <div className='w-full text-center border-b'>White</div>
                  <div className='flex justify-between items-center'>
                    <div className='w-full text-center border-r'>Quantity (bags)</div>
                    <div className='w-full text-center'>Weight (Kgs.)</div>
                  </div>
                </th>

                <th
                  className={`min-w-[250px] text-black dark:text-white border border-[1px] `}>
                  <div className='w-full text-center border-b'>Cytotoxic</div>
                  <div className='flex justify-between items-center'>
                    <div className='w-full text-center border-r'>Quantity (bags)</div>
                    <div className='w-full text-center'>Weight (Kgs.)</div>
                  </div>
                </th>


              </tr>
            </thead>
            <tbody>
              {
                handOverList && handOverList?.data?.map((item, key) => {
                  const className = `w-full flex justify-center items-center font-bold text-black dark:text-white`;

                  return (
                    <>
                      <tr key={key} className='border min-h-[70px]'>
                        <td className='border-x'>
                          <div className={`${className} min-w-[65px] text-center`}>
                            {((currentPage - 1) * perPage) + key + 1}
                          </div>
                        </td>
                        <td className='border-x'>
                          <div
                            className={`${className} min-w-[200px] text-center`} >
                            {moment(item?.date).format("Do MMMM - YYYY")}
                          </div>
                        </td>

                        <td className='border-x'>
                          {
                            getDataById(key, 1) &&
                            <div
                              className={`w-full flex justify-between items-center text-center ${getColorById(1)} ${getTextColorById(1)} font-bold`} >
                              <span className="w-full text-center hover:bg-[#0001] dark:hover:bg-black duration-300 p-2" role='button' onClick={() => setViewSigns(getDataById(key, 1))} >
                                {getDataById(key, 1)?.total_quantity}
                              </span>
                              <span className="w-full text-center border-l">
                                {getDataById(key, 1)?.total_weight}
                              </span>
                            </div>
                          }
                        </td>

                        <td className='border-x'>
                          {
                            getDataById(key, 2) &&
                            <div
                              className={`w-full flex justify-between items-center text-center ${getColorById(2)} ${getTextColorById(2)} font-bold`} >
                              <span className="w-full text-center hover:bg-[#0001] dark:hover:bg-black duration-300 p-2" role='button' onClick={() => setViewSigns(getDataById(key, 2))} >
                                {getDataById(key, 2)?.total_quantity}
                              </span>
                              <span className="w-full text-center border-l">
                                {getDataById(key, 2)?.total_weight}
                              </span>
                            </div>
                          }
                        </td>

                        <td className='border-x'>
                          {
                            getDataById(key, 3) && <div
                              className={`w-full flex justify-between items-center text-center ${getColorById(3)} ${getTextColorById(3)} font-bold`} >
                              <span className="w-full text-center hover:bg-[#0001] dark:hover:bg-black duration-300 p-2" role='button' onClick={() => setViewSigns(getDataById(key, 3))} >
                                {getDataById(key, 3)?.total_quantity}
                              </span>
                              <span className="w-full text-center border-l">
                                {getDataById(key, 3)?.total_weight}
                              </span>
                            </div>
                          }
                        </td>

                        <td className='border-x'>
                          {
                            getDataById(key, 4) &&
                            <div
                              className={`w-full flex justify-between items-center text-center ${getColorById(4)} ${getTextColorById(4)} font-bold`} >
                              <span className="w-full text-center hover:bg-[#0001] dark:hover:bg-black duration-300 p-2" role='button' onClick={() => setViewSigns(getDataById(key, 4))} >
                                {getDataById(key, 4)?.total_quantity}
                              </span>
                              <span className="w-full text-center border-l">
                                {getDataById(key, 4)?.total_weight}
                              </span>
                            </div>
                          }
                        </td>

                        <td className='border-x'>
                          {
                            getDataById(key, 5) &&
                            <div
                              className={`w-full flex justify-between items-center text-center ${getColorById(5)} ${getTextColorById(5)} font-bold`} >
                              <span className="w-full text-center hover:bg-[#0001] dark:hover:bg-black duration-300 p-2" role='button' onClick={() => setViewSigns(getDataById(key, 5))} >
                                {getDataById(key, 5)?.total_quantity}
                              </span>
                              <span className="w-full text-center border-l">
                                {getDataById(key, 5)?.total_weight}
                              </span>
                            </div>
                          }
                        </td>


                      </tr>
                    </>
                  )
                })
              }
            </tbody>
          </table>
        </div>

        <Pagination
          className='float-end'
          color="primary"
          count={Math.ceil(handOverList?.pagination?.total / perPage)}
          page={currentPage}
          onChange={(event, page) => setCurrentPage(page)}
        />
        <ViewSignModal
          open={viewSigns !== null}
          resetModalState={() => setViewSigns(null)}
          data={viewSigns}
        />
      </div >
    </>
  );
};

export default HandOverReport