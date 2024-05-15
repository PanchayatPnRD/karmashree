import webApi, { baseURL } from "../../WebApi/WebApi";


export const addCreateWorkRequirement = async (area, departmentNo, district, municipality,
    block, gp, villageName, scheme, contractor, personName, phoneNumber, reportingPlace,
    nearestLandmark, startDate, days, currentMonth, currentYear, financialYear, userIndex, dataArr,
    onSuccess,
    onFailure) => {

    console.log(area, departmentNo, district, municipality,
        block, gp, villageName, scheme, contractor, personName, phoneNumber, reportingPlace,
        nearestLandmark, startDate, days, currentMonth, currentYear, financialYear, userIndex, dataArr, "requirement")
    try {
        const res = await webApi.post(
            `/api/workerrequisition/createworkerRequisition`,
            {
                "schemeArea": area,
                "departmentNo": departmentNo,
                "districtcode": district ? district : 0,
                "municipalityCode": municipality ? municipality : 0,
                "blockCode": block ? block : 0,
                "gpCode": gp ? gp : 0,
                "sansadID": 0,
                "village": villageName,
                "workCodeSchemeID": 2,
                "ContractorID": contractor,
                "contactPersonName": personName,
                "contactPersonPhoneNumber": phoneNumber,
                "reportingPlace": reportingPlace,
                "nearestLandMark": nearestLandmark,
                "fromDate": startDate,
                "noOfDays": days,
                "currentMonth": currentMonth,
                "currentYear": currentYear,
                "finYear": financialYear,
                "userIndex": userIndex,
                "createworkalloDto": dataArr
            }


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
