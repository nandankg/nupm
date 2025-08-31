import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { showToastOnce } from "../component/toastUtils";

const user = JSON.parse(localStorage.getItem("userdata"));
console.log(user);
const token = localStorage.getItem("accessToken");
console.log(token);

export const saveData = createAsyncThunk("data/saveData", async (id) => {
  return fetch("https://tprosysit.com/upmrc/public/api/operation/edit", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      formType: "pm-depot-yearly",
      status: "1",
      update_id: id,
    }),
  }).then((res) => res.json());
});

export const fetchData = createAsyncThunk("data/fetchData", async () => {
  return fetch("https://tprosysit.com/upmrc/public/api/operation/viewData", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // change form type from api
      formType: "pm-depot-yearly",
    }),
  }).then((res) => res.json());
});

export const addData = createAsyncThunk("data/addData", async (values) => {
  console.log(values);
  return fetch("https://tprosysit.com/upmrc/public/api/operation/save", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      formType: "pm-depot-yearly",
      date: values.date,
      station: values.stn_name,
      activities1: values.activities1,
      activities2: values.activities2,
      activities3: values.activities3,

      SName: values.sup_name,
      SempId: values.sup_id,
      Ssignature: values.sup_sign,
      SdateTime: values.sup_date_time,
      MName: values.mtn_name,
      MempId: values.mtn_id,
      Msignature: values.mtn_sign,
      MdateTime: values.mtn_date_time,
      notes: values.notes,
      employee_id: user.profileid,
      department: user.department,
      unit: user.unit,
    }),
  }).then((res) => res.json());
});

export const editData = createAsyncThunk("data/editData", async (values) => {
  console.log(values);
  return fetch("https://tprosysit.com/upmrc/public/api/operation/edit", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      update_id: values.id,

      formType: "pm-depot-yearly",
      date: values.date,
      station: values.stn_name,
      activities1: values.activities1,
      activities2: values.activities2,
      activities3: values.activities3,

      SName: values.sup_name,
      SempId: values.sup_id,
      Ssignature: values.sup_sign,
      SdateTime: values.sup_date_time,
      MName: values.mtn_name,
      MempId: values.mtn_id,
      Msignature: values.mtn_sign,
      MdateTime: values.mtn_date_time,
      notes: values.notes,
      employee_id: user.profileid,
      department: user.department,
      unit: user.unit,
    }),
  }).then((res) => res.json());
});

const DepotYearlyFormSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    data: [],
    slug: "pm-depot-yearly",
    error: "",
    isSuccess: "",
  },
  reducers: {
    adddeportform: (state, action) => {
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
      console.log(action.error);
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
      console.log(action.error);
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
      showToastOnce(action.payload.message);
    });

    builder.addCase(saveData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
      console.log(action.error);
      showToastOnce(action.error.message);
    });
  },
});

export const { adddeportform } = DepotYearlyFormSlice.actions;
export default DepotYearlyFormSlice.reducer;
