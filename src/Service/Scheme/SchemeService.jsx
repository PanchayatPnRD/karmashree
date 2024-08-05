import webApi, { baseURL } from "../../WebApi/WebApi";

export const getAllContractorList = async () => {
  return await webApi.get(`/api/contractor/masterContractorlist`);
};

export const getSchemeList = async (userId) => {
  return await webApi.get(`/api/schememaster/getAllScheme/${userId}`);
};

//add Scheme

export const addCreateScheme = async (
  schemeArea,
  departmentNo,
  a,
  districtcode,
  municipalityCode,
  block,
  gpCode,
  sansadID,
  village,
  schemeSector,
  schemeSubsector,
  schemeName,
  FundingDepttID,
  FundingDeptname,
  ExecutingDepttID,
  ExecutingDeptName,
  ImplementingAgencyID,
  ImplementingAgencyName,
  StatusOfWork,
  tentativeStartDate,
  ActualtartDate,
  ExpectedCompletionDate,
  totalprojectCost,
  totalWageCost,
  totalLabour,
  personDaysGenerated,
  totalUnskilledWorkers,
  totalSemiSkilledWorkers,
  totalSkilledWorkers,
  workorderNo,
  workOderDate,
  ControctorID,
  schemeStatus,
  CurrentMonth,
  CurrentYear,
  finYear,
  Remarks,
  userIndex,
  onSuccess,
  onFailure
) => {
 
  try {
    const res = await webApi.post(`/api/schememaster/createschememaster`, {
      schemeArea: schemeArea,
      departmentNo: departmentNo,
      deptWing: a,
      districtcode: districtcode ? districtcode : 0,
      municipalityCode: municipalityCode ? municipalityCode : 0,
      blockcode: block ? block : 0,
      gpCode: gpCode ? gpCode : 0,
      sansadID: sansadID,
      village: village,
      schemeSector: schemeSector,
      schemeSubsector: schemeSubsector,
      schemeName: schemeName,
      FundingDepttID: FundingDepttID,
      FundingDeptname: FundingDeptname,
      ExecutingDepttID: ExecutingDepttID,
      ExecutingDeptName: ExecutingDeptName,
      ImplementingAgencyID: ImplementingAgencyID,
      ImplementingAgencyName: ImplementingAgencyName,
      StatusOfWork: StatusOfWork,
      tentativeStartDate: tentativeStartDate,
      ActualtartDate: ActualtartDate,
      ExpectedCompletionDate: ExpectedCompletionDate,
      totalprojectCost: totalprojectCost,
      totalwagescostinvoled: totalWageCost,
      totalLabour: totalLabour,
      personDaysGenerated: personDaysGenerated,
      totalUnskilledWorkers: totalUnskilledWorkers,
      totalSemiSkilledWorkers: totalSemiSkilledWorkers,
      totalSkilledWorkers: totalSkilledWorkers,
      workorderNo: workorderNo === "" ? 0 : workorderNo,
      workOderDate: workOderDate,
      ControctorID: ControctorID === "" ? 0 : ControctorID,
      schemeStatus: schemeStatus,
      CurrentMonth: CurrentMonth,
      CurrentYear: CurrentYear,
      finYear: finYear,
      Remarks: Remarks,
      userIndex: userIndex,
      is_draft: "0",
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

//update scheme

export const updateScheme = async (
  schemeId,
  StatusOfWork,
  tentativeStartDate,
  ActualtartDate,
  ExpectedCompletionDate,
  workorderNo,
  workOderDate,
  ControctorID,
  Remarks,
  onSuccess,
  onFailure
) => {
 

  try {
    const res = await webApi.post(`/api/schememaster/updateschme/${schemeId}`, {
      StatusOfWork: StatusOfWork,
      tentativeStartDate: tentativeStartDate,
      ActualtartDate: ActualtartDate,
      ExpectedCompletionDate: ExpectedCompletionDate,
      workorderNo: workorderNo === "" ? 0 : workorderNo,
      workOderDate: workOderDate,
      ControctorID: ControctorID === "" ? 0 : ControctorID,
      Remarks: Remarks,
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

//scheme list

export const getAllSchemeList = async (userId) => {
  return await webApi.get(`/api/schememaster/schemelist/${userId}`);
};

//scheme details view
export const getSchemeViewDetails = async (schemeID) => {
  return await webApi.get(`/api/schememaster/schemeview/${schemeID}`);
};
