import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DtrregData } from "../../data/Data";
import { showToastOnce } from "../../component/toastUtils";

const user = JSON.parse(localStorage.getItem("userdata"));
console.log(user);
const token = localStorage.getItem("accessToken");
console.log(token);
let deprt = user?.department.toLowerCase();
let dp = deprt;
console.log(deprt);
if (deprt === "afc-store") {
  deprt = "afc_store";
}
if (deprt === "afc-mainline") {
  deprt = "afc_mainline";
}
const fType = {
  afc_store: "daily-transaction-register-store-receipt",
  signalling: "daily-transaction-register-receipt",
  operation: "gate-pass-book-operation",
  afc_mainline: "daily-transaction-register-mainline",
  telecom: "daily-transaction-register-telecom",
};

export const saveData = createAsyncThunk("data/saveData", async (id) => {
  return fetch(`https://tprosysit.com/upmrc/public/api/register/${deprt}edit`, {
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
  }).then((res) => res.json());
});

export const fetchMaterial = createAsyncThunk(
  "data/fetchMaterial",
  async () => {
    return fetch(
      `https://tprosysit.com/upmrc/public/api/master/material/list`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          department: "AFC-Store",
        }),
      }
    ).then((res) => res.json());
  }
);

export const fetchData = createAsyncThunk("data/fetchData", async (values) => {
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
        formType: fType[deprt],
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
        update_id: values.id,
        date: values.date,
        material_id: values.material_id,
        dtr_no: "abc",
        material_desc: values.material,
        qty: values.qty,
        ledger_no: values.ledger,
        challan_no: values.challanno,
        challan_date: values.challandate,
        issued_name: values.name,
        issued_designation: values.desig,
        // issued_sign: user.employeeid,
        for_whatWork: values.work,
        location: values.location,
        //issuer_sign: user.employeeid,
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
        issuer_sign: user.employeeid,
        formType: fType[deprt],
        employee_id: user.employeeid,
        department: user.department,
        unit: "AFC",
      }),
    }
  ).then((res) => res.json());
});

const diSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    data: [],
    slug: fType[deprt],
    error: "",
    isSuccess: "",
  },
  reducers: {
    addDtr: (state, action) => {
      console.log(action);
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMaterial.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchMaterial.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
      console.log(action.payload);
    });
    builder.addCase(fetchMaterial.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
    //Fetch Data
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
    // edit data

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
      showToastOnce(action.payload.message);
    });
  },
});

export const { addDtr } = diSlice.actions;
export default diSlice.reducer;
