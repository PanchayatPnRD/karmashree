import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormEle from './FormEle';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { userDetailsSelector } from '../../../rdxsga/redux/slices/userSlice';
import { useHcfApi } from '../../../rdxsga/hooks/actions/hcf/useHcfApiHook';
import { handoverValidationSchema } from '../../../helper/validation/handoverFormValidation';

const LeftForm = ({ showFirstCard, stock }) => {
  const hcfApi = useHcfApi();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(handoverValidationSchema),
    defaultValues: {
      Blue: { Num: "", Weight: "" },
      Yellow: { Num: "", Weight: "" },
      Red: { Num: "", Weight: "" },
      White: { Num: "", Weight: "" },
      Cytotoxic: { Num: "", Weight: "" }
    }
  });

  const { user: { id: hospital_id } } = useSelector(userDetailsSelector);


  console.log(errors)


  const submitForm = async (data) => {
    let changed = false;

    const structureDataOfAllBagEntry = [
      {
        color_id: 1,
        quantity: parseInt(data.Yellow.Num),
        weight: data.Yellow.Weight,
        hospital_id: hospital_id,
        qrcode: []
      },
      {
        color_id: 2,
        quantity: parseInt(data.Blue.Num),
        weight: data.Blue.Weight,
        hospital_id: hospital_id,
        qrcode: []
      },
      {
        color_id: 3,
        quantity: parseInt(data.Red.Num),
        weight: data.Red.Weight,
        hospital_id: hospital_id,
        qrcode: []
      },
      {
        color_id: 4,
        quantity: parseInt(data.White.Num),
        weight: data.White.Weight,
        hospital_id: hospital_id,
        qrcode: []
      },
      {
        color_id: 5,
        quantity: parseInt(data.Cytotoxic.Num),
        weight: data.Cytotoxic.Weight,
        hospital_id: hospital_id,
        qrcode: []
      },
    ];

    let handoverItemDto = []
    structureDataOfAllBagEntry.map(d => {
      changed = changed || (d.weight !== '' && d?.quantity !== '');
      if (d.quantity > 0 && d.weight !== "") {
        console.log(d)
        handoverItemDto.push(d);
      }
    })

    if (changed && handoverItemDto.length > 0) {
      hcfApi.callCreateHandover({ handoverItemDto }, (message, resp) => {
        toast.success(message ?? "handover submitted")
        reset();
      }, (message, resp) => {
        toast.error(message ?? "please try again")
      })
    } else {
      toast.error("Fill the form first")
    }
  }

  useEffect(() => {
    showFirstCard && reset();
  }, [showFirstCard])

  return (
    <div className="flex flex-col gap-9">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        {/* <!-- Contact Form --> */}
        <form onSubmit={handleSubmit(submitForm)}>
          {/* Your form fields */}
          <FormEle
            header="Yellow Bags"
            color="#FFCA28"
            textColor="yellow"
            showFirstCard={showFirstCard}
            stock={stock}
            registerNum={{ ...register('Yellow.Num') }}
            registerWeight={{ ...register('Yellow.Weight') }}
            errorMessageNum={errors.Yellow?.Num?.message}
            errorMessageWeight={errors.Yellow?.Weight?.message}
          />

          <FormEle
            header="Blue Bags"
            color="blue"
            textColor="blue"
            showFirstCard={showFirstCard}
            stock={stock}
            registerNum={{ ...register('Blue.Num') }}
            registerWeight={{ ...register('Blue.Weight') }}
            errorMessageNum={errors.Blue?.Num?.message}
            errorMessageWeight={errors.Blue?.Weight?.message}
          />

          <FormEle
            header="Red Bags"
            color="red"
            textColor="red"
            showFirstCard={showFirstCard}
            stock={stock}
            registerNum={{ ...register('Red.Num') }}
            registerWeight={{ ...register('Red.Weight') }}
            errorMessageNum={errors.Red?.Num?.message}
            errorMessageWeight={errors.Red?.Weight?.message}
          />

          <FormEle
            header="White Bags"
            color="black"
            textColor="black"
            showFirstCard={showFirstCard}
            stock={stock}
            registerNum={{ ...register('White.Num') }}
            registerWeight={{ ...register('White.Weight') }}
            errorMessageNum={errors.White?.Num?.message}
            errorMessageWeight={errors.White?.Weight?.message}
          />

          <FormEle
            header="Cytotoxic Bags"
            color="#008080"
            textColor="Cytotoxic"
            showFirstCard={showFirstCard}
            stock={stock}
            registerNum={{ ...register('Cytotoxic.Num') }}
            registerWeight={{ ...register('Cytotoxic.Weight') }}
            errorMessageNum={errors.Cytotoxic?.Num?.message}
            errorMessageWeight={errors.Cytotoxic?.Weight?.message}
          />

          <div className="p-6.5">
            <div className="mt-8 w-full flex justify-center items-center" >
              <button
                disabled={showFirstCard}
                type="submit"
                className="flex justify-center rounded bg-primary py-3 px-12 font-medium text-gray duration-300 hover:scale-105 hover:bg-indigo-300">
                Submit
              </button>
            </div>
          </div>
        </form>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"></div>
      </div>
    </div>
  );
};

export default LeftForm;
