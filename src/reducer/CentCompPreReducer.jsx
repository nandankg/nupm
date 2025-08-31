import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CentCompPreMainData } from "../data/Data";
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
      formType: "pm-logbook-yearly2-sdc",
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
      formType: "pm-logbook-yearly2-sdc",
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
      formType: "pm-logbook-yearly2-sdc",
      date: values.Date,
      activities: values.activities,
      staff1_name: values.staff1_name,
      staff1_desg: values.staff1_desg,
      staff1_employee: values.staff1_id,
      staff1_sign: values.staff1_sign,
      staff2_name: values.staff2_name,
      staff2_employee: values.staff2_id,
      staff2_desg: values.staff2_desg,
      staff2_sign: values.staff2_sign,
      staff3_name: values.staff3_name,
      staff3_desg: values.staff3_desg,
      staff3_employee: values.staff3_id,
      staff3_sign: values.staff3_sign,
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
      formType: "pm-logbook-yearly2-sdc",
      date: values.Date,
      activities: values.activities,
      staff1_name: values.staff1_name,
      staff1_desg: values.staff1_desg,
      staff1_employee: values.staff1_id,
      staff1_sign: values.staff1_sign,
      staff2_name: values.staff2_name,
      staff2_employee: values.staff2_id,
      staff2_desg: values.staff2_desg,
      staff2_sign: values.staff2_sign,
      staff3_name: values.staff3_name,
      staff3_desg: values.staff3_desg,
      staff3_employee: values.staff3_id,
      staff3_sign: values.staff3_sign,
      employee_id: user.profileid,
      department: user.department,
      unit: user.unit,
    }),
  }).then((res) => res.json());
});

const CentCompPreRedSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    data: [],
    slug: "pm-logbook-yearly2-sdc",
    error: "",
    isSuccess: "",
  },
  reducers: {
    addcentcomp: (state, action) => {
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
      // console.log(action.payload);
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
      showToastOnce(action.payload.message);
    });

    builder.addCase(addData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
      showToastOnce(action.error.message, "error");
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
      showToastOnce(action.error.message, "error");
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
      showToastOnce(action.error.message, "error");
    });
  },
});

export const { addcentcomp } = CentCompPreRedSlice.actions;
export default CentCompPreRedSlice.reducer;
