import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { formatDate } from "../../data/formatDate";
import { showToastOnce } from "../../component/toastUtils";
const user = JSON.parse(localStorage.getItem("userdata"));
console.log(user);
const token = localStorage.getItem("accessToken");
console.log(token);
let deprt = user?.department.toLowerCase();
console.log(deprt);
let dp;

var dprt;
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
  dp="Signalling";
}
if (deprt === "operation") {
  dprt = "operation";
  dp="operation";
}
if (deprt === "telecom") {
  dprt = "telecom";
  dp="Telecom";
}
const fType = {
  store: "daily-transaction-register-store-receipt",
  signalling: "daily-transaction-register-receipt",

  mainline: "daily-transaction-register-mainline",
  telecom: "daily-transaction-register-telecom-receipt",
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
export const fetchMaterial = createAsyncThunk("data/fetchMaterial", async () => {
  return fetch(
    "https://tprosysit.com/upmrc/public/api/master/material/list",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        department: dp,
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
        material_id: values.material_id,
        material_desc: values.material_desc,
        serial_no: values.serial_no,
        qty: values.qty,
        ledger_no: values.ledger_no,
        challan_no: values.challan_no,
        challan_date: values.challan_date,
        received_name: values.received_name,
        received_designation: values.received_designation,
        formType: fType[dprt],
        employee_id: user.profileid,
        ledger_no:values.ledger_no,
        department: user.department,
        for_whatWork: values.for_whatWork,
        unit: "Mainline",
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
        formType: fType[dprt],
        date: values.date,
        material_id: values.material_id,
        time: values.time,
        material_desc: values.material_desc,
        qty: values.qty,
        ledger_no: values.ledger_no,
        challan_no: values.challan_no,
        challan_date: values.challan_date,
        received_name: values.received_name,
        received_designation: values.received_designation,
        for_whatWork: values.for_whatWork,
        employee_id: user.profileid,
        department: user.employee_id,
        ledger_no:values.ledger_no,
        serial_no: values.serial_no,
      }),
    }
  ).then((res) => res.json());
});
const DailyReceiptReducerSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    material:[],
    data: [],
    slug: fType[dprt],
    error: "",
    isSuccess: "",
  },
  extraReducers: (builder) => {

    builder.addCase(fetchMaterial.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchMaterial.fulfilled, (state, action) => {
      state.loading = false;
      state.material = action.payload;
      state.error = "";
      console.log(action.payload);
    });
    builder.addCase(fetchMaterial.rejected, (state, action) => {
      state.loading = false;
      state.material = [];
      state.error = action.error.message;
    });
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
      console.log(action.payload);
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
      showToastOnce(action.payload.message); // toast for success
    });

    builder.addCase(saveData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
      showToastOnce.error(action.error.message, "error");
    });
  },
});

export const { dailyreceipt } = DailyReceiptReducerSlice.actions;
export default DailyReceiptReducerSlice.reducer;
