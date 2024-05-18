import { useState, useEffect, useMemo } from "react";
import { devApi } from "../../WebApi/WebApi";
import DatePicker from "react-datepicker";
import { Table, TableHead } from "flowbite-react";
import axios from "axios";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Employment = () => {
  const [paymentDate, setPaymentDate] = useState();
  const lastTenYears = Array.from({ length: 10 }, (_, index) => {
    const startYear = new Date().getFullYear() - index;
    return `${startYear}-${startYear + 1}`;
  });

  const [schemeSelected, setSchemeSelected] = useState("");

  const [dropdownData, setDropdownData] = useState(["", "", "", ""]);
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

  const schemeJSON = useMemo(() => {
    if (schemeSelected.length > 0) return JSON.parse(schemeSelected);
  }, [schemeSelected]);

  const queryClient = useQueryClient();

  const { data: districtList } = useQuery({
    queryKey: ["districtList"],
    queryFn: async () => {
      const data = await axios.get(
        devApi + "/api/mastertable/getAllDistrictsaction"
      );
      return data.data.result;
    },
  });

  const { data: blockList, isLoading: blockLoading } = useQuery({
    queryKey: ["blockList"],
    queryFn: async () => {
      const data = await axios.get(
        devApi + "/api/mastertable/getBlockaction/" + dropdownData[1]
      );

      return data.data.result;
    },
    enabled: dropdownData[0].length > 0 && dropdownData[0] == "R",
  });

  const { data: muncList, isLoading: muncLoading } = useQuery({
    queryKey: ["muncList"],
    queryFn: async () => {
      const data = await axios.get(
        devApi + "/api/mastertable/getMunicipality/" + dropdownData[1] + "/0"
        // "http://localhost:8094/api/mastertable/getMunicipality/320/0"
      );
      // console.log(
      //   devApi + "api/mastertable/getMunicipality/" + dropdownData[1] + "/0"
      // );
      return data.data.result;
    },
    enabled:
      dropdownData[0].length > 0 &&
      dropdownData[0] == "U" &&
      dropdownData[1].length > 0,
  });

  const { data: allocList, isLoading: allocLoading } = useQuery({
    queryKey: ["allocList"],
    queryFn: async () => {
      const data = await axios.get(
        devApi +
          "/api/employment/listofallocationinemplyment?schemeId=" +
          schemeJSON?.scheme_sl
      );

      return data.data.result;
    },
    enabled: schemeSelected.length > 0,
  });

  const { data: gpList, isLoading: gpLoading } = useQuery({
    queryKey: ["gpList"],
    queryFn: async () => {
      const data = await axios.get(
        devApi +
          "/api/mastertable/getGpaction/" +
          dropdownData[1] +
          "/" +
          dropdownData[2]
      );

      return data.data.result;
    },
    enabled: dropdownData[1].length > 0,
  });
  const isSchemeVisible = useMemo(() => {
    if (dropdownData[0] == "R" && dropdownData[3].length > 0) return true;
    if (dropdownData[0] == "U" && dropdownData[2].length > 0) return true;
    else return false;
  }, [dropdownData]);

  const { data: schemeList } = useQuery({
    queryKey: ["schemeList"],
    queryFn: async () => {
      const data = await axios.get(
        devApi +
          "/api/schememaster/getschmeforallocation?" +
          `blockcode=${dropdownData[2]}&gpCode=${dropdownData[3]}`
      );

      return data.data.result;
    },
    enabled: isSchemeVisible && dropdownData[0] == "R",
    staleTime: 0,
  });

  useEffect(() => {
    if (dropdownData[1].length > 0 && dropdownData[0] == "R")
      queryClient.invalidateQueries({ queryKey: ["blockList"] });
    if (dropdownData[2].length > 0 && dropdownData[0] == "R")
      queryClient.invalidateQueries({ queryKey: ["gpList"] });
    if (dropdownData[3].length > 0 && dropdownData[0] == "R") {
      setSchemeSelected("");
      queryClient.invalidateQueries({ queryKey: ["schemeList"] });
    }
  }, [dropdownData]);

  return (
    <div className="flex-grow">
      <ToastContainer />
      <div className="mx-auto mt-2">
        <div className="bg-white rounded-lg p-12">
          <div className="shadow-md" style={{ marginBottom: "-1rem" }}>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <nav aria-label="Breadcrumb">
                  <ol className="flex items-center space-x-4 px-4 py-2">
                    {" "}
                    {/* Added padding */}{" "}
                    <svg
                      viewBox="0 0 1024 1024"
                      fill="currentColor"
                      height="1em"
                      width="1em"
                    >
                      <path d="M946.5 505L534.6 93.4a31.93 31.93 0 00-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3 0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8 24.9-25 24.9-65.5-.1-90.5z" />
                    </svg>
                    <li>
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        Home
                      </a>
                      /
                    </li>
                    <li className="text-gray-500 font-bold" aria-current="page">
                      Employment Entry
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
            <br />
          </div>

          <br></br>
          <div className="bg-white shadow-md rounded-lg p-12">
            <div className="flex pb-8 flex-col space-y-4">
              <div className="flex flex-col space-y-8">
                <Table>
                  <Table.Head>
                    <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md">
                      #
                    </Table.HeadCell>
                    <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md">
                      Financial year
                    </Table.HeadCell>
                    <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md">
                      District
                    </Table.HeadCell>
                    <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md">
                      Block
                    </Table.HeadCell>
                    <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md">
                      Scheme Id
                    </Table.HeadCell>
                    <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md">
                      total no of work allcoated
                    </Table.HeadCell>
                    <Table.HeadCell className="capitalize bg-cyan-400/40 text-blue-900 text-md">
                      total no of work demanded
                    </Table.HeadCell>
                    
                      <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md">
                      Action
                    </Table.HeadCell>
                    
                  </Table.Head>
                </Table>
                <Table>
                  <Table.Head>
                    <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md">
                      #
                    </Table.HeadCell>
                    <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md">
                      Work Jobcard No
                    </Table.HeadCell>
                    <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md">
                      Job Card Holder Name
                    </Table.HeadCell>
                    <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md">
                      Allocation Date From
                    </Table.HeadCell>
                    <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md">
                      Allocation Date To
                    </Table.HeadCell>
                    <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md">
                      Total Days work Provided
                    </Table.HeadCell>
                    <Table.HeadCell className="normal-case bg-cyan-400/40 text-blue-900 text-md">
                      Total Wage Paid
                    </Table.HeadCell>
                  </Table.Head>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employment;
