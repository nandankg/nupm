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
      formType: "outstanding-record-register",
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
      formType: "outstanding-record-register",
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
      //change fields
      formType: "outstanding-record-register",
      date: values.date,
      station_name:values.station_name,
      letter_no: values.letter_no,
      operator_name: values.operator_name,
      osamount: values.osamount,
      emp_no: values.emp_no,
      working_id: values.working_id,
      tom_no: values.tom_no,
      shift_no: values.shift_no,
      Date_send: values.Date_send,
      notgenamount: values.notgenamount,
      genamount: values.genamount,
      sigofsc: user.employeeid,
      reason: values.reason,
      detailback: values.detailback,
      gremark: values.gremark,
      remark: values.remark,
      unit: values.unit,
      employee_id: user.profileid,
      department: user.department,
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
      formType: "outstanding-record-register",
      update_id: values.id,
      date: values.date,
      station_name:values.station_name,
      letter_no: values.letter_no,
      operator_name: values.operator_name,
      osamount: values.osamount,
      emp_no: values.emp_no,
      working_id: values.working_id,
      tom_no: values.tom_no,
      shift_no: values.shift_no,
      Date_send: values.Date_send,
      notgenamount: values.notgenamount,
      genamount: values.genamount,
      sigofsc: user.employeeid,
      reason: values.reason,
      detailback: values.detailback,
      gremark: values.gremark,
      remark: values.remark,
      unit: values.unit,
      Employ_id: user.employeeid,
      department: user.department,
    }),
  }).then((res) => res.json());
});

const OutstandRecRegSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    data: [],
    slug: "outstanding-record-register",
    error: "",
    isSuccess: "",
  },
  reducers: {
    addOutstandRecRegRed: (state, action) => {
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
      showToastOnce(action.error.message);
    });
  },
});

export const { addOutstandRecRegRed } = OutstandRecRegSlice.actions;
export default OutstandRecRegSlice.reducer;
