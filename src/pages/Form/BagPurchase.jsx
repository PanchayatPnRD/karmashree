import { useState, useEffect } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { bagPurchaseValidationSchema } from '../../helper/validation/handoverFormValidation';
import { yupResolver } from '@hookform/resolvers/yup'
import { useSelector } from 'react-redux';
import { userDetailsSelector } from '../../rdxsga/redux/slices/userSlice';
import { useHcfApi } from '../../rdxsga/hooks/actions/hcf/useHcfApiHook';
import Cardpurchase from '../../components/Cardpurchase';
import Purchaselist from '../Reports/Purchase/PurchaseList';
import ConfirmationModal from "../../components/common/modals/ConfirmationModal";


const ErrorMessage = ({ message }) => {
  return message ? <div className='text-danger'>{message}</div> : <div className='py-3'></div>
}

const BagPurchase = () => {
  const { user: { id: hospital_id } } = useSelector(userDetailsSelector);
  const hcfApi = useHcfApi();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(bagPurchaseValidationSchema),
    defaultValues: {
      Yellow: '',
      Blue: '',
      Red: '',
      White: '',
      Cytotoxic: ''
    }
  })
  const submitBagPurchase = data => {
    setFormData(data);
    setShowConfirmation(true);
  }
   const confirmSubmission = () => {
    let parcheseItemDto = [];
    let changed = false;


    if (formData?.Yellow !== '') {
      changed = true;
      parcheseItemDto.push({ color_id: 1, bag_qty: parseInt(formData?.Yellow), hospital_id })
    }

    if (formData?.Blue !== '') {
      changed = true;
      parcheseItemDto.push({ color_id: 2, bag_qty: parseInt(formData?.Blue), hospital_id })
    }

    if (formData?.Red !== '') {
      changed = true;
      parcheseItemDto.push({ color_id: 3, bag_qty: parseInt(formData?.Red), hospital_id })
    }

    if (formData?.White !== '') {
      changed = true;
      parcheseItemDto.push({ color_id: 4, bag_qty: parseInt(formData?.White), hospital_id })
    }

    if (formData?.Cytotoxic !== '') {
      changed = true;
      parcheseItemDto.push({ color_id: 5, bag_qty: parseInt(formData?.Cytotoxic), hospital_id })
    }


    if (changed && parcheseItemDto.length > 0) {
      hcfApi.callCreateBagPurchaseRequest({ parcheseItemDto }, (message, resp) => {
        toast.success(message ?? "Purchase Requested !")
        reset();
      }, (message, resp) => {
        toast.error(message ?? "please try again")
      })
    } else {
      toast.error("Please fill the form")
     }
        setShowConfirmation(false);
  }

  return (
    <>
      <Breadcrumb pageName="Bag Purchase" />
      <div className="flex flex-row ">
        <Cardpurchase />
      </div>

      <div className="grid grid-cols-1 gap-9 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <h5 className="text-xl font-bold text-black dark:text-white sm:text-title-lg-2">
              Purchase Bag
            </h5>
            <form onSubmit={handleSubmit(submitBagPurchase)}>
              <div className="p-6.5">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-5 items-center">
                  <div className="mb-1">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Yellow Bags
                    </label>
                    <input
                      {...register("Yellow")}
                      placeholder=" No. of Yellow Bags"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    <ErrorMessage message={errors?.Yellow?.message} />
                  </div>
                  <div className="mb-1">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Blue Bags
                    </label>
                    <input
                      {...register("Blue")}
                      placeholder="No. of Blue Bags"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    <ErrorMessage message={errors?.Blue?.message} />
                  </div>
                  <div className="mb-1">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Red Bags
                    </label>
                    <input
                      {...register("Red")}
                      placeholder="No. of Red Bags"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    <ErrorMessage message={errors?.Red?.message} />
                  </div>

                  <div className="mb-1">
                    <label className="mb-2.5 block text-black dark:text-white">
                      White Bags
                    </label>
                    <input
                      {...register("White")}
                      placeholder="No. of White Bags "
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    <ErrorMessage message={errors?.White?.message} />
                  </div>
                  <div className="mb-1">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Cytotoxic Bags
                    </label>
                    <input
                      {...register("Cytotoxic")}
                      placeholder="No. of Cytotoxic Bags"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    <ErrorMessage message={errors?.Cytotoxic?.message} />
                  </div>


                </div>
                <div className="w-full flex justify-center items-center">
                  <button
                    className="flex w-2/5 justify-center rounded  p-3 font-medium text-gray  duration-300 hover:bg-indigo-300"
                    type='submit'
                    style={{ backgroundColor: '#00008B', color: '#FFFFFF' }}
                  >
                    Purchase
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="my-8" />
      <Purchaselist />
 <ConfirmationModal
        open={showConfirmation}
        onConfirm={confirmSubmission}
        onCancel={() => setShowConfirmation(false)}
        header="Confirm Submission"
        body="Are you sure you want to submit the form?"
      />
    </>
  );
};

export default BagPurchase;
