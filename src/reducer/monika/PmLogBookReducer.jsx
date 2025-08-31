import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PmLogBookData } from "../../data/Data";
import { toast } from "react-toastify";
import { showToastOnce } from "../../component/toastUtils";
const user = JSON.parse(localStorage.getItem("userdata"));
console.log(user);
const token = localStorage.getItem("accessToken");
console.log(token);
export const saveData = createAsyncThunk("data/saveData", async (id) => {
  return fetch("https://tprosysit.com/upmrc/public/api/register/sdc/edit", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      formType: "pm-logbook-gate-half-yearly-sdc",
      status: "1",
      update_id: id,
    }),
  }).then((res) => res.json());
});
export const fetchData = createAsyncThunk("data/fetchData", async () => {
  return fetch("https://tprosysit.com/upmrc/public/api/register/sdc/viewData", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      formType: "pm-logbook-gate-half-yearly-sdc",
    }),
  }).then((res) => res.json());
});
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
      frequency: values.frequency,
      date: values.date,
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
      staff3_desg: values.staff3_desg,
      staff3_employee: values.staff3_employee,
      staff3_sign: values.staff3_sign,
      formType: "pm-logbook-gate-half-yearly-sdc",
      employee_id: user.profileid,
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
      frequency: values.frequency,
      date: values.date,
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
      staff3_desg: values.staff3_desg,
      staff3_employee: values.staff3_employee,
      staff3_sign: values.staff3_sign,
      formType: "pm-logbook-gate-half-yearly-sdc",
      employee_id: user.profileid,
      department: user.department,
      unit: user.department,
    }),
  }).then((res) => res.json());
});
const PmLogBookSlice = createSlice({
  name: "PmLogBookData",
  initialState: {
    loading: false,
    data: [],
    slug: "pm-logbook-gate-half-yearly-sdc",
    error: "",
    isSuccess: "",
  },

  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
      console.log(state);
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
      showToastOnce(action.payload.message); // toaste for suceess
    });

    builder.addCase(addData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      console.log(action.error);
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
      showToastOnce(action.payload.message); // toaste for suceess
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
      showToastOnce(action.payload.message); // toaste for suceess
    });

    builder.addCase(saveData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
      showToastOnce(action.error.message, "error");
    });
  },
});

export const { addPmLogBook } = PmLogBookSlice.actions;
export default PmLogBookSlice.reducer;
