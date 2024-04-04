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
import { useDashApi } from '../rdxsga/hooks/actions/dash/dashCountApiHook';
import { useSelector } from 'react-redux';
import { userDetailsSelector } from '../rdxsga/redux/slices/userSlice';
import { dashboardCountSelector } from '../rdxsga/redux/slices/dashboardSlice';
import { getColorNameByCode } from '../config/function';

const Cards = () => {
  const { user: { id: hospitalId } } = useSelector(userDetailsSelector);

  const cardData = useSelector(dashboardCountSelector);

  const [timeperiod, setTimePeriod] = useState("all");

  const DashApi = useDashApi();

  const getDataByColorId = cid => {
    const d = cardData?.filter(item => item?.handoverRepository_color_id == cid)
    console.log(d);
    return d?.length > 0 ? d[0] : [];
  }

  const values = [
    {
      id: 1,
      icon: <img src={Recycleimg4} alt="Recycle Icon" />,
      IntValue: getDataByColorId(1)?.totalQuantity ?? 0,
      Weight: getDataByColorId(1)?.totalWeight ?? 0,
      title: "Yellow Bags"
    },
    {
      id: 2,
      icon: <img src={Recycleimg1} alt="Recycle Icon" />,
      IntValue: getDataByColorId(2)?.totalQuantity ?? 0,
      Weight: getDataByColorId(2)?.totalWeight ?? 0,
      title: "Blue Bags"
    },
    {
      id: 3,
      icon: <img src={Recycleimg3} alt="Recycle Icon" />,
      IntValue: getDataByColorId(3)?.totalQuantity ?? 0,
      Weight: getDataByColorId(3)?.totalWeight ?? 0,
      title: "Red Bags"
    },
    {
      id: 4,
      icon: <img src={Recycleimg5} alt="Recycle Icon" />,
      IntValue: getDataByColorId(4)?.totalQuantity ?? 0,
      Weight: getDataByColorId(4)?.totalWeight ?? 0,
      title: "White Containers"
    },
    {
      id: 5,
      icon: <img src={Recycleimg2} alt="Recycle Icon" />,
      IntValue: getDataByColorId(5)?.totalQuantity ?? 0,
      Weight: getDataByColorId(5)?.totalWeight ?? 0,
      title: "Cytotoxic Bags"
    }

  ]

  //Functions
  const getColor = (title) => {
    const firstWord = title.split(' ')[0].toLowerCase(); // Get the first word and convert to lowercase
    switch (firstWord) {
      case 'yellow':
        return '#FFDD69'; // Define a CSS class for yellow
      case 'red':
        return '#EE4B2B'; // Define a CSS class for red
      case 'blue':
        return '#0096FF'; // Define a CSS class for blue
      case 'white':
        return '#D3D3D3'; // Define a CSS class for 
      case 'cytotoxic':
        return 'teal';
      default:
        return '#D3D3D3'; // Default color class
    }
  };
  useEffect(() => {
    DashApi.callFetchDash({ hospitalId }, (message, resp) => {
      console.log("success", message, resp)
    }, (message, resp) => {
      console.log("error", message, resp)

    })
  }, [])


  useEffect(() => {
    console.log(cardData)
  }, [cardData])


  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-5 md:gap-6 xl:grid-cols-5 2xl:gap-7.5 w-full">
      {values.map((item, index) => (
        <RibbonContainer>
          <div className="rounded-sm border border-stroke bg-white py-6 px-4 shadow-default dark:border-strokedark dark:bg-boxdark " key={index}>

            <Ribbon
              side="right"
              type="corner"
              size="large"
              backgroundColor={getColor(item.title)}
              color="black"
              fontFamily="sans"
              withStripes={true}
            >
        
                  {getColorNameByCode(item?.id)}
               
</Ribbon>
            <div className='w-full flex justify-between items-center'>
              <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                <span className='text-primary dark:text-white text-xl'>{item.icon}</span>
              </div>
              <span className="text-lg font-bold me-5 text-black dark:text-white py-1 px-2 rounded-full bg-whiten dark:bg-black"> {item?.IntValue}
                <span className='text-sm'>Bags</span>
              </span>
            </div>
            <div />

            <div className="mt-4 flex items-end justify-between">
              <div className='w-full flex-col '>
               
                <h4 className="text-title-xs font-bold text-black dark:text-white w-full text-center">
                  <span className="text-lg font-bold text-black dark:text-white py-2 px-5 bg-whiten dark:bg-black rounded-full">{item?.Weight}
                    <span className='text-sm ps-1'>Kg.</span></span>
                </h4>

              </div>
            </div>

          </div>
        </RibbonContainer>
      ))}
    </div>
  )
}

export default Cards