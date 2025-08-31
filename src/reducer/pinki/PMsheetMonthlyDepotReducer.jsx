import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PMsheetMonthlyData } from "../../data/Data";
const user = JSON.parse(localStorage.getItem("userdata"));
console.log(user);
const token = localStorage.getItem("accessToken");
console.log(token);
export const saveData = createAsyncThunk("data/saveData", async (id) => {
  return fetch("https://tprosysit.com/upmrc/public/api/register/telecom/edit", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      formType: "pm-depot-monthy",
      status: "1",
      update_id: id,
    }),
  }).then((res) => res.json());
});
// Fetch initial data from API
export const fetchData = createAsyncThunk("data/fetchData", async () => {
  return fetch(
    "https://tprosysit.com/upmrc/public/api/register/telecom/viewData",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formType: "pm-depot-monthy",
      }),
    }
  ).then((res) => res.json());
});
// Add new data to API
export const addData = createAsyncThunk("data/addData", async (values) => {
  console.log(values);
  return fetch("https://tprosysit.com/upmrc/public/api/register/telecom/save", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      systems: values.systems,
      date: values.date,
      station: values.station,
      remarks: values.remark,
      notes: values.notes,
      SName: values.SName,
      SempId: values.SempId,
      Ssignature: values.Ssignature,
      SdateTime: values.SdateTime,
      MName: values.MName,
      MempId: values.MempId,
      Msignature: user.employeeid,
      MdateTime: values.MdateTime,
      formType: "pm-depot-monthy",
      employee_id: user.profileid,
      department: user.department,
      unit: user.department,
    }),
  }).then((res) => res.json());
});
export const editData = createAsyncThunk("data/editData", async (values) => {
  console.log(values);
  return fetch("https://tprosysit.com/upmrc/public/api/register/telecom/edit", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      update_id: values.id,
      systems: values.systems,
      date: values.date,
      station: values.station,
      remarks: values.remark,
      notes: values.notes,
      SName: values.SName,
      SempId: values.SempId,
      Ssignature: values.Ssignature,
      SdateTime: values.SdateTime,
      MName: values.MName,
      MempId: values.MempId,
      Msignature: user.employeeid,
      MdateTime: values.MdateTime,
      formType: "pm-depot-monthy",
      employee_id: user.profileid,
      department: user.department,
      unit: user.department,
    }),
  }).then((res) => res.json());
});
const PMsheetMonthlySlice = createSlice({
  name: "PMsheetMonthly",
  initialState: {
    loading: false,
    data: [],
    slug: "pm-depot-monthy",
    error: "",
    isSuccess: "",
  },
  reducers: {
    addPMsheetMonthly: (state, action) => {
      console.log(action);
      state.push(action.payload);
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
      console.log(action.payload);
    });

    // Add data
    builder.addCase(addData.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(addData.fulfilled, (state, action) => {
      state.loading = false;
      state.isSuccess = action.payload;
      console.log(action.payload);
    });

    builder.addCase(addData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      console.log(action.error);
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

export const { addPMsheetMonthly } = PMsheetMonthlySlice.actions;
export default PMsheetMonthlySlice.reducer;
