import { Disclosure } from "@headlessui/react";
import { useState } from "react";

//icons
import { FaArrowCircleDown } from "react-icons/fa";

const PartD = ({header}) => {

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
                        style={{ maxWidth: '300px', wordWrap: 'break-word' }}
                      >
                        Name & Address of the Common Bio Medical Waste Treatment Facilities with Contact Person name and telephone number
                      </th>
                      <th
                        className="py-5 px-4 font-medium text-center text-black dark:text-white  border border-stroke"
                        rowSpan="2" // This will span 2 rows
                      >
                        GPS Coordinates
                      </th>
                      <th
                        className="py-5 px-4 font-medium text-center text-black dark:text-white  border border-stroke"
                        rowSpan="2" // This will span 2 rows
                      >
                        Coverage Area in Kms
                      </th>
                      <th
                        className="py-5 px-4 font-medium text-center text-black dark:text-white  border border-stroke"
                        rowSpan="2" // This will span 2 rows
                        style={{ maxWidth: '300px', wordWrap: 'break-word' }}
                      >
                        Name of the cities/areas covered by Common Bio Medical Waste Treatment Facilities
                      </th>
                      <th
                        className="py-5 px-4 font-medium text-center text-black dark:text-white  border border-stroke"
                        rowSpan="2" // This will span 2 rows
                        style={{ maxWidth: '300px', wordWrap: 'break-word' }}
                      >
                        Total number of Health Care Facilities being covered
                      </th>
                      <th
                        className="py-5 px-4 font-medium text-center text-black dark:text-white  border border-stroke"
                        rowSpan="2" // This will span 2 rows
                        style={{ maxWidth: '300px', wordWrap: 'break-word' }}
                      >
                        Total Quantity of Bio-Medical Waste collected from Health Care Facilities (in Kg/day)
                      </th>
                      <th
                        className="py-5 px-4 font-medium text-center text-black dark:text-white  border border-stroke"
                        colSpan="3" // This will span 2 rows
                      >
                        Capacity of Treatment equipments installed by Common Bio Medical Waste Treatment Facilities
                      </th>
                      <th
                        className="py-5 px-4 font-medium text-center text-black dark:text-white  border border-stroke"
                        rowSpan="2" // This will span 2 rows
                        style={{ maxWidth: '300px', wordWrap: 'break-word' }}
                      >
                        Total Bio_medical Waste Treated (i kg/day)
                      </th>
                      <th
                        className="py-5 px-4 font-medium text-center text-black dark:text-white  border border-stroke"
                        rowSpan="2" // This will span 2 rows
                        style={{ maxWidth: '300px', wordWrap: 'break-word' }}
                      >
                        Method of Disposal of treated wastes (Incinereation Ash/Sharps/Plastics)
                      </th>
                    </tr>

                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                      <th
                        className="py-5 px-4 font-medium text-center text-black dark:text-white  border border-stroke"
                      >
                        Equipment
                      </th>
                      <th
                        className="py-5 px-4 font-medium text-center text-black dark:text-white  border border-stroke"
                      >
                        Numbers
                      </th>
                      <th
                        className="py-5 px-4 font-medium text-center text-black dark:text-white  border border-stroke"
                      >
                        Total Installed capacity (in Kg/day)
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

export default PartD;
