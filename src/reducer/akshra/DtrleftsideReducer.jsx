import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DtrsignalsissueData } from "../../data/Data";
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
        formType: "daily-transaction-register-mainline-issue",
        status: "1",
        update_id: id,
      }),
    }
  ).then((res) => res.json());
});

export const fetchData = createAsyncThunk("data/fetchData", async () => {
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
        formType: "daily-transaction-register-mainline-issue",
        //date:"2024-06-07"
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
        date: values.date,
        dtr_no: "abc",
        material_desc: values.material,
        qty: values.qty,
        ledger_no: values.ledger,
        challan_no: values.challanNo,
        challan_date: values.challanDate,
        issued_name: values.issueddname,
        issued_designation: values.desig,
        //issued_sign: user.employeeid,
        for_whatWork: values.work,
        location: values.location,
       // issuer_sign: user.employeeid,
        formType: "daily-transaction-register-mainline-issue",
        employee_id: user.employeeid,
        department: user.department,
        unit: "AFC",
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
        update_id: "2",
        date: values.date,
        dtr_no: "abc",
        material_desc: values.material,
        qty: values.qty,
        ledger_no: values.ledger,
        challan_no: values.challanNo,
        challan_date: values.challanDate,
        issued_name: values.issueddname,
        issued_designation: values.desig,
        issued_sign: user.employeeid,
        for_whatWork: values.work,
        location: values.location,
        issuer_sign: user.employeeid,
        formType: "daily-transaction-register-mainline-issue",
        employee_id: user.employeeid,
        department: user.department,
        unit: "AFC",
      }),
    }
  ).then((res) => res.json());
});

const dtrleftSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    data: [],
    slug: "daily-transaction-register-mainline-issue",
    error: "",
    isSuccess: "",
  },
  reducers: {
    addDtrle: (state, action) => {
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
    });

    builder.addCase(addData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
  },
});

export const { addDtrle } = dtrleftSlice.actions;
export default dtrleftSlice.reducer;
