import webApi, { baseURL } from "../../WebApi/WebApi";

//FOR LOGIN

export const getVerifyOtp = async (otp, userId, onSuccess, onFailure) => {
  try {
    const res = await webApi.post(`/api/auth/verify-otp`, {
      userId: userId,
      otp: otp,
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
