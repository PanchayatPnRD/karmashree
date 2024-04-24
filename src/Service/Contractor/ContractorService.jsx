import webApi, { baseURL } from "../../WebApi/WebApi";



export const addCreateContractor = async (schemeArea, district, municipality, block, gp, sector,
    schemeProposed, costOfSCheme, totalWages, totalPersonDays,
    totalJobCard, totalAverageDays, financialYear, currentMonth,
    currentYear, departmentNo, userIndex, onSuccess, onFailure) => {


    console.log(schemeArea, district, municipality, block, gp, sector,
        schemeProposed, costOfSCheme, totalWages, totalPersonDays,
        totalJobCard, totalAverageDays, financialYear, currentMonth,
        currentYear, departmentNo, userIndex, "sibamdey")
    try {
        const res = await webApi.post(
            `/api/contractor/createcontractor`,
            {
                schemeArea: schemeArea,
                districtCode: district,
                municipalityCode: municipality ? municipality : "",
                blockCode: block ? block : "",
                gpCode: gp ? gp : "",
                schemeSector: sector,
                schemeProposed:schemeProposed,
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




export const getAllContractorList = async (userId) => {
    console.log(userId, "userId")
    return await webApi.get(`/api/contractor/getcontractorList/${userId}`,
    );
}