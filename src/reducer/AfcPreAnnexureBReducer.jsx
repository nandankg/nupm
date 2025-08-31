import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AfcPreAnnexureBData } from "../data/Data";
import { showToastOnce } from "../component/toastUtils";
import { operationService } from "../shared/api";

const getUserData = () => {
  const userData = localStorage.getItem("userdata");
  return userData ? JSON.parse(userData) : {};
};

export const saveData = createAsyncThunk("data/saveData", async (id) => {
  return operationService.editData({
    formType: "pm-logbook-half-yearly-other-mainline",
    status: "1",
    update_id: id,
  });
});

export const fetchData = createAsyncThunk("data/fetchData", async () => {
  return operationService.viewData("pm-logbook-half-yearly-other-mainline");
});

export const addData = createAsyncThunk("data/addData", async (values) => {
  const user = getUserData();
  return operationService.saveData({
    formType: "pm-logbook-half-yearly-other-mainline",
    stn_name: values.stn_name,
    date: values.date,
    month: values.month,
    activities1: values.activities1,
    activities2: values.activities2,
    activities3: values.activities3,
    staff1_name: values.staff1_name,
    staff1_desg: values.staff1_desg,
    staff1_sign: values.staff1_sign,
    staff2_name: values.staff2_name,
    staff2_desg: values.staff2_desg,
    staff2_sign: values.staff2_sign,
    staff3_name: values.staff3_name,
    staff3_desg: values.staff3_desg,
    staff3_sign: values.staff3_sign,
    employee_id: user.profileid,
    department: user.department,
    unit: user.unit,
  });
});

export const editData = createAsyncThunk("data/editData", async (values) => {
  const user = getUserData();
  return operationService.editData({
    update_id: values.id,
    formType: "pm-logbook-half-yearly-other-mainline",
    stn_name: values.stn_name,
    date: values.date,
    month: values.month,
    activities1: values.activities1,
    activities2: values.activities2,
    activities3: values.activities3,
    staff1_name: values.staff1_name,
    staff1_desg: values.staff1_desg,
    staff1_sign: values.staff1_sign,
    staff2_name: values.staff2_name,
    staff2_desg: values.staff2_desg,
    staff2_sign: values.staff2_sign,
    staff3_name: values.staff3_name,
    staff3_desg: values.staff3_desg,
    staff3_sign: values.staff3_sign,
    employee_id: user.profileid,
    department: user.department,
    unit: user.unit,
  });
});

const AfcPreAnnexureBSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    data: [],
    slug: "pm-logbook-half-yearly-other-mainline",
    error: "",
    isSuccess: "",
  },
  reducers: {
    addAfcPreAnnB: (state, action) => {
      console.log(action);
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Data
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = "";
        showToastOnce(action.payload.message || "Data fetched successfully");
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.payload || "Failed to fetch data";
        showToastOnce(action.payload || "Failed to fetch data", "error");
      })

      // Add Data
      .addCase(addData.pending, (state) => {
        state.loading = true;
      })
      .addCase(addData.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = action.payload;
        showToastOnce(action.payload.message || "Data added successfully");
      })
      .addCase(addData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add data";
        showToastOnce(action.payload || "Failed to add data", "error");
      })

      // Edit Data
      .addCase(editData.pending, (state) => {
        state.loading = true;
      })
      .addCase(editData.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = action.payload;
        showToastOnce(action.payload.message || "Data updated successfully");
      })
      .addCase(editData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update data";
        showToastOnce(action.payload || "Failed to update data", "error");
      })

      // Save Data
      .addCase(saveData.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveData.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = action.payload;
        showToastOnce(action.payload.message || "Data saved successfully");
      })
      .addCase(saveData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to save data";
        showToastOnce(action.payload || "Failed to save data", "error");
      });
  },
});

export const { addAfcPreAnnB } = AfcPreAnnexureBSlice.actions;
export default AfcPreAnnexureBSlice.reducer;
