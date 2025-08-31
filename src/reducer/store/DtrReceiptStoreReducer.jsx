import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DtrReceiptStoreData } from "../../data/Data";
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
if (deprt === "afc-mainline") {
  dprt = "mainline";
  deprt = "afc_mainline";
}
if (deprt === "signalling") {
  dprt = "signalling";
}
if (deprt === "operation") {
  dprt = "operation";
}
if (deprt === "telecom") {
  dprt = "telecom";
}

const fType = {
  store: "daily-transaction-register-store-receipt",
  signalling: "daily-transaction-register-receipt",
  operation: "gate-pass-book-operation",
  mainline: "daily-transaction-register-mainline",
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
        formType: fType[dprt],
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
        formType: fType[dprt],
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
        material_desc: values.material_desc,
        material_id:values.material_id,
        qty: values.qty,
        serial_no:values.serial_no,
        ledger_no: values.ledger_no,
        challan_no: values.challan_no,
        challan_date: values.challan_date,
        received_name: values.received_name,
        received_designation: values.received_designation,
        received_sign: user.receiver_sign,
        formType: fType[dprt],
        employee_id: user.profileid,
        department: user.department,
        for_whatWork: values.for_whatWork,

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
        formType: fType[dprt],
        update_id: values.id,
        date: values.date,
        dtr_no: "abc",
        material_desc: values.material_desc,
        material_id:values.material_id,
        qty: values.qty,
        serial_no:values.serial_no,
        ledger_no: values.ledger_no,
        challan_no: values.challan_no,
        challan_date: values.challan_date,
        received_name: values.received_name,
        received_designation: values.received_designation,
        
        
        employee_id: user.profileid,
        department: user.department,
        for_whatWork: values.for_whatWork,

        unit: "AFC",
      }),
    }
  ).then((res) => res.json());
});

const DtrReceiptStoreSlice = createSlice({
  name: "storereceipt",
  initialState: {
    loading: false,
    data: [],
    slug: fType[dprt],
    error: "",
    isSuccess: "",
  },
  reducers: {
    addDtrrece: (state, action) => {
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

export const { addDtrrece } = DtrReceiptStoreSlice.actions;
export default DtrReceiptStoreSlice.reducer;
