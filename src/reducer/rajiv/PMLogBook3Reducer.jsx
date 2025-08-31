import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { formatDate } from "../../data/formatDate";
import { toast } from "react-toastify";
import { showToastOnce } from "../../component/toastUtils";

const user = JSON.parse(localStorage.getItem("userdata"));
const token = localStorage.getItem("accessToken");
export const saveData = createAsyncThunk("data/saveData", async (id) => {
  return fetch("https://tprosysit.com/upmrc/public/api/register/sdc/edit", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      formType: "pm-log-book-monthly-sdc",
      status: "1",
      update_id: id,
    }),
  }).then((res) => res.json());
});
// Fetch initial data from API
export const fetchData = createAsyncThunk("data/fetchData", async () => {
  return fetch("https://tprosysit.com/upmrc/public/api/register/sdc/viewData", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      formType: "pm-log-book-monthly-sdc",
    }),
  }).then((res) => res.json());
});

// Add new data to API
export const addData = createAsyncThunk("data/addData", async (values) => {
  console.log(values);
  return fetch("https://tprosysit.com/upmrc/public/api/register/sdc/save", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      frequency: "MONTHLY",
      date: formatDate(new Date().toString()),
      month: values.month,
      activities: values.activities,
      staff1_name: values.staff1_name,
      staff1_desg: values.staff1_desg,
      staff1_employee: values.staff1_employee,
      staff1_sign: values.staff1_sign,
      staff2_name: values.staff2_name,
      staff2_employee: values.staff2_employee,
      staff2_desg: values.staff2_desg,
      staff2_sign: values.staff2_sign,
      staff3_name: values.staff3_name,
      staff3_employee: values.staff3_employee,
      staff3_desg: values.staff3_desg,
      staff3_sign: values.staff3_sign,
      formType: "pm-log-book-monthly-sdc",
      employee_id: user.profileid,
      station:values.station,
      department: user.department,
      unit: user.department,
    }),
  }).then((res) => res.json());
});
export const editData = createAsyncThunk("data/editData", async (values) => {
  console.log(values);
  return fetch("https://tprosysit.com/upmrc/public/api/register/sdc/edit", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      update_id: values.id,
      frequency: "MONTHLY",
      date: values.date,
      month: values.month,
      activities: values.activities,
      staff1_name: values.staff1_name,
      staff1_desg: values.staff1_desg,
      staff1_employee: values.staff1_employee,
      staff1_sign: values.staff1_sign,
      staff2_name: values.staff2_name,
      staff2_employee: values.staff2_employee,
      staff2_desg: values.staff2_desg,
      staff2_sign: values.staff2_sign,
      staff3_name: values.staff3_name,
      staff3_employee: values.staff3_employee,
      staff3_desg: values.staff3_desg,
      staff3_sign: values.staff3_sign,
      formType: "pm-log-book-monthly-sdc",
      employee_id: user.profileid,
      station:values.station,
      department: user.department,
      unit: user.department,
    }),
  }).then((res) => res.json());
});
const PMLogBook3ReducerSlice = createSlice({
  name: "PMLogBook3",
  initialState: {
    loading: false,
    data: [],
    slug: "pm-log-book-monthly-sdc",
    error: "",
    isSuccess: "",
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
      console.log(action);
      showToastOnce(action.error.message, "error");
    });

    // Add data
    builder.addCase(addData.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(addData.fulfilled, (state, action) => {
      state.loading = false;
      state.isSuccess = action.payload;
      showToastOnce(action.payload.message);
    });

    builder.addCase(addData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
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
      showToastOnce(action.payload.message);
    });

    builder.addCase(editData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
      showToastOnce(action.error.message, "error");
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
      showToastOnce(action.error.message, "error");
    });
  },
});

export default PMLogBook3ReducerSlice.reducer;
