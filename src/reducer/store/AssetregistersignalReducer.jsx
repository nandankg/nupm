import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DtrIssueStoreData } from "../../data/Data";
const user = JSON.parse(localStorage.getItem("userdata"));
console.log(user);
const token = localStorage.getItem("accessToken");
console.log(token);
const deprt = user?.department.toLowerCase();
console.log(deprt);
const fType = {
  telecom: "asset_register",
  signalling: "asset-register",
  operation: "daily-transaction-register-Issue",
  mainline: "gate-pass-book-mainline",
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
        Dateofinstallation: values.dateOfInstallation,
        DescriptionOfMaterial: values.descriptionOfMaterial,
        make: values.makeModelPartNo,
        serialno: values.serialNo,
        qty: values.quantity,
        location: values.location,
        remark: values.remarks,
        formType: fType[deprt],
        employee_id: user.profileid,
        station_name: values.station,
        system :values.system,
        gearID:values.gearid,
        department: deprt,
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
        Dateofinstallation: values.dateOfInstallation,
        DescriptionOfMaterial: values.descriptionOfMaterial,
        make: values.makeModelPartNo,
        serialno: values.serialNo,
        qty: values.quantity,
        location: values.location,
        remark: values.remarks,
        formType: fType[deprt],
        employee_id: user.employeeid,
        station_name: values.station,
        system :values.system,
        gearID:values.gearid,
        department: deprt,
      }),
    }
  ).then((res) => res.json());
});

const AssetRegisterSlice = createSlice({
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

export const { addDtrsig } = AssetRegisterSlice.actions;
export default AssetRegisterSlice.reducer;
