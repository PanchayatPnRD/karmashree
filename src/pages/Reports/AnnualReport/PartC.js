import { Disclosure } from "@headlessui/react";
import { useState } from "react";

//icons
import { FaArrowCircleDown } from "react-icons/fa";

const PartC = ({header}) => {

  const pageSize = 5;
  const [ currPage, setCurrPage ] = useState(1);
  const startIndex = (currPage - 1)*pageSize;
  const endIndex = startIndex + pageSize;

  const [ dataLoaded, setDataloaded ] = useState(false);
  const [ profileData, setProfileData ] = useState(null);

  const [ hideHCFSubmenu, setHideHCFSubmenu ] = useState(false);

  const getRomanNumeral = (number) => {
    var lookup = {x:100,xc:90,l:50,xl:40,x:10,ix:9,v:5,iv:4,i:1},roman = '',i;
  for ( i in lookup ) {
    while ( number >= lookup[i] ) {
      roman += i;
      number -= lookup[i];
    }
  }
  return roman;
  };

  return (
    <div className="w-full">
      <Disclosure as="div">
        {({ open }) => (
          <>
            <Disclosure.Button className="w-full rounded-sm border border-stroke bg-gradient-to-r from-cyan-500 to-blue-500 px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 flex">
                <h1 className='pb-2 text-xl font-semibold text-white flex items-center '>{header}</h1>
                <span className="ml-auto text-xl text-white"><FaArrowCircleDown className={open ? 'rotate-180 transform' : ''} /></span>
            </Disclosure.Button>

            <Disclosure.Panel >
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="max-w-full overflow-x-auto pb-5">
                  <table className="w-full min-w-max table-auto text-center text-base">
                  <thead>
                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                      <th 
                        className="py-5 px-4 font-medium text-center text-black dark:text-white  border border-stroke"
                        rowSpan="2"
                      >
                        Sl. No.
                      </th>
                      <th
                        className="py-5 px-4 font-medium text-center text-black dark:text-white  border border-stroke"
                        rowSpan="2" // This will span 2 rows
                      >
                        Name and Address of the HCF
                      </th>
                      <th
                        className="py-5 px-4 font-medium text-center text-black dark:text-white  border border-stroke"
                        colSpan="5" // This will span 5 columns
                      >
                        Quantity of Bio Medical Waste Generation (in kg/day)
                      </th>
                      <th
                        className="py-5 px-4 font-medium text-center text-black dark:text-white  border border-stroke"
                        colSpan="4" // This will span 5 columns
                      >
                        Total installed Treatment Capacity (in Kg/Day)
                      </th>
                      <th
                        className="py-5 px-4 font-medium text-center text-black dark:text-white  border border-stroke"
                        rowSpan="2" // This will span 2 rows
                      >
                        Total biomedical waste treated and disposed by Health Care Facilities (in Kg/Day)
                      </th>
                    </tr>

                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                      <th
                        className="py-5 px-4 font-medium text-center text-black dark:text-white  border border-stroke"
                      >
                        Yellow
                      </th>
                      <th
                        className="py-5 px-4 font-medium text-center text-black dark:text-white  border border-stroke"
                      >
                        Red
                      </th>
                      <th
                        className="py-5 px-4 font-medium text-center text-black dark:text-white  border border-stroke"
                      >
                        Blue
                      </th>
                      <th
                        className="py-5 px-4 font-medium text-center text-black dark:text-white  border border-stroke"
                        style={{ backgroundColor: 'White' }} // Apply your desired color
                      >
                        White
                      </th>
                      <th
                        className="py-5 px-4 font-medium text-center text-black dark:text-white  border border-stroke"
                      >
                        Total Bio Medical Waste Generated
                      </th>

                      <th
                        className="py-5 px-4 font-medium text-center text-black dark:text-white  border border-stroke"
                      >
                        Incinerator
                      </th>
                      <th
                        className="py-5 px-4 font-medium text-center text-black dark:text-white  border border-stroke"
                      >
                        Autoclave
                      </th>
                      <th
                        className="py-5 px-4 font-medium text-center text-black dark:text-white  border border-stroke"
                        style={{ backgroundColor: 'White' }} // Apply your desired color
                      >
                        Deep Burial
                      </th>
                      <th
                        className="py-5 px-4 font-medium text-center text-black dark:text-white  border border-stroke"
                      >
                        Any Other
                      </th>
                    </tr>
                  </thead>
    
                  </table>
                  {/*
                  <Pagination 
                    color="primary"
                    count={Math.ceil(profileData?.weightperday.length / pageSize)}
                    page={currPage}
                    onChange={(event, page) => setCurrPage(page)}
                    />
                  */}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default PartC;
