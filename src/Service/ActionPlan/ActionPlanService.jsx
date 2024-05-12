import webApi, { baseURL } from "../../WebApi/WebApi";


export const getAllDistrictActionList = async () => {
    return await webApi.get(`/api/mastertable/getAllDistrictsaction`,
    );
}


export const getAllBlockList = async (districtCode) => {
    console.log(districtCode, "districtCode")
    return await webApi.get(`/api/mastertable/getBlockaction/${parseInt(districtCode)}`,
    );
}

export const getAllMunicipalityList = async (districtCode) => {
    console.log(districtCode, "districtCode")
    return await webApi.get(`/api/mastertable/getMunicipality/${parseInt(districtCode)}`,
    );
}

export const getAllGramPanchayatList = async (districtCode, BlockCode) => {
    console.log(districtCode, BlockCode, "districtCode")
    return await webApi.get(`/api/mastertable/getGpaction/${parseInt(districtCode)}/${parseInt(BlockCode)}`,
    );
}


export const getAllSectorActionList = async () => {
    return await webApi.get(`/api/mastertable/getSectorList`,
    );
}


export const addCreateAction = async (schemeArea, district, municipality, block, gp, sector,
    schemeProposed, costOfSCheme, totalWages, totalPersonDays,
    totalJobCard, totalAverageDays, financialYear, currentMonth,
    currentYear, departmentNo, userIndex, onSuccess, onFailure) => {


    console.log(schemeArea, district, municipality, block, gp, sector,
        schemeProposed, costOfSCheme, totalWages, totalPersonDays,
        totalJobCard, totalAverageDays, financialYear, currentMonth,
        currentYear, departmentNo, userIndex, "sibamdey")
    try {
        const res = await webApi.post(
            `/api/actionplan/create-actionplan`,
            {
                schemeArea: schemeArea,
                districtCode: parseInt(district === "" ? 0 : district),
                municipalityCode: parseInt(municipality === "" ? 0 : municipality),
                blockCode: parseInt(block === "" ? 0 : block),
                gpCode: parseInt(gp === "" ? 0 : gp),
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
                departmentNo: departmentNo,
                userIndex: userIndex
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




export const getAllActionPlanList = async (userId) => {
    console.log(userId, "userId")
    return await webApi.get(`/api/actionplan/getActionList/${userId}`,
    );
}