
import { Pagination } from "@mui/material";
import {
  Button, Input, Select,
} from "@material-tailwind/react";

import ExportAsExcel from '../../../common/excel';
import { COLOR_THEME, DEFAULT_PAGINATION } from '../../../config';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { FaEdit } from 'react-icons/fa';
import { useMeetingApi } from '../../../rdxsga/hooks/actions/meeting/meetApiHook';
import { toast } from 'react-toastify';
import { userDetailsSelector } from '../../../rdxsga/redux/slices/userSlice';
import moment from 'moment';
import { useTrainingApi } from "../../../rdxsga/hooks/actions/training/trainApiHook";


const TrainingList = ({ refreshList, setShouldRefresh }) => {
  const trainingApi = useTrainingApi();
  const { user: { id: hcfId } } = useSelector(userDetailsSelector);
  const darkMode = localStorage.getItem(COLOR_THEME) === 'dark'
  const [data, setData] = useState(null)

  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGINATION.PAGE_NUMBER);
  const [perPage, setPerPage] = useState(DEFAULT_PAGINATION.PER_PAGE_DATA);
  const [updateEquip, setUpdateEquip] = useState(null);

  const [fromDate, setFromDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [keyword, setKeyword] = useState("");

  const handleSearchHcf = () => {
    getAllTrainingList(fromDate, endDate);
  }


  const getAllTrainingList = () => {
    trainingApi.callListTrain({
      page: currentPage,
      limit: perPage,
      sortBy: DEFAULT_PAGINATION.SORT_BY,
      sortOrder: DEFAULT_PAGINATION.SORT_ORDER.ASCENDING,
      keyword,
      startDate: fromDate,
      endDate,
      hcfId
    }, (message, resp) => {
      setData(resp)
      toast.info(message)
    }, (message, resp) => {
      toast.error(message ?? "please try again")
    })
  }

  const handleEdit = (itemId) => {
    // Implement your edit functionality here
    console.log(`Editing item with ID: ${itemId}`);
  };

  // console.log(hospital);
  useEffect(() => {
    getAllTrainingList();
  }, [currentPage, refreshList])
  return (
    <>

      <div className="rounded-sm border border-stroke bg-white px-10 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex justify-between items-center">
          <h5 className="text-2xl font-bold text-black dark:text-white sm:text-title-lg-2">
            Training List
          </h5>
          <ExportAsExcel
            getSheetData={() => {
              const sheetData = [];

              // Check if there is data
              if (data?.data && data.data.length > 0) {
                // Add column names as the first row
                sheetData.push({
                  'SlNo': '',
                  'Route Name': '',
                  'Address': '',
                  'Contact': '',

                });

                // Add an empty row to separate column names from data
                sheetData.push({});

                // Add data rows
                data.data.forEach((item, i) => {
                  sheetData.push({
                    'SlNo': ((currentPage - 1) * perPage) + i + 1,
                    'Route Name': item['name_route'],
                    'Address': `${item?.address ?? ""}`,
                    'Contact': item['contact_no'],

                  });
                });
              } else {
                // If there is no data, add a message row
                sheetData.push({
                  'SlNo': 'No data available',
                  'HCF Name': 'No data available',
                  'Address': 'No data available',
                  'Contact': 'No data available',

                });
              }

              return sheetData;
            }}
            sheetName="Route_Registration_Report"
            fileName="Route_Registration_report.xlsx"
            heading="Route Registration Report"
          />


        </div>

        <div className='w-full flex justify-evenly items-center my-10 p-10'>

          <Input
            color={darkMode ? "white" : "blue"}
            label='Keyword'
            placeholder='Search...'
            onChange={e => setKeyword(e.target.value)}
          />
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

        <div className={`flex flex-row items-center   `}>
          <div className="w-full overflow-x-hidden">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-blue-50 text-left dark:bg-meta-4 ">
                  {["Sl. No.", "Meeting Type", "Meeting Schedule","Organised By"].map((el) => (
                    <th
                      key={el}
                      className="py-5 px-1 font-medium text-black dark:text-white xl:pl-11 md:w-[200px]">
                      {el}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data && data?.data?.map((item, key) => {
                  const className = `flex justify-start items-center gap-3 ml-5 p-2.5 xl:p-5 font-bold`;
                  return (
                    <tr key={key}>
                      <td>
                        <div className={className}>
                          {((currentPage - 1) * perPage) + key + 1}
                        </div>
                      </td>
                      
                      <td>
                        <div className={className}>
                          {item['meeting_type']}
                        </div>
                      </td>

                      <td>
                        <div className={className}>
                          {moment(item['meeting_schedule']).format("Do MMM, YYYY")}
                        </div>
                      </td>

                      <td>
                        <div className={className}>
                          {item['operated_by']}
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
              count={Math.ceil(data?.pagination?.total / perPage)}
              page={currentPage}
              onChange={(event, page) => setCurrentPage(page)}
            />
          </div>

        </div>
      </div >

    

    </>
  );
};

export default TrainingList;
