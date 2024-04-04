import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import {
  Input,
  Select,
  Option,
  Textarea,
  Button
} from "@material-tailwind/react"
import { APP_LINK } from "../../../config/urls";
import { useForm } from "react-hook-form";
import TextFieldController from "../../../components/common/fields/TextFieldController";
import SelectFieldController from "../../../components/common/fields/SelectFieldController";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";


import ConfirmationModal from "../../../components/common/modals/ConfirmationModal";



import Accidentlist from "./ListAccident";
import MultipleSelectFieldController from "../../../components/common/fields/MultipleSelectFieldController";
import { userDetailsSelector } from "../../../rdxsga/redux/slices/userSlice";
import { AccidentCreateValidationSchema } from "../../../helper/validation/AccidentValidation";
import { useAccidentApi } from "../../../rdxsga/hooks/actions/accident/accidentApiHook";
import { getColorNameByCode } from "../../../config";


const Accidentadd = () => {
 const { user: { id: hcfId } } = useSelector(userDetailsSelector);
  const accidentApi =useAccidentApi()

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState(null);
  const [shouldRefresh, setShouldRefresh] = useState("")

  const { control, handleSubmit, reset, watch } = useForm({
    resolver: yupResolver(AccidentCreateValidationSchema),
    defaultValues: {
      events: "",
      authority_informed: "",
      waste_involved: [],
      assessment: "",
      measures_taken: "",
      steps_to_alleviate: "",
      steps_to_prevent: "",
      emergency_control_policy: "",
      emergency_policy_details:""
    }
  })





  const doAccident = (data) => {
    const wasteInvolved = data?.waste_involved?.toString()
  const newData = {
    ...data,
    waste_involved: wasteInvolved
  };

  setShowConfirmation(true);
  setFormData(newData);
  };

  const confirmSubmission = () => {
    const d = { hcfId, ...formData };

    accidentApi.calladdAccident(d, (message, resp) => {
      toast.success(message);
      reset()
      setShouldRefresh(new Date())
    }, (message, resp) => {
      toast.error(message)
    })


    setShowConfirmation(false);
  }
 


  return (
    <>
      <div className="rounded-sm mt-5 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="w-full border-stroke dark:border-strokedark ">
          <div className="w-full  p-10 sm:p-15 xl:p-17 ">

            <h5 className="mb-5 text-2xl font-bold text-black dark:text-white sm:text-title-lg-2">
              Accident Details
            </h5>
            <form onSubmit={handleSubmit(doAccident)}>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6 items-center'>

                  <TextFieldController
                    control={control}
                    name={"events"}
                    label={"Event Name"}
                    required
                     />
              
                 <MultipleSelectFieldController
                control={control}
                name={"waste_involved"}
                label={"Waste Involved"}
                placeholder={"Select "}
                options={[1, 2, 3, 4, 5].map(d => ({ value: d, label: getColorNameByCode(d) }))}
              />
                          
                  <TextFieldController
                    control={control}
                    name={"assessment"}
                    label={"Assesment"}
                    required
                     />

                  <TextFieldController
                    control={control}
                    name={"measures_taken"}
                    label={"Measurement Taken"}
                    required
                  />

                  <TextFieldController
                    control={control}
                    name={"steps_to_prevent"}
                    label={"Steps to prevent"}
                    required
                  />
                  <TextFieldController
                    control={control}
                    name={"steps_to_alleviate"}
                    label={"Steps to Elevate"}
                    required
                  />
                  <TextFieldController
                    control={control}
                    name={"emergency_policy_details"}
                    label={"Emergency Control Details"}
                    required
                  />
               
                  <SelectFieldController
                    control={control}
                    name={"emergency_control_policy"}
                    label={"Emergency Control Policy"}
                     options={[
                            { label: 'Yes', value: true },
                            { label: 'No', value: false },
                          ]}
                    required
                  />
                
                  <SelectFieldController
                    control={control}
                    name={"authority_informed"}
                    label={"Authority Informed"}
                     options={[
                            { label: 'Yes', value: true },
                            { label: 'No', value: false },
                          ]}
                    required
                  />
     
              </div>

            <div className="mt-5 text-center">
            <Button
              color="blue"
              className="w-1/4 mx-auto mt-10"
              type='submit'>
              Submit
            </Button>
          </div>

            </form>

          </div>
        </div>
      </div>
       <ConfirmationModal
        open={showConfirmation}
        onConfirm={confirmSubmission}
        onCancel={() => setShowConfirmation(false)}
        header="Confirm Submission"
        body="Are you sure you want to submit the form?"
      />
      <br />
<div className="my-8" />
      <Accidentlist refreshList={shouldRefresh} setShouldRefresh={setShouldRefresh} />
    </>
  );
};

export default Accidentadd;

