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
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
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

const WorkRequirement = () => {
  const [savedData, setSavedData] = useState([
    {
      workerName: "Soumyadeep G",
      gender: "F",
      caste: "SC",
      mobileNo: "9898987823",
      aadhaarNo: "787878787878",
      typeOfWorkers: "U",
      remark: "",
      age: "46",
      total_pending: 0,
      dateOfApplicationForWork: "2024-06-19",
      whetherMinority: "Y",
      whetherMigrantWorker: "Y",
      workerJobCardNo: "WB-3201001015-12-555",
      userIndex: 1,
      departmentNo: 1,
      schemeArea: "R",
      districtcode: 320,
      municipalityCode: 0,
      blockcode: 3027,
      gpCode: 110782,
      noOfDaysWorkDemanded: 14,
      finYear: "2024-2025",
      currentYear: 2024,
      currentMonth: 6,
    },
  ]);
  const [openModal, setOpenModal] = useState(false);
  const [dropdownData, setDropdownData] = useState(["", "", ""]);
  const [mobileNumber, setMobileNumber] = useState("");
  const [isValidMobile, setIsValidMobile] = useState(true);
  const [adharNumber, setAdharNumber] = useState("");
  const [isValidAdhar, setIsValidAdhar] = useState(true);

  const options = Array.from({ length: 30 }, (_, i) => i + 1);
  const demandDays = Array.from({ length: 14 }, (_, i) => i + 1);

  const queryClient = useQueryClient();
  const { userIndex, category } = JSON.parse(
    localStorage.getItem("karmashree_User")
  );

  const { data: userDetails } = useQuery({
    queryKey: ["userDetails"],
    queryFn: async () => {
      const data = await fetch.get("/api/user/viewuser/", userIndex);
      return data.data.result;
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
    updateDropdown(0, "");
    setAllData([initialData]);
  }

  useEffect(() => {
    if (dropdownData[2] != "")
      queryClient.invalidateQueries({ queryKey: ["jobcardNo"] });
    if (dropdownData[2] == "")
      queryClient.resetQueries({ queryKey: ["jobcardNo"] });
  }, [dropdownData]);

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

  const [allData, setAllData] = useState([initialData]); //! all data
  console.log(allData, "allData");
  const [area, setArea] = useState();
  const [allDistrictList, setAllDistrictList] = useState([]);
  const [allMunicipalityList, setAllMunicipalityList] = useState([]);

  const [allBlockList, setAllBlockList] = useState([]);
  const [block, setBlock] = useState("");
  const [district, setDistrict] = useState("");
  const [allGpList, setAllGpList] = useState([]);

  useEffect(() => {
    const jsonString = localStorage.getItem("karmashree_User");
    const data = JSON.parse(jsonString);
    // setUserData(data);

    getAllDistrictActionList(data?.districtcode).then(function (result) {
      const response = result?.data?.result;
      setAllDistrictList(response);
    });
  }, []);

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
        municipalityCode: 0,
        blockcode: +dropdownData[1],
        gpCode: +dropdownData[2],
        noOfDaysWorkDemanded: +noOfDaysWorkDemanded,
        finYear: getCurrentFinancialYear().financialYear,
        currentYear: getCurrentFinancialYear().currentYear,
        currentMonth: getCurrentFinancialYear().currentMonth,
      };
    });
  }, [allData, dropdownData, jobcardNo, userDetails]);

  let districtListDropdown = <option>Loading...</option>;
  if (allDistrictList && allDistrictList.length > 0) {
    districtListDropdown = allDistrictList.map((distRow, index) => (
      <option value={distRow.districtCode}>{distRow.districtName}</option>
    ));
  }

  const onArea = (e) => {
    updateDropdown(0, e.target.value);
    setArea(e.target.value);
  };

  const onDistrict = (e) => {
    updateDropdown(0, e.target.value);
    setDistrict(e.target.value);
    getAllBlockList(e.target.value).then(function (result) {
      const response = result?.data?.result;
      setAllBlockList(response);
    });

    getAllMunicipalityList(e.target.value).then(function (result) {
      const response = result?.data?.result;
      setAllMunicipalityList(response);
    });
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
    updateDropdown(1, e.target.value);
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

  const {
    data: demand,
    mutate,
    isSuccess: entryStatus,
  } = useMutation({
    mutationFn: async () => {
      const { data } = await fetch.post(
        { DemandMasterDto: demandData },
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

  //Validation of aadhar card

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
    setDropdownData(["", "", ""]);
  }

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
      <div className="flex flex-grow flex-col space-y-16 p-1 px-12">
        <ToastContainer />
        <div className="p-4 shadow-md rounded">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4 px-4 py-1">
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
                Demand
              </li>
            </ol>
          </nav>
        </div>
        <div className="bg-white flex flex-col space-y-4 shadow-md rounded-lg px-4 pb-4">
          <div className="border-2 py-4 border-zinc-300 rounded-xl">
            <div className="flex w-full space-x-2">
              <div className="px-4 hidden">
                <label
                  htmlFor="scheme_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Area Type *
                </label>
                <select
                  id="scheme_name"
                  name="scheme_name"
                  autoComplete="off"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                  onChange={onArea}
                >
                  <option value="" selected hidden>
                    Select Scheme Name
                  </option>
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
              {/* {(
            <div className="px-4 hidden">
              <label
                htmlFor="scheme_name"
                className="block text-sm font-medium text-gray-700"
              >
                Municipality
              </label>
              <select
                ref={municipalityRef}
                id="scheme_name"
                name="scheme_name"
                autoComplete="off"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              >
                <option value="" selected hidden>
                  Select Municipality List
                </option>
                {municipalityListDropdown}

                
              </select>
            </div>
          ) : (
            ""
          )} */}

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
                            maxLength={3}
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
                            onAge(e.target.value);
                          }}
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
                          maxLength={10}
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
            <div className="flex justify-end items-center px-4">
              <button
                type="button"
                className="w-1/5 py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
                onClick={SaveDemandData}
              >
                Add
              </button>
            </div>
          </div>
          <div className="overflow-x-auto overflow-y-hidden h-fit w-full show-scrollbar">
            <Table className="">
              <Table.Head></Table.Head>
              <Table.Body>
                {savedData.map((data, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell className="whitespace-nowrap">
                      {data.workerJobCardNo}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap">
                      {data.workerName}
                    </Table.Cell>
                    <Table.Cell>{data.age}</Table.Cell>
                    <Table.Cell>{data.gender}</Table.Cell>
                    <Table.Cell>{data.caste}</Table.Cell>
                    <Table.Cell>{data.mobileNo}</Table.Cell>
                    <Table.Cell>{data.aadhaarNo}</Table.Cell>
                    <Table.Cell>{data.whetherMinority}</Table.Cell>
                    <Table.Cell>{data.whetherMigrantWorker}</Table.Cell>
                    <Table.Cell>{data.typeOfWorkers}</Table.Cell>
                    <Table.Cell>{data.dateOfApplicationForWork}</Table.Cell>
                    <Table.Cell>{data.noOfDaysWorkDemanded}</Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkRequirement;
