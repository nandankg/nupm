import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DtrsignalsissueData } from "../../data/Data";
const user = JSON.parse(localStorage.getItem("userdata"));
console.log(user);
const token = localStorage.getItem("accessToken");
console.log(token);
let deprt = user?.department.toLowerCase();
console.log(deprt);
let dprt = "";
if (deprt === "afc-store") {
  dprt = "store";
  deprt = "afc_store";
}
const fType = {
  store: "daily-transaction-register-store-issue",
  signalling: "daily-transaction-register-Issue",
  operation: "daily-transaction-register-telecom-issues",
  mainline: "daily-transaction-register-mainline",
  telecom: "daily-transaction-register-telecom-issues",
};
export const saveData = createAsyncThunk("data/saveData", async (id) => {
  return fetch(
    `https://tprosysit.com/upmrc/public/api/register/${deprt}/edit`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formType: fType[deprt],
        status: "1",
        update_id: id,
      }),
    }
  ).then((res) => res.json());
});

export const fetchData = createAsyncThunk("data/fetchData", async () => {
  return fetch(
    `https://tprosysit.com/upmrc/public/api/register/${deprt}/viewData`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formType: fType[deprt],
        //date:"2024-06-07"
      }),
    }
  ).then((res) => res.json());
});

export const addData = createAsyncThunk("data/addData", async (values) => {
  console.log(values);
  return fetch(
    `https://tprosysit.com/upmrc/public/api/register/${deprt}/save`,
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
        challan_no: values.challanno,
        challan_date: values.challandate,
        issued_name: values.name,
        issued_designation: values.desig,
        //issued_sign: user.employeeid,
        for_whatWork: values.work,
        location: values.location,
        //issuer_sign: user.employeeid,
        formType: fType[deprt],
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
    `https://tprosysit.com/upmrc/public/api/register/${deprt}/edit`,
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
        challan_no: values.challanno,
        challan_date: values.challandate,
        issued_name: values.name,
        issued_designation: values.desig,

        for_whatWork: values.work,
        location: values.location,

        formType: fType[deprt],
        employee_id: user.employeeid,
        department: user.department,
        unit: "AFC",
      }),
    }
  ).then((res) => res.json());
});

const dtrsignalsissueSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    data: [],
    slug: "daily-transaction-register-Issue",
    error: "",
    isSuccess: "",
  },
  reducers: {
    addDtrsig: (state, action) => {
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
      console.log(action.error.message);
    });

    // Add data
    builder.addCase(addData.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(addData.fulfilled, (state, action) => {
      state.loading = false;
      state.isSuccess = true;
      console.log(action.payload);
    });

    builder.addCase(addData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    // edit data
    builder.addCase(editData.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(editData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isSuccess = true;
      console.log(action.payload);
    });

    builder.addCase(editData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
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

export const { addDtrsig } = dtrsignalsissueSlice.actions;
export default dtrsignalsissueSlice.reducer;
