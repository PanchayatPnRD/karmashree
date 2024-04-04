
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  Input,
  Select,
  Option,
  Textarea,
  Button
} from "@material-tailwind/react"
import { ResetpasswordValidationSchema } from "../../helper/validation/ResetpasswordValidation";
import TextFieldController from "../../components/common/fields/TextFieldController";
import { useUserApi } from "../../rdxsga/hooks/actions/user/useUserApiHook";
import { useSelector } from "react-redux";
import { userDetailsSelector } from "../../rdxsga/redux/slices/userSlice";
import { toast } from "react-toastify";


const Resetpassword = () => {

  const userApi = useUserApi();
  const { user: { email } } = useSelector(userDetailsSelector);
  const [showHide, setShowHide] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(ResetpasswordValidationSchema),
    defaultValues: {
      confirm_password: "",
      new_password: "",
      old_password: ""
    }
  })



  const doReset = (data) => {
    userApi.callChangePassword({ current_password: data?.old_password, new_password: data?.confirm_password, email }, (message, resp) => {
      toast.success(message)
      reset();
    }, (message, resp) => {
      toast.error(message);
    })
  }

  return (
    <div className="h-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="h-full w-full border-stroke dark:border-strokedark">
        <div className="h-full w-full p-10 sm:p-15 xl:p-17 ">
          <h5 className="mb-5 text-2xl font-bold text-black dark:text-white sm:text-title-lg-2">
            Reset Health Care Facility Password
          </h5>
          <form onSubmit={handleSubmit(doReset)} className="w-full flex justify-center items-center">
            <div className='w-1/2 grid grid-cols-1 md:grid-cols-1 grid-rows-3 gap-6 items-center'>

              <div className="mb-1">
                <TextFieldController
                  type={showHide ? "text" : "password"}
                  control={control}
                  fullWidth
                  name={"old_password"}
                  label={"Old Password"}
                  placeholder={"Enter password"}
                  required
                />
              </div>

              <div className="mb-1">
                <TextFieldController
                  type={showHide ? "text" : "password"}
                  control={control}
                  name={"new_password"}
                  label={"New Password"}
                  required
                  fullWidth

                />
              </div>
              <div className="mb-1">
                <TextFieldController
                  type={showHide ? "text" : "password"}
                  fullWidth
                  control={control}
                  name={"confirm_password"}
                  label={"Confirm New Password"}
                  required

                />
              </div>

              <div className="mb-1 flex justify-start items-center">
                <input type="checkbox" id="showHide" checked={showHide} className="me-2" onClick={(d) => setShowHide(d => !d)} />
                <label
                  role="button"
                  htmlFor="showHide" >{!showHide ? "Show " : "Hide "} Password</label>
              </div>

              <div className="mt-5 text-center">
                <Button
                  type="submit"
                  color="blue"
                  className="w-full mx-auto" // Adjust the width as needed (e.g., w-1/2 for 50% width)
                >
                  Reset
                </Button>

              </div>


            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Resetpassword;
