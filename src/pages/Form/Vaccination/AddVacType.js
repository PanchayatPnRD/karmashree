import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import TextFieldController from "../../../components/common/fields/TextFieldController";
import ConfirmationModal from "../../../components/common/modals/ConfirmationModal";
import { toast } from "react-toastify";
import { useState } from "react";
import { useVaccinetApi } from "../../../rdxsga/hooks/actions/vaccine/vaccineApiHook";
import { VaccineCreateValidationSchema } from "../../../helper/validation/VaccineValidation";



const VaccineTypeadd = () => {
  
  const vaccineApi = useVaccinetApi();

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState(null);
  const [shouldRefresh, setShouldRefresh] = useState("");

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(VaccineCreateValidationSchema),
      defaultValues: {
          vc_name: " "
      }
  });

  const doVaccineType = (data) => {
    setShowConfirmation(true);
    setFormData(data);
  };

  const confirmSubmission = () => {
    const d = { ...formData };

    vaccineApi.calladdVaccineType(d, (message, resp) => {
      toast.success(message);
      reset();
      setShouldRefresh(new Date());
    }, (message, resp) => {
      toast.error(message);
    });

    setShowConfirmation(false);
  };

  return (
    <>
      <div className="rounded-sm mt-5 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="w-full border-stroke dark:border-strokedark">
          <div className="w-full  p-10 sm:p-15 xl:p-17 ">
            <h5 className="mb-5 text-2xl font-bold text-black dark:text-white sm:text-title-lg-2">
              Add Vaccine
            </h5>
            <form onSubmit={handleSubmit(doVaccineType)}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-1 items-center'>
               <TextFieldController
                    control={control}
                    name={"vc_name"}
                    label={"Vaccine Type"}
                    required
                     />
                <div className="mb-4 text-left">
               <Button
              color="blue"
              className="w-1/4 mx-auto mt-10"
              type='submit'>
              Submit
            </Button>
</div>
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
    </>
  );
};

export default VaccineTypeadd;
