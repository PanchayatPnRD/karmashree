import webApi, { baseURL } from "../../WebApi/WebApi";

export const getAllDistrictActionList = async () => {
  return await webApi.get(`/api/mastertable/getAllDistrictsaction`);
};

export const getAllBlockList = async (districtCode) => {
  return await webApi.get(
    `/api/mastertable/getBlockaction/${parseInt(districtCode)}`
  );
};

export const getAllMunicipalityList = async (districtCode, urbanCode) => {
  return await webApi.get(
    `/api/mastertable/getMunicipality/${parseInt(districtCode)}/${parseInt(
      urbanCode
    )}`
  );
};

export const getAllGramPanchayatList = async (districtCode, BlockCode) => {
  return await webApi.get(
    `/api/mastertable/getGpaction/${parseInt(districtCode)}/${parseInt(
      BlockCode
    )}`
  );
};

export const getAllSectorActionList = async () => {
  return await webApi.get(`/api/mastertable/getSectorList`);
};

export const addCreateAction = async (
  department,
  parastatals,
  schemeArea,
  district,
  municipality,
  block,
  gp,
  sector,
  schemeProposed,
  costOfSCheme,
  totalWages,
  totalPersonDays,
  totalJobCard,
  totalAverageDays,
  financialYear,
  currentMonth,
  currentYear,
  userIndex,
  onSuccess,
  onFailure
) => {

  try {
    const res = await webApi.post(`/api/actionplan/create-actionplan`, {
      departmentNo: department,
      pedastal: parastatals,
      schemeArea: schemeArea,
      districtCode: district,
      municipalityCode: municipality ? municipality : 0,
      blockCode: block ? block : 0,
      gpCode: gp ? gp : 0,
      schemeSector: sector,
      schemeProposed: schemeProposed,
      tentativeCostOfScheme: costOfSCheme,
      totWagesPaid: totalWages,
      totPersonDays: totalPersonDays,
      totJobCard: totalJobCard,
      averageDays: totalAverageDays,
      finYear: financialYear,
      acMonth: currentMonth,
      acYear: currentYear,
      userIndex: userIndex,
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

export const getAllActionPlanList = async (userId) => {
  return await webApi.get(`/api/actionplan/getActionList/${userId}`);
};
