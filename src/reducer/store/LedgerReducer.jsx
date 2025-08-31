import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("userdata"));
console.log(user);
const token = localStorage.getItem("accessToken");
console.log(token);
let deprt = user?.department.toLowerCase();
console.log(deprt);
let dprt = "";
let dp;
if (deprt === "afc-store") {
  dprt = "store";
  deprt = "afc_store";
  dp="AFC-Store";
}
if (deprt === "afc-mainline") {
  dprt = "mainline";
  deprt = "afc_mainline";
  dp="afc-mainline";
}
if (deprt === "signalling") {
  dprt = "signalling";
  dp="signalling";
}
if (deprt === "operation") {
  dprt = "operation";
  dp="operation";
}
if (deprt === "telecom") {
  dprt = "telecom";
  dp="telecom";
}
const fType = {
  afc_store: "ledger-store",
  signalling: "ledger-signalling",
  operation: "ledger-store",
  afc_mainline: "ledger-mainline",
  telecom: "ledger",
};
console.log(fType[deprt]);
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
    `https://tprosysit.com/upmrc/public/api/register/${deprt}/ledger`,
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
        update_id: values.id,
        date: values.date,
        dtr_no: "abc",
        material_desc: values.material,
        qty: values.qty,
        ledger_no: values.ledger,
        challan_no: values.challanno,
        challan_date: values.challandate,
        issued_name: values.name,
        issued_designation: values.desig,
        issued_sign: user.employeeid,
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

const LedgerSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    data: [],
    slug: fType[deprt],
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
      console.log(action.error.message);
    });
  },
});

export const { addDtrsig } = LedgerSlice.actions;
export default LedgerSlice.reducer;
