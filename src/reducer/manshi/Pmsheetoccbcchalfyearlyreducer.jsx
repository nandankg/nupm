import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { pmsheetoccbccData } from "../../data/Data";
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
      formType: "pm-occ-bcc-half-yearly",
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
        formType: "pm-occ-bcc-half-yearly",
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

      notes: values.notes,
      SName: values.SName,
      SempId: values.SempId,
      Ssignature: values.Ssignature,
      SdateTime: values.SdateTime,
      SName1: "--",
      SempId1: "--",
      Ssignature1: "--",
      SdateTime1: "--",
      MName: values.MName,
      MempId: values.MempId,
      Msignature: values.Msignature,
      MdateTime: values.MdateTime,
      MName1: "--",
      MempId1: "--",
      Msignature1: "--",
      MdateTime1: "--",
      MName2: "--",
      MempId2: "--",
      Msignature2: "--",
      MdateTime2: "--",
      MName3: "--",
      MempId3: "--",
      Msignature3: "--",
      MdateTime3: "--",
      formType: " pm-occ-bcc-half-yearly",
      employee_id: user.profileid,
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

      notes: values.notes,
      SName: values.SName,
      SempId: values.SempId,
      Ssignature: values.Ssignature,
      SdateTime: values.SdateTime,
      SName1: "--",
      SempId1: "--",
      Ssignature1: "--",
      SdateTime1: "--",
      MName: values.MName,
      MempId: values.MempId,
      Msignature: values.Msignature,
      MdateTime: values.MdateTime,
      MName1: "--",
      MempId1: "--",
      Msignature1: "--",
      MdateTime1: "--",
      MName2: "--",
      MempId2: "--",
      Msignature2: "--",
      MdateTime2: "--",
      MName3: "--",
      MempId3: "--",
      Msignature3: "--",
      MdateTime3: "--",
      formType: " pm-occ-bcc-half-yearly",
      employee_id: user.profileid,
      department: user.department,

      unit: "Telecom",
    }),
  }).then((res) => res.json());
});
const pmsheetoccbccSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    data: [],
    slug: "pm-occ-bcc-half-yearly",
    error: "",
    isSuccess: "",
  },
  reducers: {
    addPmoccbcc: (state, action) => {
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
export default pmsheetoccbccSlice.reducer;
