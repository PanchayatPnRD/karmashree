import { Disclosure } from '@headlessui/react';
import { useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import { FaArrowCircleDown } from "react-icons/fa";

const PartA = ({ header }) => {

  const [profileData, setProfileData] = useState(null);

  const [hideHCFSubmenu, setHideHCFSubmenu] = useState(false);

  const oddrowsclass = "py-4 bg-blue-gray-50/50"
  const firstcolumnclass = "px-5 py-3 border-r border-stroke";
  const secondcolumnClass = "w-80 px-3 py-3 border-r border-stroke";
  const thirdcolumnClass = "border-r border-stroke px-2";


  const handleHospitalSubmenu = () => {
    setHideHCFSubmenu(!hideHCFSubmenu);
  }

  return (
    <div className='w-full'>
      <Disclosure as="div">
        {({ open }) => (
          <div className=''>
            <Disclosure.Button className='w-full rounded-sm border border-stroke bg-gradient-to-r from-cyan-500 to-blue-500 px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 flex'>
              <span className='pb-2 text-xl font-semibold pr-10 text-white'>{header}</span>
              <span className="ml-auto text-xl text-white"><FaArrowCircleDown className={open ? 'rotate-180 transform' : ''} /></span>
            </Disclosure.Button>
            <Disclosure.Panel className="max-w-full overflow-x-auto pb-5">
              <table className="w-full min-w-max table-auto text-center text-base">
                <tbody>
                  <tr className={oddrowsclass}>
                    <td className={firstcolumnclass}>1.</td>
                    <td className={secondcolumnClass}>Name of the Organisation</td>
                    <td className={thirdcolumnClass}>:</td>
                    <td className="">West Bengal Pollution Control Board </td>
                  </tr>
                  <tr>
                    <td className={firstcolumnclass}>2.</td>
                    <td className={secondcolumnClass}>Name of the Nodal Officer with contact telephone number and email</td>
                    <td className={thirdcolumnClass}>:</td>
                    <td className="w-68" style={{ maxWidth: '300px', wordWrap: 'break-word' }}>
                      Lokesh Rustgi, 9830052387, pcb@gmail.com
                    </td>
                  </tr>
                  <tr className={oddrowsclass}>
                    <td className={firstcolumnclass}>
                      <Disclosure.Button onClick={handleHospitalSubmenu} className="flex items-center justify-center cursor-pointer text-center mx-auto">
                        3.
                        <AiFillCaretDown className={hideHCFSubmenu ? 'rotate-180' : ''} />
                      </Disclosure.Button>

                    </td>
                    <td className={secondcolumnClass}>Total Health Care Facilies/Occupiers</td>
                    <td className={thirdcolumnClass}>:</td>
                    <td className="">7</td>
                  </tr>

                  {hideHCFSubmenu && (
                    <tr>
                      <td colSpan="4">
                        <Disclosure>
                          <Disclosure.Button className="w-full rounded-sm border border-stroke bg-gradient-to-r from-cyan-500 to-blue-500 px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 flex">
                            <span className='pb-2 text-xl font-semibold pr-10 text-white'>Nested Disclosure</span>
                            <span className="ml-auto text-xl text-white"><FaArrowCircleDown className={open ? 'rotate-180 transform' : ''} /></span>
                          </Disclosure.Button>
                          <Disclosure.Panel className="max-w-full overflow-x-auto pb-5">
                            {/* Nested disclosure content */}
                            <p>This is the content of the nested disclosure.</p>
                          </Disclosure.Panel>
                        </Disclosure>
                      </td>
                    </tr>
                  )}

                  {/* Rows for the hcfCounts data */}
                  {/*
                {hideHCFSubmenu && profileData?.hcfCounts.slice(0, -1).map((hcfCount, index) => (
                  <tr key={index} className={index % 2 === 0 ? "" : "py-4 bg-blue-gray-50/50"}>
                    <td className={firstcolumnclass}>3 {getRomanNumeral(index+1)}.</td>
                    <td className={secondcolumnClass}>{hcfCount.hcf}</td>
                    <td className={thirdcolumnClass}>:</td>
                    <td>{hcfCount.hospital_count}</td>
                  </tr>
                ))}
                
                */}

                  <tr>
                    <td className={firstcolumnclass}>4.</td>
                    <td className={secondcolumnClass}>Total Number of beds</td>
                    <td className={thirdcolumnClass}>:</td>
                    <td>
                      44
                    </td>
                  </tr>

                  <tr className={oddrowsclass}>
                    <td className={firstcolumnclass}>5.</td>
                    <td className={secondcolumnClass}>
                      <span className='font-bold'>
                        Status of Authorization till 31/13/2022:
                      </span>
                    </td>
                    <td className={thirdcolumnClass}>:</td>
                    <td className=""></td>
                  </tr>
                  <tr>
                    <td className={firstcolumnclass}>5 i.</td>
                    <td className={secondcolumnClass}>Total number of Occupiers applied for authorization</td>
                    <td className={thirdcolumnClass}>:</td>
                    <td>
                    </td>
                  </tr>
                  <tr className={oddrowsclass}>
                    <td className={firstcolumnclass}>5 ii.</td>
                    <td className={secondcolumnClass}>Total number of Occupiers granted authorization</td>
                    <td className={thirdcolumnClass}>:</td>
                    <td>
                    </td>
                  </tr>
                  <tr>
                    <td className={firstcolumnclass}>6.</td>
                    <td className={secondcolumnClass}><span className="font-bold">Quantity of Bio-medical Waste Generation (in Kg/Day)</span></td>
                    <td className={thirdcolumnClass}>:</td>
                    <td>
                      {profileData?.beddedHospitals[0]?.Total_waste_generated || ''}
                    </td>
                  </tr>
                  <tr className={oddrowsclass}>
                    <td className={firstcolumnclass}>6 i.</td>
                    <td className={secondcolumnClass}>Quantity of Bio-medical Waste Generation by Bedded Hospitals (in Kg/Day)</td>
                    <td className={thirdcolumnClass}>:</td>
                    <td>

                    </td>
                  </tr>
                  <tr>
                    <td className={firstcolumnclass}>6 ii.</td>
                    <td className={secondcolumnClass}>Quantity of Bio-medical Waste Generation by Non-Bedded Hospitals (in Kg/Day)</td>
                    <td className={thirdcolumnClass}>:</td>
                    <td>

                    </td>
                  </tr>
                  <tr className={oddrowsclass}>
                    <td className={firstcolumnclass}>7.</td>
                    <td className={secondcolumnClass}><span className="font-bold">Bio-medical Waste Treatment Disposal</span></td>
                    <td className={thirdcolumnClass}>:</td>
                    <td>
                    </td>
                  </tr>
                  <tr>
                    <td className={firstcolumnclass}>a{')'}</td>
                    <td className={secondcolumnClass}>By Captive bio-medical waste treatment and disposal by Health Care Facilities </td>
                    <td className={thirdcolumnClass}>:</td>
                    <td>
                      NIL
                    </td>
                  </tr>
                  <tr className={oddrowsclass}>
                    <td className={firstcolumnclass}>b{')'}</td>
                    <td className={secondcolumnClass}>Bio-medical waste treated and disposed by Common Bio Medical Waste Treatment Facilities {'('}Refer to part 4{')'}</td>
                    <td className={thirdcolumnClass}>:</td>
                    <td>
                    </td>
                  </tr>
                  <tr>
                    <td className={firstcolumnclass}>(i)</td>
                    <td className={secondcolumnClass}>Number of Common Bio Medical Waste Treatment Facilities in Operation</td>
                    <td className={thirdcolumnClass}>:</td>
                    <td>
                      NIL
                    </td>
                  </tr>
                  <tr className={oddrowsclass}>
                    <td className={firstcolumnclass}>(ii)</td>
                    <td className={secondcolumnClass}>Number of Common Bio Medical Waste Treatment Facilities under Construction</td>
                    <td className={thirdcolumnClass}>:</td>
                    <td>
                    </td>
                  </tr>
                  <tr>
                    <td className={firstcolumnclass}>(iii)</td>
                    <td className={secondcolumnClass}>Total Bio-Medical Waste Treated in kg/dat</td>
                    <td className={thirdcolumnClass}>:</td>
                    <td>
                    </td>
                  </tr>
                  <tr className={oddrowsclass}>
                    <td className={firstcolumnclass}>(iv)</td>
                    <td className={secondcolumnClass}>Total treated bio-medical waste disposed through authorized recyclers (in Kg/Day)</td>
                    <td className={thirdcolumnClass}>:</td>
                    <td>
                    </td>
                  </tr>
                  <tr>
                    <td className={firstcolumnclass}>8.</td>
                    <td className={secondcolumnClass}><span className="font-bold">Total number of violation by</span></td>
                    <td className={thirdcolumnClass}>:</td>
                    <td>
                    </td>
                  </tr>
                  <tr className={oddrowsclass}>
                    <td className={firstcolumnclass}>(i)</td>
                    <td className={secondcolumnClass}>Health Care Facilities (bedded and Non-bedded)</td>
                    <td className={thirdcolumnClass}>:</td>
                    <td>
                    </td>
                  </tr>
                  <tr>
                    <td className={firstcolumnclass}>(ii)</td>
                    <td className={secondcolumnClass}>Common Bio Medical Waste Treatment Facilities</td>
                    <td className={thirdcolumnClass}>:</td>
                    <td>
                    </td>
                  </tr>
                  <tr className={oddrowsclass}>
                    <td className={firstcolumnclass}>(i)</td>
                    <td className={secondcolumnClass}>Others</td>
                    <td className={thirdcolumnClass}>:</td>
                    <td>NIL
                    </td>
                  </tr>
                  <tr>
                    <td className={firstcolumnclass}>9.</td>
                    <td className={secondcolumnClass}><span className="font-bold">Show cause notices/directions issued to defaulters</span></td>
                    <td className={thirdcolumnClass}>:</td>
                    <td>
                    </td>
                  </tr>
                  <tr className={oddrowsclass}>
                    <td className={firstcolumnclass}>(i)</td>
                    <td className={secondcolumnClass}>Health Care Facilities (bedded and non-bedded)</td>
                    <td className={thirdcolumnClass}>:</td>
                    <td>
                    </td>
                  </tr>
                  <tr>
                    <td className={firstcolumnclass}>(ii)</td>
                    <td className={secondcolumnClass}>Common Bio Medical Waste Treatment Facilities</td>
                    <td className={thirdcolumnClass}>:</td>
                    <td>
                    </td>
                  </tr>
                  <tr className={oddrowsclass}>
                    <td className={firstcolumnclass}>(iii)</td>
                    <td className={secondcolumnClass}>Others</td>
                    <td className={thirdcolumnClass}>:</td>
                    <td>
                    </td>
                  </tr>

                  {/* 10th Point */}
                  <tr>
                    <td className={firstcolumnclass}>10.</td>
                    <td className={secondcolumnClass}>
                      <span className='font-bold'>
                        Any other relevant information
                      </span>
                    </td>
                    <td className={thirdcolumnClass}>:</td>
                    <td>
                    </td>
                  </tr>
                  <tr className={oddrowsclass}>
                    <td className={firstcolumnclass}>(i)</td>
                    <td className={secondcolumnClass}>Number of workshops/training conducted during the year</td>
                    <td className={thirdcolumnClass}>:</td>
                    <td>
                    </td>
                  </tr>
                  <tr>
                    <td className={firstcolumnclass}>(ii)</td>
                    <td className={secondcolumnClass}>Number of Occupiers installed liquid Waste Treatment Facility</td>
                    <td className={thirdcolumnClass}>:</td>
                    <td>
                    </td>
                  </tr>
                  <tr className={oddrowsclass}>
                    <td className={firstcolumnclass}>(iii)</td>
                    <td className={secondcolumnClass}>Number of captive incinerators complying to the norms</td>
                    <td className={thirdcolumnClass}>:</td>
                    <td>
                    </td>
                  </tr>
                  <tr>
                    <td className={firstcolumnclass}>(iv)</td>
                    <td className={secondcolumnClass}>Number of occupiers organized trainings</td>
                    <td className={thirdcolumnClass}>:</td>
                    <td>
                    </td>
                  </tr>
                  <tr className={oddrowsclass}>
                    <td className={firstcolumnclass}>(v)</td>
                    <td className={secondcolumnClass}>Number of occupiers constituted Bio-medical waste management committees</td>
                    <td className={thirdcolumnClass}>:</td>
                    <td>
                    </td>
                  </tr>
                  <tr>
                    <td className={firstcolumnclass}>(vi)</td>
                    <td className={secondcolumnClass}>Number of occupiers submitted annual Report for the previous calender year</td>
                    <td className={thirdcolumnClass}>:</td>
                    <td>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Disclosure.Panel>
          </div>
        )}
      </Disclosure>
    </div>
  );
};

export default PartA;
