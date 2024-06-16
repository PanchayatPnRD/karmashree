import webApi, { baseURL } from "../../WebApi/WebApi";

export const addCreateContractor = async (
  contractorName,
  contractorGSTIN,
  contractorPAN,
  contractorMobile,
  contractorAddress,
  contractorStatus,
  userIndex,
  c_month,
  c_Year,
  finYear,
  DepartmentNo,
  districtcode,
  Municipality,
  block,
  gpCode,
  area,
  onSuccess,
  onFailure
) => {
  try {
    const res = await webApi.post(`/api/contractor/createcontractor`, {
      contractorName: contractorName,
      contractorGSTIN: contractorGSTIN,
      contractorPAN: contractorPAN,
      contractorMobile: contractorMobile,
      contractorAddress: contractorAddress,
      contractorStatus: contractorStatus,
      userIndex: userIndex,
      c_month: c_month,
      c_Year: c_Year,
      finYear: finYear,
      DepartmentNo: DepartmentNo,
      districtcode: districtcode,
      Municipality: Municipality,
      gpCode: gpCode === "" ? 0 : gpCode,
      blockCode: block,
      area: area,
    });
    if (res?.data?.errorCode == 0) {
      const r = res.data;

      return onSuccess(r);
    } else if (res?.data?.errorCode == 1) {
      const r = res.data;

      return onSuccess(r);
    } else {
      onFailure("Something Wrong! Please Try again later" + res.data);
    }
  } catch (error) {}
};

export const getAllContractorList = async (userId) => {
  return await webApi.get(`/api/contractor/getcontractorList/${userId}`);
};
