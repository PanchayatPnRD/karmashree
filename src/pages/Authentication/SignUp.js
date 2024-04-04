
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import {
  Input,
  Select,
  Option,
  Textarea
} from "@material-tailwind/react"
import { useForm } from "react-hook-form";
import TextFieldController from "../../components/common/fields/TextFieldController";
import { RegistrationValidationSchema } from "../../helper/validation/RegistrationValidation";
import SelectFieldController from "../../components/common/fields/SelectFieldController";
import TextAreaFieldController from "../../components/common/fields/TextareaFieldController";
import { APP_LINK } from "../../config/urls";
import { useUserApi } from "../../rdxsga/hooks/actions/user/useUserApiHook";
import { useSelector } from "react-redux";
import { registerSelector } from "../../rdxsga/redux/slices/registrationSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import FileUploadController from "../../components/common/fields/FileUploadFieldController";


const Registration = () => {

  const userApi = useUserApi();
  const navigate = useNavigate();

  const {
    isRegistering,
    isFetching,
    dropDownData
  } = useSelector(registerSelector);

  const { control, handleSubmit, reset, getValues } = useForm({
    resolver: yupResolver(RegistrationValidationSchema)
  })



  const doRegistration = (data) => {
    userApi.callRegisterUser(
      { ...data, role_id: 3 },
      (message, resp) => {
        console.log("success", message, resp)
        reset();
        toast.success("Registration Successfull !")
        navigate(APP_LINK.LOGIN)

      },
      (message, resp) => {
        console.log("error", message, resp)
        toast.error(message ?? "Something went wrong !")
      }
    )
  }

  useEffect(() => {
    userApi.calldropDownData({}, (message, resp) => {
      console.log("success", message, resp)
    }, (message, resp) => {
      console.log("error", message, resp)

    })
  }, [])

  return (
    <div className="h-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="h-full w-full border-stroke dark:border-strokedark">
        <div className="h-full w-full p-10 sm:p-15 xl:p-17 ">
          <h5 className="mb-5 text-2xl font-bold text-black dark:text-white sm:text-title-lg-2">
            Register Health Care Facility
          </h5>
          <form onSubmit={handleSubmit(doRegistration)}>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 items-center'>
              <div className="mb-1">
                <TextFieldController
                  control={control}
                  name={"name_organization"}
                  label={"Hospital Name"}
                  placeholder={"Enter your hospital name"}
                  required
                />
              </div>
              <div className="mb-1">
                <TextFieldController
                  control={control}
                  name={"area"}
                  label={"Area"}
                  required
                />
              </div>
              <div className="mb-1">
                <TextFieldController
                  control={control}
                  name={"city"}
                  label={"City"}
                  required
                />
              </div>

              <div className="mb-1">
                <SelectFieldController
                  control={control}
                  name={"hcf_type_id"}
                  label={"Hospital Type"}
                  options={dropDownData?.Hospital_type?.map((d, i) => ({ value: d?.id, label: d?.name }))}
                  required
                />
              </div>

              <div className="mb-1">
                <SelectFieldController
                  control={control}
                  name={"district_id"}
                  label={"District"}
                  options={dropDownData?.district?.map((d, i) => ({ value: d?.id, label: d?.name }))}
                  required
                />
              </div>
              <div className="mb-1">
                <TextFieldController
                  control={control}
                  name={"mob_no"}
                  label={"Mobile No."}
                  required
                />
              </div>
              <div className="mb-1">
                <SelectFieldController
                  control={control}
                  name={"ownership_id"}
                  label={"Ownership Type"}
                  options={dropDownData?.Ownership_type?.map((d, i) => ({ value: d?.id, label: d?.name }))}
                  required
                />
              </div>
              <div className="mb-1">
                <TextFieldController
                  control={control}
                  name={"authorised_person"}
                  label={"Authorized Person Name"}
                  required={true}
                />
              </div>
              <div className="">
                <SelectFieldController
                  control={control}
                  name={"treatment_facility_id"}
                  label={"Treatment Facility"}
                  options={dropDownData?.Ttreatment_facility?.map((d, i) => ({ value: d?.id, label: d?.name_organization }))}
                  required
                />
              </div>

              <div className="mb-1">
                <TextFieldController
                  control={control}
                  name={"email"}
                  label={"Hospital Email"}
                  required={true}

                />
              </div>
              <div className="mb-1">
                <TextFieldController
                  control={control}
                  name={"bed_size"}
                  label={"Bed Size"}
                  type="number"
                  required
                />
              </div>


              <div className="mb-1">
                <FileUploadController
                  control={control}
                  name={"cto"}
                  label={"CTO"}
                />
              </div>

              <div className="mb-1">
                <TextFieldController
                  control={control}
                  name={"cto_date"}
                  label={"CTO Date"}
                  type="date"
                />
              </div>

              <div className="mb-1">
                <FileUploadController
                  control={control}
                  name={"cte"}
                  label={"CTE"}
                />
              </div>


              <div className="mb-1">
                <TextFieldController
                  control={control}
                  name={"cte_date"}
                  label={"CTE Date"}
                  type="date"
                />
              </div>

              <div className="mb-1">
                <TextFieldController
                  control={control}
                  name={"password"}
                  label={"Password"}
                  type="password"
                  required
                />
              </div>
              <div className="mb-1">
                <TextFieldController
                  control={control}
                  name={"confirm_password"}
                  label={"Confirm Password"}
                  type="password"
                  required
                />
              </div>
              <div className="mb-1">
                <TextAreaFieldController
                  control={control}
                  name={"address"}
                  label={"Address"}
                  type="text"
                  required
                />
              </div>



            </div>

            <div className="mt-5">
              <input
                type="submit"
                value="Create account"
                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
              />
              <div className="mt-6 text-center">
                <p>
                  <Link to={APP_LINK.LOGIN} className="text-primary">
                    <b style={{ fontSize: '18px' }}> Back to Sign In</b>
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
