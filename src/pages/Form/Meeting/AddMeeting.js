import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button
} from "@material-tailwind/react"
import { useForm } from "react-hook-form";
import TextFieldController from "../../../components/common/fields/TextFieldController";
import SelectFieldController from "../../../components/common/fields/SelectFieldController";
import TextAreaFieldController from "../../../components/common/fields/TextareaFieldController";
import { useEffect, useState } from "react";

import ConfirmationModal from "../../../components/common/modals/ConfirmationModal";
import FileUploadController from "../../../components/common/fields/FileUploadFieldController";
import Meetinglist from "./ListMeeting";
import { MeetingCreateValidation } from "../../../helper/validation/MeetingValidation";
import { fileToBase64 } from "../../../config";
import { useSelector } from "react-redux";
import { userDetailsSelector } from "../../../rdxsga/redux/slices/userSlice";
import { useMeetingApi } from "../../../rdxsga/hooks/actions/meeting/meetApiHook";
import { toast } from "react-toastify";


const Meetingadd = () => {
  const { user: { id: hcf_id } } = useSelector(userDetailsSelector);
  const meetingApi = useMeetingApi()

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState(null);
  const [shouldRefresh, setShouldRefresh] = useState("")

  const { control, handleSubmit, reset, watch } = useForm({
    resolver: yupResolver(MeetingCreateValidation),
    defaultValues: {
      meeting_head: "",
      meeting_doc: "",
      meeting_schedule: "",
      meeting_brief: "",
      meeting_link: "",
      meeting_called: ""
    }
  })





  const doMeeting = (data) => {
    setShowConfirmation(true);
    setFormData(data);
  };

  const confirmSubmission = () => {
    const d = {hcf_id, ...formData };

    meetingApi.calladdMeet(d, (message, resp) => {
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
              Meeting Management
            </h5>
            <form onSubmit={handleSubmit(doMeeting)}>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6 items-center'>
                <div className="mb-1">
                  <TextFieldController
                    control={control}
                    name={"meeting_head"}
                    label={"Meeting Title"}
                    required
                  />
                </div>

                <TextFieldController
                  control={control}
                  name={"meeting_schedule"}
                  label={"Meeting Schedule"}
                  placeholder={"Enter date"}
                  type="date"
                />

                <div className="mb-1">
                  <TextFieldController
                    control={control}
                    name={"meeting_brief"}
                    label={"Meeting Agenda"}
                    required
                  />
                </div>

               <div className="mb-1">
                  <SelectFieldController
                    control={control}
                    name={"meeting_link"}
                    label={"Meeting Type"}
                     options={[
                            { label: 'Online', value: "online" },
                            { label: 'Offline', value: "offline" },
                          ]}
                    required
                  />
                </div>
                
                <div className="mb-1">
                  <TextFieldController
                    control={control}
                    name={"meeting_called"}
                    label={"Meeting Organiser"}
                    required
                  />
                </div>
                <div className="mb-1">
                  <FileUploadController
                    control={control}
                    name={"meeting_doc"}
                    label={"Meeting Document"}
                    required
                  />
                </div>
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
      <Meetinglist refreshList={shouldRefresh} setShouldRefresh={setShouldRefresh} />
    </>
  );
};

export default Meetingadd;

