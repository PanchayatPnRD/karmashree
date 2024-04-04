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


import SwitchFieldController from "../../../components/common/fields/SwitchFieldController";

import TrainingList from "./ListTraining";
import { useTrainingApi } from "../../../rdxsga/hooks/actions/training/trainApiHook";
import {  TrainingCreateValidationSchema } from "../../../helper/validation/TrainingValidation";
import { userDetailsSelector } from "../../../rdxsga/redux/slices/userSlice";


const Trainingadd = () => {

 const { user: { id: hcfId } } = useSelector(userDetailsSelector);
  const trainingApi = useTrainingApi()

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState(null);
  const [shouldRefresh, setShouldRefresh] = useState("")

  const { control, handleSubmit, reset, watch } = useForm({
    resolver: yupResolver(TrainingCreateValidationSchema),
    defaultValues: { 
      meeting_type: "",
      meeting_schedule: "",
      operated_by: "",
      others: "",
      no_of_emp:""
    }
  })


const showhide = watch('operated_by');


  const doTraining = (data) => {
    setShowConfirmation(true);
    setFormData(data);
  };

  const confirmSubmission = () => {
    const d = {hcfId, hospitals:" ", ...formData };

   trainingApi.calladdTrain(d, (message, resp) => {
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
              Training Details
            </h5>
            <form onSubmit={handleSubmit(doTraining)}>
               <div className='grid grid-cols-1 md:grid-cols-4 gap-6 items-center'>

           
                  <SelectFieldController
                    control={control}
                    name={"meeting_type"}
                    label={"Meeting Type"}
                     options={[
                            { label: 'Online', value: "online" },
                            { label: 'Offline', value: "offline" },
                          ]}
                    required
                  />
               
          
                  <SelectFieldController
                    control={control}
                    name={"operated_by"}
                    label={"Organised By"}
                     options={[
                       { label: 'Self', value: "self" },
                       { label: 'Treatment Facility', value: "treatment facility" },
                       { label: 'Other', value: "other" },
                          ]}
                    required
                  />
                

                {showhide === 'other' && (
                  <>
                   
                      <TextFieldController
                        control={control}
                        name={"others"}
                        label={"Other Organisers"}
                        required
                      />
                  
                  </>
                )}
                  
                      <TextFieldController
                        control={control}
                        name={"no_of_emp"}
                        label={"No of Employees"}
                        required
                      />
                  
  
                  <TextFieldController
                    control={control}
                    name={"meeting_schedule"}
                    label={"Meeting Schedule"}
                    type="date"
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
      <TrainingList refreshList={shouldRefresh} setShouldRefresh={setShouldRefresh} />
    </>
  );
};

export default Trainingadd;

