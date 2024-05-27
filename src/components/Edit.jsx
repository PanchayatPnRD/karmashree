import { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { fetch } from "../functions/Fetchfunctions";
import SuccessModal from "./SuccessModal";

const Edit = () => {
  const [openModal, setOpenModal] = useState();
  const [formdata, setFormdata] = useState({});
  const navigate = useNavigate();
  const { state } = useLocation();
  let { userId } = useParams();

  const {
    data: userDetails,
    isSuccess: fetchStatus,
    dataUpdatedAt,
  } = useQuery({
    queryKey: ["edit"],
    queryFn: async () => {
      const { data } = await fetch.get("/api/user/viewuser/", userId);
      return data.result;
    },
    // refetchOnMount:"always"
  });

  const { data: roles } = useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      const { data } = await fetch.get("/api/mastertable/roles");
      return data.result;
    },
  });

  const { data: designationList } = useQuery({
    queryKey: ["designationList"],
    queryFn: async () => {
      const { data } = await fetch.get("/api/mastertable/DesignationList");
      return data.result;
    },
  });

  useEffect(() => {
    setFormdata(null);
    if (fetchStatus) {
      setFormdata({ ...userDetails, dataUpdatedAt: dataUpdatedAt });
    }
  }, [userDetails]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormdata((prevFormData) => ({
      ...prevFormData,
      [name]: parseInt(value) ? parseInt(value) : value,
    }));
  }
  const queryClient = useQueryClient();

  const { mutate, isSuccess: editStatus } = useMutation({
    mutationFn: (data) => {
      return fetch.put(data, "/api/user/updateUser/", userId);
    },
    mutationKey: ["update"],
    onSuccess: () => {
      queryClient.invalidateQueries("edit");
      setOpenModal(true);
      // navigate("/dashboard/" + state)
    },
  });

  return (
    <>
      <SuccessModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        to={state}
        isSuccess={editStatus}
        message={"User updated successfully"}
      />
      <button
        onClick={() => {
          navigate("/dashboard/" + state);
        }}
        className="px-4 flex items-center space-x-3 py-1 bg-blue-500 w-fit m-4 hover:bg-blue-500/90 text-white  rounded transition-all hover:shadow-md"
      >
        <Icon icon={"fluent-mdl2:chrome-back"} />
        <span>Back</span>
      </button>
      <div className="flex flex-col items-center flex-grow space-y-4">
        <div className="flex items-center px-6 space-x-4">
          <label htmlFor="" className="w-1/5 text-end text-zinc-500/90">
            Department
          </label>
          <input
            className="rounded"
            type="text"
            name="deptName"
            value={formdata?.deptName}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center px-6 space-x-4">
          <label htmlFor="" className="w-1/5 text-end text-zinc-500/90">
            username
          </label>
          <input
            className="rounded"
            type="text"
            name="userName"
            value={formdata?.userName}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center px-6 space-x-4">
          <label htmlFor="" className=" text-end text-zinc-500/90">
            designation
          </label>
          <select
            name="designationID"
            id=""
            className="w-fit"
            value={formdata?.designationID}
            onChange={handleChange}
          >
            {designationList?.map((e) => (
              <option value={e.designationId}>{e.designation}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center px-6 space-x-4">
          <label htmlFor="" className=" text-end text-zinc-500/90">
            Role Type
          </label>
          <select
            name="role_type"
            id=""
            className="w-fit"
            value={formdata?.role_type}
            onChange={handleChange}
          >
            {roles?.map((e) => (
              <option value={e.id}>{e.role_type}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center px-6 space-x-4">
          <label htmlFor="" className="w-1/5 text-end text-zinc-500/90">
            address
          </label>
          <input
            className="rounded"
            type="text"
            name="UserAddress"
            value={formdata?.UserAddress}
            onChange={handleChange}
          />
        </div>
        <button
          onClick={() => mutate(formdata)}
          className="px-4 flex items-center space-x-3 hover:space-x-6 py-1 bg-blue-500 w-fit m-4 hover:bg-blue-500/90 text-white  rounded transition-all hover:shadow-md"
        >
          Update
        </button>
      </div>
    </>
  );
};

export default Edit;
