import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jobCard } from "../../data/Data";
import { toast } from "react-toastify";
import { showToastOnce } from "../../component/toastUtils";

const user = JSON.parse(localStorage.getItem("userdata"));
const token = localStorage.getItem("accessToken");
export const saveData = createAsyncThunk("data/saveData", async (id) => {
  return fetch(
    "https://tprosysit.com/upmrc/public/api/register/signalling/edit",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        formType: "job-card",
        status: "1",
        update_id: id,
      }),
    }
  ).then((res) => res.json());
});
export const fetchData = createAsyncThunk("data/fetchData", async () => {
  return fetch(
    "https://tprosysit.com/upmrc/public/api/register/signalling/viewData",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        formType: "job-card",
      }),
    }
  ).then((res) => res.json());
});
export const addData = createAsyncThunk("data/addData", async (values) => {
  console.log(values);
  return fetch(
    "https://tprosysit.com/upmrc/public/api/register/signalling/save",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        formType: "job-card",
        date: values.date,
        ptwNo: values.ptwNo,
        jcNo: new Date().getFullYear() + "/" + values.jcNo,
        carNo: values.carNo,
        trainNumber: values.trainNumber,
        expectedCompletionTime: values.expectedCompletionTime,
        jobType: values.jobType,
        jobDescription: values.jobDescription,
        workDetails: values.workDetails,
        work: values.work,
        contractorName: values.contractorName,
        roofAccessRequired: values.roofAccessRequired,
        powerBlockRequired: values.powerBlockRequired,
        powerBlockSupervisor: values.powerBlockSupervisor,
        lmrcStaffName: values.lmrcStaffName,
        lmrcStaffDesignation: values.lmrcStaffDesignation,
        failureHistory: values.failureHistory,
        sgcName: values.sgcName,
        sgcDate: values.sgcDate,
        completionDetails: values.completionDetails,
        condition1: values.condition1,
        condition2: values.condition2,
        followUpDetails: values.followUpDetails,
        atpStatus: values.atpStatus,
        atoStatus: values.atoStatus,
        powerBlockRequestCancelled: values.powerBlockRequestCancelled,
        oldSrNoDetails: values.oldSrNoDetails,
        newSrNoDetails: values.newSrNoDetails,
        conclusion: values.conclusion,
        workPending: values.workPending,
        auxStatus: values.auxStatus,
        trainEnergized: values.trainEnergized,
        trainEnergizedReason: values.trainEnergizedReason,
        contractorStaffName: values.contractorStaffName,
        contractorStaffSign: values.contractorStaffSign,
        contractorStaffDate: values.contractorStaffDate,
        contractorStaffTime: values.contractorStaffTime,
        signalingStaffName: values.signalingStaffName,
        signalingStaffSign: values.signalingStaffSign,
        signalingStaffDate: values.signalingStaffDate,
        signalingStaffTime: values.signalingStaffTime,
        sgcSignName: values.sgcSignName,
        sgcSign: values.sgcSign,
        sgcSignDate: values.sgcSignDate,
        sgcSignTime: values.sgcSignTime,
        employee_id: user.profileid,
        unit: user.department,
        department: user.department,
      }),
    }
  ).then((res) => res.json());
});
export const editData = createAsyncThunk("data/editData", async (values) => {
  console.log(values);
  return fetch(
    "https://tprosysit.com/upmrc/public/api/register/afc_mainline/edit",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        update_id: values.id,
        formType: "job-card",
        date: values.date,
        ptwNo: values.ptwNo,
        jcNo: new Date().getFullYear() + "/" + values.jcNo,
        carNo: values.carNo,
        trainNumber: values.trainNumber,
        expectedCompletionTime: values.expectedCompletionTime,
        jobType: values.jobType,
        jobDescription: values.jobDescription,
        workDetails: values.workDetails,
        work: values.work,
        contractorName: values.contractorName,
        roofAccessRequired: values.roofAccessRequired,
        powerBlockRequired: values.powerBlockRequired,
        powerBlockSupervisor: values.powerBlockSupervisor,
        lmrcStaffName: values.lmrcStaffName,
        lmrcStaffDesignation: values.lmrcStaffDesignation,
        failureHistory: values.failureHistory,
        sgcName: values.sgcName,
        sgcDate: values.sgcDate,
        completionDetails: values.completionDetails,
        condition1: values.condition1,
        condition2: values.condition2,
        followUpDetails: values.followUpDetails,
        atpStatus: values.atpStatus,
        atoStatus: values.atoStatus,
        powerBlockRequestCancelled: values.powerBlockRequestCancelled,
        oldSrNoDetails: values.oldSrNoDetails,
        newSrNoDetails: values.newSrNoDetails,
        conclusion: values.conclusion,
        workPending: values.workPending,
        auxStatus: values.auxStatus,
        trainEnergized: values.trainEnergized,
        trainEnergizedReason: values.trainEnergizedReason,
        contractorStaffName: values.contractorStaffName,
        contractorStaffSign: values.contractorStaffSign,
        contractorStaffDate: values.contractorStaffDate,
        contractorStaffTime: values.contractorStaffTime,
        signalingStaffName: values.signalingStaffName,
        signalingStaffSign: values.signalingStaffSign,
        signalingStaffDate: values.signalingStaffDate,
        signalingStaffTime: values.signalingStaffTime,
        sgcSignName: values.sgcSignName,
        sgcSign: values.sgcSign,
        sgcSignDate: values.sgcSignDate,
        sgcSignTime: values.sgcSignTime,
        employee_id: user.profileid,
        unit: user.department,
        department: user.department,
      }),
    }
  ).then((res) => res.json());
});
const jobCardSlice = createSlice({
  name: "jobcard",
  initialState: {
    loading: false,
    data: [],
    slug: "job-card",
    error: "",
    isSuccess: "",
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
      // clg
    });

    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
      console.log(action.payload);
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
      console.log(action);
      showToastOnce(action.error.message, "error");
    });

    // add data
    builder.addCase(addData.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(addData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = [];
      state.isSuccess = action.payload;
      console.log(action.payload);
      showToastOnce(action.payload.message);
    });

    builder.addCase(addData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
      showToastOnce(action.error.message, "error");
    });
    // edit data
    builder.addCase(editData.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(editData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = [];
      state.isSuccess = action.payload;
      console.log(action.payload);
      showToastOnce(action.payload.message);
    });

    builder.addCase(editData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
      showToastOnce(action.error.message, "error");
    });
    // save data
    builder.addCase(saveData.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(saveData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = [];
      state.isSuccess = action.payload;
      console.log(action.payload);
      showToastOnce(action.payload.message);
    });

    builder.addCase(saveData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
      showToastOnce(action.error.message, "error");
    });
  },
});

// Export additional action alias for compatibility
export const addJobCard = addData;

export default jobCardSlice.reducer;
