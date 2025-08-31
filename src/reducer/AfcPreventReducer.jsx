import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AfcPreventChkformData } from "../data/Data";
import { showToastOnce } from "../component/toastUtils";
import { operationService } from "../shared/api";
import { useMemo } from "react";

const getUserData = () => {
  const userData = localStorage.getItem("userdata");
  return userData ? JSON.parse(userData) : {};
};

export const saveData = createAsyncThunk("data/saveData", async (id) => {
  return operationService.editData({
    formType: "pm-logbook-monthly-other-mainline",
    status: "1",
    update_id: id,
  });
});

export const fetchData = createAsyncThunk("data/fetchData", async () => {
  return operationService.viewData("pm-logbook-monthly-other-mainline");
});

export const addData = createAsyncThunk("data/addData", async (values) => {
  const user = getUserData();
  return operationService.saveData({
    formType: "pm-logbook-monthly-other-mainline",
    station: values.stn_name,
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
    formType: "pm-logbook-monthly-other-mainline",
    station: values.stn_name,
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

const AfcPreventChkformSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    data: [],
    slug: "pm-logbook-monthly-other-mainline",
    error: "",
    isSuccess: "",
  },
  reducers: {
    addAfcPreventlist: (state, action) => {
      console.log(action);
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
      // console.log(action.payload);
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
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
    });

    builder.addCase(addData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });

    builder.addCase(editData.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(editData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = [];
      state.isSuccess = action.payload;
      console.log(action.payload);
    });

    builder.addCase(editData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
    // edit data
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
      showToastOnce(action.error.message);
    });
  },
});

export const { addAfcPreventlist } = AfcPreventChkformSlice.actions;
export default AfcPreventChkformSlice.reducer;
