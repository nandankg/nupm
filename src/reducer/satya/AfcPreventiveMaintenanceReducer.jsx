import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AfcPreventiveMaintenanceData } from "../../data/Data";
import { toast } from "react-toastify";

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
        formType: "pm-logbook-monthly-tom-mainline",
        status: "1",
        update_id: id,
      }),
    }
  ).then((res) => res.json());
});

//Fetch initial data from API
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
        formType: "pm-logbook-monthly-tom-mainline",
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
        staff1_name: values.staff1_name,
        staff1_desg: values.staff1_desg,
        staff1_sign: user.employeeid,
        staff2_name: values.staff2_name,
        staff2_desg: values.staff2_desg,
        staff2_sign: user.employeeid,
        staff3_name: values.staff3_name,
        staff3_desg: values.staff3_desg,
        staff3_sign: user.employeeid,
        formType: "pm-logbook-monthly-tom-mainline",
        employee_id: user.profileid,
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
        staff1_name: values.staff1_name,
        staff1_desg: values.staff1_desg,
        staff1_sign: user.employeeid,
        staff2_name: values.staff2_name,
        staff2_desg: values.staff2_desg,
        staff2_sign: user.employeeid,
        staff3_name: values.staff3_name,
        staff3_desg: values.staff3_desg,
        staff3_sign: user.employeeid,
        formType: "pm-logbook-monthly-tom-mainline",
        employee_id: user.profileid,
        department: user.department,
        unit: user.department,
      }),
    }
  ).then((res) => res.json());
});

const afcpreventivemaintenanceSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    data: [],
    slug: "pm-logbook-monthly-tom-mainline",
    error: "",
    isSuccess: "",
  },
  reducers: {
    addAfcpreventive: (state, action) => {
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
      console.log(action.payload);
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
      toast(action.payload.message);
    });

    builder.addCase(addData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
      console.log(action.payload);
      toast.error(action.error.message);
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
      console.log(action.payload);
    });
  },
});

export const { addAfcpreventive } = afcpreventivemaintenanceSlice.actions;
export default afcpreventivemaintenanceSlice.reducer;
