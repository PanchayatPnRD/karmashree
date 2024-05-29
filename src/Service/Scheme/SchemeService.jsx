import webApi, { baseURL } from "../../WebApi/WebApi";

export const getAllContractorList = async () => {
    return await webApi.get(`/api/contractor/masterContractorlist`,
    );
}


export const getSchemeList = async (userId) => {
    console.log(userId, "hashashhas")
    return await webApi.get(`/api/schememaster/getAllScheme/${userId}`,
    );
}


//add Scheme

export const addCreateScheme = async (
    schemeArea,
    departmentNo,
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
    onFailure) => {


    console.log(
        schemeArea,
        departmentNo,
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
        ExecutingDeptName, "saaaaaaaaaaaaaaaaaaaaaaaa"
        , ImplementingAgencyID,
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
        workorderNo === "" ? 0 : workorderNo, "workorderNo",
        workOderDate,
        ControctorID, "ControctorID",
        schemeStatus,
        CurrentMonth,
        CurrentYear,
        finYear,
        Remarks,
        userIndex, "SCHEME")
    try {
        const res = await webApi.post(
            `/api/schememaster/createschememaster`,
            {
                "schemeArea": schemeArea,
                "departmentNo": departmentNo,
                "districtcode": districtcode ? districtcode : 0,
                "municipalityCode": municipalityCode ? municipalityCode : 0,
                "blockcode": block ? block : 0,
                "gpCode": gpCode ? gpCode : 0,
                "sansadID": sansadID,
                "village": village,
                "schemeSector": schemeSector,
                "schemeSubsector": schemeSubsector,
                "schemeName": schemeName,
                "FundingDepttID": FundingDepttID,
                "FundingDeptname": FundingDeptname,
                "ExecutingDepttID": ExecutingDepttID,
                "ExecutingDeptName": ExecutingDeptName,
                "ImplementingAgencyID": ImplementingAgencyID,
                "ImplementingAgencyName": ImplementingAgencyName,
                "StatusOfWork": StatusOfWork,
                "tentativeStartDate": tentativeStartDate,
                "ActualtartDate": ActualtartDate,
                "ExpectedCompletionDate": ExpectedCompletionDate,
                "totalprojectCost": totalprojectCost,
                "totalWageCost": totalWageCost,
                "totalLabour": totalLabour,
                "personDaysGenerated": personDaysGenerated,
                "totalUnskilledWorkers": totalUnskilledWorkers,
                "totalSemiSkilledWorkers": totalSemiSkilledWorkers,
                "totalSkilledWorkers": totalSkilledWorkers,
                "workorderNo": workorderNo === "" ? 0 : workorderNo,
                "workOderDate": workOderDate,
                "ControctorID": ControctorID === "" ? 0 : ControctorID,
                "schemeStatus": schemeStatus,
                "CurrentMonth": CurrentMonth,
                "CurrentYear": CurrentYear,
                "finYear": finYear,
                "Remarks": Remarks,
                "userIndex": userIndex

            },


        );
        if (res?.data?.errorCode == 0) {
            const r = res.data;
            console.log(r, "rerere")

            return onSuccess(r);

        } else if (res?.data?.errorCode == 1) {
            const r = res.data;
            console.log(r, "rerere")

            return onSuccess(r);
        } else {
            onFailure("Something Wrong! Please Try again later" + res.data);

        }
    } catch (error) {
        console.log("fdgdf")
    }
};


//scheme list

export const getAllSchemeList = async (userId) => {
    console.log(userId, "userId")
    return await webApi.get(`/api/schememaster/schemelist/${userId}`,
    );
}