import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import LeftForm from './HandOverComp/LeftForm';
import RightForm from './HandOverComp/RightForm';

// const getColorName = (colorId) => {
//   switch (colorId) {
//     case '1':
//       return 'Yellow Bags';
//     case '2':
//       return 'Blue Bags';
//     case '3':
//       return 'Red Bags';
//     case '4':
//       return 'White Bags';
//     case '5':
//       return 'Cytotoxic  Bags';
//     default:
//       return '';
//   }
// };


//validations......

const WasteGeneration = () => {
  const [stock, setStock] = useState([]);
  const [showFirstCard, setShowFirstCard] = useState(true);

  const handleToggleFirstCard = () => {
    setShowFirstCard(true);
  };

  const handleToggleSecondCard = () => {
    setShowFirstCard(false);
  };

  return (
    <>
      <Breadcrumb pageName="Handover Form" />
      <div className="flex w-full flex-row items-center justify-center mb-5">
        <div className="switch mx-2">
          <input
            id="switch1"
            name="bagtype"
            type="radio"
            checked={showFirstCard}
            onChange={handleToggleFirstCard}
          />
          <label
            className='font-bold text-lg duration-300 rounded hover:shadow px-5 py-2'
            htmlFor="switch1"
            role='button'
            style={{ paddingLeft: '8px' }}>
            <span>All Bag Entry</span>
          </label>
        </div>
        <div className="switch mx-2">
          <input
            id="switch2"
            name="bagtype"
            type="radio"
            checked={!showFirstCard}
            onChange={handleToggleSecondCard}
          />
          <label htmlFor="switch2"
            role='button'
            className='font-bold text-lg duration-300 rounded hover:shadow px-5 py-2'
            style={{ paddingLeft: '8px' }}>
            <span>Individual Bag Entry</span>
          </label>
        </div>
      </div>

      <div className="flex flex-row justify-evenly">
        <div className={`flex flex-col gap-9`}>
          <LeftForm showFirstCard={!showFirstCard} idx={1} stock={stock} />
        </div>

        <div className={`flex flex-col gap-9`}>
          <RightForm showFirstCard={showFirstCard} idx={2} stock={stock} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-9"></div>
    </>
  );
};

export default WasteGeneration;
