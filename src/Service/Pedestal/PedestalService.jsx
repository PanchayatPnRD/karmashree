import webApi, { baseURL } from "../../WebApi/WebApi";

export const getAllPedestalList = async (data) => {    
    return await webApi.get(`/api/mastertable/getAllPedestal/${data}`,
    );
}

export const addCreatePedestal = async (departmentNo,departmentName,pedestalName,userIndex,onSuccess, onFailure) => {


    console.log(departmentNo,departmentName,pedestalName,userIndex, "sibamdey")
    try {
        const res = await webApi.post(
            `/api/mastertable/createPedestal`,
            {
                departmentNo:departmentNo,
                departmentName:departmentName,
                pedestalName:pedestalName,
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
