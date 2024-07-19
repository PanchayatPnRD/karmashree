import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  getAllDistrictActionList,
  getAllGramPanchayatList,
} from "../../Service/ActionPlan/ActionPlanService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addCreateContractor } from "../../Service/Contractor/ContractorService";
import { useNavigate } from "react-router-dom";
import SuccessModal from "../../components/SuccessModal";
import BreadCrumb from "../../components/BreadCrumb";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetch } from "../../functions/Fetchfunctions";

const Contractor = () => {
  const jsonString = sessionStorage.getItem("karmashree_User");
  const data = JSON.parse(jsonString);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [area, setArea] = useState("");
  const [allDistrictList, setAllDistrictList] = useState([]);
  const [allMunicipalityList, setAllMunicipalityList] = useState([]);
  const [municipality, setMunicipality] = useState();
  const [allBlockList, setAllBlockList] = useState([]);
  const [gp, setGP] = useState();
  const [block, setBlock] = useState();
  const [district, setDistrict] = useState("");
  const [allGpList, setAllGpList] = useState([]);
  const [contractorName, setContractorName] = useState("");
  const [gstin, setGSTIN] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isValidContractorName, setIsValidContractorName] = useState(true);
  const [panNumber, setPanNumber] = useState("");
  const [isValidPan, setIsValidPan] = useState(true);
  const [mobileNumber, setMobileNumber] = useState("");
  const [isValidMobile, setIsValidMobile] = useState(true);
  const [address, setAddress] = useState("");
  const [isValidAddress, setIsValidAddress] = useState(true);
  const [village, setVillage] = useState("");
  const [isValidVillage, setIsValidVillage] = useState(true);
  const [policeStation, setPoliceStation] = useState("");
  const [isValidPoliceStation, setIsValidPoliceStation] = useState(true);
  const [postOffice, setPostOffice] = useState("");
  const [isValidPostOffice, setIsValidPostOffice] = useState(true);
  const [pinCode, setPinCode] = useState("");
  const [isValidPinCode, setIsValidPinCode] = useState(true);
  const [userData, setUserData] = useState();

  console.log(userData?.category, "userData");
  const queryClient = useQueryClient();
  const { userIndex } = JSON.parse(sessionStorage.getItem("karmashree_User"));

  useEffect(() => {
    const jsonString = sessionStorage.getItem("karmashree_User");
    const data = JSON.parse(jsonString);
    setUserData(data);

    getAllDistrictActionList(data?.districtcode).then(function (result) {
      const response = result?.data?.result;
      setAllDistrictList(response);
    });
  }, []);

  const { data: contractorDraft } = useQuery({
    queryKey: ["contractorDraft"],
    queryFn: async () => {
      const data = await fetch.get(
        "/api/contractor/get_draft_Details/",
        userIndex
      );
      return data.data.result;
    },
    enabled: allDistrictList.length > 0,
  });

  useEffect(() => {
    if (contractorDraft != null && district == "") {
      const {
        districtcode,
        contractorName,
        contractorGSTIN,
        contractorPAN,
        contractorMobile,
        contractorAddress,
      } = contractorDraft;
      setDistrict(`${districtcode}`);
      setContractorName(contractorName);
      setGSTIN(contractorGSTIN);
      setPanNumber(contractorPAN);
      setMobileNumber(contractorMobile);
      setAddress(contractorAddress);
      console.log("data set");
    }
  }, [contractorDraft]);

  //District list

  let districtListDropdown = <option>Loading...</option>;
  if (allDistrictList && allDistrictList.length > 0) {
    districtListDropdown = allDistrictList.map((distRow, index) => (
      <option value={distRow.districtCode}>{distRow.districtName}</option>
    ));
  }

  const onArea = (e) => {
    setArea(e.target.value);
  };

  const onDistrict = (e) => {
    setDistrict(e.target.value);
    // getAllBlockList(e.target.value).then(function (result) {
    //   const response = result?.data?.result;
    //   setAllBlockList(response);
    // });

    // getAllMunicipalityList(e.target.value, 0).then(function (result) {
    //   const response = result?.data?.result;
    //   setAllMunicipalityList(response);
    // });
  };

  let blockListDropdown = <option>Loading...</option>;
  if (allBlockList && allBlockList.length > 0) {
    blockListDropdown = allBlockList.map((blockRow, index) => (
      <option value={blockRow.blockCode}>{blockRow.blockName}</option>
    ));
  }

  let municipalityListDropdown = <option>Loading...</option>;
  if (allMunicipalityList && allMunicipalityList.length > 0) {
    municipalityListDropdown = allMunicipalityList.map((munRow, index) => (
      <option value={munRow.urbanCode}>{munRow.urbanName}</option>
    ));
  }

  const onBlock = (e) => {
    setBlock(e.target.value);
    getAllGramPanchayatList(district, e.target.value).then(function (result) {
      const response = result?.data?.result;
      setAllGpList(response);
    });
  };

  let GpListDropdown = <option>Loading...</option>;
  if (allGpList && allGpList.length > 0) {
    GpListDropdown = allGpList.map((gpRow, index) => (
      <option value={gpRow.gpCode}>{gpRow.gpName}</option>
    ));
  }

  const onContractorName = (e) => {
    const value = e.target.value;
    // Regular expression to allow only alphabets and white spaces
    const regex = /^[A-Za-z\s]+$/;
    if (regex.test(value)) {
      setContractorName(value);
      setIsValidContractorName(true);
    } else {
      setIsValidContractorName(false);
      // toast.error("Please use only Alphabet characters")
    }
  };

  const handleKeyDown = (event) => {
    // Allow only alphabets and white spaces
    if (
      !(
        (event.keyCode >= 65 && event.keyCode <= 90) || // A-Z
        (event.keyCode >= 97 && event.keyCode <= 122) || // a-z
        event.keyCode === 32 ||
        event.key === "Backspace"
      )
    ) {
      event.preventDefault();
    }
  };

  // Function to extract PAN from GST number
  function extractPANFromGST(gstNumber) {
    if (gstNumber.length === 15) {
      return gstNumber.substring(2, 12);
    }
    return "";
  }

  const onGstIn = (event) => {
    const value = event.target.value;
    // Regular expression to match GSTIN format
    const regex =
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
    if (regex.test(value) || value === "") {
      setGSTIN(value);
      setIsValid(true);
    } else {
      setIsValid(false);
    }

    if (value.length === 15) {
      const extractedPan = extractPANFromGST(value);
      setPanNumber(extractedPan);
    } else {
      setPanNumber("");
    }
  };

  const onPanCard = (event) => {
    const value = event.target.value.toUpperCase(); // Convert to uppercase for consistency
    // Regular expression to match PAN format
    const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (regex.test(value) || value === "") {
      setPanNumber(value);
      setIsValidPan(true);
    } else {
      setIsValidPan(false);
    }
  };

  const onMobile = (event) => {
    const value = event.target.value;
    const regex = /^[6-9]{1}[0-9]{9}$/;
    if (regex.test(value) || value === "") {
      setMobileNumber(value);
      setIsValidMobile(true);
    } else {
      setIsValidMobile(false);
    }
  };

  const onAddress = (event) => {
    const value = event.target.value;
    const regex = /^[a-zA-Z0-9\s,\/]*$/;
    if (regex.test(value) || value === "") {
      setAddress(value);
      setIsValidAddress(true);
    } else {
      setIsValidAddress(false);
    }
  };

  const onMunicipality = (e) => {
    console.log(e.target.value, "municipality");
    setMunicipality(e.target.value);
  };

  const onGP = (e) => {
    setGP(e.target.value);
  };

  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  const getCurrentFinancialYear = () => {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();
    let financialYear = "";
    console.log(currentMonth);
    console.log(currentYear);

    // Financial year starts from April
    if (currentMonth >= 4) {
      financialYear =
        currentYear.toString() + "-" + (currentYear + 1).toString();
    } else {
      financialYear =
        (currentYear - 1).toString() + "-" + currentYear.toString();
    }

    return financialYear;
  };

  const financialYear = getCurrentFinancialYear();
  console.log(financialYear, "financialYear");
  console.log(currentMonth, "currentMonth");
  console.log(currentYear, "currentYear");
  console.log(
    data?.category === "HD"
      ? 0
      : data?.category === "Dist"
      ? data?.districtcode
      : "",
    "dadadada"
  );

  const onSubmit = (draft) => {
    // if (area === "") {
    //   toast.error("Please Select Area Type")
    // } else if (!district) {
    //   toast.error("Please Select District")
    // }
    //  else if (area === "U" && municipality === "") {
    //   toast.error("Please Select Municipality")
    // } else if (area === "R" && block === "") {
    //   toast.error("Please Select Block")
    // } else if (area === "R" && gp === "") {
    //   toast.error("Please Select Gram Panchayat")
    // }
    // else
    if (data?.category === "HQ" && district === "") {
      toast.error("Please Select a District");
    } else if (contractorName === "") {
      toast.error("Please Type Contractor Name");
    } else if (gstin === "") {
      toast.error("Please Type Contractor GSTIN");
    } else if (panNumber === "") {
      toast.error("Please Type Contractor PAN");
    } else if (mobileNumber === "") {
      toast.error("Please Type Contractor Mobile Number");
    } else if (address === "") {
      toast.error("Please Type Contractor Address");
    } else {
      addCreateContractor(
        contractorName,
        gstin,
        panNumber,
        mobileNumber,
        address,
        "A",
        data?.userIndex,
        currentMonth,
        currentYear,
        financialYear,
        data?.departmentNo,
        district ? district : data?.districtcode,
        municipality,
        block,
        gp,
        area,
        draft,
        (r) => {
          console.log(r, "response");
          if (r.errorCode == 0) {
            if (+draft == 0) setOpenModal(true);
            else toast.success("Successfully saved as Draft")
          } else {
            toast.error(r.message);
          }
        }
      );
    }
  };
  return (
    <>
      <SuccessModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        message={"Contractor Created Successfully"}
        to="contractor-list"
        // resetData={resetData}
        isSuccess={true}
      />
      <div className="flex flex-grow flex-col px-8">
        <ToastContainer />
        <BreadCrumb page={"Contractor Master"} className={"px-4"} />
        <div className="bg-white shadow-md rounded-lg pb-12">
          <div className="flex flex-col w-full mb-4 space-y-4">
            {userData?.category === "HQ" ? (
              <div className="px-4">
                <label
                  htmlFor="scheme_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  District
                  <span className="text-red-500 "> * </span>
                </label>
                <select
                  id="scheme_name"
                  name="scheme_name"
                  autoComplete="off"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  onChange={onDistrict}
                  value={district}
                >
                  <option value="" selected hidden>
                    Select District List
                  </option>
                  {districtListDropdown}
                </select>
              </div>
            ) : (
              ""
            )}
            <div className="flex items-center space-x-4">
              <div className="w-1/2 px-4">
                <label
                  htmlFor="scheme_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contractor Name <span className="text-red-500 "> * </span>
                  (Please use only Alphabet Characters)
                </label>
                <input
                  id="contractor_name"
                  name="contractor_name"
                  type="text"
                  autoComplete="off"
                  placeholder="Please Enter Contractor Name"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  value={contractorName}
                  onChange={onContractorName}
                  onKeyDown={handleKeyDown}
                />
                {!isValidContractorName && (
                  <div style={{ color: "red" }}>
                    Please enter a valid Contractor Name
                  </div>
                )}
              </div>

              <div className="w-1/2 px-4">
                <label
                  htmlFor="scheme_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contractor GSTIN <span className="text-red-500 "> * </span>
                </label>
                <input
                  id="scheme_name"
                  name="scheme_name"
                  type="text"
                  autoComplete="off"
                  placeholder="Please enter Contractor GSTIN Number"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  value={gstin}
                  onChange={onGstIn}
                  maxLength={15}
                />
                {!isValid && (
                  <div className="text-red-500">Please enter a valid GSTIN</div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-1/2 px-4">
                <label
                  htmlFor="scheme_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contractor PAN
                  <span className="text-red-500 "> * </span>
                </label>
                <input
                  id="scheme_name"
                  name="scheme_name"
                  type="text"
                  autoComplete="off"
                  placeholder="Please Enter Contractor Pan Number"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                  // onChange={onPanCard}
                  value={panNumber}
                />
                {!isValidPan && (
                  <div style={{ color: "red" }}>
                    Please enter a valid PAN Number
                  </div>
                )}
              </div>
              <div className="w-1/2 px-4">
                <label
                  htmlFor="scheme_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contractor Mobile
                  <span className="text-red-500 "> * </span>
                </label>
                <input
                  id="scheme_name"
                  name="scheme_name"
                  type="text"
                  autoComplete="off"
                  placeholder="Please Enter Contractor Mobile Number"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                  value={mobileNumber}
                  onChange={onMobile}
                  maxLength={10}
                />
                {!isValidMobile && (
                  <div style={{ color: "red" }}>
                    Please enter a valid Mobile Number
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full mb-4">
            <div className="px-4">
              <label
                htmlFor="scheme_name"
                className="block text-sm font-medium text-gray-700"
              >
                Contractor Address
                <span className="text-red-500 "> * </span>
              </label>
              <input
                id="scheme_name"
                name="scheme_name"
                type="text"
                autoComplete="off"
                placeholder="Please Enter Contractor Address"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                value={address}
                onChange={onAddress}
              />
              {!isValidAddress && (
                <div style={{ color: "red" }}>Please enter a valid Address</div>
              )}
            </div>
          </div>

          <div className="flex justify-center items-center space-x-8">
            <button
              type="button"
              className="w-1/6 py-2 px-4 border mt-10 border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => onSubmit("0")}
            >
              Submit
            </button>
            <button
              type="button"
              className="w-1/6 py-2 px-4 border mt-10 border-transparent rounded-md shadow-sm text-indigo-600 border-1 border-indigo-600 bg-white hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => onSubmit("1")}
              // onClick={() => toast.success("Successfully saved as Draft")}
            >
              Draft
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contractor;
