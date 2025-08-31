import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PmsheetData } from "../../data/Data";
import { showToastOnce } from "../../component/toastUtils";

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
        date: "2024-07-20",
      }),
    }
  ).then((res) => res.json());
});

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
      remarks: values.remarks,
      notes: values.notes,
      SName: values.SName,
      SempId: values.SempId,
      //Ssignature: user.employeeid,
      SdateTime: values.SdateTime,
      MName: values.MName,
      MempId: values.MempId,
      //Msignature: user.employeeid,
      MdateTime: values.MdateTime,
      formType: "pm-depot-monthy",
      employee_id: user.employeeid,
      department: user.department,
      unit: "Telecom",
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
      remarks: values.remarks,
      notes: values.notes,
      SName: values.SName,
      SempId: values.SempId,
      //Ssignature: user.employeeid,
      SdateTime: values.SdateTime,
      MName: values.MName,
      MempId: values.MempId,
      //Msignature: user.employeeid,
      MdateTime: values.MdateTime,
      formType: "pm-depot-monthy",
      employee_id: user.employeeid,
      department: user.department,
      unit: "Telecom",
    }),
  }).then((res) => res.json());
});

const pmsheetSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    data: [],
    slug: "pm-depot-monthy",
    error: "",
    isSuccess: "",
  },
  reducers: {
    addsheet: (state, action) => {
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
      console.log(action.error.message);
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

export const { addsheet } = pmsheetSlice.actions;
export default pmsheetSlice.reducer;
