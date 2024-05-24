import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  getAllDistrictActionList, getAllBlockList, getAllMunicipalityList,
  getAllGramPanchayatList, getAllSectorActionList, addCreateAction
} from "../../Service/ActionPlan/ActionPlanService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addCreateContractor } from "../../Service/Contractor/ContractorService";
import { useNavigate } from "react-router-dom";
import SuccessModal from "../../components/SuccessModal";

const Contractor = () => {
  const jsonString = localStorage.getItem("karmashree_User");
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
  const [district, setDistrict] = useState();
  const [allGpList, setAllGpList] = useState([]);
  const [contractorName, setContractorName] = useState('');
  const [gstin, setGSTIN] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isValidContractorName, setIsValidContractorName] = useState(true);
  const [panNumber, setPanNumber] = useState('');
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



  useEffect(() => {
    const jsonString = localStorage.getItem("karmashree_User");
    const data = JSON.parse(jsonString);
    // setUserData(data);

    getAllDistrictActionList(data?.districtcode).then(function (result) {
      const response = result?.data?.result;
      setAllDistrictList(response);
    });

  }, []);

  //District list

  let districtListDropdown = <option>Loading...</option>;
  if (allDistrictList && allDistrictList.length > 0) {
    districtListDropdown = allDistrictList.map((distRow, index) => (
      <option value={distRow.districtCode}>{distRow.districtName}</option>
    ));
  }


  const onArea = (e) => {
    setArea(e.target.value)
  }


  const onDistrict = (e) => {
    setDistrict(e.target.value)
    getAllBlockList(e.target.value).then(function (result) {
      const response = result?.data?.result;
      setAllBlockList(response);
    });

    getAllMunicipalityList(e.target.value,0).then(function (result) {
      const response = result?.data?.result;
      setAllMunicipalityList(response);
    });
  }

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
    setBlock(e.target.value)
    getAllGramPanchayatList(district, e.target.value).then(function (result) {
      const response = result?.data?.result;
      setAllGpList(response);
    });
  }

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
      setIsValidContractorName(true)
    } else {
      setIsValidContractorName(false)
      // toast.error("Please use only Alphabet characters")

    }
  }

  const handleKeyDown = (event) => {
    // Allow only alphabets and white spaces
    if (
      !(
        (event.keyCode >= 65 && event.keyCode <= 90) || // A-Z
        (event.keyCode >= 97 && event.keyCode <= 122) || // a-z
        event.keyCode === 32 || event.key === "Backspace"
      )
    ) {
      event.preventDefault();
    }
  }


  const onGstIn = (event) => {
    const value = event.target.value;
    // Regular expression to match GSTIN format
    const regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
    if (regex.test(value) || value === '') {
      setGSTIN(value);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };


  const onPanCard = (event) => {
    const value = event.target.value.toUpperCase(); // Convert to uppercase for consistency
    // Regular expression to match PAN format
    const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (regex.test(value) || value === '') {
      setPanNumber(value);
      setIsValidPan(true);
    } else {
      setIsValidPan(false);
    }
  };

  const onMobile = (event) => {
    const value = event.target.value;
    const regex = /^[6-9]{1}[0-9]{9}$/;
    if (regex.test(value) || value === '') {
      setMobileNumber(value);
      setIsValidMobile(true);
    } else {
      setIsValidMobile(false);
    }
  };

  const onAddress = (event) => {
    const value = event.target.value;
    const regex = /^[a-zA-Z0-9\s,\/]*$/;
    if (regex.test(value) || value === '') {
      setAddress(value);
      setIsValidAddress(true);
    } else {
      setIsValidAddress(false);
    }
  };

  // const onVillage = (event) => {
  //   const value = event.target.value;
  //   const regex = /^[a-zA-Z0-9\s,\/]*$/;
  //   if (regex.test(value) || value === '') {
  //     setVillage(value);
  //     setIsValidVillage(true);
  //   } else {
  //     setIsValidVillage(false);
  //   }
  // };

  // const onPoliceStation = (event) => {
  //   const value = event.target.value;
  //   const regex = /^[a-zA-Z0-9\s\/]*$/;
  //   if (regex.test(value) || value === '') {
  //     setPoliceStation(value);
  //     setIsValidPoliceStation(true);
  //   } else {
  //     setIsValidPoliceStation(false);
  //   }
  // };

  // const onPostOffice = (event) => {
  //   const value = event.target.value;
  //   const regex = /^[a-zA-Z0-9\s,\/]*$/;
  //   if (regex.test(value) || value === '') {
  //     setPostOffice(value);
  //     setIsValidPostOffice(true);
  //   } else {
  //     setIsValidPostOffice(false);
  //   }
  // };

  // const onPinCode = (event) => {
  //   const value = event.target.value;
  //   const regex = /^[7]{1}[0-9]{5}$/;
  //   if (regex.test(value) || value === '') {
  //     setPinCode(value);
  //     setIsValidPinCode(true);
  //   } else {
  //     setIsValidPinCode(false);
  //   }
  // };

  const onMunicipality = (e) => {
    console.log(e.target.value, "municipality")
    setMunicipality(e.target.value)
  }

  const onGP = (e) => {
    setGP(e.target.value)
  }

  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  const getCurrentFinancialYear = () => {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();
    let financialYear = '';
    console.log(currentMonth)
    console.log(currentYear)

    // Financial year starts from April
    if (currentMonth >= 4) {
      financialYear = currentYear.toString() + '-' + (currentYear + 1).toString();
    } else {
      financialYear = (currentYear - 1).toString() + '-' + currentYear.toString();
    }

    return financialYear;
  };

  const financialYear = getCurrentFinancialYear();
  console.log(financialYear, "financialYear")
  console.log(currentMonth, "currentMonth")
  console.log(currentYear, "currentYear")

  const onSubmit = () => {
    if (area === "") {
      toast.error("Please Select Area Type")
    } else if (!district) {
      toast.error("Please Select District")
      // }
      //  else if (area === "U" && municipality === "") {
      //   toast.error("Please Select Municipality")
      // } else if (area === "R" && block === "") {
      //   toast.error("Please Select Block")
      // } else if (area === "R" && gp === "") {
      //   toast.error("Please Select Gram Panchayat")
    } else if (contractorName === "") {
      toast.error("Please Type Contractor Name")
    } else if (gstin === "") {
      toast.error("Please Type Contractor GSTIN")
    } else if (panNumber === "") {
      toast.error("Please Type Contractor PAN")
    } else if (mobileNumber === "") {
      toast.error("Please Type Contractor Mobile Number")
    } else if (address === "") {
      toast.error("Please Type Contractor Address")
    } else {
      addCreateContractor(
        contractorName, gstin, panNumber, mobileNumber, address, "A", data?.userIndex,
        currentMonth, currentYear, financialYear, data?.departmentNo, district, municipality,
        block, gp, area,
        (r) => {
          console.log(r, "response");
          if (r.errorCode == 0) {
            setOpenModal(true);
          } else {
            toast.error(r.message);
          }
        }
      );
    }
  }
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
    <div className="flex flex-grow flex-col space-y-16 p-6 px-12">
      <ToastContainer />
      <div className="p-4 px-8 shadow-md rounded">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4 px-4 py-2">
            <svg
              viewBox="0 0 1024 1024"
              fill="currentColor"
              height="1em"
              width="1em"
            >
              <path d="M946.5 505L534.6 93.4a31.93 31.93 0 00-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3 0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8 24.9-25 24.9-65.5-.1-90.5z" />
            </svg>
            <li>
              <Link
                to="/dashboard"
                className="text-indigo-600 hover:text-indigo-800"
              >
                Home
              </Link>
              /
            </li>
            <li className="text-gray-500 font-bold" aria-current="page">
              Contractor Master
            </li>
          </ol>
        </nav>
      </div>
      <div className="bg-white shadow-md rounded-lg p-12">
        <div className="flex w-full space-x-4 mb-6">

          <div className="px-4">
            <label
              htmlFor="scheme_name"
              className="block text-sm font-medium text-gray-700"
            >
              Area Type
              <span className="text-red-500 "> * </span>

            </label>
            <select
              id="scheme_name"
              name="scheme_name"
              autoComplete="off"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
              onChange={onArea}
            >
              <option value="" selected hidden>Select Scheme Name</option>
              <option value="R">Rural</option>
              <option value="U">Urban</option>

              {/* Add more options as needed */}
            </select>
          </div>

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

            >
              <option value="" selected hidden>Select District List</option>
              {districtListDropdown}


              {/* Add more options as needed */}
            </select>
          </div>
          {district?.length > 0 && area === "U" ? (

            <div className="px-4">
              <label
                htmlFor="scheme_name"
                className="block text-sm font-medium text-gray-700"
              >
                Municipality
              </label>
              <select
                id="scheme_name"
                name="scheme_name"
                autoComplete="off"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                onClick={onMunicipality}
              >
                <option value="" selected hidden>Select Municipality List</option>
                {municipalityListDropdown}

                {/* Add more options as needed */}
              </select>
            </div>
          ) : (
            ""
          )}

          {district?.length > 0 && area === "R" ? (

            <div className="px-4">
              <label
                htmlFor="scheme_name"
                className="block text-sm font-medium text-gray-700"
              >
                Block
              </label>
              <select
                id="scheme_name"
                name="scheme_name"
                autoComplete="off"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                onChange={onBlock}

              >
                <option value="" selected hidden>Select Block List</option>
                {blockListDropdown}

                {/* Add more options as needed */}
              </select>
            </div>
          ) : (
            ""
          )}

          {block?.length > 0 && area === "R" ? (
            <div className="px-4">
              <label
                htmlFor="scheme_name"
                className="block text-sm font-medium text-gray-700"
              >
                Gram Panchayat
              </label>
              <select
                id="scheme_name"
                name="scheme_name"
                autoComplete="off"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                onClick={onGP}
              >
                <option value="" selected hidden>Select GP List</option>
                {GpListDropdown}

                {/* Add more options as needed */}
              </select>
            </div>
          ) : (
            ""
          )}

        </div>

        <div className="flex flex-col w-full mb-4">
          <div className="px-4">
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
              onChange={onContractorName}
              onKeyDown={handleKeyDown}
            />
            {!isValidContractorName && (
              <div style={{ color: 'red' }}>Please enter a valid Contractor Name</div>
            )}
          </div>

          <div className="px-4">
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
              onChange={onGstIn}

            />
            {!isValid && (
              <div style={{ color: 'red' }}>Please enter a valid GSTIN</div>
            )}
          </div>
          <div className="px-4">
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
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required
              onChange={onPanCard}
            />
            {!isValidPan && (
              <div style={{ color: 'red' }}>Please enter a valid PAN Number</div>
            )}
          </div>
          <div className="px-4">
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
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required
              onChange={onMobile}
              maxLength={10}

            // value={mobileNumber}
            />
            {!isValidMobile && (
              <div style={{ color: 'red' }}>Please enter a valid Mobile Number</div>
            )}
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
              onChange={onAddress}
            />
            {!isValidAddress && (
              <div style={{ color: 'red' }}>Please enter a valid Address</div>
            )}
          </div>
          {/* <div className="px-4">
            <label
              htmlFor="scheme_name"
              className="block text-sm font-medium text-gray-700"
            >
              Village Name/Word no  *
            </label>
            <input
              id="scheme_name"
              name="scheme_name"
              type="text"
              autoComplete="off"
              placeholder="Please Enter Village Name/Word no"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              onChange={onVillage}
            />
            {!isValidVillage && (
              <div style={{ color: 'red' }}>Please enter a valid Village Name/Word no</div>
            )}
          </div> */}
          {/* <div className="px-4">
            <label
              htmlFor="scheme_name"
              className="block text-sm font-medium text-gray-700"
            >
              Police Station  *
            </label>
            <input
              id="scheme_name"
              name="scheme_name"
              type="text"
              autoComplete="off"
              placeholder="Please Enter Police Station Name"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              onChange={onPoliceStation}
            />
            {!isValidPoliceStation && (
              <div style={{ color: 'red' }}>Please enter a valid Police station Name</div>
            )}
          </div> */}
          {/* <div className="px-4">
            <label
              htmlFor="scheme_name"
              className="block text-sm font-medium text-gray-700"
            >
              Post Office  *
            </label>
            <input
              id="scheme_name"
              name="scheme_name"
              type="text"
              autoComplete="off"
              placeholder="Enter Scheme Name"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              onChange={onPostOffice}
            />
            {!isValidPostOffice && (
              <div style={{ color: 'red' }}>Please enter a valid Post Office Name</div>
            )}
          </div> */}
        </div>
        {/* <div className="flex w-full space-x-4 flex-col mb-4 ">

          <div className="px-4">
            <label
              htmlFor="scheme_name"
              className="block text-sm font-medium text-gray-700"
            >
              Pin  *
            </label>
            <input
              id="scheme_name"
              name="scheme_name"
              type="text"
              autoComplete="off"
              placeholder="Please Enter a Pin Code"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              onChange={onPinCode}
            />
            {!isValidPinCode && (
              <div style={{ color: 'red' }}>Please enter a valid Pin Code</div>
            )}
          </div>


        </div> */}

        <div className="flex justify-center items-center">
          <button
            type="button"
            className="w-1/5 py-2 px-4 border mt-10 border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={onSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Contractor;
