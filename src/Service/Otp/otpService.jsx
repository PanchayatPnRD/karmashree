import webApi, { baseURL } from "../../WebApi/WebApi";

//FOR LOGIN 

export const getVerifyOtp = async (otp, userId, onSuccess, onFailure) => {
    console.log(otp, userId, "login")

    try {
        const res = await webApi.post(

            `/api/auth/verify-otp`,
            {
                userId: userId,
                otp: otp,

            }
        );
        console.log(res.data.errorCode, "resresresres")
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
        console.log(error)
    }
};