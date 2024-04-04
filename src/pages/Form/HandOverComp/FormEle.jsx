import React from 'react';
import { Chip } from '@material-tailwind/react';



const FormEle = ({
  showFirstCard,
  header,
  color,
  textColor,
  secondForm = false,
  registerNum,
  errorMessageNum,
  registerWeight,
  errorMessageWeight,
  stock = [],
}) => {
  // Your component logic goes here

  return (
    <div className="mx-2 mt-2 p-2">
      <div className="mb-4.5 flex flex-col items-center justify-center gap-6"></div>
      <div className="flex flex-col gap-3">
        <label
          className="text-gray-600 text-center text-2xl font-bold"
          style={{ color: color }}
        >
          {header}
        </label>
        <div className="text-bold flex flex-row items-center gap-10">
          <input
            disabled={secondForm || showFirstCard}
            type="text"
            name="Number of Bags"
            placeholder="Enter Number of Bags"
            {...registerNum}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          {/* Hidden Hospital ID input */}
          <input type="hidden" name="Hospital ID" />
          <div className="flex flex-row items-center gap-10">
            <label className="text-gray-600 font-medium"> Kg</label>
            <input
              disabled={showFirstCard}
              type="text"
              name="Weight"
              placeholder="Weight"
              {...registerWeight}
              className="rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
        </div>
        {
          errorMessageNum || errorMessageWeight ? <div className="flex w-full flex-row justify-between">
            <div>
              {errorMessageNum && (
                <span style={{ color: 'red' }}>{errorMessageNum}</span>
              )}
            </div>
            <div>
              {errorMessageWeight && (
                <span style={{ color: 'red' }}>{errorMessageWeight}</span>
              )}
            </div>
          </div> : <div className='py-3'></div>
        }
      </div>

      <Chip
        className="my-2 text-base"
        style={{
          backgroundColor: color,
        }}
        value={`Remaining stock of ${textColor} Bags is: 0`}
      />


      <hr />
    </div>
  );
};

export default FormEle;

