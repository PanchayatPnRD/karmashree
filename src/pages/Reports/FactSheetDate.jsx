import { useLocation } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import { useEffect, useState } from 'react';
import axios from 'axios';

const FactSheetDate = () => {

  const location = useLocation()
  console.log("Location", location);
  const path = location.pathname.split("/")[2]
  console.log("path", path)
  

  const [ waste, setWaste ] = useState<any[]>([]);

  useEffect(() => {
    const fetchWaste = async () => {
      try {
        const res = await axios.get(`/reports/waste/` + path);
        setWaste(res.data);
      } catch(error) {
        console.log("Error fetching specific Waste Details", error);
      }
    }
    fetchWaste();
  }, [])

  console.log("Waste details: ", waste);

  const summarizedData = waste?.reduce((accumulator, item) => {
    const colorId = item["Color ID"];
    const colorName = item["Color Name"];
    const numberOfBags = item["Number of Bags"];
    const weightOfBags = item["Weight of Bags"];
    const bagsPicked = item["Bags Picked"];
    const weightPicked = item["Weight Picked"];
  
    if (!accumulator[colorId]) {
      accumulator[colorId] = {
        colorName,
        NumberofBags: 0,
        totalWeight: 0,
        bagsPicked: 0,
        weightPicked: 0
      };
    }
  
    accumulator[colorId].NumberofBags += numberOfBags;
    accumulator[colorId].totalWeight += weightOfBags;
    accumulator[colorId].bagsPicked += bagsPicked;
    accumulator[colorId].weightPicked += weightPicked;
  
    return accumulator;
  }, []);
  
  //console.log("Summarized data: ", summarizedData);

  const pickUpDateTime = waste && waste.length > 0 ? waste[0]["Pick up DateTime"] : null;
  const pickUpTime = pickUpDateTime ? pickUpDateTime.split(" ")[1] : null;

  console.log("Time is:", pickUpTime);

  return (
    <>
      <Breadcrumb pageName="FactSheet of Date -" />

      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Details of Waste Disposal as on {path} 
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className='flex flex-col '>
                  <h1 className='text-4xl font-bold text-center italic underline pb-12'> Before Truck Arrival </h1>
                  {/*<div className='border-b border-stroke'>
                    <div className='flex justify-center font-bold text-3xl underline text-meta-1'>
                      <h1>RED BAG</h1>
                    </div>
                    <div className="mb-4.5 grid grid-cols-2 w-full">
                      <div className="w-full xl:w-1/2 ">
                        <label className="mb-2.5 block text-black whitespace-nowrap">
                          Number of <span className='text-danger font-bold'>Red Bags</span> generated
                        </label>
                      </div>
                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                          : <span className='pl-5'>9</span> 
                        </label>
                      </div>

                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black whitespace-nowrap">
                          Weight of <span className='text-danger font-bold'>Red Bags</span> generated
                        </label>
                      </div>

                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                          : <span className='pl-5'>10 Kgs</span> 
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className='border-b border-stroke pt-5'>
                    <div className='flex justify-center font-bold text-3xl underline text-meta-6'>
                      <h1>YELLOW BAG</h1>
                    </div>
                    <div className="mb-4.5 grid grid-cols-2 w-full">
                      <div className="w-full xl:w-1/2 ">
                        <label className="mb-2.5 block text-black whitespace-nowrap">
                          Number of <span className='text-meta-6 font-bold'>Yellow Bags</span> generated
                        </label>
                      </div>
                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                          : <span className='pl-5'>17</span> 
                        </label>
                      </div>

                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black whitespace-nowrap">
                          Weight of <span className='text-meta-6 font-bold'>Red Bags</span> generated
                        </label>
                      </div>

                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                          : <span className='pl-5'>47 Kgs</span> 
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className='border-b border-stroke pt-5'>
                    <div className='flex justify-center font-bold text-3xl underline text-primary'>
                      <h1>BLUE BAG</h1>
                    </div>
                    <div className="mb-4.5 grid grid-cols-2 w-full">
                      <div className="w-full xl:w-1/2 ">
                        <label className="mb-2.5 block text-black whitespace-nowrap">
                          Number of <span className='text-primary font-bold'>Blue Bags</span> generated
                        </label>
                      </div>
                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                          : <span className='pl-5'>3</span> 
                        </label>
                      </div>

                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black whitespace-nowrap">
                          Weight of <span className='text-primary font-bold'>Blue Bags</span> generated
                        </label>
                      </div>

                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                          : <span className='pl-5'>5 Kgs</span> 
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className='border-b border-stroke pt-5'>
                    <div className='flex justify-center font-bold text-3xl underline text-meta-3'>
                      <h1>Sharps BAG</h1>
                    </div>
                    <div className="mb-4.5 grid grid-cols-2 w-full">
                      <div className="w-full xl:w-1/2 ">
                        <label className="mb-2.5 block text-black whitespace-nowrap">
                          Number of <span className='text-meta-3 font-bold'>Sharps Bags</span> generated
                        </label>
                      </div>
                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                          : <span className='pl-5'>7</span> 
                        </label>
                      </div>

                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black whitespace-nowrap">
                          Weight of <span className='text-meta-3 font-bold'>Sharps Bags</span> generated
                        </label>
                      </div>

                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                          : <span className='pl-5'>14 Kgs</span> 
                        </label>
                      </div>
                    </div>
                  </div>*/}
                  {Object.keys(summarizedData).map((colorId, key) => {
                    const colorDetails = summarizedData[colorId];

                    function getColorClass(colorId: string): string {
                      switch (colorId) {
                        case '1':
                          return 'text-meta-6';
                        case '2':
                          return 'text-primary';
                        case '3':
                          return 'text-meta-1';
                        default:
                          return 'text-meta-3';
                      }
                    }
                    
                    function getTextColorClass(colorId: string): string {
                      return getColorClass(colorId); // Simply reuse the getColorClass function
                    }

                    return (
                      <>
                        <div className={`border-b border-stroke pt-5 ${getColorClass(colorId)}`} key={key}>
                          <div className={`flex justify-center font-bold text-3xl underline  ${getTextColorClass(colorId)}`}>
                            <h1>{colorDetails.colorName} BAG</h1>
                          </div>
                          <div className="mb-4.5 grid grid-cols-2 w-full">
                            <div className="w-full xl:w-1/2 ">
                              <label className="mb-2.5 block text-black whitespace-nowrap">
                                Number of <span className={`text-${colorDetails.colorName.toLowerCase()} font-bold`}>{colorDetails.colorName} Bags</span> generated
                              </label>
                            </div>
                            <div className="w-full xl:w-1/2">
                              <label className="mb-2.5 block text-black dark:text-white">
                                : <span className='pl-5'>{colorDetails.NumberofBags}</span>
                              </label>
                            </div>

                            <div className="w-full xl:w-1/2">
                              <label className="mb-2.5 block text-black whitespace-nowrap">
                                Weight of <span className={`text-${colorDetails.colorName.toLowerCase()} font-bold`}>{colorDetails.colorName} Bags</span> generated
                              </label>
                            </div>

                            <div className="w-full xl:w-1/2">
                              <label className="mb-2.5 block text-black dark:text-white">
                                : <span className='pl-5'>{colorDetails.totalWeight} Kgs</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}

                </div>

                <div className='flex flex-col'>
                  <h1 className='text-4xl font-bold text-center italic underline py-12'> After Truck Arrival </h1>
                  <div className='border-b border-stroke'>
                    {Object.keys(summarizedData).map((colorId, key) => {
                    const colorDetails = summarizedData[colorId];

                    function getColorClass(colorId: string): string {
                      switch (colorId) {
                        case '1':
                          return 'text-meta-6';
                        case '2':
                          return 'text-primary';
                        case '3':
                          return 'text-meta-1';
                        default:
                          return 'text-meta-3';
                      }
                    }
                    
                    function getTextColorClass(colorId: string): string {
                      return getColorClass(colorId); // Simply reuse the getColorClass function
                    }

                    return (
                      <>
                        <div className={`border-b border-stroke pt-5 ${getColorClass(colorId)}`} key={key}>
                          <div className={`flex justify-center font-bold text-3xl underline  ${getTextColorClass(colorId)}`}>
                            <h1>{colorDetails.colorName} BAG</h1>
                          </div>
                          <div className="mb-4.5 grid grid-cols-2 w-full">
                            <div className="w-full xl:w-1/2 ">
                              <label className="mb-2.5 block text-black whitespace-nowrap">
                                Number of <span className={`text-${colorDetails.colorName.toLowerCase()} font-bold`}>{colorDetails.colorName} Bags</span> generated
                              </label>
                            </div>
                            <div className="w-full xl:w-1/2">
                              <label className="mb-2.5 block text-black dark:text-white">
                                : <span className='pl-5'>{colorDetails.NumberofBags}</span>
                              </label>
                            </div>

                            <div className="w-full xl:w-1/2">
                              <label className="mb-2.5 block text-black whitespace-nowrap">
                                Weight of <span className={`text-${colorDetails.colorName.toLowerCase()} font-bold`}>{colorDetails.colorName} Bags</span> generated
                              </label>
                            </div>

                            <div className="w-full xl:w-1/2">
                              <label className="mb-2.5 block text-black dark:text-white">
                                : <span className='pl-5'>{colorDetails.totalWeight} Kgs</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                  </div>
                  {/*<div className='flex justify-center font-bold text-3xl underline text-meta-1'>
                    <h1>RED BAG</h1>
                  </div>
                  <div className="mb-4.5 grid grid-cols-2 w-full">
                    <div className="w-full xl:w-1/2 ">
                      <label className="mb-2.5 block text-black whitespace-nowrap">
                        Number of <span className='text-danger font-bold'>Red Bags</span> generated
                      </label>
                    </div>
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        : <span className='pl-5'>9</span> 
                      </label>
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black whitespace-nowrap">
                        Weight of <span className='text-danger font-bold'>Red Bags</span> generated
                      </label>
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        : <span className='pl-5'>10 Kgs</span> 
                      </label>
                    </div>
                  </div>
                  
                  
                  <div className='border-b border-stroke pt-5'>
                    <div className='flex justify-center font-bold text-3xl underline text-meta-6'>
                      <h1>YELLOW BAG</h1>
                    </div>
                    <div className="mb-4.5 grid grid-cols-2 w-full">
                      <div className="w-full xl:w-1/2 ">
                        <label className="mb-2.5 block text-black whitespace-nowrap">
                          Number of <span className='text-meta-6 font-bold'>Yellow Bags</span> generated
                        </label>
                      </div>
                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                          : <span className='pl-5'>17</span> 
                        </label>
                      </div>

                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black whitespace-nowrap">
                          Weight of <span className='text-meta-6 font-bold'>Red Bags</span> generated
                        </label>
                      </div>

                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                          : <span className='pl-5'>47 Kgs</span> 
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className='border-b border-stroke pt-5'>
                    <div className='flex justify-center font-bold text-3xl underline text-primary'>
                      <h1>BLUE BAG</h1>
                    </div>
                    <div className="mb-4.5 grid grid-cols-2 w-full">
                      <div className="w-full xl:w-1/2 ">
                        <label className="mb-2.5 block text-black whitespace-nowrap">
                          Number of <span className='text-primary font-bold'>Blue Bags</span> generated
                        </label>
                      </div>
                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                          : <span className='pl-5'>3</span> 
                        </label>
                      </div>

                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black whitespace-nowrap">
                          Weight of <span className='text-primary font-bold'>Blue Bags</span> generated
                        </label>
                      </div>

                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                          : <span className='pl-5'>5 Kgs</span> 
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className='border-b border-stroke pt-5'>
                    <div className='flex justify-center font-bold text-3xl underline text-meta-3'>
                      <h1>Sharps BAG</h1>
                    </div>
                    <div className="mb-4.5 grid grid-cols-2 w-full">
                      <div className="w-full xl:w-1/2 ">
                        <label className="mb-2.5 block text-black whitespace-nowrap">
                          Number of <span className='text-meta-3 font-bold'>Sharps Bags</span> generated
                        </label>
                      </div>
                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                          : <span className='pl-5'>7</span> 
                        </label>
                      </div>

                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black whitespace-nowrap">
                          Weight of <span className='text-meta-3 font-bold'>Sharps Bags</span> generated
                        </label>
                      </div>

                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                          : <span className='pl-5'>14 Kgs</span> 
                        </label>
                      </div>
                    </div>
                </div>*/}

                </div>

                <div className='flex flex-col '>
                  <h1 className='text-4xl font-bold text-center italic underline py-12'> Driver Details</h1>
                  <div className='border-b border-stroke'>
                   
                    <div className="mb-4.5 grid grid-cols-2 w-full">
                      <div className="w-full xl:w-1/2 ">
                        <label className="mb-2.5 block text-black whitespace-nowrap">
                          Name of the Driver
                        </label>
                      </div>
                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                          : <span className='pl-5'>ABCD</span> 
                        </label>
                      </div>

                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black whitespace-nowrap">
                          Vehicle Number
                        </label>
                      </div>

                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                          : <span className='pl-5'>WB19G-6856</span> 
                        </label>
                      </div>

                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black whitespace-nowrap">
                          Time for Pick Up
                        </label>
                      </div>
                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                          : <span className='pl-5'>{pickUpTime}</span> 
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/*<div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Building Name/No. (if any)
                  </label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                      <option value="">Type your subject</option>
                      <option value="">USA</option>
                      <option value="">UK</option>
                      <option value="">Canada</option>
                    </select>
                    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                      <svg
                        className="fill-current"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill=""
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>*/}

                {/*<div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Type your message"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  ></textarea>
              </div>*/}

                {/*<button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                  Add Device
            </button>*/}
              </div>
            </form>
          </div>
        </div>

      </div>
    </>
  );
};

export default FactSheetDate;
