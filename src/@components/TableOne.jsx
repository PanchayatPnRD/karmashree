import { useEffect, useState } from 'react';
import { Pagination } from "@mui/material"
import {
  Select,
  Option,
  Spinner,
  Button
} from "@material-tailwind/react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const TableOne = () => {


  return (
    <div className="rounded-sm border border-stroke bg-white pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:pb-1">
      <h4 className="text-xl font-semibold text-black dark:text-white px-5">
        Waste Generation Report
      </h4>
      <div className='flex flex-row justify-center items-center gap-10 mx-3'>
        <div className='w-1/3 py-12 flex justify-start'>
          <Select color="blue" value={timeperiod} onChange={(e) => setTimePeriod(e)} label="Time Duration">
            <Option value="all">All</Option>
            <Option value="week">Last Week</Option>
            <Option value="month">Last Month</Option>
            <Option value="quaterly">Last Quarter</Option>
            <Option value="half yearly">Last 6 Months</Option>
            <Option value="yearly">Last Year</Option>
          </Select>
        </div>
        {timeperiod === "all" && (
          <div className='flex justify-center items-center gap-5'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={'Start Date'}
                openTo="day"
                views={['year', 'month', 'day']}
                format='DD-MM-YYYY'
                value={fromDate}
                onChange={(e) => setFromDate(e)}
                slotProps={{ textField: { size: 'small' } }}
              />
              <DatePicker
                label={'End Date'}
                openTo="day"
                views={['year', 'month', 'day']}
                format='DD-MM-YYYY'
                value={endDate}
                onChange={(e) => setEndDate(e)}
                slotProps={{ textField: { size: 'small' } }}
              />
            </LocalizationProvider>
            <Button
              color='purple'
              className='text-xl'
              onClick={handleDatesubmit}
              size="sm"
            >
              Submit
            </Button>
          </div>
        )}
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-center dark:bg-meta-4">
              <th className='py-5 font-medium text-black dark:text-white xl:pl-5 text-center border-r border-stroke'>Sl. No.</th>
              <th className='py-5 font-medium text-black dark:text-white text-center border-r border-stroke'>{[timeperiodHeaderMap[timeperiod]]}</th>
              {["Yellow Bags", "Blue Bags", "Red Bags", "White Containers", "Cytotoxic Bags"].map((el) => (
                <th
                  key={el}
                  className="py-5 font-bold text-black dark:text-white text-center text-xl border-r border-b border-stroke"
                  colSpan={2}
                >
                  {el}
                </th>
              ))}
            </tr>
            <tr className="bg-gray-2 text-center dark:bg-meta-4">
              <th className='border-r border-stroke'></th>
              <th className='border-r border-stroke'></th>
              {["Number of Bags", "Weight (in kg)", "Number of Bags", "Weight (in kg)", "Number of Bags", "Weight (in kg)", "Number of Bags", "Weight (in kg)", "Number of Bags", "Weight (in kg)"].map((el, index) => (
                <th
                  key={index}
                  className={`py-5 text-center font-medium text-black dark:text-white ${el === "Weight (in kg)" ? "border-r border-r-stroke px-5" : "border-r border-r-stroke px-3"}`}
                >
                  {el !== "Weight (in kg)" ? el : (
                    <span>
                      Weight <br />(in kg)
                    </span>
                  )}
                </th>
              ))}

            </tr>
          </thead>
          <tbody>
            {!loading ? currentdata.map((item, key) => {
              const className = `text-center gap-1 p-2.5 xl:p-3 font-bold`;
              const shortclassName = `text-center p-2.5 xl:p-3 font-bold border-r border-stroke `;
              return (
                <tr key={key}>
                  <td className='border-r border-stroke text-center font-bold'>
                    <span>
                      {key + 1}
                    </span>
                  </td>
                  <td className='border-r border-stroke px-3'>
                    <div className="whitespace-nowrap font-bold">
                      {
                        timeperiod === "all" ? item['Date'] :
                          timeperiod === "week" ? item['Week'] :
                            timeperiod === "month" ? item['Month'] :
                              timeperiod === "quaterly" ? item['Quarter'] :
                                timeperiod === "half yearly" ? item['Half'] :
                                  timeperiod === "yearly" ? item['Year'] :
                                    "NaN"
                      }
                    </div>
                  </td>
                  <td className='py-3'>
                    <div className="border-r border-r-stroke font-bold text-center">
                      {item[`yellow_bags`]}
                    </div>
                  </td>
                  <td className='border-r border-stroke'>
                    <div className={className}>
                      {item[`yellow_weight`]}
                    </div>
                  </td>
                  <td className='py-3'>
                    <div className="border-r border-r-stroke font-bold text-center">
                      {item[`blue_bags`]}
                    </div>
                  </td>
                  <td className='border-r border-stroke'>
                    <div className={className}>
                      {item[`blue_weight`]}
                    </div>
                  </td>
                  <td className='py-3'>
                    <div className="border-r border-r-stroke font-bold text-center">
                      {item[`red_bags`]}
                    </div>
                  </td>
                  <td className='border-r border-stroke'>
                    <div className={className}>
                      {item[`red_weight`]}
                    </div>
                  </td>
                  <td className='py-3'>
                    <div className="border-r border-r-stroke font-bold text-center">
                      {item[`white_bags`]}
                    </div>
                  </td>
                  <td className='border-r border-stroke'>
                    <div className={className}>
                      {item[`white_weight`]}
                    </div>
                  </td>
                  <td className='py-3'>
                    <div className="border-r border-r-stroke font-bold text-center">
                      {item[`cytotoxic_bags`]}
                    </div>
                  </td>
                  <td className='border-r border-stroke'>
                    <div className={className}>
                      {item[`cytotoxic_weight`]}
                    </div>
                  </td>
                </tr>
              )
            }) : (
              <div className='flex flex-row justify-center items-center'>
                <Spinner className="h-12 w-12" color="indigo" />

              </div>
            )}
          </tbody>
        </table>
        <Pagination
          color="primary"
          count={Math.ceil(waste.length / pageSize)}
          page={currPage}
          onChange={(event, page) => setCurrPage(page)}
        />
      </div>
    </div>
  );
};

export default TableOne;
