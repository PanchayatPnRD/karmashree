import webApi, { baseURL } from "../WebApi/WebApi";

//FOR LOGIN

export const getLogin = async (userId, password, onSuccess, onFailure) => {
  try {
    const res = await webApi.post(`/api/auth/User_login`, {
      userId: userId,
      password: password,
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

export const getPasswordReset = async (
  userId,
  contactNo,
  onSuccess,
  onFailure
) => {
  try {
    const res = await webApi.post(`/api/auth/passwordreset`, {
      userId: userId,
      contactNo: contactNo,
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

export const getVerifyOtpResetPassword = async (
  otp,
  userId,
  onSuccess,
  onFailure
) => {
  try {
    const res = await webApi.post(`/api/auth/resetotp`, {
      userId: userId,
      resetotp: otp,
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

export const getNewPasswordGenerate = async (
  userId,
  newPassword,
  onSuccess,
  onFailure
) => {
  try {
    const res = await webApi.put(`/api/auth/userId/${userId}`, {
      encryptpassword: newPassword,
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
