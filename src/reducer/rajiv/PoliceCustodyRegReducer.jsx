import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PoliceCustodyRegData } from "../../data/Data";
import { toast } from "react-toastify";
import { showToastOnce } from "../../component/toastUtils";

const user = JSON.parse(localStorage.getItem("userdata"));
const token = localStorage.getItem("accessToken");
export const saveData = createAsyncThunk("data/saveData", async (id) => {
  return fetch("https://tprosysit.com/upmrc/public/api/operation/edit", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      formType: "police-custody-register",
      status: "1",
      update_id: id,
    }),
  }).then((res) => res.json());
});
// Fetch initial data from API
export const fetchData = createAsyncThunk("data/fetchData", async () => {
  return fetch("https://tprosysit.com/upmrc/public/api/operation/viewData", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      formType: "police-custody-register",
    }),
  }).then((res) => res.json());
});

// Add new data to API
export const addData = createAsyncThunk("data/addData", async (values) => {
  console.log(values);
  return fetch("https://tprosysit.com/upmrc/public/api/operation/save", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      formType: "police-custody-register",
      date: values.date,
      time: values.time,
      name: values.name,
      address: values.address,
      contactNo: values.contactNo,
      handedTo: values.handedTo,
      reason: values.reason,
      handing_over_Memo_no: values.handing_over_Memo_no,
      sigofsc: user.employeeid,
      remark: values.remark,
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
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      update_id: values.id,
      formType: "police-custody-register",
      date: values.date,
      time: values.time,
      name: values.name,
      address: values.address,
      contactNo: values.contactNo,
      handedTo: values.handedTo,
      reason: values.reason,
      handing_over_Memo_no: values.handing_over_Memo_no,
      sigofsc: user.employeeid,
      remark: values.remark,
      employee_id: user.profileid,
      department: user.department,
    }),
  }).then((res) => res.json());
});
const PoliceCustodyRegSlice = createSlice({
  name: "policeCustodyReg",
  initialState: {
    loading: false,
    data: [],
    error: "",
    slug: "police-custody-register",
    isSuccess: "",
  },
  reducers: {
    addPoliceCustody: (state, action) => {
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

export const { addPoliceCustody } = PoliceCustodyRegSlice.actions;
export default PoliceCustodyRegSlice.reducer;
