import { Link } from "react-router-dom";
import { useState, useEffect, useRef, useMemo } from "react";
import SuccessModal from "../../components/SuccessModal";
import { updateVal } from "../../functions/updateVal";
import RadioButton from "../../components/RadioButton";
import axios from "axios";
import { devApi } from "../../WebApi/WebApi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getCurrentFinancialYear } from "../../functions/dateCalc";
import { Table } from "flowbite-react";
import { Icon } from "@iconify/react/dist/iconify.js";
import DatePicker from "react-datepicker";
import {
  useQuery,
  useQueryClient,
  useMutation,
  useQueries,
} from "@tanstack/react-query";
import { fetch } from "../../functions/Fetchfunctions";
// import { Datepicker } from "flowbite-react";
import {
  getAllDistrictActionList,
  getAllBlockList,
  getAllMunicipalityList,
  getAllGramPanchayatList,
} from "../../Service/ActionPlan/ActionPlanService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextInput } from "../../components/TextInput";
import BreadCrumb from "../../components/BreadCrumb";

const WorkRequirement = () => {
  const [importMode, setImportMode] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState("");
  const [jobCardSearch, setJobCardSearch] = useState("");
  const [savedData, setSavedData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [dropdownData, setDropdownData] = useState(["", "", ""]);
  const [mobileNumber, setMobileNumber] = useState("");
  const [isValidMobile, setIsValidMobile] = useState(true);
  const [adharNumber, setAdharNumber] = useState("");
  const [isValidAdhar, setIsValidAdhar] = useState(true);

  const options = Array.from({ length: 30 }, (_, i) => i + 1);
  const demandDays = Array.from({ length: 14 }, (_, i) => i + 1);

  const queryClient = useQueryClient();
  const { userIndex } = JSON.parse(sessionStorage.getItem("karmashree_User"));

  const { data: userDetails } = useQuery({
    queryKey: ["userDetails"],
    queryFn: async () => {
      const data = await fetch.get("/api/user/viewuser");
      return data.data.result;
    },
  });

  const GpData = useQueries({
    queries: [
      {
        queryKey: ["districtName"],
        queryFn: async () => {
          const { data } = await fetch.get(
            "/api/mastertable/GetAllDistricts/" + dropdownData[0]
          );
          return data.result[0].districtName;
        },
        enabled: dropdownData[0] != "",
        gcTime: 0,
      },
      {
        queryKey: ["blockName"],
        queryFn: async () => {
          const { data } = await fetch.get(
            `/api/mastertable/getBlock/${dropdownData[0]}/${dropdownData[1]}`
          );
          return data.result[0].blockName;
        },
        enabled: dropdownData[1] != "",
        gcTime: 0,
      },
      {
        queryKey: ["gpName"],
        queryFn: async () => {
          const { data } = await fetch.get(
            `/api/mastertable/getGp/${dropdownData[0]}/${dropdownData[1]}/${dropdownData[2]}`
          );
          return data.result[0].gpName;
        },
        enabled: dropdownData[2] != "",
        gcTime: 0,
      },
    ],
    combine: (results) => {
      return {
        data: results?.map((result) => result.data),
      };
    },
  });

  const { data: jobcardNo, isLoading } = useQuery({
    queryKey: ["jobcardNo"],
    queryFn: async () => {
      const data = await fetch.get(
        "/api/mastertable/NrgsCode/" + dropdownData[2]
      );
      return data.data.result[0].nregaPanchCode;
    },
    enabled: dropdownData[2] != "",
    gcTime: 0,
  });

  function updateDropdown(index, value) {
    const newData = [...dropdownData];

    const old_val = newData[index];
    if (old_val != value) {
      newData[index] = value;
      for (let i = index + 1; i < newData.length; i++) {
        newData[i] = "";
      }
    }

    setDropdownData(newData);
  }

  function resetData() {
    setDropdownData(["", "", ""]);
    // updateDropdown(0, "");
    setAllData([initialData]);
    setImportMode(false);
    // queryClient.resetQueries({ queryKey: ["jobcardNo", "gpName"] , exact: true });
    // queryClient.setQueryData(["jobcardNo"], null);
  }

  useEffect(() => {
    const [district, block, gp] = dropdownData;
    if (district) {
      queryClient.invalidateQueries({ queryKey: ["districtName"] });
    } else {
      queryClient.resetQueries({ queryKey: ["districtName"] });
    }

    if (block) {
      queryClient.invalidateQueries({ queryKey: ["blockName"] });
    } else {
      queryClient.resetQueries({ queryKey: ["blockName"] });
    }
  }, [dropdownData[0], dropdownData[1]]);

  useEffect(() => {
    if (dropdownData[2] != "") {
      queryClient.invalidateQueries({ queryKey: ["jobcardNo"], exact: true });
    } else {
      queryClient.resetQueries({ queryKey: ["jobcardNo"], exact: true });
    }
  }, [dropdownData[2]]);

  const initialData = {
    sansadId: "",
    familyId: "",
    workerName: "",
    gender: "",
    caste: "",
    whetherMinority: "",
    whetherMigrantWorker: "",
    mobileNo: "",
    aadhaarNo: "",
    typeOfWorkers: "U",
    dateOfApplicationForWork: "",
    noOfDaysWorkDemanded: "14",
    remark: "",
    age: "",
    total_pending: 0,
  };

  const [allData, setAllData] = useState([initialData]);

  const [allDistrictList, setAllDistrictList] = useState([]);

  const [allBlockList, setAllBlockList] = useState([]);
  const [block, setBlock] = useState("");
  const [district, setDistrict] = useState("");
  const [allGpList, setAllGpList] = useState([]);

  useEffect(() => {
    const jsonString = sessionStorage.getItem("karmashree_User");
    const data = JSON.parse(jsonString);
    // setUserData(data);

    getAllDistrictActionList(data?.districtcode).then(function (result) {
      const response = result?.data?.result;
      setAllDistrictList(response);
    });
  }, [dropdownData]);

  // useEffect(() => {}, [dropdownData[1]]);

  const demandData = useMemo(() => {
    return allData.map((e) => {
      const {
        sansadId,
        familyId,
        whetherMinority,
        whetherMigrantWorker,
        noOfDaysWorkDemanded,
        dateOfApplicationForWork,
        ...rest
      } = e;
      return {
        ...rest,
        dateOfApplicationForWork:
          dateOfApplicationForWork.length > 5
            ? new Date(dateOfApplicationForWork).toLocaleDateString("fr-CA", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              })
            : "",
        whetherMinority: whetherMinority ? "Y" : "N",
        whetherMigrantWorker: whetherMigrantWorker ? "Y" : "N",
        workerJobCardNo: `${jobcardNo ?? ""}-${sansadId}-${familyId}`,
        userIndex: userDetails?.userIndex,
        departmentNo: userDetails?.departmentNo,
        schemeArea: "R",
        districtcode: +dropdownData[0],
        districtName: GpData?.data[0],
        municipalityCode: 0,
        blockcode: +dropdownData[1],
        blockName: GpData?.data[1],
        gpCode: +dropdownData[2],
        gpName: GpData?.data[2],
        noOfDaysWorkDemanded: +noOfDaysWorkDemanded,
        finYear: getCurrentFinancialYear().financialYear,
        currentYear: getCurrentFinancialYear().currentYear,
        currentMonth: getCurrentFinancialYear().currentMonth,
      };
    });
  }, [allData, dropdownData, jobcardNo, userDetails]);

  const canSubmit = useMemo(() => {
    const keys = Object.values(demandData[0]);
    // const k = Object.keys(demandData[0]);
    const newArray = [
      ...keys.slice(0, 3),
      ...keys.slice(5, 6),
      ...keys.slice(7),
    ];

    return !(
      (newArray.includes("") || newArray.includes(undefined))
      // keys.includes(0)
      // dropdownData[2] != ""
    );
    // return newArray
  }, [demandData, dropdownData]);

  const { data: blockList, isSuccess: blockListSuccess } = useQuery({
    queryKey: ["blockList"],
    queryFn: async () => {
      const data = await fetch.get(
        "/api/mastertable/getBlockaction/" + dropdownData[0]
      );
      return data.data.result;
    },
    enabled: dropdownData[0] != "",
  });

  const { data: gpList, isSuccess: gpListSuccess } = useQuery({
    queryKey: ["gpList"],
    queryFn: async () => {
      const data = await fetch.get(
        "/api/mastertable/getGpaction/" +
          dropdownData[0] +
          "/" +
          dropdownData[1]
      );
      return data.data.result;
    },
    enabled: dropdownData[1] != "",
  });

  let districtListDropdown = <option>Loading...</option>;
  if (allDistrictList && allDistrictList.length > 0) {
    districtListDropdown = allDistrictList.map((distRow, index) => (
      <option value={distRow.districtCode}>{distRow.concatenatedName}</option>
    ));
  }

  const onDistrict = (e) => {
    updateDropdown(0, e.target.value);
    setDistrict(e.target.value);
    getAllBlockList(e.target.value).then(function (result) {
      const response = result?.data?.result;
      setAllBlockList(response);
    });
  };

  let blockListDropdown = <option>Loading...</option>;
  if (blockListSuccess) {
    blockListDropdown = blockList?.map((blockRow, index) => (
      <option value={blockRow.blockCode}>{blockRow.concatenatedName}</option>
    ));
  }

  const onBlock = (e) => {
    updateDropdown(1, e.target.value);
    setBlock(e.target.value);
    getAllGramPanchayatList(district, e.target.value).then(function (result) {
      const response = result?.data?.result;
      setAllGpList(response);
    });
  };

  let GpListDropdown = <option>Loading...</option>;
  if (gpListSuccess) {
    GpListDropdown = gpList?.map((gpRow, index) => (
      <option value={gpRow.gpCode}>{gpRow.concatenatedName}</option>
    ));
  }

  const {
    data: demand,
    mutate,
    isSuccess: entryStatus,
  } = useMutation({
    mutationFn: async () => {
      const { data } = await fetch.post(
        { DemandMasterDto: savedData },
        "/api/demand/createDemand"
      );
      return data.demand;
    },
    mutationKey: ["demandEntry"],
    onSuccess: () => {
      setOpenModal(true);
    },
  });

  const onAge = (e) => {
    console.log(e, "age");
    if (e < 18 || e > 65) {
      toast.error("Age should be between 18-65 years");
    }
  };

  //Validation of mobile number

  const onMobile = (e) => {
    console.log(e, "mobile");
    const value = e;
    const regex = /^[6-9]{1}[0-9]{9}$/;
    if (regex.test(value) || value === "") {
      setMobileNumber(value);
      setIsValidMobile(true);
    } else {
      setIsValidMobile(false);
    }
  };

  const onAdhar = (e) => {
    console.log(e, "mobile");
    const value = e;
    const regex = /^[0-9]{12}$/;
    if (regex.test(value) || value === "") {
      setAdharNumber(value);
      setIsValidAdhar(true);
    } else {
      setIsValidAdhar(false);
    }
  };

  function SaveDemandData() {
    setSavedData((prev) => [...prev, ...demandData]);
    setAllData([initialData]);
    // console.log(GpData.data);
    setDropdownData(["", "", ""]);
  }

  function deleteDemandData(idx) {
    const new_data = savedData.filter((e, i) => i !== idx);
    setSavedData(new_data);
  }

  const {
    data: jobCardSearchResult,
    mutate: findJobCard,
    isLoading: searchStatus,
  } = useMutation({
    mutationFn: async () => {
      const { data } = await fetch.post(
        {
          workerJobCardNo: jobCardSearch,
          workerName: "",
        },
        "/api/demand/search_demand"
      );
      return data;
    },
    mutationKey: ["searchJobCardNo"],
    onSuccess: (data) => {
      setSelectedWorker(data[0].workerName);
    },
  });

  const searchData = useMemo(() => {
    const filteredData = jobCardSearchResult?.filter(
      (e) => e.workerName == selectedWorker
    );
    if (filteredData && filteredData.length > 0) {
      const {
        demandsl,
        demanduniqueID,
        workallostatus,
        total_pending,
        dateoflastallocation,
        dateOfApplicationForWork,
        noOfDaysWorkDemanded,
        workerdemandstatus,
        currentMonth,
        currentYear,
        finYear,
        submitTime,
        UpdateTime,
        ex1,
        ex2,
        ex3,
        ex4,
        ex5,
        ...rest
      } = filteredData[0];
      return rest;
    }
    return {};
  }, [selectedWorker]);

  function SaveSearchData() {
    setDropdownData(["", "", ""]);
    // setSavedData((prev) => [...prev, searchData]);
    const { districtcode, blockcode, gpCode, workerJobCardNo } = searchData;
    setDropdownData([`${districtcode}`, `${blockcode}`, `${gpCode}`]);
    const result = { ...initialData };
    result.sansadId = workerJobCardNo.split("-")[2];
    result.familyId = workerJobCardNo.split("-")[3];

    queryClient.refetchQueries({ queryKey: ["gpList"] });
    // Update values in result with values from obj2 where keys overlap
    for (const key in searchData) {
      if (result.hasOwnProperty(key)) {
        result[key] = searchData[key];
      }
    }

    setAllData([result]);

    setImportMode(true);
  }

  function secondButton() {
    queryClient.refetchQueries({ queryKey: ["blockList"] });
    queryClient.refetchQueries({ queryKey: ["gpList"] });
  }

  useEffect(() => {
    if (dropdownData[0].length != 0)
      queryClient.invalidateQueries({ queryKey: ["blockList"], exact: true });
    if (dropdownData[0].length == 0)
      queryClient.resetQueries({ queryKey: ["blockList"], exact: true });
  }, [dropdownData[0]]);

  useEffect(() => {
    if (dropdownData[1].length != 0)
      queryClient.invalidateQueries({ queryKey: ["gpList"], exact: true });
    if (dropdownData[1].length == 0)
      queryClient.resetQueries({ queryKey: ["gpList"], exact: true });
  }, [dropdownData[1]]);

  return (
    <>
      <SuccessModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        message={`Demand Id ${demand} Created Successfully`}
        resetData={resetData}
        to="demand-list"
        isSuccess={entryStatus}
        // isSuccess={true}
        // userCreate={false}
      />
      <div className="flex flex-grow flex-col p-1 px-12">
        <ToastContainer />
        <BreadCrumb page={"Demand Register"} />
        <div className="bg-white flex flex-col space-y-4 shadow-md rounded-lg p-4 mb-8">
          <div className="border-2 p-4 border-zinc-300 rounded-xl flex flex-col space-y-4">
            <div className="flex items-center space-x-6">
              <h1 className="text-zinc-600">JobCardNo Exists ?</h1>
              <div className="">
                <input
                  type="text"
                  className="border border-gray-300 rounded-md"
                  placeholder="Search for JobCard No"
                  value={jobCardSearch}
                  onChange={(e) => setJobCardSearch(e.target.value)}
                />
              </div>
              {jobCardSearch.length > 0 && (
                <button
                  onClick={findJobCard}
                  className="px-4 bg-blue-500 text-white py-2 rounded-md flex items-center space-x-2 hover:bg-blue-600 transition-colors"
                >
                  <span>Search</span>
                  <Icon className="text-2xl" icon={"material-symbols:search"} />
                </button>
              )}
              <span>
                {searchStatus && (
                  <Icon
                    className="text-2xl text-green-500"
                    icon={"svg-spinners:bars-scale-fade"}
                  />
                )}
                {jobCardSearchResult &&
                  jobCardSearchResult?.length +
                    ` result${
                      jobCardSearchResult?.length > 1 ? "s" : ""
                    } found`}
              </span>
            </div>
            {jobCardSearchResult?.length > 0 && (
              <div className="flex items-center space-x-4">
                <span className="capitalize text-zinc-600">
                  select jobcard holder
                </span>
                <select
                  className="mt-1 p-2 block border border-gray-300 rounded-md w-1/5"
                  onChange={(e) => setSelectedWorker(e.target.value)}
                >
                  {jobCardSearchResult?.map((e) => (
                    <option value={e.workerName}>{e.workerName}</option>
                  ))}
                </select>
              </div>
            )}
            {jobCardSearchResult?.length > 0 && (
              <div className="flex justify-center items-center px-4">
                <button
                  type="button"
                  className="w-fit disabled:cursor-not-allowed disabled:bg-zinc-400 flex items-center justify-center space-x-4 py-1 px-4 border border-transparent rounded-md shadow-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
                  onClick={SaveSearchData}
                >
                  <span>Import Worker</span>
                  <Icon className="text-2xl" icon={"lucide:arrow-down"} />
                </button>
                {/* <button onClick={secondButton}> invalidate</button> */}
              </div>
            )}
          </div>
        </div>
        <div className="bg-white flex flex-col space-y-4 shadow-md rounded-lg px-4 pb-4">
          <div className="border-2 py-4 border-zinc-300 rounded-xl">
            <div className="flex w-full space-x-2">
              <div className="px-4">
                <label
                  htmlFor="scheme_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  District
                  <span className="text-red-500 "> * </span>
                </label>
                <select
                  value={dropdownData[0]}
                  id="scheme_name"
                  name="scheme_name"
                  autoComplete="off"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  onChange={onDistrict}
                >
                  <option value="" selected hidden>
                    Select District List
                  </option>
                  {districtListDropdown}
                </select>
              </div>

              {dropdownData[0].length > 0 && (
                <div className="px-4">
                  <label
                    htmlFor="scheme_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Block
                  </label>
                  <select
                    value={dropdownData[1]}
                    id="scheme_name"
                    name="scheme_name"
                    autoComplete="off"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    onChange={onBlock}
                  >
                    <option value="" selected hidden>
                      Select Block List
                    </option>
                    {blockListDropdown}

                    {/* Add more options as needed */}
                  </select>
                </div>
              )}

              {dropdownData[1].length > 0 && (
                <div className="px-4">
                  <label
                    htmlFor="scheme_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    GP
                  </label>
                  <select
                    value={dropdownData[2]}
                    id="scheme_name"
                    name="scheme_name"
                    autoComplete="off"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const temp = [...dropdownData];
                      temp[2] = e.target.value;
                      setDropdownData(temp);
                    }}
                  >
                    <option value="" selected hidden>
                      Select GP List
                    </option>
                    {GpListDropdown}

                    {/* Add more options as needed */}
                  </select>
                </div>
              )}
            </div>

            <div className="flex flex-col space-y-2">
              {allData.map(
                (
                  {
                    sansadId,
                    familyId,
                    workerName,
                    gender,
                    caste,
                    whetherMinority,
                    whetherMigrantWorker,
                    mobileNo,
                    aadhaarNo,
                    typeOfWorkers,
                    dateOfApplicationForWork,
                    noOfDaysWorkDemanded,
                    currentMonth,
                    currentYear,
                    finYear,
                    remark,
                    age,
                  },
                  index
                ) => (
                  <>
                    <div className="relative text-zinc-500 flex flex-col space-y-4  p-4 rounded-lg">
                      <div className="absolute right-4">
                        {index != 0 && (
                          <button
                            className="rounded-lg px-3 py-2 leading-tight bg-red-600 text-white hover:shadow-md transition-all hover:bg-opacity-90"
                            onClick={() => {
                              const new_array = allData.filter(
                                (e, idx) => idx != index
                              );
                              setAllData(new_array);
                            }}
                          >
                            Delete
                          </button>
                        )}
                        {index == 0 && <div className="w-[66px]"></div>}
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-36">
                          {isLoading ? (
                            <Skeleton className="h-4" />
                          ) : (
                            <div className="text-center ">
                              {jobcardNo || "Please select GP"}
                            </div>
                          )}
                        </div>
                        <span>
                          <select
                            value={sansadId}
                            name="sansadId"
                            id=""
                            className="border-zinc-300 rounded-l-lg"
                            onChange={(e) =>
                              updateVal(e, index, allData, setAllData)
                            }
                          >
                            <option value="">-sansad-</option>
                            {options.map((e) => (
                              <option value={e}>{e}</option>
                            ))}
                          </select>
                          <input
                            maxLength={5}
                            value={familyId}
                            onChange={(e) =>
                              updateVal(e, index, allData, setAllData)
                            }
                            name="familyId"
                            type="text"
                            placeholder="family id"
                            className="text-center w-32 border-zinc-300 rounded-r-lg"
                          />
                        </span>
                        <input
                          className="border cursor-pointer border-gray-300 rounded-md"
                          type="text"
                          placeholder="worker name"
                          name="workerName"
                          value={workerName}
                          onChange={(e) => {
                            const regex = /^[a-zA-Z\s]+$/;
                            if (
                              regex.test(e.target.value) ||
                              e.target.value == ""
                            )
                              updateVal(e, index, allData, setAllData);
                          }}
                        />
                      </div>
                      <div className="flex space-x-4">
                        <input
                          className="border cursor-pointer border-gray-300 rounded-md w-20"
                          type="text"
                          placeholder="Age"
                          name="age"
                          value={age}
                          maxLength={2}
                          onChange={(e) => {
                            updateVal(e, index, allData, setAllData);
                          }}
                          onBlur={(e) => onAge(e.target.value)}
                        />
                        <select
                          value={gender}
                          className="border cursor-pointer border-gray-300 rounded-md"
                          name="gender"
                          id=""
                          onChange={(e) =>
                            updateVal(e, index, allData, setAllData)
                          }
                        >
                          <option value="">-select gender-</option>
                          <option value="M">Male</option>
                          <option value="F">Female</option>
                          <option value="T">Transgender</option>
                        </select>
                        <select
                          value={caste}
                          className="border cursor-pointer border-gray-300 rounded-md"
                          name="caste"
                          id=""
                          onChange={(e) =>
                            updateVal(e, index, allData, setAllData)
                          }
                        >
                          <option value="">-select cast-</option>
                          <option value="ST">ST</option>
                          <option value="SC">SC</option>
                          <option value="Others">Others</option>
                        </select>
                        <input
                          className="border cursor-pointer border-gray-300 rounded-md w-36"
                          type="text"
                          name="mobileNo"
                          maxLength={10}
                          placeholder="mobile number"
                          value={mobileNo}
                          onChange={(e) => {
                            updateVal(e, index, allData, setAllData);
                            onMobile(e.target.value);
                          }}
                        />
                        {!isValidMobile && (
                          <div style={{ color: "red" }}>
                            Please enter a valid Mobile Number
                          </div>
                        )}
                        <input
                          className="border cursor-pointer border-gray-300 rounded-md w-48"
                          type="text"
                          name="aadhaarNo"
                          placeholder="XXXX-XXXX-XXXX"
                          maxLength={12}
                          value={aadhaarNo}
                          onChange={(e) => {
                            updateVal(e, index, allData, setAllData);
                            onAdhar(e.target.value);
                          }}
                        />
                        {!isValidAdhar && (
                          <div style={{ color: "red" }}>
                            Please enter a valid Aadhar Number
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-16">
                        <div className="flex items-center space-x-4">
                          <span className="w-fit">
                            Whether a migrant worker?{" "}
                          </span>
                          <RadioButton
                            disabled={importMode}
                            value={whetherMigrantWorker}
                            updateVal={updateVal}
                            index={index}
                            name={"whetherMigrantWorker"}
                            data={allData}
                            setData={setAllData}
                          />
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="w-fit">Whether a Minority? </span>
                          <RadioButton
                            disabled={importMode}
                            value={whetherMinority}
                            updateVal={updateVal}
                            index={index}
                            name={"whetherMinority"}
                            data={allData}
                            setData={setAllData}
                          />
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <label htmlFor="">Type of Worker?</label>
                          <select
                            value={typeOfWorkers}
                            className="border cursor-pointer border-gray-300 rounded-md"
                            name="typeOfWorkers"
                            id=""
                            onChange={(e) =>
                              updateVal(e, index, allData, setAllData)
                            }
                          >
                            <option value="U" selected>
                              Unskilled
                            </option>
                            <option value="SS">Semi-Skilled</option>
                            <option value="S">Skilled</option>
                          </select>
                        </div>
                        <div className="flex  items-center space-x-1">
                          <label htmlFor="">Date of Application for Work</label>
                          <DatePicker
                            minDate={new Date()}
                            dateFormat="dd/MM/yyyy"
                            selected={dateOfApplicationForWork}
                            placeholderText="dd-mm-yyyy"
                            portalId="root-portal"
                            className="w-32 border cursor-pointer border-gray-300 rounded-md"
                            onChange={(e) =>
                              updateVal(
                                {
                                  target: {
                                    name: "dateOfApplicationForWork",
                                    value: e.toString(),
                                  },
                                },
                                index,
                                allData,
                                setAllData
                              )
                            }
                          />
                        </div>
                        <div className="flex items-center space-x-1">
                          <label htmlFor="">No of Days Work Demanded</label>
                          <select
                            value={noOfDaysWorkDemanded}
                            className="w-20 border cursor-pointer border-gray-300 rounded-md"
                            name="noOfDaysWorkDemanded"
                            id=""
                            onChange={(e) =>
                              updateVal(e, index, allData, setAllData)
                            }
                          >
                            {demandDays.map((day) => (
                              <option value={day}>{day}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="w-full">
                        <textarea
                          className="border w-full cursor-pointer border-gray-300 rounded-md"
                          type="text"
                          name="remark"
                          // maxLength={10}
                          placeholder="Remarks..."
                          value={remark}
                          onChange={(e) =>
                            updateVal(e, index, allData, setAllData)
                          }
                        />
                      </div>
                    </div>
                  </>
                )
              )}
            </div>
            <div className="flex justify-center items-center px-4 space-x-12 transition-all">
              <button
                type="button"
                disabled={!canSubmit}
                className="w-[12%] disabled:cursor-not-allowed disabled:bg-zinc-400 flex items-center justify-center space-x-4 py-1 px-4 border border-transparent rounded-md shadow-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
                onClick={SaveDemandData}
              >
                <span>Add</span>
                <Icon className="text-2xl" icon={"ic:round-add"} />
              </button>
              {importMode && (
                <button
                  type="button"
                  className="w-fit disabled:cursor-not-allowed disabled:bg-zinc-400 flex items-center justify-center space-x-2 py-1 px-4 border border-transparent rounded-md shadow-sm text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
                  onClick={resetData}
                >
                  <span>Clear</span>
                  <Icon
                    className="text-2xl text-white"
                    icon={"mdi:clear-circle-outline"}
                  />
                </button>
              )}
            </div>
          </div>
          <div className="overflow-x-auto overflow-y-hidden h-fit w-full show-scrollbar">
            {savedData.length > 0 && (
              <Table className="">
                <Table.Head className="divide-x">
                  <Table.HeadCell className="whitespace-nowrap theader-style bg-cyan-400/80   capitalize">
                    Sl
                  </Table.HeadCell>
                  <Table.HeadCell className="whitespace-nowrap theader-style bg-cyan-400/80   capitalize">
                    District
                  </Table.HeadCell>
                  <Table.HeadCell className="whitespace-nowrap theader-style bg-cyan-400/80   capitalize">
                    Block
                  </Table.HeadCell>
                  <Table.HeadCell className="whitespace-nowrap theader-style bg-cyan-400/80   capitalize">
                    Gp
                  </Table.HeadCell>
                  <Table.HeadCell className="whitespace-nowrap theader-style bg-cyan-400/80   capitalize">
                    Job Card No
                  </Table.HeadCell>
                  <Table.HeadCell className="whitespace-nowrap theader-style bg-cyan-400/80   capitalize">
                    Worker Name
                  </Table.HeadCell>
                  <Table.HeadCell className="whitespace-nowrap theader-style bg-cyan-400/80   capitalize">
                    Age
                  </Table.HeadCell>
                  <Table.HeadCell className="whitespace-nowrap theader-style bg-cyan-400/80   capitalize">
                    Gender
                  </Table.HeadCell>
                  <Table.HeadCell className="whitespace-nowrap theader-style bg-cyan-400/80   capitalize">
                    Caste
                  </Table.HeadCell>
                  <Table.HeadCell className="whitespace-nowrap theader-style bg-cyan-400/80   capitalize">
                    Mobile No
                  </Table.HeadCell>
                  <Table.HeadCell className="whitespace-nowrap theader-style bg-cyan-400/80   capitalize">
                    aadhar No
                  </Table.HeadCell>
                  <Table.HeadCell className="whitespace-nowrap theader-style bg-cyan-400/80   capitalize">
                    Minority
                  </Table.HeadCell>
                  <Table.HeadCell className="whitespace-nowrap theader-style bg-cyan-400/80   capitalize">
                    Migrant Worker
                  </Table.HeadCell>
                  <Table.HeadCell className="whitespace-nowrap theader-style bg-cyan-400/80   capitalize">
                    Worker Type
                  </Table.HeadCell>
                  <Table.HeadCell className="whitespace-nowrap theader-style bg-cyan-400/80   capitalize">
                    Application date
                  </Table.HeadCell>
                  <Table.HeadCell className="whitespace-nowrap theader-style bg-cyan-400/80   capitalize">
                    Days Demanded
                  </Table.HeadCell>

                  <Table.HeadCell className="whitespace-nowrap theader-style bg-cyan-400/80   capitalize"></Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {savedData.map((data, index) => (
                    <Table.Row key={index} className="divide-x">
                      <Table.Cell className="px-2 py-1">{index + 1}</Table.Cell>
                      <Table.Cell className="px-2 py-1 whitespace-nowrap">
                        {data.districtName}
                      </Table.Cell>
                      <Table.Cell className="px-2 py-1 whitespace-nowrap">
                        {data.blockName}
                      </Table.Cell>
                      <Table.Cell className="px-2 py-1 whitespace-nowrap">
                        {data.gpName}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap px-2 py-1">
                        {data.workerJobCardNo}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap px-2 py-1">
                        {data.workerName}
                      </Table.Cell>
                      <Table.Cell className="px-2 py-1 whitespace-nowrap">
                        {data.age}
                      </Table.Cell>
                      <Table.Cell className="px-2 py-1 whitespace-nowrap">
                        {data.gender}
                      </Table.Cell>
                      <Table.Cell className="px-2 py-1 whitespace-nowrap">
                        {data.caste}
                      </Table.Cell>
                      <Table.Cell className="px-2 py-1 whitespace-nowrap">
                        {data.mobileNo}
                      </Table.Cell>
                      <Table.Cell className="px-2 py-1 whitespace-nowrap">
                        {data.aadhaarNo}
                      </Table.Cell>
                      <Table.Cell className="px-2 py-1 whitespace-nowrap">
                        {data.whetherMinority}
                      </Table.Cell>
                      <Table.Cell className="px-2 py-1 whitespace-nowrap">
                        {data.whetherMigrantWorker}
                      </Table.Cell>
                      <Table.Cell className="px-2 py-1 whitespace-nowrap">
                        {data.typeOfWorkers}
                      </Table.Cell>
                      <Table.Cell className="px-2 py-1 whitespace-nowrap">
                        {data.dateOfApplicationForWork}
                      </Table.Cell>
                      <Table.Cell className="px-2 py-1 whitespace-nowrap">
                        {data.noOfDaysWorkDemanded}
                      </Table.Cell>

                      <Table.Cell
                        className="px-2 py-1 whitespace-nowrap"
                        onClick={() => deleteDemandData(index)}
                      >
                        <button className="px-2 bg-red-500 rounded-md text-white">
                          Delete
                        </button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            )}
          </div>
          {savedData.length > 0 && (
            <div className="flex justify-center items-center">
              <button
                onClick={mutate}
                className="text-white bg-indigo-500 hover:bg-indigo-500/90 hover:shadow-md transition-all  px-6 py-1 rounded-lg"
              >
                Submit Demands
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WorkRequirement;
