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
import { userDetailsSelector } from "../../../rdxsga/redux/slices/userSlice";
import Vaccinelist from "./ListVac";
import VaccineTypeadd from "./AddVacType";
import { useVaccinetApi } from "../../../rdxsga/hooks/actions/vaccine/vaccineApiHook";
import { VaccineAddValidationSchema } from "../../../helper/validation/VaccineAddValidation";
import { vaccineSelector } from "../../../rdxsga/redux/slices/vaccineSlice";





const Vaccineadd = () => {
const { user: { id: hcfId } } = useSelector(userDetailsSelector);
 const vaccApi = useVaccinetApi()
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState(null);
  const [shouldRefresh, setShouldRefresh] = useState("")
const {vaccineTypeList } = useSelector(vaccineSelector)
  const { control, handleSubmit, reset, watch } = useForm({
    resolver:yupResolver(VaccineAddValidationSchema),
    defaultValues: { 
      vaccine_type: "",
      number_of_employee: "",
      vaccination_date: "",
      staff_vaccinated: "",
      staff_notVaccinated:""
    }
  })





  const doAddVac= (data) => {
    setShowConfirmation(true);
    setFormData(data);
  };

 const confirmSubmission = () => {
    const d = { hcfId, ...formData };

    vaccApi.calladdVaccine(d, (message, resp) => {
      toast.success(message);
      reset();
      setShouldRefresh(new Date());
    }, (message, resp) => {
      toast.error(message);
    });

    setShowConfirmation(false);
  };
 useEffect(() => {
    vaccApi.callAllListVaccine({}, (message, resp) => {
      
      console.log(resp)
    }, (message, resp) => {
      toast.error(message)
    })
     }, [])

   

  return (
    <>
      <VaccineTypeadd />
      
      <div className="rounded-sm mt-5 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="w-full border-stroke dark:border-strokedark ">
          <div className="w-full  p-10 sm:p-15 xl:p-17 ">

            <h5 className="mb-5 text-2xl font-bold text-black dark:text-white sm:text-title-lg-2">
              Vaccine Details
            </h5>
            <form onSubmit={handleSubmit(doAddVac)}>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6 items-center'>
                 <TextFieldController
                    control={control}
                    name={"number_of_employee"}
                    label={"No. of Employees"}
                    required
                     />
              
                 <SelectFieldController
  control={control}
  name={"vaccine_type"}
  label={"Vaccine Type"}
     options={vaccineTypeList ? vaccineTypeList.map(d => ({label: d?.vc_name, value: d?.id })) : []}
  required
/>
               
                  <TextFieldController
                    control={control}
                    name={"vaccination_date"}
                    label={"Vaccination Date"}
                    type="date"
                    required
                />
                 <TextFieldController
                    control={control}
                    name={"staff_vaccinated"}
                  label={"Vaccinated Staff"}
                  type="number"
                    required
                />
                <TextFieldController
                    control={control}
                    name={"staff_notVaccinated"}
                   label={"Non Vaccinated Staff"}
                   type="number"
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
      <Vaccinelist refreshList={shouldRefresh} setShouldRefresh={setShouldRefresh} />
    </>
  );
};

export default Vaccineadd;
