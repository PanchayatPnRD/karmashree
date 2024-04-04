import { Disclosure } from "@headlessui/react";
import { useState } from "react";

//icons
import { FaArrowCircleDown } from "react-icons/fa";

const PartB = ({header}) => {

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
                          {["Sl. No.", "Name of the State/union Territory", "Name of the District", "Bio-medical Waste Treatment and Disposal Equipments", "Existing Total Bio-medical waste treated (in Kg/Day)", "Total Weight Treated (in Kg/Day)"].map((el) => (
                            <th
                              key={el} 
                              className="py-5 px-1 font-medium text-center text-black dark:text-white xl:pl-11 border border-stroke"
                              style={{ maxWidth: '300px', wordWrap: 'break-word' }}
                            >
                              {el}
                            </th>
                          ))}
                        </tr>
                    </thead>
                    <tbody>
                    {
                    profileData?.weightperday.map((item, index) => {
                      const totalWeightTreated = profileData?.treatmentEquipments[0]?.total_weight_treated;
                      return (
                        <tr key={index} className={index % 2 === 0 ? "" : "py-4 bg-blue-gray-50/50"}>
                          <td>{index + 1}</td>
                          <td>{item.State}</td>
                          <td>{item.district}</td>
                          <td>{/* Add a table to display WeightTreated */}
                            <table className="text-center w-full">
                              {profileData?.treatmentEquipments.map((equipment, equipmentIndex) => (
                                <tr key={equipmentIndex} className="border-b border-stroke ">
                                  <td className="border-b border-stroke">{equipment.Equipment}</td>
                                </tr>
                              ))}
                            </table>
                          </td>
                          <td>{/* Add a table to display WeightTreated */}
                            <table className="text-center w-full">
                              <tr>
                                <td className="border-b border-stroke">Weight Treated by an equipment</td>
                              </tr>
                              {/*
                              profileData?.treatmentEquipments.map((equipment, equipmentIndex) => (
                                <tr key={equipmentIndex}>
                                  <td className="border-b border-stroke">{equipment.WeightTreated}</td>
                                </tr>
                              ))
                              */}
                            </table>
                          </td>
                          <td>
                            Total Weight Treated
                          </td>
                          {/* Add more <td> elements to display other properties */}
                        </tr>
                      );
                    })
                    }

                      <tr>
                        <td>1.</td>
                        <td>West Bengal </td>
                        <td>Howrah</td>
                        <td>{/* Add a table to display WeightTreated */}
                          <table className="text-center w-full">
                            <tr className="border-b border-stroke ">
                              <td className="border-b border-stroke">jcb</td>
                            </tr>
                            <tr className="border-b border-stroke ">
                              <td className="border-b border-stroke">fhxfzfxn</td>
                            </tr>
                            <tr className="border-b border-stroke ">
                              <td className="border-b border-stroke">abc</td>
                            </tr>
                             <tr className="border-b border-stroke ">
                              <td className="border-b border-stroke">what</td>
                            </tr>
                             <tr className="border-b border-stroke ">
                              <td className="border-b border-stroke">lskdfj</td>
                            </tr>
                          </table>
                        </td>
                        <td>{/* Add a table to display WeightTreated */}
                          <table className="text-center w-full">
                            <tr>
                              <td className="border-b border-stroke">1</td>
                            </tr>
                            <tr>
                              <td className="border-b border-stroke">2</td>
                            </tr>
                            <tr>
                              <td className="border-b border-stroke">2</td>
                            </tr>
                             <tr>
                              <td className="border-b border-stroke">1</td>
                            </tr>
                            {/*
                            profileData?.treatmentEquipments.map((equipment, equipmentIndex) => (
                              <tr key={equipmentIndex}>
                                <td className="border-b border-stroke">{equipment.WeightTreated}</td>
                              </tr>
                            ))
                            */}
                          </table>
                        </td>
                        <td>
                          6
                        </td>
                        {/* Add more <td> elements to display other properties */}
                      </tr>

                    </tbody>
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

export default PartB;
