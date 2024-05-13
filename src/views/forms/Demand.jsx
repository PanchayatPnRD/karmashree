import { Link } from "react-router-dom";
import { useState, useEffect, useRef, useMemo } from "react";
import { updateVal } from "../../functions/updateVal";
import RadioButton from "../../components/RadioButton";
import axios from "axios";
import { devApi } from "../../WebApi/WebApi";

import { Table, TextInput } from "flowbite-react";
import { Icon } from "@iconify/react/dist/iconify.js";
import DatePicker from "react-datepicker";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
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
  const { userIndex, category } = JSON.parse(
    localStorage.getItem("karmashree_User")
  );

  const { data: userDetails, isSuccess } = useQuery({
    queryKey: ["userDetails"],
    queryFn: async () => {
      const data = await fetch.get("/api/user/viewuser/", userIndex);

      return data.data.result;
    },
  });
  const [gpCode, setGpCode] = useState("");
  const options = Array.from({ length: 30 }, (_, i) => i + 1);
  const demandDays = Array.from({ length: 14 }, (_, i) => i + 1);

  const queryClient = useQueryClient();

  


  const { data: jobcardNo, isLoading } = useQuery({
    queryKey: ["jobcardNo"],
    queryFn: async () => {
      const data = await axios.get(
        devApi + "/api/mastertable/NrgsCode/" + gpCode
        // "http://localhost:8094/api/mastertable/NrgsCode/107977"
      );
      console.log(devApi + "/api/mastertable/NrgsCode/" + gpCode);

      return data.data.result[0].nregaPanchCode;
    },
    // enabled: gpCode.length > 0
  });

  useEffect(() => {
    if (gpCode != "") queryClient.refetchQueries(["jobcardNo"]);
  }, [gpCode]);

  const initialData = {
    workerJobCardNo: "",
    workerName: "",
    gender: "",
    caste: "",
    whetherMinority: "",
    whetherMigrantWorker: "",
    mobileNo: "",
    aadhaarNo: "",
    typeOfWorkers: "",
    dateOfApplicationForWork: undefined,
    noOfDaysWorkDemanded: null,
    currentMonth: null,
    currentYear: null,
    finYear: null,
  };

  const distRef = useRef(null);
  const blockRef = useRef(null);
  const gpRef = useRef(null);
  const municipalityRef = useRef(null);

  const [allData, setAllData] = useState([initialData]); //! all data

  // const apiData = useMemo(() => {
  //   allData.map((e) => {
  //     const obj = { ...e, userIndex:user };
      
  //   })
  // },[allData]);


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

  //District list

  let districtListDropdown = <option>Loading...</option>;
  if (allDistrictList && allDistrictList.length > 0) {
    districtListDropdown = allDistrictList.map((distRow, index) => (
      <option value={distRow.districtCode}>{distRow.districtName}</option>
    ));
  }
  useEffect(() => {
    console.log(gpRef.current);
  }, []);

  const onArea = (e) => {
    setArea(e.target.value);
  };

  const onDistrict = (e) => {
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
  
  return (
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
      <div className="bg-white shadow-md rounded-lg px-12 pb-12">
        <div className="flex w-full space-x-4 mb-6">
          <div className="px-4">
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
              ref={distRef}
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

              {/* Add more options as needed */}
            </select>
          </div>
          {district.length > 0 && area === "U" ? (
            <div className="px-4">
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

                {/* Add more options as needed */}
              </select>
            </div>
          ) : (
            ""
          )}

          {district.length > 0 && area === "R" ? (
            <div className="px-4">
              <label
                htmlFor="scheme_name"
                className="block text-sm font-medium text-gray-700"
              >
                Block
              </label>
              <select
                ref={blockRef}
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
          ) : (
            ""
          )}

          {block.length > 0 && area === "R" ? (
            <div className="px-4">
              <label
                htmlFor="scheme_name"
                className="block text-sm font-medium text-gray-700"
              >
                GP
              </label>
              <select
                ref={gpRef}
                id="scheme_name"
                name="scheme_name"
                autoComplete="off"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                onChange={(e) => setGpCode(e.target.value)}
              >
                <option value="" selected hidden>
                  Select GP List
                </option>
                {GpListDropdown}

                {/* Add more options as needed */}
              </select>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className=" w-full flex justify-end py-4">
          <button
            className="flex space-x-2 items-center bg-green-500 text-white px-4 py-1 rounded-md transition-all hover:shadow-md hover:bg-opacity-90"
            onClick={() => setAllData((prev) => [...prev, initialData])}
          >
            <span>Add</span>
            <Icon className="text-2xl" icon={"ic:round-add"} />
          </button>
        </div>

        <div className="overflow-x-auto overflow-y-hidden h-fit w-full show-scrollbar">
          <Table className="w-full">
            <Table.Head>
              <Table.HeadCell className="bg-cyan-400/40 text-blue-900 text-md normal-case w-8">
                #
              </Table.HeadCell>
              <Table.HeadCell className="bg-cyan-400/40 text-blue-900 text-md normal-case">
                Worker Job Card No
              </Table.HeadCell>
              <Table.HeadCell className="bg-cyan-400/40 text-blue-900 text-md normal-case">
                Worker name
              </Table.HeadCell>
              <Table.HeadCell className="bg-cyan-400/40 text-blue-900 text-md normal-case ">
                Gender
              </Table.HeadCell>
              <Table.HeadCell className="bg-cyan-400/40 text-blue-900 text-md normal-case ">
                Cast
              </Table.HeadCell>
              <Table.HeadCell className="bg-cyan-400/40 text-blue-900 text-md normal-case ">
                Whether Minority
              </Table.HeadCell>
              <Table.HeadCell className="bg-cyan-400/40 text-blue-900 text-md normal-case ">
                Whether Migrant Worker
              </Table.HeadCell>
              <Table.HeadCell className="bg-cyan-400/40 text-blue-900 text-md normal-case ">
                Mobile
              </Table.HeadCell>
              <Table.HeadCell className="bg-cyan-400/40 text-blue-900 text-md normal-case ">
                Aadhar
              </Table.HeadCell>
              <Table.HeadCell className="bg-cyan-400/40 text-blue-900 text-md normal-case ">
                Type of Worker
              </Table.HeadCell>
              <Table.HeadCell className="bg-cyan-400/40 text-blue-900 text-md normal-case ">
                Work Application Date
              </Table.HeadCell>

              <Table.HeadCell className="bg-cyan-400/40 text-blue-900 text-md normal-case ">
                No of Days (Work Demanded)
              </Table.HeadCell>
              <Table.HeadCell className="bg-cyan-400/40 text-blue-900 text-md normal-case "></Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {allData.map(
                (
                  {
                    workerJobCardNo,
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
                  },
                  index
                ) => (
                  <Table.Row>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>
                      <div className="w-32">{jobcardNo || "Please select GP"}</div>
                    </Table.Cell>
                    <Table.Cell>
                      <input
                        className="border cursor-pointer border-gray-300 rounded-md"
                        type="text"
                        name="workerName"
                        value={workerName}
                        onChange={(e) =>
                          updateVal(e, index, allData, setAllData)
                        }
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <select
                        className="border cursor-pointer border-gray-300 rounded-md"
                        name="gender"
                        id=""
                        onChange={(e) =>
                          updateVal(e, index, allData, setAllData)
                        }
                      >
                        <option value="">-select gender-</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </Table.Cell>
                    <Table.Cell>
                      <select
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
                    </Table.Cell>
                    <Table.Cell>
                      <RadioButton
                        value={whetherMinority}
                        updateVal={updateVal}
                        index={index}
                        name={"whetherMinority"}
                        data={allData}
                        setData={setAllData}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <RadioButton
                        value={whetherMigrantWorker}
                        updateVal={updateVal}
                        index={index}
                        name={"whetherMigrantWorker"}
                        data={allData}
                        setData={setAllData}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <input
                        className="border cursor-pointer border-gray-300 rounded-md"
                        type="number"
                        name="mobileNo"
                        maxLength={10}
                        value={mobileNo}
                        onChange={(e) =>
                          updateVal(e, index, allData, setAllData)
                        }
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <input
                        className="border cursor-pointer border-gray-300 rounded-md"
                        type="number"
                        name="aadhaarNo"
                        maxLength={16}
                        value={aadhaarNo}
                        onChange={(e) =>
                          updateVal(e, index, allData, setAllData)
                        }
                      />
                    </Table.Cell>

                    <Table.Cell>
                      <select
                        className="border cursor-pointer border-gray-300 rounded-md"
                        name="typeOfWorkers"
                        id=""
                        onChange={(e) =>
                          updateVal(e, index, allData, setAllData)
                        }
                      >
                        <option value="">-select worker type-</option>
                        <option value="U">Unskilled</option>
                        <option value="SS">Semi-Skilled</option>
                        <option value="S">Skilled</option>
                      </select>
                    </Table.Cell>

                    <Table.Cell>
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
                    </Table.Cell>
                    <Table.Cell>
                      <select
                        className="w-32 border cursor-pointer border-gray-300 rounded-md"
                        name="noOfDaysWorkDemanded"
                        id=""
                        onChange={(e) =>
                          updateVal(e, index, allData, setAllData)
                        }
                      >
                        <option value="">
                          -select no of Days Work Demanded-
                        </option>
                        {demandDays.map((day) => (
                          <option value={day}>{day}</option>
                        ))}
                      </select>
                    </Table.Cell>
                    <Table.Cell>
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
                    </Table.Cell>
                  </Table.Row>
                )
              )}
            </Table.Body>
          </Table>
        </div>

        <div className="flex justify-center items-center">
          <button
            type="button"
            className="w-1/5 py-2 px-4 border mt-10 border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            // onClick={onRegister}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkRequirement;
