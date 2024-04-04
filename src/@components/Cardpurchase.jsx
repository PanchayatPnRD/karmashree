import { FiEye, FiShoppingCart } from 'react-icons/fi';
import { FaRegBellSlash, FaRegBell } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { RibbonContainer, Ribbon } from "react-ribbons";
import Recycleimg1 from '../assets/images/icon/bluebag.svg';
import Recycleimg2 from '../assets/images/icon/tealbag.svg';
import Recycleimg3 from '../assets/images/icon/redbag.svg';
import Recycleimg4 from '../assets/images/icon/yellowbag.svg';
import Recycleimg5 from '../assets/images/icon/trash-rec1.svg';
const Cardpurchase = () => {


  const [cardData, setCardData] = useState([]);

  const [timeperiod, setTimePeriod] = useState("all");


  const iconStyle = "w-8 h-8"
  //console.log("Card Data is: ", cardData)

  const values = [
    {
      id: 1,
      icon: <img className={iconStyle} src={Recycleimg4} alt="Recycle Icon" />,
      IntValue: cardData ? cardData['yellow_bags'] : 0,
      Weight: cardData ? cardData['yellow_weight'] : 0,
      title: "Yellow Bag"
    },
    {
      id: 2,
      icon: <img className={iconStyle} src={Recycleimg1} alt="Recycle Icon" />,
      IntValue: cardData ? cardData['blue_bags'] : 0,
      Weight: cardData ? cardData['blue_weight'] : 0,
      title: "Blue Bag"
    },
    {
      id: 3,
      icon: <img className={iconStyle} src={Recycleimg3} alt="Recycle Icon" />,
      IntValue: cardData ? cardData['red_bags'] : 0,
      Weight: cardData ? cardData['red_weight'] : 0,
      title: "Red Bag"
    },
    {
      id: 4,
      icon: <img className={iconStyle} src={Recycleimg5} alt="Recycle Icon" />,
      IntValue: cardData ? cardData['white_bags'] : 0,
      Weight: cardData ? cardData['white_weight'] : 0,
      title: "White Bag"
    },
    {
      id: 5,
      icon: <img className={iconStyle} src={Recycleimg2} alt="Recycle Icon" />,
      IntValue: cardData ? cardData['cytotoxic_bags'] : 0,
      Weight: cardData ? cardData['cytotoxic_weight'] : 0,
      title: "Cytotoxic Bag"
    }

  ]

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-[30px] w-full h-auto ">
      <h5 className="text-xl font-bold text-black dark:text-white sm:text-title-lg-2">
        Current Bag Stocks
      </h5>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5 md:gap-6 xl:grid-cols-5 2xl:gap-7.5 w-full my-[20px]">
        {values.map((item, index) => (
          <div className="rounded-lg border border-black bg-white py-3 px-4 h-auto  dark:border-white dark:bg-boxdark flex justify-evenly items-center" key={index}>
            <div className="w-full">
              <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                <span className='text-primary dark:text-white text-xl'>{item.icon}</span>
              </div>
              <div className="mt-4 flex items-end justify-between">
                <h4 className="text-title-xs font-bold text-black dark:text-white">
                  {item?.title}
                </h4>
              </div>
            </div>
            <div className="w-1/6 h-full flex-col justify-start font-bold text-2xl">
              <span className={`h-3 w-3 py-1 px-3 rounded-full bg-[#00ADEF44] text-black`}>4</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Cardpurchase