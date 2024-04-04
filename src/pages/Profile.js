import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button, IconButton
} from "@material-tailwind/react"
import { useForm } from "react-hook-form";
import TextFieldController from "../components/common/fields/TextFieldController";
import SelectFieldController from "../components/common/fields/SelectFieldController";
import TextAreaFieldController from "../components/common/fields/TextareaFieldController";
import { useUserApi } from "../rdxsga/hooks/actions/user/useUserApiHook";
import { useSelector } from "react-redux";
import { registerSelector } from "../rdxsga/redux/slices/registrationSlice";
import { useEffect } from "react";
import { ProfileValidationSchema } from "../helper/validation/ProfileValidation";
import { userDetailsSelector } from "../rdxsga/redux/slices/userSlice";
import { profileSelector } from "../rdxsga/redux/slices/profileSlice";
import { toast } from "react-toastify";
import SwitchFieldController from "../components/common/fields/SwitchFieldController";
import { qrSelector } from "../rdxsga/redux/slices/qrSlice";

import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';
import { downloadQrCode } from "../config/function";
import { FaDownload } from "react-icons/fa6";

const Profile = () => {

  const userApi = useUserApi();
  const { fetching, profileData: userDetail } = useSelector(profileSelector)
  const { user: { id, full_name } } = useSelector(userDetailsSelector)
  const { qrView } = useSelector(qrSelector);


  const {
    isRegistering,
    isFetching,
    dropDownData
  } = useSelector(registerSelector);

  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(ProfileValidationSchema)
  })



  // console.log(errors)
  const doProfile = (data) => {
    userApi.callUpdateProfileData({ ...data, id }, (message, resp) => {
      toast.success(message);
    }, (message, resp) => {
      toast.error(message)
    })
  }

  useEffect(() => {
    // console.log(id)
    userApi.callGetProfileData({ id }, (message, resp) => {
      // console.log(message, resp);
    }, (message, resp) => {
      toast.error(message);
      // console.log("Error Occured", message, resp)
    })

    setTimeout(() => {
      userApi.calldropDownData({}, (message, resp) => {
        // console.log("success", message, resp)
      }, (message, resp) => {
        // console.log("error", message, resp)
      })
    }, 1000)

    setTimeout(() => {
      userApi.callViewHospitalQr({ hospitalId: id }, (message, resp) => {
        toast.success(message)
        // console.log(message, resp);
      }, (message, resp) => {
        // console.log(message, resp);
        toast.error(message)
      })
    }, 600)
  }, [])



  useEffect(() => {
    if (userDetail) {
      console.log(userDetail)
      Object.keys(userDetail).map(d => {
        // console.log(`Setted -> ${d} -> ${userDetail[d]}`)
        setValue(d, userDetail[d])
      })
    }
  }, [userDetail])

  return (
    <div className="h-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="w-full flex justify-evenly items-center py-6 px-30 rounded">
        <div className="w-full flex-col items-center">
          <span className="text-center text-base font-bold mb-5">{qrView?.btf?.name_organization}</span>
          <QRCodeCanvas
            size={200}
            className="p-5 border border-black bg-white rounded"
            value={qrView?.qr_num}
            id={full_name}
          />
          <span className="text-center text-base font-bold mt-5">{userDetail?.name_organization}</span>
        </div>
        <div>
          <IconButton
            className="p-10"
            onClick={() => downloadQrCode(
              full_name,
              `${userDetail?.name_organization?.replace(" ", "_")}_qr.png`,
              qrView?.hcf?.name_organization,
              qrView?.btf?.name_organization
            )}
            variant="text">
            <FaDownload className="text-black dark:text-white" size={40} />
          </IconButton>
        </div>
      </div>
      <div className="h-full w-full border-stroke dark:border-strokedark">
        <div className="h-full w-full p-10 sm:p-15 xl:p-17 ">
          <h5 className="mb-5 text-2xl font-bold text-black dark:text-white sm:text-title-lg-2">
            Health Care Facility Profile
          </h5>
          {
            fetching ? "Fetching ..." : <form onSubmit={handleSubmit(doProfile)}>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6 items-center'>
                <div className="mb-1">
                  <TextFieldController
                    control={control}
                    name={"name_organization"}
                    label={"Health Care Facility Name"}
                    placeholder={"Enter your hospital name"}
                    required
                  />
                </div>
                <div className="mb-1">
                  <SelectFieldController
                    control={control}
                    name={"hcf_type_id"}
                    label={"HCF Type"}
                    options={dropDownData?.Hospital_type?.map((d, i) => ({ value: d?.id, label: d?.name }))}
                    required
                  />
                </div>

                <div className="mb-1">
                  <TextFieldController
                    control={control}
                    name={"h_tag"}
                    label={"HCF Tag"}
                    required
                  />
                </div>

                <div className="mb-1">
                  <TextFieldController
                    control={control}
                    name={"email"}
                    label={"Email"}
                    required={true}
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
                    name={"district_id"}
                    label={"District"}
                    options={dropDownData?.district?.map((d, i) => ({ value: d?.id, label: d?.name }))}
                    required
                  />
                </div>
                <div className="mb-1">
                  <SelectFieldController
                    control={control}
                    name={"pcb_id"}
                    label={"PCB"}
                    options={dropDownData?.district?.map((d, i) => ({ value: d?.id, label: d?.name }))}
                    required
                  />
                </div>


                <div className="mb-1">
                  <TextFieldController
                    control={control}
                    name={"ID_Card_Num"}
                    label={"Id Card Number"}
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
                <div className="mb-1">
                  <TextFieldController
                    control={control}
                    name={"mob_no"}
                    label={"Mobile No. of Authorized Person"}
                    required
                  />
                </div>
                <div className="mb-1">
                  <TextFieldController
                    control={control}
                    name={"designation"}
                    label={"Designation of Authorized Person"}
                    required
                  />
                </div>
                <div className="mb-1">
                  <TextFieldController
                    control={control}
                    name={"fax"}
                    label={"Fax"}
                    required
                  />
                </div>
                <div className="mb-1">
                  <TextFieldController
                    control={control}
                    name={"gps_lat"}
                    label={"GPS Latitude"}
                    type="number"
                    required
                  />
                </div>
                <div className="mb-1">
                  <TextFieldController
                    control={control}
                    name={"gps_long"}
                    label={"GPS Longitude"}
                    type="number"
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
                    name={"valid_through"}
                    label={"Validation Through"}
                    type="date"
                    required
                  />
                </div>
                <div className="mb-1">
                  <TextFieldController
                    control={control}
                    name={"attachment_authority"}
                    label={"Attatchment Authority"}
                    type="text"
                    required
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
                  <SwitchFieldController
                    control={control}
                    name={"bed_enabled"}
                    label={"Bed Enabled"}
                    required
                  />
                </div>

                <div className="mb-1">
                  <TextFieldController
                    control={control}
                    name={"license_num"}
                    label={"Lisence No."}
                    type="number"
                    required
                  />
                </div>
                <div className="mb-1">
                  <TextFieldController
                    control={control}
                    name={"valid_thru"}
                    label={"Validation Through(Lisence No)"}
                    type="date"
                    required
                  />
                </div>

                <div className="">
                  <SelectFieldController
                    control={control}
                    name={"treatment_facility_id"}
                    label={"Treatment Facility Name"}
                    options={dropDownData?.Ttreatment_facility?.map((d, i) => ({ value: d?.id, label: d?.name_organization }))}
                    required
                  />
                </div>
                <div className="mb-1">
                  <SwitchFieldController
                    control={control}
                    name={"storage_enabled"}
                    label={"Storage Enabled"}
                    required
                  />
                </div>
                <div className="mb-1">
                  <TextFieldController
                    control={control}
                    name={"storage_details"}
                    label={"Storage Details"}
                    required
                  />
                </div>
                <div className="mb-1">
                  <TextFieldController
                    control={control}
                    name={"pretreatment_facility"}
                    label={"Pre Treatment Facility"}
                    required
                  />
                </div>
                <div className="mb-1">
                  <SwitchFieldController
                    control={control}
                    name={"enabled_aqms"}
                    label={"Enabled aqms"}
                    required
                  />
                </div>
                <div className="mb-1">
                  <TextFieldController
                    control={control}
                    name={""}
                    label={"Aqms manuf"}
                    required
                  />
                </div>
                <div className="mb-1">
                  <TextFieldController
                    control={control}
                    name={"aqms_doi"}
                    label={"Aqms doi"}
                    type="date"
                    required
                  />
                </div>
                <div className="mb-1">
                  <TextFieldController
                    control={control}
                    name={"aqms_quantt"}
                    label={"Aqms quant"}
                    required
                  />
                </div>
                <div className="mb-1">
                  <SwitchFieldController
                    control={control}
                    name={"enabled_anms"}
                    label={"Enabled anms"}
                    required
                  />
                </div>
                <div className="mb-1">
                  <TextFieldController
                    control={control}
                    name={"manfac_anms"}
                    label={"Manuf anms"}
                    required
                  />
                </div>
                <div className="mb-1">
                  <TextFieldController
                    control={control}
                    name={"doi_anms"}
                    label={"Doi anms"}
                    type="date"
                    required
                  />
                </div>
                <div className="mb-1">
                  <TextFieldController
                    control={control}
                    name={"quan_anms"}
                    label={"Quant anms"}
                    required
                  />
                </div>
                <div className="mb-1">
                  <SwitchFieldController
                    control={control}
                    name={"enabled_board"}
                    label={"Enabled Board"}
                    required
                  />
                </div>
                <div className="mb-1">
                  <TextFieldController
                    control={control}
                    name={"manufac_board"}
                    label={"Manfac Board"}
                    required
                  />
                </div>
                <div className="mb-1">
                  <TextFieldController
                    control={control}
                    name={"doi_board"}
                    label={"Doi Board"}
                    type="date"
                    required
                  />
                </div>
                <div className="mb-1">
                  <TextFieldController
                    control={control}
                    name={"quan_board"}
                    label={"Quant Board"}
                    required
                  />
                </div>
                <div className="mb-1">
                  <TextFieldController
                    control={control}
                    name={"doi_etp"}
                    label={"DoI Etp"}
                    type="date"
                    required
                  />
                </div>
                <div className="mb-1">
                  <TextFieldController
                    control={control}
                    name={"cap_etp"}
                    label={"Cap Etp"}
                    required
                  />
                </div>

                <div className="mb-1">
                  <TextFieldController
                    control={control}
                    name={"damc_validity"}
                    label={"Damc Validity"}
                    type="date"
                    required
                  />
                </div>

                <div className="mb-1">
                  <TextAreaFieldController
                    control={control}
                    name={"address"}
                    label={"Addresses"}
                    type="text"
                    required
                  />
                </div>
                <div className="mb-1">
                  <TextAreaFieldController
                    control={control}
                    name={"web_address"}
                    label={"Web Addresses"}
                    type="text"
                    required
                  />
                </div>



              </div>

              <div className="mt-5 text-center">
                <Button
                  color="blue"
                  className="w-1/4 mt-10 mx-auto"
                  type='submit'>
                  Update
                </Button>
              </div>
            </form>
          }
        </div>
      </div>
    </div>
  );
};

export default Profile;
