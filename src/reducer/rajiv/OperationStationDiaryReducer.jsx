import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { formatDate } from "../../data/formatDate";
import { toast } from "react-toastify";
import { showToastOnce } from "../../component/toastUtils";

const user = JSON.parse(localStorage.getItem("userdata"));
const token = localStorage.getItem("accessToken");
export const saveData = createAsyncThunk("data/saveData", async (id) => {
  return fetch("https://tprosysit.com/upmrc/public/api/operation/edit", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      formType: "station-diary",
      status: "1",
      update_id: id,
    }),
  }).then((res) => res.json());
});
// Fetch initial data from API
export const fetchData = createAsyncThunk("data/fetchData", async () => {
  return fetch("https://tprosysit.com/upmrc/public/api/operation/viewData", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      formType: "station-diary",
    }),
  }).then((res) => res.json());
});

// Add new data to API
export const addData = createAsyncThunk("data/addData", async (values) => {
  console.log(values);
  return fetch("https://tprosysit.com/upmrc/public/api/operation/save", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      formType: "station-diary",
      stationName: user.station,
      date: formatDate(new Date().toString()),
      dutyShiftTimings: values.dutyShiftTimings,
      name: user.name,
      designation: user.designation,
      empNo: user.employeeid,
      staffOnDuty: values.staffOnDuty,
      contractorStaff: values.contractorStaff,
      events: values.events,
      coinsCash: values.coinsCash,
      availability: values.availability,
      afcReport: values.afcReport,
      shortcomings: values.shortcomings,
      upcomingVIPVisit: values.upcomingVIPVisit,
      newInstallations: values.newInstallations,
      workPermit: values.workPermit,
      newDocument: values.newDocument,
      reportsCompleted: values.reportsCompleted,
      instructions: values.instructions,
      publicComplaints: values.publicComplaints,
      remarks: values.remarks,
      conditionOfEquipment: values.conditionOfEquipment,
      employee_id: user.profileid,
      department: user.department,
    }),
  }).then((res) => res.json());
});
export const editData = createAsyncThunk("data/editData", async (values) => {
  console.log(values);
  return fetch("https://tprosysit.com/upmrc/public/api/operation/edit", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      formType: "station-diary",

      update_id: values.id,
      stationName: user.station,
      date: values.date,
      dutyShiftTimings: values.dutyShiftTimings,
      name: user.name,
      designation: user.designation,
      empNo: user.employeeid,
      staffOnDuty: values.staffOnDuty,
      contractorStaff: values.contractorStaff,
      events: values.events,
      coinsCash: values.coinsCash,
      availability: values.availability,
      afcReport: values.afcReport,
      shortcomings: values.shortcomings,
      upcomingVIPVisit: values.upcomingVIPVisit,
      newInstallations: values.newInstallations,
      workPermit: values.workPermit,
      newDocument: values.newDocument,
      reportsCompleted: values.reportsCompleted,
      instructions: values.instructions,
      publicComplaints: values.publicComplaints,
      remarks: values.remarks,
      conditionOfEquipment: values.conditionOfEquipment,
      employee_id: user.profileid,
      department: user.department,
    }),
  }).then((res) => res.json());
});
const OperationStationDiarySlice = createSlice({
  name: "operationStationDiary",
  initialState: {
    loading: false,
    data: [],
    slug: "station-diary",
    error: "",
    isSuccess: "",
  },

  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
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

    // Add data
    builder.addCase(addData.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(addData.fulfilled, (state, action) => {
      state.loading = false;
      state.isSuccess = action.payload;
      showToastOnce(action.payload.message);
    });

    builder.addCase(addData.rejected, (state, action) => {
      state.loading = false;
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

export default OperationStationDiarySlice.reducer;
