import webApi, { baseURL } from "../../WebApi/WebApi";

export const addAllocation = async (
  AllocAPIData,
  reqDate,
  reqId,
  onSuccess,
  onFailure
) => {
  try {
    const res = await webApi.post(`/api/allocation/allocation`, {
      workAllocations: AllocAPIData,
      reqDate: reqDate,
      reqId: reqId,
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
