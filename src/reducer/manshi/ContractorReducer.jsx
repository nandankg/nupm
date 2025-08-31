import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ContractorData } from "../../data/Data";
import { showToastOnce } from "../../component/toastUtils";
const user = JSON.parse(localStorage.getItem("userdata"));
console.log(user);
const token = localStorage.getItem("accessToken");
console.log(token);
var deprt = user?.department.toLowerCase();
console.log(deprt);
var dprt;
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
  store: "gate-pass-book-store",

  telecom: "contract-work-done-register-telecom",

  signalling: "contract-work-done-register",
  operation: "gate-pass-book-operation",
  mainline: "gate-pass-book-mainline",
};
export const saveData = createAsyncThunk("data/saveData", async (id) => {
  return fetch(`https://tprosysit.com/upmrc/public/api/register/${deprt}/edit`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      formType:fType[dprt],
      status: "1",
      update_id: id,
    }),
  }).then((res) => res.json());
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
        formType:fType[dprt],
      }),
    }
  ).then((res) => res.json());
});
export const addData = createAsyncThunk("data/addData", async (values) => {
  console.log(values);
  return fetch(`https://tprosysit.com/upmrc/public/api/register/${deprt}/save`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      date: values.date,
      selected_department: values.department,
      station: values.station,
      registerserialno: values.registerserialno,
      name: values.name,
      organization: values.organization,
      designation: values.designation,
      detailsofwork: values.detailsofwork,
      possesPtw: values.possesPtw,
      finalstatus: values.finalstatus,
      exittime: values.exittime,
      entrytime: values.entrytime,
      signaturecontractorstaff: values.signaturecontractorstaff,
      signatureondutystaff: values.signatureondutystaff,
      remark: values.remark,
      formType: fType[dprt],
      employee_id: user.profileid,
      unit: "Telecom",
      department: user.department,
    }),
  }).then((res) => res.json());
});
export const editData = createAsyncThunk("data/editData", async (values) => {
  console.log(values);
  return fetch(`https://tprosysit.com/upmrc/public/api/register/${deprt}/edit`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      update_id: values.id,
      date: values.date,
      selected_department: values.department,
      station: values.station,
      registerserialno: values.registerserialno,
      name: values.name,
      organization: values.organization,
      designation: values.designation,
      detailsofwork: values.detailsofwork,
      possesPtw: values.possesPtw,
      finalstatus: values.finalstatus,
      exittime: values.exittime,
      entrytime: values.entrytime,
      signaturecontractorstaff: values.signaturecontractorstaff,
      signatureondutystaff: values.signatureondutystaff,
      remark: values.remark,
      formType: fType[dprt],
      employee_id: user.profileid,
      unit: "Telecom",
      department: user.department,
    }),
  }).then((res) => res.json());
});
const ContractorSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    data: [],
    slug: fType[dprt],
    error: "",
    isSuccess: "",
  },
  reducers: {
    addContractor: (state, action) => {
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
      console.log(action.error.message);
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
    });

    builder.addCase(saveData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
  },
});
export const { addContractor } = ContractorSlice.actions;
export default ContractorSlice.reducer;
