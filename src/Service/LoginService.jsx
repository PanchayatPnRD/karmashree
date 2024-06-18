import webApi, { baseURL } from "../WebApi/WebApi";

//FOR LOGIN 

export const getLogin = async (userId, password, onSuccess, onFailure) => {
    console.log(userId, password, "login")

    try {
        const res = await webApi.post(

            `/api/auth/User_login`,
            {
                userId: userId,
                password: password,

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


export const getPasswordReset = async (userId, contactNo, onSuccess, onFailure) => {
    console.log(userId, contactNo, "reset")

    try {
        const res = await webApi.post(

            `/api/auth/passwordreset`,
            {
                userId: userId,
                contactNo: contactNo,

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


export const getVerifyOtpResetPassword = async (otp, userId, onSuccess, onFailure) => {
    console.log(otp, userId, "login")

    try {
        const res = await webApi.post(

            `/api/auth/resetotp`,
            {
                userId: userId,
                resetotp: otp,

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

export const getNewPasswordGenerate = async ( userId,newPassword, onSuccess, onFailure) => {
    console.log(userId,newPassword, "confirm")

    try {
        const res = await webApi.put(`/api/auth/userId/${userId}`, {
          encryptpassword: newPassword,
        });
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