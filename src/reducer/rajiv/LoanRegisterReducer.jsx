import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { showToastOnce } from "../../component/toastUtils";
import { formatDate, formatTime } from "../../data/formatDate";

const user = JSON.parse(localStorage.getItem("userdata"));
const token = localStorage.getItem("accessToken");
export const fetchData = createAsyncThunk("data/fetchData", async () => {
  return fetch("https://tprosysit.com/upmrc/public/api/register/sdc/viewData", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      formType: "loan-register-sdc",
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
      date: formatDate(new Date().toString()),
      issue_date: values.issue_date,
      issue_time: values.issue_time ,
      item_name: values.item_name,
      item_qty: values.item_qty,
      name: values.name,
      issuer_sign: values.issuer_sign,
      return_date: values.return_date,
      return_time: values.return_time,
      balance_qty: values.balance_qty,

      return_by_sign: values.return_by_sign,
      receiver_sign: values.receiver_sign,
      remark: values.remark,
      formType: "loan-register-sdc",
      employee_id: user.profileid,
      unit: user.department,
      department: user.department,
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
      date: formatDate(new Date().toString()),
      issue_date: values.issue_date,
      issue_time: values.issue_time ,
      item_name: values.item_name,
      item_qty: values.item_qty,
      name: values.name,
      issuer_sign: values.issuer_sign,
      return_date: values.return_date,
      return_time: values.return_time,
      balance_qty: values.balance_qty,
      return_by_sign: values.return_by_sign,
      receiver_sign: values.receiver_sign,
      remark: values.remark,
      formType: "loan-register-sdc",
      employee_id: user.profileid,
      unit: user.department,
      department: user.department,
    }),
  }).then((res) => res.json());
});
export const saveData = createAsyncThunk("data/saveData", async (id) => {
  return fetch("https://tprosysit.com/upmrc/public/api/register/sdc/edit", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      formType: "loan-register-sdc",
      status: "1",
      update_id: id,
    }),
  }).then((res) => res.json());
});
const LoanRegisterSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    data: [],
    slug: "loan-register-sdc",
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
      showToastOnce(action.error.message, "error");
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
      showToastOnce(action.error.message);
    });

    builder.addCase(saveData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
      showToastOnce(action.error.message, "error");
    });
  },
});

export default LoanRegisterSlice.reducer;
