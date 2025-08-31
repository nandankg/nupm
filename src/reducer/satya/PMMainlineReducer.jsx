import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PMMainlineData } from "../../data/Data";
import { showToastOnce } from "../../component/toastUtils";

const user = JSON.parse(localStorage.getItem("userdata"));
console.log(user);
const token = localStorage.getItem("accessToken");
console.log(token);

export const saveData = createAsyncThunk("data/saveData", async (id) => {
  return fetch(
    "https://tprosysit.com/upmrc/public/api/register/afc_mainline/edit",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formType: "pm-logbook-monthly-other-mainline",
        status: "1",
        update_id: id,
      }),
    }
  ).then((res) => res.json());
});

export const fetchData = createAsyncThunk("data/fecthData", async () => {
  return fetch(
    "https://tprosysit.com/upmrc/public/api/register/afc_mainline/viewData",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formType: "pm-logbook-monthly-other-mainline",
      }),
    }
  ).then((res) => res.json());
});

export const addData = createAsyncThunk("data/addData", async (values) => {
  console.log(values);
  return fetch(
    "https://tprosysit.com/upmrc/public/api/register/afc_mainline/save",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stn_name: values.stn_name,
        date: values.date,
        month: values.month,
        activities1: values.activities1,
        activities2: values.activities2,
        activities3: values.activities3,
        staff1_name: values.staff1_name,
        staff1_desg: values.staff1_desg,
        staff1_sign: user.employeeid,
        staff2_name: values.staff2_name,
        staff2_desg: values.staff2_desg,
        staff2_sign: user.employeeid,
        staff3_name: values.staff3_name,
        staff3_desg: values.staff3_desg,
        staff3_sign: user.employeeid,
        formType: "pm-logbook-monthly-other-mainline",
        employee_id: user.profileid,
        Station_name: user.station,
        department: user.department,
        unit: user.department,
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
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        update_id: values.id,
        stn_name: values.stn_name,
        date: values.date,
        month: values.month,
        activities1: values.activities1,
        activities2: values.activities2,
        activities3: values.activities3,
        staff1_name: values.staff1_name,
        staff1_desg: values.staff1_desg,
        staff1_sign: user.employeeid,
        staff2_name: values.staff2_name,
        staff2_desg: values.staff2_desg,
        staff2_sign: user.employeeid,
        staff3_name: values.staff3_name,
        staff3_desg: values.staff3_desg,
        staff3_sign: user.employeeid,
        formType: "pm-logbook-monthly-other-mainline",
        employee_id: user.employeeid,
        department: user.department,
        unit: user.department,
      }),
    }
  ).then((res) => res.json());
});

const pmmainlineSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    data: [],
    slug: "pm-logbook-monthly-other-mainline",
    error: "",
    isSuccess: "",
  },
  reducers: {
    addPM: (state, action) => {
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
      showToastOnce(action.payload.message);
    });

    builder.addCase(addData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
      console.log(action.payload);
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
    });

    builder.addCase(editData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
      console.log(action.payload);
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
    });

    builder.addCase(saveData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
  },
});

export const { addPM } = pmmainlineSlice.actions;
export default pmmainlineSlice.reducer;
